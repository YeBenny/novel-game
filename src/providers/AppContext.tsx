import React, { createContext, useEffect, useState } from 'react'

import Loading from '../components/loading/Loading'
import { useAppDispatch } from '../redux/hooks'
import { connect } from '../redux/reducer/AuthSlice'
import { connectWBWallet, connectWallet } from '../services/WalletConnect'

export interface AppState {
  theme: string
  walletConnectInfo: WalletConnectState
}

export interface WalletConnectState {
  signClient: any
}

export function GetDefaultAppContext(): AppState {
  return {
    theme: 'lightTheme',
  } as AppState
}

export const AppContext = createContext<AppState>({} as AppState)

const AppProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const dispatch = useAppDispatch()
  const [loaded, setLoaded] = useState(false)
  const [appContext] = useState<AppState>(GetDefaultAppContext())

  useEffect(() => {
    async function init() {
      const enableJWT = import.meta.env.VITE_ENABLE_JWT
      let signClient
      if (enableJWT === 'true') {
        signClient = await connectWBWallet()
      } else {
        signClient = await connectWallet()
      }
      dispatch(connect({ signClient }))
      // if (signClient?.session?.getAll().length != 0) {
      //   dispatch(login())
      // }
      setLoaded(true)
    }
    init()
  }, [dispatch])

  return (
    <AppContext.Provider value={appContext}>
      {loaded ? <div className="darkTheme">{children}</div> : <Loading />}
    </AppContext.Provider>
  )
}
export default AppProvider
