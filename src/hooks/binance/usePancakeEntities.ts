import { Contract } from '@ethersproject/contracts'
import { BigintIsh, ChainId, Pair, Route, Token, TokenAmount, Trade, TradeType } from '@pancakeswap/sdk'
import uniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useWeb3React } from '@web3-react/core'
import { WRAPPED_NATIVE_CURRENCY } from 'constants/tokens'
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
            ChainId.MAINNET,
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

    // we do not make a pair if the tokens are native and wrapped
    if (
      (inputCurrency.address === WRAPPED_NATIVE_CURRENCY[ChainId.MAINNET]?.address &&
        outputCurrency.address === WRAPPED_NATIVE_CURRENCY[ChainId.MAINNET]?.address) ||
      (outputCurrency.address === WRAPPED_NATIVE_CURRENCY[ChainId.MAINNET]?.address &&
        inputCurrency.address === WRAPPED_NATIVE_CURRENCY[ChainId.MAINNET]?.address)
    ) {
      setPair(undefined)
      return
    }

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

function getTrade(pairs: any, tokenA: any, tokenB: any, value: any) {
  try {
    const route = new Route(pairs, tokenA, tokenB)
    const trade = new Trade(route, new TokenAmount(tokenA, value), TradeType.EXACT_INPUT)
    return trade
  } catch (e) {
    return undefined
  }
}
