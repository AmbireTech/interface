import { BigNumber } from '@ethersproject/bignumber'
import { Trade } from '@uniswap/router-sdk'
import { Currency, Percent, TradeType } from '@uniswap/sdk-core'
import { FeeOptions } from '@uniswap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import { SWAP_ROUTER_ADDRESSES } from 'constants/addresses'
import {
  useGetBestTrade,
  useGetCurrency,
  useGetNetworkLibrary,
  useGetPairs,
} from 'hooks/customNetwork/useCustomEntities'
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
export function useCustomSwapCallArguments(
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

  const [inputCurrency, outputCurrency, amountString] = useMemo(() => {
    if (!trade) return [undefined, undefined, undefined]

    const inputCurrency = trade.inputAmount.currency
    const outputCurrency = trade.outputAmount.currency
    const amountString =
      trade.tradeType === TradeType.EXACT_INPUT
        ? convertDecimalToActualAmount(trade.inputAmount.toExact(), trade.inputAmount.currency)
        : convertDecimalToActualAmount(trade.outputAmount.toExact(), trade.outputAmount.currency)

    return [inputCurrency, outputCurrency, amountString]
  }, [trade])

  // get custom best trade
  const customInputCurrency = useGetCurrency(inputCurrency)
  const customOutputCurrency = useGetCurrency(outputCurrency)
  const customPairs = useGetPairs(customInputCurrency, customOutputCurrency)
  const bestTrade = useGetBestTrade(
    customInputCurrency,
    customOutputCurrency,
    customPairs,
    amountString,
    trade?.tradeType
  )

  const lib = useGetNetworkLibrary()

  return useMemo(() => {
    if (!lib || !trade || !recipient || !provider || !account || !chainId || !deadline || !bestTrade) return []

    const swapRouterAddress = chainId ? SWAP_ROUTER_ADDRESSES[chainId] : undefined
    if (!swapRouterAddress) return []

    const { methodName, args, value } = lib.getSwapCallParameters(bestTrade, {
      // fee: feeOptions,
      recipient,
      allowedSlippage,
      ttl: Number(deadline.toString()),
    })
    const calldata = lib.getRouterCalldata(methodName, args)

    if (lib.isTradeInputToken(bestTrade) && approvalState === ApprovalState.NOT_APPROVED) {
      return [
        approveAmountAmbireWallet(lib.getTradeMaxAmountIn(bestTrade, allowedSlippage), swapRouterAddress),
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
    lib,
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
    bestTrade,
  ])
}
