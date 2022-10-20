import { NativeCurrency as V2NativeCurrency, Token as V2Token, TradeType } from '@uniswap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { LIBRARIES, SWAP_HOP_ASSETS } from 'constants/customNetworks'
import { WRAPPED_NATIVE_CURRENCY } from 'constants/tokens'
import { UniV2CustomLibrary } from 'hooks/customNetwork/libraries/UniV2CustomLibrary'
import { CurrencyObject, PairObject, TokenObject, TradeObject } from 'hooks/customNetwork/types'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function useGetNetworkLibrary(): UniV2CustomLibrary | undefined {
  const { chainId } = useWeb3React()

  return useMemo(() => {
    if (!chainId) return undefined

    return LIBRARIES[chainId] ?? undefined
  }, [chainId])
}

export function useGetCurrency(
  v2currency: V2Token | V2NativeCurrency | undefined
): TokenObject | CurrencyObject | undefined {
  const lib = useGetNetworkLibrary()

  return useMemo(() => {
    if (!lib || !v2currency) return undefined

    return v2currency instanceof V2NativeCurrency
      ? lib.getNativeCurrency()
      : lib.getToken(v2currency.address, v2currency.decimals, v2currency.symbol ?? '', v2currency.name ?? '')
  }, [lib, v2currency])
}

export function useGetPairs(
  input: TokenObject | CurrencyObject | undefined,
  output: TokenObject | CurrencyObject | undefined,
  useHops = true
): PairObject[] | undefined {
  const { chainId, provider } = useWeb3React()
  const lib = useGetNetworkLibrary()

  const [pairs, setPairs] = useState<PairObject[] | undefined>(undefined)

  const getPairsCallback = useCallback(async () => {
    if (!lib || !chainId || !provider || !input || !output) return

    const wrapped = WRAPPED_NATIVE_CURRENCY[chainId] as V2Token

    const tokenA =
      input === lib.getNativeCurrency()
        ? lib.getToken(wrapped.address, wrapped.decimals, wrapped.symbol ?? '', wrapped.name ?? '')
        : (input as TokenObject)
    const tokenB =
      output === lib.getNativeCurrency()
        ? lib.getToken(wrapped.address, wrapped.decimals, wrapped.symbol ?? '', wrapped.name ?? '')
        : (output as TokenObject)

    // we do not make a pair if the tokens are native and wrapped
    if (tokenA.address === wrapped.address && tokenB.address === wrapped.address) {
      setPairs(undefined)
      return
    }

    // direct pair
    const pairsPromises = [lib.fetchPair(provider, tokenA, tokenB)]

    if (useHops) {
      // convert hop assets to token objects
      const hopTokens = SWAP_HOP_ASSETS[chainId].map((asset) =>
        lib.getToken(asset.address, asset.decimals, asset.symbol ?? '', asset.name ?? '')
      )

      // build hop pairs
      hopTokens.map(async (hopToken1) => {
        if (hopToken1.address === tokenA.address || hopToken1.address === tokenB.address) return
        pairsPromises.push(lib.fetchPair(provider, tokenA, hopToken1))
        pairsPromises.push(lib.fetchPair(provider, hopToken1, tokenB))

        hopTokens.map(async (hopToken2) => {
          if (
            hopToken1.address === hopToken2.address ||
            hopToken2.address === tokenA.address ||
            hopToken2.address === tokenB.address
          )
            return
          pairsPromises.push(lib.fetchPair(provider, hopToken1, hopToken2))
        })
      })
    }

    const resolvedPairs = await Promise.all(pairsPromises)
    setPairs(resolvedPairs.filter((p) => p) as PairObject[])
  }, [lib, chainId, provider, input, output, useHops])

  useEffect(() => {
    setPairs(undefined)
    getPairsCallback()
  }, [getPairsCallback, provider, input, output])

  return pairs
}

export function useGetBestTrade(
  input: TokenObject | CurrencyObject | undefined,
  output: TokenObject | CurrencyObject | undefined,
  pairs: PairObject[] | undefined,
  amountString: string | undefined,
  tradeType: TradeType | undefined,
  maxHops = 3
): TradeObject | undefined {
  const lib = useGetNetworkLibrary()

  return useMemo(() => {
    if (
      !lib ||
      tradeType === undefined ||
      amountString === undefined ||
      !input ||
      !output ||
      !pairs ||
      pairs.length === 0
    )
      return undefined

    // console.log(`trade type: ${tradeType}`)
    // console.log(`pairs: ${pairs.map(p => p.token0.symbol)}`)

    let trades: TradeObject[] = []
    if (tradeType === TradeType.EXACT_INPUT) {
      const inputAmount = lib.getAmount(input, amountString)
      trades = lib.getBestTradesExactIn(pairs, inputAmount, output, { maxHops })
    } else {
      const outputAmount = lib.getAmount(output, amountString)
      trades = lib.getBestTradesExactOut(pairs, input, outputAmount, { maxHops })
    }

    if (trades.length === 0) return undefined

    // console.log(`trades: ${trades.map(tr => `\n[${tr.inputAmount.toExact()} - ${tr.route.path.map(t => t.symbol)} - ${tr.outputAmount.toExact()}]`)}`)
    // console.log(`best trade route: ${trades[0].route.path.map(t => t.symbol)}`)

    return trades[0]
  }, [lib, tradeType, amountString, input, output, pairs, maxHops])
}

// function getTrade(pairs: any, tokenA: any, tokenB: any, value: any) {
//   try {
//     const route = new Route(pairs, tokenA, tokenB)
//     const trade = new Trade(
//       route,
//       new TokenAmount(tokenA, value),
//       // CurrencyAmount.fromRawAmount(tokenA, parseUnits(value.toString(), tokenA.decimals)),
//       TradeType.EXACT_INPUT,
//       ChainId.AVALANCHE
//     )
//     return trade
//   } catch (e) {
//     return undefined
//   }
// }
