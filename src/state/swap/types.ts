import { Currency, CurrencyAmount, TradeType } from '@uniswap/sdk-core'
import { InterfaceTrade, TradeState } from 'state/routing/types'

export type tradeHookInput = {
  tradeType: TradeType
  amountSpecified?: CurrencyAmount<Currency>
  otherCurrency?: Currency
}

export type tradeHookOutput = {
  state: TradeState
  trade: InterfaceTrade<Currency, Currency, TradeType> | undefined
}
