// import { CallStateResult } from 'lib/hooks/multicall'
import { BigNumber } from '@ethersproject/bignumber'
import { CallState, CallStateResult } from '@uniswap/redux-multicall'
import { useWeb3React } from '@web3-react/core'
import { createContext, FC, PropsWithChildren, useCallback, useContext, useRef } from 'react'

export interface IPortfolioBalancesContext {
  getPortfolioBalances: (tokensAddresses: string[], address?: string) => Array<CallState>
}

const PortfolioBalancesContext = createContext<IPortfolioBalancesContext>({
  getPortfolioBalances: () => [],
})

type PortfolioBalancesState = {
  [address: string]: {
    [chainId: number]: { [tokenAddr: string]: { loading: boolean; syncing: boolean; balance?: string } }
  }
}

const PortfolioBalances: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const { connector, chainId } = useWeb3React()
  const isLoading = useRef(false)

  const portfolioBalances = useRef<PortfolioBalancesState>({})

  const updatePortfolioBalances = useCallback((addresses: string[], address: string, chainId: number) => {
    const update = async () => {
      try {
        // @ts-ignore: Unreachable code error
        const res = await connector?.sdk?.safe?.experimental_getBalances({ currency: addresses })

        const withBalances = res.filter((x: { balance?: undefined }) => x?.balance !== undefined)

        const currentBalances = portfolioBalances.current

        const updatedBalances = { ...currentBalances }
        updatedBalances[address] = { ...(updatedBalances[address] || {}) }
        updatedBalances[address][chainId] = { ...(updatedBalances[address][chainId] || {}) }

        // @ts-ignore: Unreachable code error
        withBalances.forEach(({ address: tokenAddr, balance }) => {
          updatedBalances[address][chainId][tokenAddr] = {
            loading: false,
            syncing: false,
            balance,
          }
        })

        portfolioBalances.current = updatedBalances
      } catch (err) {
        console.log('error', err)
        isLoading.current = false
      }
    }

    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPortfolioBalances = useCallback(
    (addresses: string[], address?: string) => {
      // TODO: optimize loading and syncing props
      if (addresses.length && address && chainId) {
        isLoading.current = true
        updatePortfolioBalances(addresses, address, chainId)
      }

      return [...addresses].map((tokenAddr) => {
        const value = address && chainId ? portfolioBalances?.current?.[address]?.[chainId]?.[tokenAddr] : undefined
        const balance = BigNumber.from(value?.balance || '0')
        const balanceResult = [balance]
        // @ts-ignore: Unreachable code error
        balanceResult.balance = balance
        const result: CallStateResult | undefined = value ? balanceResult : undefined

        return {
          error: false,
          loading: false, // value?.balance === undefined,
          result,
          syncing: false, //value?.balance === undefined,
          valid: true, //value?.balance !== undefined || isLoading.current,
        }
      })
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chainId]
  )

  return (
    <PortfolioBalancesContext.Provider value={{ getPortfolioBalances }}>{children}</PortfolioBalancesContext.Provider>
  )
}

const usePortfolioBalances = () => useContext(PortfolioBalancesContext)

export { PortfolioBalances, PortfolioBalancesContext, usePortfolioBalances }
