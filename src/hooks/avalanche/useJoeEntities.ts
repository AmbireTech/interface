import { Contract } from '@ethersproject/contracts'
import { BigintIsh, ChainId, Pair, Route, Token, TokenAmount, Trade, TradeType } from '@traderjoe-xyz/sdk'
import uniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useMemo, useState } from 'react'

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

export function useGetPair(inputCurrency: Token | undefined, outputCurrency: Token | undefined): Pair | undefined {
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

export function useGetTrade(
  tokenA: Token | undefined,
  tokenB: Token | undefined,
  inputAmountString: BigintIsh | undefined
): Trade | undefined {
  // TODO: get all intermediate pair via pre-defined stable tokens
  const pair = useGetPair(tokenA, tokenB)

  return useMemo(
    () =>
      inputAmountString && tokenA && tokenB && pair ? getTrade([pair], tokenA, tokenB, inputAmountString) : undefined,
    [inputAmountString, tokenA, tokenB, pair]
  )
}

async function getPair(provider: any, tokenA: Token, tokenB: Token) {
  // const tokenA = new Token(ChainId.AVALANCHE, from.address, from.decimals, from.symbol, from.name)
  // const tokenB = new Token(ChainId.AVALANCHE, to.address, to.decimals, to.symbol, to.name)
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
