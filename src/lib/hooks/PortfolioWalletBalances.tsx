// import { CallStateResult } from 'lib/hooks/multicall'
import { CallState } from '@uniswap/redux-multicall'
import { useWeb3React } from '@web3-react/core'
import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from 'react'

export interface IPortfolioBalancesContext {
  getPortfolioBalances: (tokensAddresses: string[], address?: string) => Array<CallState>
}

const PortfolioBalancesContext = createContext<IPortfolioBalancesContext>({
  getPortfolioBalances: () => [],
})

const PortfolioBalances: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const { connector, chainId } = useWeb3React()
  const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   console.log('PortfolioBalances')
  // }, [])

  // const [isLoading, setIsLoading] = useState(true)
  // { address: { chainId: { [tokenAddr]: 'stringBalance' } }  }
  const [portfolioBalances, setPortfolioBalances] = useState<{
    [key: string]: { [key: number]: { [key: string]: { loading: boolean; syncing: boolean; balance: string } } }
  }>({})

  const updatePortfolioBalances = useCallback(
    (addresses: string[], address?: string) => {
      // console.log('updatePortfolioBalances')
      if (!addresses.length || !address || !chainId) {
        return
      }

      const getBalances = async (currentBalances: {
        [key: string]: { [key: number]: { [key: string]: { loading: boolean; syncing: boolean; balance: string } } }
      }) => {
        // @ts-ignore: Unreachable code error
        const newAddresses = [...addresses].filter(
          (x) =>
            !currentBalances[address]?.[chainId]?.[x]?.loading && !currentBalances[address]?.[chainId]?.[x]?.syncing
        )

        console.log({ newAddresses })
        if (!newAddresses.length) {
          return
        }

        // Set em
        setPortfolioBalances((prevBalances) => {
          const newBalances = { ...prevBalances }
          newBalances[address] = { ...(newBalances[address] || {}) }
          newBalances[address][chainId] = { ...(newBalances[address][chainId] || {}) }

          newAddresses.forEach((element) => {
            newBalances[address][chainId][element] = newBalances[address][chainId][element] || {
              loading: true,
              syncing: true,
              balance: '0',
            }
          })

          return newBalances
        })

        // Add them now

        // @ts-ignore: Unreachable code error
        const res = await connector?.sdk?.safe?.experimental_getBalances({ currency: addresses })
        // console.log('updatePortfolioBalances res', res?.items || [], addresses)
        // TODO: check the adders or update the balances with the current safe address
        // TODO: update balances func
        // setPortfolioBalances({})
        setIsLoading(false)
      }

      setPortfolioBalances((currentBalances) => {
        getBalances(currentBalances)
        return currentBalances
      })
    },
    // @ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chainId]
  )

  const getPortfolioBalances = useCallback(
    (addresses: string[], address?: string) => {
      if (address && chainId) {
        updatePortfolioBalances(addresses, address)
        return addresses.map(([tokenAddr]) => {
          const value = portfolioBalances[address]?.[chainId]?.[tokenAddr]
          const hasBalance = value !== undefined

          return {
            valid: true,
            result: hasBalance ? [value.balance] : [], // TODO; match the result
            loading: value?.loading,
            syncing: value?.syncing,
            error: false,
          }
        })
      } else {
        return []
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // @ts-ignore
    [chainId, portfolioBalances, updatePortfolioBalances]
    // [isLoading]
  )

  return (
    <PortfolioBalancesContext.Provider value={{ getPortfolioBalances }}>{children}</PortfolioBalancesContext.Provider>
  )
}

const usePortfolioBalances = () => useContext(PortfolioBalancesContext)

export { PortfolioBalances, PortfolioBalancesContext, usePortfolioBalances }
