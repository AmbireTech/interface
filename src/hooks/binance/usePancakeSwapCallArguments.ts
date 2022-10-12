import { Interface } from '@ethersproject/abi'
import { BigNumber } from '@ethersproject/bignumber'
import { Percent as PancakePercent, Router as PancakeRouter, TokenAmount as PancakeTokenAmount } from '@pancakeswap/sdk'
import { Trade } from '@uniswap/router-sdk'
import { Currency, Percent, TradeType } from '@uniswap/sdk-core'
import { FeeOptions } from '@uniswap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import BINANCE_PANCAKE_ROUTER_ABI from 'abis/binance-pancake-router.json'
import { SWAP_ROUTER_ADDRESSES } from 'constants/addresses'
import { useGetToken, useGetTrade } from 'hooks/binance/usePancakeEntities'
import useENS from 'hooks/useENS'
import { SignatureData } from 'hooks/useERC20Permit'
import { useMemo } from 'react'
import { SwapCall } from 'state/routing/types'
import { approveAmountAmbireWallet } from 'utils/approveAmountCalldata'
import { convertDecimalToActualAmount } from 'utils/convertAmounts'

import { ApprovalState, useApproveCallbackFromTrade } from '../useApproveCallback'

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName the ENS name or address of the recipient of the swap output
 * @param signatureData the signature data of the permit of the input token amount, if available
 */
export function usePancakeSwapCallArguments(
  trade: Trade<Currency, Currency, TradeType> | undefined,
  allowedSlippage: Percent,
  recipientAddressOrName: string | null | undefined,
  signatureData: SignatureData | null | undefined,
  deadline: BigNumber | undefined,
  feeOptions: FeeOptions | undefined
): SwapCall[] {
  const { account, chainId, provider } = useWeb3React()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress
  const [approvalState] = useApproveCallbackFromTrade(trade as Trade<Currency, Currency, TradeType>, allowedSlippage)

  // convert trade to Pancake Trade
  const tokenA = useGetToken(trade?.inputAmount?.currency)
  const tokenB = useGetToken(trade?.outputAmount?.currency)
  const pancakeTrade = useGetTrade(
    tokenA,
    tokenB,
    convertDecimalToActualAmount(trade?.inputAmount?.toExact() ?? '0', trade?.inputAmount?.currency)
  )

  return useMemo(() => {
    if (!trade || !recipient || !provider || !account || !chainId || !deadline || !pancakeTrade) return []

    const swapRouterAddress = chainId ? SWAP_ROUTER_ADDRESSES[chainId] : undefined
    if (!swapRouterAddress) return []

    // convert slippage to pancake percent
    const pancakeAllowedSlippage = new PancakePercent(
      allowedSlippage.numerator.toString(),
      allowedSlippage.denominator.toString()
    )

    const { methodName, args, value } = PancakeRouter.swapCallParameters(pancakeTrade, {
      // fee: feeOptions,
      recipient,
      allowedSlippage: pancakeAllowedSlippage,
      ttl: Number(deadline.toString()),
    })

    const PancakeRouterInterface = new Interface(BINANCE_PANCAKE_ROUTER_ABI)
    const calldata = PancakeRouterInterface.encodeFunctionData(methodName, args)

    if (
      pancakeTrade.inputAmount instanceof PancakeTokenAmount &&
      pancakeTrade.inputAmount.token.address &&
      approvalState === ApprovalState.NOT_APPROVED
    ) {
      return [
        approveAmountAmbireWallet(pancakeTrade.maximumAmountIn(pancakeAllowedSlippage), swapRouterAddress),
        {
          address: swapRouterAddress,
          calldata,
          value,
        },
      ]
    }

    return [
      {
        address: swapRouterAddress,
        calldata,
        value,
      },
    ]
  }, [
    account,
    allowedSlippage,
    chainId,
    deadline,
    // feeOptions,
    provider,
    recipient,
    // signatureData,
    trade,
    approvalState,
    pancakeTrade,
  ])
}
