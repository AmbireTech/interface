// import { CallStateResult } from 'lib/hooks/multicall'
import { BigNumber } from '@ethersproject/bignumber'
import { CallState } from '@uniswap/redux-multicall'
import { useWeb3React } from '@web3-react/core'
import { createContext, FC, PropsWithChildren, useCallback, useContext, useRef, useState } from 'react'

export interface IPortfolioBalancesContext {
  getPortfolioBalances: (tokensAddresses: string[], address?: string) => Array<CallState>
}

const PortfolioBalancesContext = createContext<IPortfolioBalancesContext>({
  getPortfolioBalances: () => [],
})

const PortfolioBalances: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const { connector, chainId } = useWeb3React()
  const isLoading = useRef(false)

  // useEffect(() => {
  //   console.log('PortfolioBalances')
  // }, [])

  // const [isLoading, setIsLoading] = useState(true)
  // { address: { chainId: { [tokenAddr]: 'stringBalance' } }  }
  const [portfolioBalances, setPortfolioBalances] = useState<{
    [address: string]: {
      [chainId: number]: { [tokenAddr: string]: { loading: boolean; syncing: boolean; balance?: string } }
    }
  }>({})

  const updatePortfolioBalances = useCallback(
    (addresses: string[], address?: string) => {
      console.log('updatePortfolioBalances', isLoading)
      if (isLoading.current || !addresses.length || !address || !chainId) {
        return
      }

      isLoading.current = true

      console.log('updatePortfolioBalances 2', isLoading)

      const getBalances = async (newBalances: {
        [address: string]: {
          [chainId: number]: { [tokenAddr: string]: { loading: boolean; syncing: boolean; balance?: string } }
        }
      }) => {
        // setPortfolioBalances(newBalances)

        // // Set em
        // setPortfolioBalances((prevBalances) => {
        //   const newBalances = { ...prevBalances }
        //   newBalances[address] = { ...(newBalances[address] || {}) }
        //   newBalances[address][chainId] = { ...(newBalances[address][chainId] || {}) }

        //   newAddresses.forEach((element) => {
        //     newBalances[address][chainId][element] = newBalances[address][chainId][element] || {
        //       loading: true,
        //       syncing: true,
        //       balance: '0',
        //     }
        //   })

        //   return newBalances
        // })

        // Add them now

        try {
          // @ts-ignore: Unreachable code error
          const res = await connector?.sdk?.safe?.experimental_getBalances({ currency: addresses })

          const withBalances = res.filter((x: { balance?: undefined }) => x?.balance !== undefined)

          const updatedBalances = { ...newBalances }
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

          updatedBalances[address][chainId] = Object.fromEntries(
            Object.entries(updatedBalances[address][chainId]).map(([tokenAddr, value]: [any, any]) => [
              tokenAddr,
              { ...value, loading: false, syncing: false, balance: '0' },
            ])
          )

          console.log('korbalances res', res)
          console.log('korbalances withBalances', withBalances)
          console.log('korbalances updatedBalances', updatedBalances)

          setPortfolioBalances(updatedBalances)
          isLoading.current = false

          // setPortfolioBalances((prevBalances) => {
          //   const newBalances = { ...prevBalances }
          //   newBalances[address] = { ...(newBalances[address] || {}) }
          //   newBalances[address][chainId] = { ...(newBalances[address][chainId] || {}) }

          //   // @ts-ignore: Unreachable code error
          //   withBalances.forEach(({ address, balance }) => {
          //     newBalances[address][chainId][address] = newBalances[address][chainId][address] || {
          //       loading: false,
          //       syncing: false,
          //       balance,
          //     }
          //   })

          //   return newBalances
          // })

          // console.log('gnosisres res', res)
          // console.log('updatePortfolioBalances res', res?.items || [], addresses)
          // TODO: check the adders or update the balances with the current safe address
          // TODO: update balances func
          // setPortfolioBalances({})
        } catch (error) {
          console.log('error', error)
          isLoading.current = false
        }
      }

      // @ts-ignore: Unreachable code error
      // setPortfolioBalances((currentBalances) => {

      const currentBalances = { ...portfolioBalances }
      console.log({ currentBalances })

      const newAddresses = [...addresses].filter(
        (x) => !currentBalances[address]?.[chainId]?.[x]?.loading && !currentBalances[address]?.[chainId]?.[x]?.syncing
      )

      console.log({ newAddresses })
      if (!newAddresses.length) {
        return
      }

      const newBalances = { ...currentBalances }
      newBalances[address] = { ...(newBalances[address] || {}) }
      newBalances[address][chainId] = { ...(newBalances[address][chainId] || {}) }

      newAddresses.forEach((tokenAddr) => {
        newBalances[address][chainId][tokenAddr] = newBalances[address][chainId][tokenAddr] || {
          loading: true,
          syncing: true,
        }
      })
      console.log('korbalances currentBalances', currentBalances)
      console.log('korbalances newBalances', newBalances)

      console.log('newBalances 1', newBalances)
      setPortfolioBalances(newBalances)
      getBalances(newBalances)
      console.log('newBalances 2', newBalances)
      // })
    },
    // @ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chainId, isLoading.current, portfolioBalances]
  )

  const getPortfolioBalances = useCallback(
    (addresses: string[], address?: string) => {
      if (address && chainId) {
        updatePortfolioBalances(addresses, address)
        return addresses.map(([tokenAddr]) => {
          const value = portfolioBalances[address]?.[chainId]?.[tokenAddr]
          const balance = BigNumber.from(value?.balance || '0')

          return {
            valid: true,
            result: [balance, { balance }], // TODO; match the result
            loading: !!value?.loading,
            syncing: !!value?.syncing,
            error: false,
          }
        })
      } else {
        return []
      }
    },
    [chainId, portfolioBalances, updatePortfolioBalances]
    // [isLoading]
  )

  return (
    <PortfolioBalancesContext.Provider value={{ getPortfolioBalances }}>{children}</PortfolioBalancesContext.Provider>
  )
}

const usePortfolioBalances = () => useContext(PortfolioBalancesContext)

export { PortfolioBalances, PortfolioBalancesContext, usePortfolioBalances }
