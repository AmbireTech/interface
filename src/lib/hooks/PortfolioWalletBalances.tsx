// import { CallStateResult } from 'lib/hooks/multicall'
import { CallState } from '@uniswap/redux-multicall'
import { useWeb3React } from '@web3-react/core'
import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react'

export interface IPortfolioBalancesContext {
  // portfolioBalances: Array<CallState> // CallStateResult
  updatePortfolioBalances: (tokensAddresses: string[], address?: string) => void
  getPortfolioBalances: (tokensAddresses: string[], address?: string) => Array<CallState>
}

const PortfolioBalancesContext = createContext<IPortfolioBalancesContext>({
  updatePortfolioBalances: () => {
    // banana
  },
  getPortfolioBalances: () => [],
})

const PortfolioBalances: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const { connector, chainId } = useWeb3React()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('PortfolioBalances')
  }, [])

  // const [isLoading, setIsLoading] = useState(true)
  // { address: { chainId: { [tokenAddr]: 'stringBalance' } }  }
  const [portfolioBalances, setPortfolioBalances] = useState<{
    [key: string]: { [key: number]: { [key: string]: string } }
  }>({})

  const updatePortfolioBalances = useCallback(
    (addresses: string[], address?: string) => {
      const getBalances = async () => {
        // @ts-ignore: Unreachable code error

        const res = await connector?.sdk?.safe?.experimental_getBalances(addresses)
        console.log('updatePortfolioBalances res', res?.items || [], addresses)

        // TODO: check the adders or update the balances with the current safe address
        // TODO: update balances func
        setPortfolioBalances({})
        setIsLoading(false)
      }
      getBalances()
    },
    // @ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [connector?.sdk?.safe?.isServer, chainId]
  )

  const getPortfolioBalances = useCallback(
    (addresses: string[], address?: string) => {
      if (address && chainId) {
        return addresses.map(([tokenAddr]) => {
          const balance = portfolioBalances[address][chainId][tokenAddr]
          const hasBalance = balance !== undefined
          return {
            valid: true,
            result: hasBalance ? [balance] : [], // TODO; match the result
            loading: !hasBalance,
            syncing: !hasBalance,
            error: false,
          }
        })
      } else {
        return []
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore
    [chainId, portfolioBalances]
    // [isLoading]
  )

  return (
    <PortfolioBalancesContext.Provider value={{ getPortfolioBalances, updatePortfolioBalances }}>
      {children}
    </PortfolioBalancesContext.Provider>
  )
}

const usePortfolioBalances = () => useContext(PortfolioBalancesContext)

export { PortfolioBalances, PortfolioBalancesContext, usePortfolioBalances }
