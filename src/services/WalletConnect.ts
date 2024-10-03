import { SignClient as WBSignClient } from '@bxq2011hust/walletconnect-sign-client'
import { ISignClient as WBISignClient } from '@bxq2011hust/walletconnect-types'
import { SignClient } from '@walletconnect/sign-client'
import { ISignClient } from '@walletconnect/types'

import { getJWT } from '../apis/jwt'
import { UseJsonRpc } from '../composable/useJsonRpc'

export async function connectWBWallet() {
  console.log(
    'Initializing wb wallet connect...',
    new Date().toLocaleTimeString(),
  )

  const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
  const relayUrl = import.meta.env.VITE_WALLETCONNECT_WB_RELAY_URL

  const jwt = await getJWT()
  const signClient = await WBSignClient.init({
    projectId,
    relayUrl,
    backendJWT: jwt,
    metadata: {
      name: 'Novel Game',
      description: 'Novel Game',
      url: 'https://github.com/wegalaxy',
      icons: ['https://github.com/wegalaxy/public/blob/main/logo.png?raw=true'],
    },
  })

  const relayer = signClient?.core.relayer
  console.log('relayer', relayer)

  const pairings = signClient?.core.pairing.getPairings()
  console.log('pairings', pairings)

  const sessions = signClient?.session.getAll()
  console.log('sessions', sessions)

  signClient?.core.relayer.on('error', (error: any) => {
    console.log('EVENT', 'error', error, new Date().toLocaleTimeString())
  })

  signClient?.core.relayer.on('relayer_disconnect', async () => {
    console.log('EVENT', 'relayer_disconnect', new Date().toLocaleTimeString())
    const jwt = await getJWT()
    await signClient.core.relayer.transportOpen(relayUrl, jwt)
  })

  signClient?.on('session_delete', () => {
    console.log('SESSION', 'session_delete', new Date().toLocaleTimeString())
    alert('session_delete')
    disconnectWallet(signClient)
  })

  console.log(
    'Initializing wb wallet completed',
    new Date().toLocaleTimeString(),
  )
  return signClient
}

export async function connectWallet() {
  console.log('Initializing wallet connect...', new Date().toLocaleTimeString())

  const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
  const relayUrl = import.meta.env.VITE_WALLETCONNECT_RELAY_URL

  const signClient = await SignClient.init({
    projectId,
    relayUrl,
    metadata: {
      name: 'Novel Game',
      description: 'Novel Game',
      url: 'https://github.com/wegalaxy',
      icons: ['https://github.com/wegalaxy/public/blob/main/logo.png?raw=true'],
    },
  })

  console.log('Initializing wallet completed', new Date().toLocaleTimeString())
  return signClient
}

export async function pairing(
  signClient: ISignClient | WBISignClient,
  onUriReceived: (uri: string) => void,
  onSuccess: () => void,
  onError: (body: any) => void,
) {
  console.log('Pairing with wallet connect...')
  signClient
    .connect({
      requiredNamespaces: {
        bcos: {
          methods: ['eth_signTransaction', 'personal_sign'],
          chains: ['bcos:1'],
          events: ['chainChanged', 'accountsChanged'],
        },
      },
    })
    .then((connectResult: any) => {
      onUriReceived(connectResult.uri)
      connectResult
        .approval()
        .then(() => {
          onSuccess()
        })
        .catch((e: any) => {
          onError({ code: e.code, message: e.message })
        })
    })
}

export function getSession(signClient: ISignClient | WBISignClient) {
  const lastKeyIndex = signClient.session.getAll().length - 1
  const lastSession = signClient.session.getAll()[lastKeyIndex]
  return lastSession
}

export function getAddress(signClient: ISignClient | WBISignClient | null) {
  if (signClient == null || signClient.session.getAll().length === 0) {
    return localStorage.getItem('address') ?? ''
  }
  const session = getSession(signClient)
  return session.namespaces.bcos.accounts[0].split(':')[2]
}

export function disconnectWallet(
  signClient?: ISignClient | WBISignClient | null,
) {
  localStorage.setItem('address', '')
  if (signClient == null || signClient.session.getAll().length === 0) {
    return
  }
  const theTopic = getSession(signClient).topic
  return signClient.disconnect({
    topic: theTopic,
    reason: { code: 6000, message: 'User logout' },
  })
}

export async function signPersonalMessage(
  signClient: ISignClient | WBISignClient | null,
  message: string,
) {
  if (signClient) {
    const account = getAddress(signClient)
    const { ethereumRpc } = UseJsonRpc(signClient, getSession(signClient))

    if (account) {
      const useBeanBag = import.meta.env.VITE_USE_BEAN_BAG
      let res
      if (useBeanBag === 'true') {
        res = await ethereumRpc.signPersonalMessageBeanBag(
          'bcos:1',
          account,
          message,
        )
      } else {
        res = await ethereumRpc.signPersonalMessage('bcos:1', account, message)
      }

      const signature = res.signature
      if (signature) {
        return { signature, address: account, success: true }
      } else {
        return { success: false }
      }
    } else {
      return { success: false }
    }
  }
}

export async function signTransaction(
  signClient: ISignClient | WBISignClient | null,
  toAddress: string,
  txEncodedData: string,
) {
  if (signClient) {
    const account = getAddress(signClient)
    const { ethereumRpc } = UseJsonRpc(signClient, getSession(signClient))

    if (account) {
      const useBeanBag = import.meta.env.VITE_USE_BEAN_BAG
      let res
      if (useBeanBag === 'true') {
        res = await ethereumRpc.signTransactionBeanBag(
          'bcos:1',
          account,
          toAddress.toLowerCase(),
          txEncodedData,
        )
      } else {
        res = await ethereumRpc.signTransaction(
          'bcos:1',
          account,
          toAddress.toLowerCase(),
          txEncodedData,
        )
      }

      const signature = res.signature
      const timestamp = res.timestamp
      return { signature, timestamp, address: account, success: true }
    } else {
      return { success: false }
    }
  }
}
