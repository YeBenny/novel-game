import { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { t } from 'i18next'

import { useAppDispatch } from '../../redux/hooks'
import { login } from '../../redux/reducer/AuthSlice'
import { RootState } from '../../redux/store'
import {
  disconnectWallet,
  getAddress,
  pairing,
  signPersonalMessage,
} from '../../services/WalletConnect'

function App() {
  const signClient = useSelector((state: RootState) => state.auth.signClient)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const dispatch = useAppDispatch()

  const handleConnect = useCallback(() => {
    if (signClient) {
      pairing(
        signClient,
        (uri) => {
          if (import.meta.env.VITE_SCHEME) {
            window.location.href = `${import.meta.env.VITE_SCHEME}://wcUrl=${uri}`
          }
        },
        () => {},
        (error) => {
          console.error(error)
        },
      )
    }
  }, [signClient])

  const handlePersonalSign = useCallback(() => {
    if (import.meta.env.VITE_SCHEME) {
      window.location.href = `${import.meta.env.VITE_SCHEME}://redirect`
    }

    const address = getAddress(signClient)
    const timestamp = Number.parseInt((Date.now() / 1000).toFixed(0))
    const msg = `${t('sign.personal_message')}${t('sign.wallet_address')}${address}${t('sign.timestamp')}${timestamp}`
    signPersonalMessage(signClient, msg)
      .then((data) => {
        if (data?.success) {
          dispatch(login())
        } else {
          disconnectWallet(signClient)
        }
      })
      .catch((error) => {
        console.error(error)
        disconnectWallet(signClient)
      })
  }, [dispatch, signClient])

  useEffect(() => {
    const handleMessage = (event: any) => {
      console.log(event.data)
      if (event.data === 'connect_wallet') {
        handleConnect()
      }
      if (event.data === 'personal_sign') {
        handlePersonalSign()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [handleConnect, handlePersonalSign])

  return (
    <div style={{ height: 'calc(100vh - 64px - 65px)' }}>
      <iframe
        ref={iframeRef}
        style={{ width: '100%', height: '100%', border: 'none' }}
        src={import.meta.env.VITE_GAME_URL}
      />
    </div>
  )
}

export default App
