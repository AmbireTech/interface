import { Contract } from '@ethersproject/contracts'
import { Percent as V2Percent } from '@uniswap/sdk-core'
import uniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import {
  AmountObject,
  CurrencyObject,
  PairObject,
  SwapParametersObject,
  TokenObject,
  TradeObject,
  TradeOptionsObject,
} from 'hooks/customNetwork/types'

export abstract class UniV2CustomLibrary {
  async fetchPair(provider: any, tokenA: TokenObject, tokenB: TokenObject): Promise<PairObject | undefined> {
    const pairAddress = this.getPairAddress(tokenA, tokenB)
    const uniV2PairContract = new Contract(pairAddress, uniswapV2Pair.abi, provider)

    try {
      const reserves = await uniV2PairContract.getReserves()
      const token0Address = await uniV2PairContract.token0()
      const reserve0 = token0Address === tokenA.address ? reserves.reserve0.toString() : reserves.reserve1.toString()
      const reserve1 = token0Address === tokenA.address ? reserves.reserve1.toString() : reserves.reserve0.toString()
      return this.getPair(tokenA, tokenB, reserve0, reserve1)
    } catch (e) {
      return undefined
    }
  }

  fetchPairsWithHops(
    provider: any,
    passedTokens: TokenObject[],
    hopTokens: TokenObject[],
    prevHop: TokenObject | null,
    currentHop: number,
    maxHops: number,
    pairsPromises: Promise<PairObject | undefined>[]
  ): Promise<PairObject | undefined>[] {
    hopTokens.map(async (newHop) => {
      const sameAddress = passedTokens.filter((passedToken) => passedToken.address === newHop.address).length
      if (sameAddress) {
        return
      }

      if (prevHop === null) {
        pairsPromises.push(this.fetchPair(provider, passedTokens[0], newHop))
        pairsPromises.push(this.fetchPair(provider, newHop, passedTokens[1]))
      } else {
        pairsPromises.push(this.fetchPair(provider, prevHop, newHop))
      }

      passedTokens.push(newHop)

      if (currentHop < maxHops) {
        this.fetchPairsWithHops(provider, passedTokens, hopTokens, newHop, currentHop++, maxHops, pairsPromises)
        passedTokens.pop()
      }
    })

    return pairsPromises
  }

  abstract getNativeCurrency(): CurrencyObject
  abstract getToken(address: string, decimals: number, symbol?: string, name?: string): TokenObject
  abstract getPairAddress(tokenA: TokenObject, tokenB: TokenObject): string
  abstract getPair(tokenA: TokenObject, tokenB: TokenObject, reserve0: string, reserve1: string): PairObject
  abstract getAmount(tokenOrCurrency: TokenObject | CurrencyObject, amountString: string): AmountObject
  abstract getBestTradesExactIn(
    pairs: PairObject[],
    inputAmount: AmountObject,
    output: TokenObject | CurrencyObject,
    options: { maxHops?: number }
  ): TradeObject[]
  abstract getBestTradesExactOut(
    pairs: PairObject[],
    input: TokenObject | CurrencyObject,
    outputAmount: AmountObject,
    options: { maxHops?: number }
  ): TradeObject[]
  abstract getSwapCallParameters(trade: TradeObject, options: TradeOptionsObject): SwapParametersObject
  abstract getRouterCalldata(methodName: string, args: (string | string[])[]): string
  abstract getTradeMaxAmountIn(trade: TradeObject, slippage: V2Percent): AmountObject
  abstract isTradeInputToken(trade: TradeObject): boolean
}
