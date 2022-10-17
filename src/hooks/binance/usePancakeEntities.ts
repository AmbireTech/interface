import { Contract } from '@ethersproject/contracts'
import { BigintIsh, ChainId, Currency, CurrencyAmount, Pair, Token, TokenAmount, Trade } from '@pancakeswap/sdk'
import { NativeCurrency as V2NativeCurrency, Token as V2Token, TradeType } from '@uniswap/sdk-core'
import uniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useWeb3React } from '@web3-react/core'
import { WRAPPED_NATIVE_CURRENCY } from 'constants/tokens'
import { useCallback, useEffect, useMemo, useState } from 'react'

const swapHopAssets = [
  { address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', name: 'wbnb', symbol: 'WBNB', decimals: 18 },
  { address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', name: 'usdc', symbol: 'USCD', decimals: 6 },
  { address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', name: 'dai', symbol: 'DAI', decimals: 18 },
  { address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', name: 'eth', symbol: 'ETH', decimals: 18 },
  { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', name: 'busd', symbol: 'BUSD', decimals: 18 },
]

export function useGetCurrency(v2currency: V2Token | V2NativeCurrency | undefined): Token | Currency | undefined {
  return useMemo(() => {
    if (!v2currency) return undefined

    return v2currency instanceof V2NativeCurrency
      ? Currency.ETHER
      : new Token(
          ChainId.MAINNET,
          v2currency.address,
          v2currency.decimals,
          v2currency.symbol ?? '',
          v2currency.name ?? ''
        )
  }, [v2currency])
}

export function useGetPairs(
  input: Token | Currency | undefined,
  output: Token | Currency | undefined,
  useHops = true
): Pair[] | undefined {
  const { provider } = useWeb3React()
  const [pairs, setPairs] = useState<Pair[] | undefined>(undefined)

  const getPairsCallback = useCallback(async () => {
    if (!provider || !input || !output) return

    const wrapped = WRAPPED_NATIVE_CURRENCY[ChainId.MAINNET] as V2Token

    const tokenA =
      input === Currency.ETHER
        ? new Token(ChainId.MAINNET, wrapped.address, wrapped.decimals, wrapped.symbol ?? '', wrapped.name ?? '')
        : (input as Token)
    const tokenB =
      output === Currency.ETHER
        ? new Token(ChainId.MAINNET, wrapped.address, wrapped.decimals, wrapped.symbol ?? '', wrapped.name ?? '')
        : (output as Token)

    // we do not make a pair if the tokens are native and wrapped
    if (tokenA.address === wrapped.address && tokenB.address === wrapped.address) {
      setPairs(undefined)
      return
    }

    // direct pair
    // const pairsPromises = [getPair(provider, tokenA, tokenB)]
    const pairsPromises = [getPair(provider, tokenA, tokenB)]
    pairsPromises.pop()

    if (useHops) {
      // convert hop assets to token objects
      const hopTokens = swapHopAssets.map(
        (asset) => new Token(ChainId.MAINNET, asset.address, asset.decimals, asset.symbol ?? '', asset.name ?? '')
      )

      // build hop pairs
      hopTokens.map(async (hopToken1) => {
        if (hopToken1.address === tokenA.address || hopToken1.address === tokenB.address) return
        pairsPromises.push(getPair(provider, tokenA, hopToken1))
        pairsPromises.push(getPair(provider, hopToken1, tokenB))

        hopTokens.map(async (hopToken2) => {
          if (
            hopToken1.address === hopToken2.address ||
            hopToken2.address === tokenA.address ||
            hopToken2.address === tokenB.address
          )
            return
          pairsPromises.push(getPair(provider, hopToken1, hopToken2))
        })
      })
    }

    const resolvedPairs = await Promise.all(pairsPromises)
    setPairs(resolvedPairs.filter((p) => p) as Pair[])
  }, [provider, input, output, useHops])

  useEffect(() => {
    setPairs(undefined)
    getPairsCallback()
  }, [getPairsCallback, provider, input, output])

  return pairs
}

export function useGetBestTrade(
  input: Token | Currency | undefined,
  output: Token | Currency | undefined,
  pairs: Pair[] | undefined,
  amountString: BigintIsh | undefined,
  tradeType: TradeType | undefined,
  maxHops = 2
): Trade | undefined {
  return useMemo(() => {
    if (tradeType === undefined || amountString === undefined || !input || !output || !pairs || pairs.length === 0)
      return undefined

    let trades: Trade[] = []
    if (tradeType === TradeType.EXACT_INPUT) {
      const inputAmount =
        input instanceof Token ? new TokenAmount(input, amountString) : CurrencyAmount.ether(amountString)
      trades = Trade.bestTradeExactIn(pairs, inputAmount, output, { maxHops })
    } else {
      const outputAmount =
        output instanceof Token ? new TokenAmount(output, amountString) : CurrencyAmount.ether(amountString)
      trades = Trade.bestTradeExactOut(pairs, input, outputAmount, { maxHops })
    }

    if (trades.length === 0) return undefined

    return trades[0]
  }, [tradeType, amountString, input, output, pairs, maxHops])
}

async function getPair(provider: any, tokenA: Token, tokenB: Token): Promise<Pair | undefined> {
  const pairAddress = Pair.getAddress(tokenA, tokenB)
  const uniV2PairContract = new Contract(pairAddress, uniswapV2Pair.abi, provider)
  try {
    const reserves = await uniV2PairContract.getReserves()
    const token0Address = await uniV2PairContract.token0()
    const reserve0 = token0Address === tokenA.address ? reserves.reserve0.toString() : reserves.reserve1.toString()
    const reserve1 = token0Address === tokenA.address ? reserves.reserve1.toString() : reserves.reserve0.toString()
    const pair = new Pair(new TokenAmount(tokenA, reserve0), new TokenAmount(tokenB, reserve1))
    return pair
  } catch (e) {
    // console.error(e)
    return undefined
  }
}

// function getTrade(pairs: any, tokenA: any, tokenB: any, value: any) {
//   try {
//     const route = new Route(pairs, tokenA, tokenB)
//     const trade = new Trade(
//       route,
//       new TokenAmount(tokenA, value),
//       // CurrencyAmount.fromRawAmount(tokenA, parseUnits(value.toString(), tokenA.decimals)),
//       TradeType.EXACT_INPUT,
//       ChainId.MAINNET
//     )
//     return trade
//   } catch (e) {
//     return undefined
//   }
// }
