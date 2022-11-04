// import { CallStateResult } from 'lib/hooks/multicall'
import { CallState } from '@uniswap/redux-multicall'
import { useWeb3React } from '@web3-react/core'
import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react'

export interface IPortfolioBalancesContext {
  portfolioBalances: Array<CallState> // CallStateResult
  getPortfolioBalances: (addresses: string[]) => Array<CallState>
}

const PortfolioBalancesContext = createContext<IPortfolioBalancesContext>({
  portfolioBalances: [],
  getPortfolioBalances: () => [],
})

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

const PortfolioBalances: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const { connector, chainId } = useWeb3React()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('PortfolioBalances')
  }, [])

  // const [isLoading, setIsLoading] = useState(true)
  const [portfolioBalances, setPortfolioBalances] = useState<CallState[]>([])
  const getPortfolioBalances = useCallback(
    (addresses: string[]) => {
      console.log('addresses call', addresses)
      setIsLoading(true)
      setPortfolioBalances(toSingleDataResult(addresses || [], true))

      const getBalances = async () => {
        // @ts-ignore: Unreachable code error
        const res = await connector?.sdk?.safe?.experimental_getBalances(addresses)
        console.log('addresses res', res?.items || [], addresses)
        setPortfolioBalances(toSingleDataResult([], isLoading))
        setIsLoading(false)
      }

      getBalances()
      return portfolioBalances
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore
    [portfolioBalances, connector?.sdk?.safe, chainId]
  )

  return (
    <PortfolioBalancesContext.Provider value={{ portfolioBalances, getPortfolioBalances }}>
      {children}
    </PortfolioBalancesContext.Provider>
  )
}

const usePortfolioBalances = () => useContext(PortfolioBalancesContext)

export { PortfolioBalances, PortfolioBalancesContext, usePortfolioBalances }
