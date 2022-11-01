// import { CallStateResult } from 'lib/hooks/multicall'
import { CallState } from '@uniswap/redux-multicall'
import { useWeb3React } from '@web3-react/core'
import { createContext, FC, PropsWithChildren, useContext, useState } from 'react'

export interface IWalletBalancesContext {
  balances: CallState[] // CallStateResult
}

const WalletBalancesContext = createContext<IWalletBalancesContext>({ balances: [] })

const WalletBalances: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const { connector } = useWeb3React()
  // const [isLoading, setIsLoading] = useState(true)
  const [balances, setBalances] = useState<CallState[]>([])

  return <WalletBalancesContext.Provider value={{ balances }}>{children}</WalletBalancesContext.Provider>
}

const useWalletBalances = () => useContext(WalletBalancesContext)

export { useWalletBalances, WalletBalances, WalletBalancesContext }
