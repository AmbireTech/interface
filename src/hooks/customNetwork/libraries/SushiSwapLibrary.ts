import { Interface } from '@ethersproject/abi'
import {
  ChainId,
  Currency,
  CurrencyAmount,
  Fantom,
  Movr,
  Pair,
  Percent,
  Router,
  Token,
  Trade,
  TradeType,
  xDai,
} from '@sushiswap/sdk'
import { Percent as V2Percent } from '@uniswap/sdk-core'
import ROUTER_ABI from 'abis/pancake-beamswap-sushi-router.json'
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

export class SushiSwapLibrary extends UniV2CustomLibrary {
  private chainId

  constructor(chainId: ChainId) {
    super()
    this.chainId = chainId
  }

  _convertPercent(percent: V2Percent): Percent {
    return new Percent(percent.numerator.toString(), percent.denominator.toString())
  }

  getNativeCurrency(): CurrencyObject {
    if (this.chainId === ChainId.FANTOM) {
      return Fantom.onChain(ChainId.FANTOM)
    }
    if (this.chainId === ChainId.XDAI) {
      return xDai.onChain(ChainId.XDAI)
    }

    return Movr.onChain(ChainId.MOONRIVER)
  }

  getToken(address: string, decimals: number, symbol?: string | undefined, name?: string | undefined): TokenObject {
    return new Token(this.chainId, address, decimals, symbol ?? '', name ?? '')
  }

  getPair(tokenA: Token, tokenB: Token, reserve0: string, reserve1: string): PairObject {
    return new Pair(
      CurrencyAmount.fromRawAmount(tokenA as Token, reserve0),
      CurrencyAmount.fromRawAmount(tokenB as Token, reserve1)
    )
  }

  getPairAddress(tokenA: TokenObject, tokenB: TokenObject): string {
    return Pair.getAddress(tokenA as Token, tokenB as Token)
  }

  getAmount(tokenOrCurrency: TokenObject | CurrencyObject, amountString: string): AmountObject {
    // TO DO: CHECK IF HERE IS OKAY
    return CurrencyAmount.fromRawAmount(tokenOrCurrency as Currency, amountString)
  }

  getBestTradesExactIn(
    pairs: PairObject[],
    inputAmount: AmountObject,
    output: TokenObject | CurrencyObject,
    options: { maxHops?: number }
  ): TradeObject[] {
    return Trade.bestTradeExactIn(pairs as Pair[], inputAmount as CurrencyAmount<Currency>, output as Currency, options)
  }

  getBestTradesExactOut(
    pairs: PairObject[],
    input: TokenObject | CurrencyObject,
    outputAmount: AmountObject,
    options: { maxHops?: number }
  ): TradeObject[] {
    return Trade.bestTradeExactOut(
      pairs as Pair[],
      input as Currency,
      outputAmount as CurrencyAmount<Currency>,
      options
    )
  }

  getSwapCallParameters(trade: TradeObject, options: TradeOptionsObject): SwapParametersObject {
    return Router.swapCallParameters(trade as Trade<Currency, Currency, TradeType>, {
      // fee: feeOptions,
      recipient: options.recipient,
      allowedSlippage: this._convertPercent(options.allowedSlippage),
      ttl: options.ttl,
    })
  }

  getRouterCalldata(methodName: string, args: (string | string[])[]): string {
    const sushiRouterInterface = new Interface(ROUTER_ABI)
    return sushiRouterInterface.encodeFunctionData(methodName, args)
  }

  getTradeMaxAmountIn(trade: TradeObject, slippage: V2Percent): AmountObject {
    const sushiTrade = trade as Trade<Currency, Currency, TradeType>
    return sushiTrade.maximumAmountIn(this._convertPercent(slippage))
  }

  isTradeInputToken(trade: TradeObject): boolean {
    const sushiTrade = trade as Trade<Currency, Currency, TradeType>
    // TO DO: check if we're checking this address correctly
    const address = sushiTrade.inputAmount.currency instanceof Token ? sushiTrade.inputAmount.currency.address : null
    return sushiTrade.inputAmount instanceof CurrencyAmount && Boolean(address)
  }
}
