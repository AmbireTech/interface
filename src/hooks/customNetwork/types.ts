import { Percent as V2Percent, TradeType } from '@uniswap/sdk-core'

export interface CurrencyObject {
  decimals: number
  symbol?: string
  name?: string
}

export interface TokenObject {
  address: string
  decimals: number
  symbol?: string
  name?: string
}

export interface PairObject {
  token0: TokenObject
  token1: TokenObject
  reserve0: AmountObject
  reserve1: AmountObject
}

export interface RouteObject {
  input: CurrencyObject
  output: CurrencyObject
  pairs: PairObject[]
  path: TokenObject[]
}

export interface TradeObject {
  tradeType: TradeType
  inputAmount: AmountObject
  outputAmount: AmountObject
  route: RouteObject
}

export interface AmountObject {
  toExact(format?: Record<string, unknown>): string
}

export interface SwapParametersObject {
  methodName: string
  args: (string | string[])[]
  value: string
}

export interface TradeOptionsObject {
  allowedSlippage: V2Percent
  ttl: number
  recipient: string
  feeOnTransfer?: boolean
}
