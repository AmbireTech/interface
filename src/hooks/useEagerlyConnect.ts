import { Connector } from '@web3-react/types'
import { Connection, gnosisSafeConnection, networkConnection } from 'connection'
import { getConnection } from 'connection/utils'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { updateSelectedWallet } from 'state/user/reducer'

async function connect(connector: Connector) {
  console.log('connector', connector)

  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
      console.log('connector', connector)
      console.log(window !== window.parent)
      alert(`isIframe on init, ${window !== window.parent}`)
    } else {
      await connector.activate()
    }
  } catch (error) {
    alert(`web3-react eager connection error: ${error}`)
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

export default function useEagerlyConnect() {
  const dispatch = useAppDispatch()

  const selectedWallet = useAppSelector((state) => state.user.selectedWallet)
  console.log(selectedWallet)

  let selectedConnection: Connection | undefined
  if (selectedWallet) {
    try {
      selectedConnection = getConnection(selectedWallet)
      console.log('selectedConnection', selectedConnection)
      alert('selectedConnection')
    } catch {
      alert('selectedConnection error - useEagerlyConnect')
      dispatch(updateSelectedWallet({ wallet: undefined }))
    }
  }

  useEffect(() => {
    connect(gnosisSafeConnection.connector)
    connect(networkConnection.connector)

    if (selectedConnection) {
      connect(selectedConnection.connector)
    } // The dependency list is empty so this is only run once on mount
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
