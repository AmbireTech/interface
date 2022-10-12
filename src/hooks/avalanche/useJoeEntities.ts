import { Contract } from '@ethersproject/contracts'
import { BigintIsh, ChainId, Pair, Token, TokenAmount, Trade } from '@traderjoe-xyz/sdk'
import uniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useMemo, useState } from 'react'

const swapHopAssets = [
  { address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', name: 'wavax', symbol: 'WAVAX', decimals: 18 },
  { address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', name: 'usdc', symbol: 'USCD', decimals: 6 },
  { address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70', name: 'dai', symbol: 'DAI', decimals: 18 },
  { address: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9', name: 'aave', symbol: 'AAVE', decimals: 18 },
]

// interface TokenObject {
//   address: string
//   decimals: number
//   symbol?: string
//   name?: string
// }

export function useGetToken(
  // tokenObject: TokenObject|undefined
  tokenObject: any
): Token | undefined {
  return useMemo(
    () =>
      tokenObject
        ? new Token(
            ChainId.AVALANCHE,
            tokenObject.address,
            tokenObject.decimals,
            tokenObject.symbol ?? '',
            tokenObject.name ?? ''
          )
        : undefined,
    [tokenObject]
  )
}

export function useGetPairs(tokenA: Token | undefined, tokenB: Token | undefined, useHops = true): Pair[] {
  const { provider } = useWeb3React()
  const [pairs, setPairs] = useState<Pair[]>([])

  const getPairsCallback = useCallback(async () => {
    if (!provider || !tokenA || !tokenB) return

    // direct pair
    const pairsPromises = [getPair(provider, tokenA, tokenB)]

    if (useHops) {
      // convert hop assets to token objects
      const hopTokens = swapHopAssets.map(
        (asset) => new Token(ChainId.AVALANCHE, asset.address, asset.decimals, asset.symbol ?? '', asset.name ?? '')
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
  }, [provider, tokenA, tokenB, useHops])

  useEffect(() => {
    getPairsCallback()
  }, [getPairsCallback, provider, tokenA, tokenB])

  return pairs
}

export function useGetBestTrade(
  tokenA: Token | undefined,
  tokenB: Token | undefined,
  inputAmountString: BigintIsh | undefined,
  maxHops = 2
): Trade | undefined {
  const pairs = useGetPairs(tokenA, tokenB)

  return useMemo(() => {
    if (!inputAmountString || !tokenA || !tokenB || pairs.length === 0) return undefined

    const trades = Trade.bestTradeExactIn(pairs, new TokenAmount(tokenA, inputAmountString), tokenB, { maxHops })

    if (trades.length === 0) return undefined

    // console.log(`trades: ${trades.map(tr => '[' + tr.route.path.map(t => t.symbol) + ' = ' + tr.outputAmount.toExact() + ']')}`)
    // console.log(`best trade route: ${trades[0].route.path.map(t => t.symbol)}`)

    return trades[0]
  }, [inputAmountString, tokenA, tokenB, pairs, maxHops])
}

async function getPair(provider: any, tokenA: Token, tokenB: Token): Promise<Pair | undefined> {
  const pairAddress = Pair.getAddress(tokenA, tokenB, ChainId.AVALANCHE)
  const uniV2PairContract = new Contract(pairAddress, uniswapV2Pair.abi, provider)
  try {
    const reserves = await uniV2PairContract.getReserves()
    const token0Address = await uniV2PairContract.token0()
    const reserve0 = token0Address === tokenA.address ? reserves.reserve0.toString() : reserves.reserve1.toString()
    const reserve1 = token0Address === tokenA.address ? reserves.reserve1.toString() : reserves.reserve0.toString()
    const pair = new Pair(new TokenAmount(tokenA, reserve0), new TokenAmount(tokenB, reserve1), ChainId.AVALANCHE)
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
//       ChainId.AVALANCHE
//     )
//     return trade
//   } catch (e) {
//     return undefined
//   }
// }
