import { Interface } from '@ethersproject/abi'
import { CallState } from '@uniswap/redux-multicall'
import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import ERC20ABI from 'abis/erc20.json'
import { Erc20Interface } from 'abis/types/Erc20'
import JSBI from 'jsbi'
import { CallStateResult, useMultipleContractSingleData, useSingleContractMultipleData } from 'lib/hooks/multicall'
import { useEffect, useMemo, useState } from 'react' // re-export for convenience

import { nativeOnChain } from '../../constants/tokens'
import { useInterfaceMulticall } from '../../hooks/useContract'
import { isAddress } from '../../utils'
export type { CallState } from '@uniswap/redux-multicall'

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useNativeCurrencyBalances(uncheckedAddresses?: (string | undefined)[]): {
  [address: string]: CurrencyAmount<Currency> | undefined
} {
  const { chainId } = useWeb3React()
  const multicallContract = useInterfaceMulticall()

  const validAddressInputs: [string][] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
            .map((addr) => [addr])
        : [],
    [uncheckedAddresses]
  )

  const results = useSingleContractMultipleData(multicallContract, 'getEthBalance', validAddressInputs)

  return useMemo(() => {
    console.log('useNativeCurrencyBalances', chainId)
    return validAddressInputs.reduce<{ [address: string]: CurrencyAmount<Currency> }>((memo, [address], i) => {
      const value = results?.[i]?.result?.[0]
      if (value && chainId)
        memo[address] = CurrencyAmount.fromRawAmount(nativeOnChain(chainId), JSBI.BigInt(value.toString()))
      return memo
    }, {})
  }, [validAddressInputs, chainId, results])
}

const ERC20Interface = new Interface(ERC20ABI) as Erc20Interface
const tokenBalancesGasRequirement = { gasRequired: 185_000 }

// TODO: addresses - strings ot currency balances results
function toSingleDataResult(addresses: string[], isLoading: boolean): CallState[] {
  const balances: CallState[] = addresses.map((addr) => {
    return {
      valid: true,
      result: [addr], // TODO; match the result
      loading: isLoading,
      syncing: isLoading,
      error: false,
    }
  })

  return balances
}

function useGnosisTokenBalances(addresses: string[]): CallState[] {
  const { connector } = useWeb3React()
  const [isLoading, setIsLoading] = useState(true)
  const [balancesResults, setBalancesResults] = useState<CallState[]>([])

  const gnAddresses = useMemo(() => addresses, [addresses])

  useEffect(() => {
    console.log('addresses kor')
  }, [])

  // TODO: memo, syncing etc..
  useEffect(() => {
    console.log('addresses call', addresses)
    setIsLoading(true)
    setBalancesResults(toSingleDataResult(addresses || [], true))

    const getBalances = async () => {
      // @ts-ignore: Unreachable code error
      const res = await connector?.sdk?.safe?.experimental_getBalances(addresses)
      console.log('addresses res', res?.items || [], addresses)
      setBalancesResults(toSingleDataResult([], true))
      setIsLoading(false)
    }

    getBalances()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gnAddresses])

  return balancesResults
}

function useGetTokenBalanceWithEstimation(addresses: string[], address?: string): CallStateResult {
  const gnBalances = useGnosisTokenBalances(useMemo(() => addresses, [addresses]))

  const balances = useMultipleContractSingleData(
    addresses,
    ERC20Interface,
    'balanceOf',
    useMemo(() => [address], [address]),
    tokenBalancesGasRequirement
  )

  // TODO: concat and dedup gnosis balances and multcall balances
  return balances.concat(gnBalances)
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[]
): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] {
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false) ?? [],
    [tokens]
  )
  const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt.address), [validatedTokens])

  const balances = useGetTokenBalanceWithEstimation(validatedTokenAddresses, address)

  const anyLoading: boolean = useMemo(() => balances.some((callState) => callState.loading), [balances])

  return useMemo(
    () => [
      address && validatedTokens.length > 0
        ? validatedTokens.reduce<{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }>((memo, token, i) => {
            const value = balances?.[i]?.result?.[0]
            const amount = value ? JSBI.BigInt(value.toString()) : undefined
            if (amount) {
              memo[token.address] = CurrencyAmount.fromRawAmount(token, amount)
            }
            return memo
          }, {})
        : {},
      anyLoading,
    ],
    [address, validatedTokens, anyLoading, balances]
  )
}

export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[]
): { [tokenAddress: string]: CurrencyAmount<Token> | undefined } {
  useEffect(() => {
    console.log('useTokenBalances kor')
  }, [])

  useEffect(() => {
    console.log('useTokenBalances address', address)
  }, [address])

  return useTokenBalancesWithLoadingIndicator(address, tokens)[0]
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): CurrencyAmount<Token> | undefined {
  const tokenBalances = useTokenBalances(
    account,
    useMemo(() => [token], [token])
  )
  if (!token) return undefined
  return tokenBalances[token.address]
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[]
): (CurrencyAmount<Currency> | undefined)[] {
  const tokens = useMemo(
    () => currencies?.filter((currency): currency is Token => currency?.isToken ?? false) ?? [],
    [currencies]
  )

  const tokenBalances = useTokenBalances(account, tokens)
  const containsETH: boolean = useMemo(() => currencies?.some((currency) => currency?.isNative) ?? false, [currencies])
  const ethBalance = useNativeCurrencyBalances(useMemo(() => (containsETH ? [account] : []), [containsETH, account]))

  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!account || !currency) return undefined
        if (currency.isToken) return tokenBalances[currency.address]
        if (currency.isNative) return ethBalance[account]
        return undefined
      }) ?? [],
    [account, currencies, ethBalance, tokenBalances]
  )
}

export default function useCurrencyBalance(
  account?: string,
  currency?: Currency
): CurrencyAmount<Currency> | undefined {
  return useCurrencyBalances(
    account,
    useMemo(() => [currency], [currency])
  )[0]
}

export function useCurrencyBalanceString(account: string): string {
  return useNativeCurrencyBalances(account ? [account] : [])?.[account ?? '']?.toSignificant(3) ?? ''
}
