// import { CallStateResult } from 'lib/hooks/multicall'
import { CallState } from '@uniswap/redux-multicall'
import { useWeb3React } from '@web3-react/core'
import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react'

export interface IPortfolioBalancesContext {
  portfolioBalances: CallState[] // CallStateResult
  updateBalances: (addresses: string[]) => void
}

const PortfolioBalancesContext = createContext<IPortfolioBalancesContext>({
  portfolioBalances: [],
  updateBalances: () => {
    // update the balances
  },
})

const PortfolioBalances: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const { connector, chainId } = useWeb3React()

  useEffect(() => {
    console.log('PortfolioBalances')
  }, [])

  // const [isLoading, setIsLoading] = useState(true)
  const [portfolioBalances, setBalances] = useState<CallState[]>([])
  const updateBalances = useCallback(
    (addresses: string[]) => {
      console.log('updateBalances', addresses)
      // update balances here
    },
    [connector, chainId]
  )

  return (
    <PortfolioBalancesContext.Provider value={{ portfolioBalances, updateBalances }}>
      {children}
    </PortfolioBalancesContext.Provider>
  )
}

const usePortfolioBalances = () => useContext(PortfolioBalancesContext)

export { PortfolioBalances, PortfolioBalancesContext, usePortfolioBalances }
