import { Currency as V2Currency, CurrencyAmount, NativeCurrency, Token as V2Token, TradeType } from '@uniswap/sdk-core'
import { Pair as V2Pair, Route as V2Route } from '@uniswap/v2-sdk'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from 'constants/chains'
import { WRAPPED_NATIVE_CURRENCY } from 'constants/tokens'
import { useGetBestTrade, useGetToken } from 'hooks/avalanche/useJoeEntities'
import useDebounce from 'hooks/useDebounce'
import { useMemo } from 'react'
import { InterfaceTrade, TradeState } from 'state/routing/types'
import { convertDecimalToActualAmount } from 'utils/convertAmounts'

/**
 * Returns the best v2+v3 trade for a desired swap.
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */
export function useJoeBestTrade(
  tradeType: TradeType,
  amountSpecified?: CurrencyAmount<V2Currency>,
  otherCurrency?: V2Currency
): {
  state: TradeState
  trade: InterfaceTrade<V2Currency, V2Currency, TradeType> | undefined
} {
  const { provider } = useWeb3React()

  const [debouncedAmount, debouncedOtherCurrency] = useDebounce(
    useMemo(() => [amountSpecified, otherCurrency], [amountSpecified, otherCurrency]),
    200
  )

  const inputCurrency =
    debouncedAmount?.currency instanceof NativeCurrency
      ? WRAPPED_NATIVE_CURRENCY[SupportedChainId.AVALANCHE]
      : debouncedAmount?.currency

  const inputAmountString: string = convertDecimalToActualAmount(debouncedAmount?.toExact() ?? '0', inputCurrency)

  const outputCurrency =
    debouncedOtherCurrency instanceof NativeCurrency
      ? WRAPPED_NATIVE_CURRENCY[SupportedChainId.AVALANCHE]
      : debouncedOtherCurrency

  const tokenA = useGetToken(inputCurrency)
  const tokenB = useGetToken(outputCurrency)
  const bestTrade = useGetBestTrade(tokenA, tokenB, inputAmountString)

  const univ2Trade = useMemo(() => {
    if (!tokenA || !tokenB || !provider || !bestTrade) return undefined

    const currency1 = new V2Token(
      SupportedChainId.AVALANCHE,
      tokenA.address,
      tokenA.decimals,
      tokenA.symbol,
      tokenA.name
    )
    const currency2 = new V2Token(
      SupportedChainId.AVALANCHE,
      tokenB.address,
      tokenB.decimals,
      tokenB.symbol,
      tokenB.name
    )
    const currencyAmount1 = CurrencyAmount.fromRawAmount(
      currency1,
      convertDecimalToActualAmount(bestTrade.inputAmount.toExact(), currency1)
    )
    const currencyAmount2 = CurrencyAmount.fromRawAmount(
      currency2,
      convertDecimalToActualAmount(bestTrade.outputAmount.toExact(), currency2)
    )

    return new InterfaceTrade({
      // v2Routes:
      //   route
      //     ?.filter((r): r is typeof route[0] & { routev2: NonNullable<typeof route[0]['routev2']> } => r.routev2 !== null)
      //     .map(({ routev2, inputAmount, outputAmount }) => ({ routev2, inputAmount, outputAmount })) ?? [],
      v2Routes: [
        {
          routev2: new V2Route([new V2Pair(currencyAmount1, currencyAmount2)], currency1, currency2),
          inputAmount: currencyAmount1,
          outputAmount: currencyAmount2,
        },
      ],
      v3Routes: [],
      mixedRoutes: [],
      tradeType,
      gasUseEstimateUSD: undefined,
      blockNumber: String(provider._lastBlockNumber),
    })
  }, [tradeType, tokenA, tokenB, provider, bestTrade])

  // only return gas estimate from api if routing api trade is used
  return useMemo(() => {
    if (!univ2Trade) {
      return {
        trade: undefined,
        state: TradeState.INVALID,
      }
    }

    return {
      trade: univ2Trade,
      state: TradeState.VALID,
    }
  }, [univ2Trade])
}
