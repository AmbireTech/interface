import { parseUnits } from '@ethersproject/units'

export function convertDecimalToActualAmount(decimalAmount: string, currency: any): string {
  return parseUnits(decimalAmount, currency?.decimals ?? 18).toString()
}