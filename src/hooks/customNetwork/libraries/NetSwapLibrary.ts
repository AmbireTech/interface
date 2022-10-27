import { Interface } from '@ethersproject/abi'
import { ChainId, Currency, CurrencyAmount, Pair, Percent, Router, Token, TokenAmount, Trade } from '@netswap/sdk'
import { Percent as V2Percent } from '@uniswap/sdk-core'
import ROUTER_ABI from 'abis/netswap-router.json'
import { UniV2CustomLibrary } from 'hooks/customNetwork/libraries/UniV2CustomLibrary'
import {
  AmountObject,
  CurrencyObject,
  PairObject,
  SwapParametersObject,
  TokenObject,
  TradeObject,
  TradeOptionsObject,
} from 'hooks/customNetwork/types'

export class NetSwapLibrary extends UniV2CustomLibrary {
  _convertPercent(percent: V2Percent): Percent {
    return new Percent(percent.numerator.toString(), percent.denominator.toString())
  }

  getNativeCurrency(): CurrencyObject {
    return Currency.METIS
  }

  getToken(address: string, decimals: number, symbol?: string | undefined, name?: string | undefined): TokenObject {
    return new Token(ChainId.MAINNET, address, decimals, symbol ?? '', name ?? '')
  }

  getPair(tokenA: Token, tokenB: Token, reserve0: string, reserve1: string): PairObject {
    return new Pair(new TokenAmount(tokenA as Token, reserve0), new TokenAmount(tokenB as Token, reserve1))
  }

  getPairAddress(tokenA: TokenObject, tokenB: TokenObject): string {
    return Pair.getAddress(tokenA as Token, tokenB as Token)
  }

  getAmount(tokenOrCurrency: TokenObject | CurrencyObject, amountString: string): AmountObject {
    return tokenOrCurrency instanceof Token
      ? new TokenAmount(tokenOrCurrency, amountString)
      : CurrencyAmount.ether(amountString)
  }

  getBestTradesExactIn(
    pairs: PairObject[],
    inputAmount: AmountObject,
    output: TokenObject | CurrencyObject,
    options: { maxHops?: number }
  ): TradeObject[] {
    return Trade.bestTradeExactIn(pairs as Pair[], inputAmount as CurrencyAmount, output, options)
  }

  getBestTradesExactOut(
    pairs: PairObject[],
    input: TokenObject | CurrencyObject,
    outputAmount: AmountObject,
    options: { maxHops?: number }
  ): TradeObject[] {
    return Trade.bestTradeExactOut(pairs as Pair[], input, outputAmount as CurrencyAmount, options)
  }

  getSwapCallParameters(trade: TradeObject, options: TradeOptionsObject): SwapParametersObject {
    return Router.swapCallParameters(trade as Trade, {
      // fee: feeOptions,
      recipient: options.recipient,
      allowedSlippage: this._convertPercent(options.allowedSlippage),
      ttl: options.ttl,
    })
  }

  getRouterCalldata(methodName: string, args: (string | string[])[]): string {
    const NetSwapRouterInterface = new Interface(ROUTER_ABI)
    return NetSwapRouterInterface.encodeFunctionData(methodName, args)
  }

  getTradeMaxAmountIn(trade: TradeObject, slippage: V2Percent): AmountObject {
    const NetSwapTrade = trade as Trade
    return NetSwapTrade.maximumAmountIn(this._convertPercent(slippage))
  }

  isTradeInputToken(trade: TradeObject): boolean {
    const NetSwapTrade = trade as Trade
    return NetSwapTrade.inputAmount instanceof TokenAmount && Boolean(NetSwapTrade.inputAmount.token?.address)
  }
}
