import { Contract } from '@ethersproject/contracts'
import { parseUnits } from '@ethersproject/units'
import { ChainId, Pair, Route, Token, TokenAmount, Trade } from '@traderjoe-xyz/sdk'
import { Currency as V2Currency, CurrencyAmount, NativeCurrency, Token as V2Token, TradeType } from '@uniswap/sdk-core'
import uniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { Pair as V2Pair, Route as V2Route } from '@uniswap/v2-sdk'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { InterfaceTrade, TradeState } from 'state/routing/types'

import { SupportedChainId } from '../constants/chains'
import { WRAPPED_NATIVE_CURRENCY } from '../constants/tokens'
import useDebounce from './useDebounce'

/**
 * Returns the best v2+v3 trade for a desired swap.
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */
export function useBestTradeByJoe(
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

  const pair = useGetPair(inputCurrency, outputCurrency)

  const tokenA = useMemo(
    () =>
      inputCurrency
        ? new Token(
            ChainId.AVALANCHE,
            inputCurrency.address,
            inputCurrency.decimals,
            inputCurrency.symbol,
            inputCurrency.name
          )
        : undefined,
    [inputCurrency]
  )
  const tokenB = useMemo(
    () =>
      outputCurrency
        ? new Token(
            ChainId.AVALANCHE,
            outputCurrency.address,
            outputCurrency.decimals,
            outputCurrency.symbol,
            outputCurrency.name
          )
        : undefined,
    [outputCurrency]
  )
  const bestTrade = useMemo(
    () =>
      inputAmountString && tokenA && tokenB && pair ? getTrade([pair], tokenA, tokenB, inputAmountString) : undefined,
    [inputAmountString, tokenA, tokenB, pair]
  )

  const univ2Trade = useMemo(() => {
    if (!tokenA || !tokenB || !provider || !bestTrade) return undefined

    const currency1 = new V2Token(ChainId.AVALANCHE, tokenA.address, tokenA.decimals, tokenA.symbol, tokenA.name)
    const currency2 = new V2Token(ChainId.AVALANCHE, tokenB.address, tokenB.decimals, tokenB.symbol, tokenB.name)
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

  // // const inputAmount = new TokenAmount(tokenA, inputCurrencyAmount.toString())
  // // const inputAmount = new TokenAmount(tokenA, inputAmountString)
  // const inputAmount = useMemo(
  //   () => tokenA ? new TokenAmount(tokenA, inputAmountString) : undefined,
  //   [tokenA]
  // )
  // // const tokenB = new Token(ChainId.AVALANCHE, to.address, to.decimals, to.symbol, to.name);
  // const [amountOut,] = pair.getOutputAmount(inputAmount, ChainId.AVALANCHE)
  // console.log(amountOut.toSignificant(outputCurrency.decimals))

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

function useGetPair(inputCurrency: any, outputCurrency: any) {
  const { provider } = useWeb3React()
  const [pair, setPair] = useState<Pair | undefined>(undefined)

  const getPairCallback = useCallback(async () => {
    if (!provider || !inputCurrency || !outputCurrency) return
    const res = await getPair(provider, inputCurrency, outputCurrency)
    setPair(res)
  }, [provider, inputCurrency, outputCurrency])

  useEffect(() => {
    getPairCallback()
  }, [getPairCallback, provider, inputCurrency, outputCurrency])

  return pair
}

async function getPair(provider: any, from: any, to: any) {
  const tokenA = new Token(ChainId.AVALANCHE, from.address, from.decimals, from.symbol, from.name)
  const tokenB = new Token(ChainId.AVALANCHE, to.address, to.decimals, to.symbol, to.name)
  const pairAddress = Pair.getAddress(tokenA, tokenB, ChainId.AVALANCHE)
  const uniV2PairContract = new Contract(pairAddress, uniswapV2Pair.abi, provider)
  try {
    const reserves = await uniV2PairContract.getReserves()
    const token0Address = await uniV2PairContract.token0()
    const reserve0 = token0Address === from.address ? reserves.reserve0.toString() : reserves.reserve1.toString()
    const reserve1 = token0Address === from.address ? reserves.reserve1.toString() : reserves.reserve0.toString()
    const pair = new Pair(new TokenAmount(tokenA, reserve0), new TokenAmount(tokenB, reserve1), ChainId.AVALANCHE)
    return pair
  } catch (e) {
    // console.error(e)
    return undefined
  }
}

function getTrade(pairs: any, tokenA: any, tokenB: any, value: any) {
  try {
    const route = new Route(pairs, tokenA, tokenB)
    const trade = new Trade(
      route,
      new TokenAmount(tokenA, value),
      // CurrencyAmount.fromRawAmount(tokenA, parseUnits(value.toString(), tokenA.decimals)),
      TradeType.EXACT_INPUT,
      ChainId.AVALANCHE
    )
    return trade
  } catch (e) {
    return undefined
  }
}

function convertDecimalToActualAmount(decimalAmount: string, currency: any): string {
  return parseUnits(decimalAmount, currency?.decimals).toString()
}
