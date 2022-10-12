import { Interface } from '@ethersproject/abi'
import { BigNumber } from '@ethersproject/bignumber'
import { Percent as JoePercent, Router as JoeRouter, TokenAmount as JoeTokenAmount } from '@traderjoe-xyz/sdk'
import { Trade } from '@uniswap/router-sdk'
import { Currency, Percent, TradeType } from '@uniswap/sdk-core'
import { FeeOptions } from '@uniswap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import AVALANCHE_JOE_ROUTER_ABI from 'abis/avalanche-joe-router.json'
import { SWAP_ROUTER_ADDRESSES } from 'constants/addresses'
import { useGetBestTrade, useGetToken } from 'hooks/avalanche/useJoeEntities'
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
export function useJoeSwapCallArguments(
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

  // convert trade to Joe Trade
  const tokenA = useGetToken(trade?.inputAmount?.currency)
  const tokenB = useGetToken(trade?.outputAmount?.currency)
  const joeTrade = useGetBestTrade(
    tokenA,
    tokenB,
    convertDecimalToActualAmount(trade?.inputAmount?.toExact() ?? '0', trade?.inputAmount?.currency)
  )

  return useMemo(() => {
    if (!trade || !recipient || !provider || !account || !chainId || !deadline || !joeTrade) return []

    const swapRouterAddress = chainId ? SWAP_ROUTER_ADDRESSES[chainId] : undefined
    if (!swapRouterAddress) return []

    // convert slippage to joe percent
    const joeAllowedSlippage = new JoePercent(
      allowedSlippage.numerator.toString(),
      allowedSlippage.denominator.toString()
    )

    const { methodName, args, value } = JoeRouter.swapCallParameters(joeTrade, {
      // fee: feeOptions,
      recipient,
      allowedSlippage: joeAllowedSlippage,
      ttl: Number(deadline.toString()),
    })

    const JoeRouterInterface = new Interface(AVALANCHE_JOE_ROUTER_ABI)
    const calldata = JoeRouterInterface.encodeFunctionData(methodName, args)

    if (
      joeTrade.inputAmount instanceof JoeTokenAmount &&
      joeTrade.inputAmount.token.address &&
      approvalState === ApprovalState.NOT_APPROVED
    ) {
      return [
        approveAmountAmbireWallet(joeTrade.maximumAmountIn(joeAllowedSlippage), swapRouterAddress),
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
    joeTrade,
  ])
}
