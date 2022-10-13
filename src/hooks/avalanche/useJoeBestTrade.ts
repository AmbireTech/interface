import { Currency as V2Currency, CurrencyAmount, Token as V2Token, TradeType } from '@uniswap/sdk-core'
import { Pair as V2Pair, Route as V2Route } from '@uniswap/v2-sdk'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from 'constants/chains'
import { useGetBestTrade, useGetCurrency } from 'hooks/avalanche/useJoeEntities'
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

  const inputCurrency = debouncedAmount?.currency
  const outputCurrency = debouncedOtherCurrency
  const inputAmountString: string = convertDecimalToActualAmount(debouncedAmount?.toExact() ?? '0', inputCurrency)

  const joeInputCurrency = useGetCurrency(inputCurrency)
  const joeOutputCurrency = useGetCurrency(outputCurrency)
  const bestTrade = useGetBestTrade(joeInputCurrency, joeOutputCurrency, inputAmountString)

  const univ2Trade = useMemo(() => {
    if (!inputCurrency || !outputCurrency || !provider || !bestTrade) return undefined

    const inputCurrencyAmont = CurrencyAmount.fromRawAmount(
      inputCurrency,
      convertDecimalToActualAmount(bestTrade.inputAmount.toExact(), inputCurrency)
    )
    const outputCurrencyAmount = CurrencyAmount.fromRawAmount(
      outputCurrency,
      convertDecimalToActualAmount(bestTrade.outputAmount.toExact(), outputCurrency)
    )

    return new InterfaceTrade({
      v2Routes: [
        {
          routev2: new V2Route(
            bestTrade.route.pairs.map((p) => {
              const token0 = new V2Token(
                SupportedChainId.AVALANCHE,
                p.token0.address,
                p.token0.decimals,
                p.token0.symbol,
                p.token0.name
              )
              const token1 = new V2Token(
                SupportedChainId.AVALANCHE,
                p.token1.address,
                p.token1.decimals,
                p.token1.symbol,
                p.token1.name
              )
              return new V2Pair(
                CurrencyAmount.fromRawAmount(token0, convertDecimalToActualAmount(p.reserve0.toExact(), token0)),
                CurrencyAmount.fromRawAmount(token1, convertDecimalToActualAmount(p.reserve1.toExact(), token1))
              )
            }),
            inputCurrency,
            outputCurrency
          ),
          inputAmount: inputCurrencyAmont,
          outputAmount: outputCurrencyAmount,
        },
      ],
      v3Routes: [],
      mixedRoutes: [],
      tradeType,
      gasUseEstimateUSD: undefined, // TODO
      blockNumber: String(provider._lastBlockNumber),
    })
  }, [tradeType, inputCurrency, outputCurrency, provider, bestTrade])

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
