import { stringToBase64, utf8ToHex } from '../utils'

export function UseJsonRpc(client?: any, session?: any) {
  const _createJsonRpcRequestHandler =
    (rpcRequest: any) =>
    async (
      chainId?: string,
      address?: string,
      toAddress?: string,
      txEncodedData?: string,
    ) => {
      if (!client) {
        throw new TypeError('WalletConnect is not initialized')
      }
      if (!session) {
        throw new TypeError('Session is not connected')
      }

      return rpcRequest(chainId, address, toAddress, txEncodedData)
    }

  // -------- ETHEREUM/EIP155 RPC METHODS --------
  const ethereumRpc = {
    signTransaction: _createJsonRpcRequestHandler(
      async (
        chainId: string,
        address: string,
        toAddress: string,
        txEncodedData: string,
      ) => {
        const tx = {
          from: address,
          data: txEncodedData,
          networkName: 'fisco_test_2',
          assetAddress: toAddress,
        }

        const signature = await client.request({
          topic: session.topic,
          chainId,
          request: {
            method: 'eth_signTransaction',
            params: [tx],
          },
        })

        return {
          method: 'eth_signTransaction',
          address,
          txEncodedData,
          signature,
        }
      },
    ),
    signTransactionBeanBag: _createJsonRpcRequestHandler(
      async (
        chainId: string,
        address: string,
        toAddress: string,
        txEncodedData: string,
      ) => {
        const tx = {
          version: 0,
          from: address,
          data: txEncodedData,
          to: toAddress,
        }

        const signature = await client.request({
          topic: session.topic,
          chainId,
          request: {
            method: 'eth_signTransaction',
            params: [tx],
          },
        })

        return {
          method: 'eth_signTransaction',
          address,
          txEncodedData,
          signature,
        }
      },
    ),
    signPersonalMessage: _createJsonRpcRequestHandler(
      async (chainId: string, address: string, message: string = '') => {
        // encode message (hex)
        const hexMsg = utf8ToHex(message)
        const params = [hexMsg, address]

        const signature = await client?.request({
          topic: session.topic,
          chainId,
          request: {
            method: 'personal_sign',
            params,
          },
        })

        return {
          method: 'personal_sign',
          address,
          signature,
        }
      },
    ),
    signPersonalMessageBeanBag: _createJsonRpcRequestHandler(
      async (chainId: string, address: string, message: string = '') => {
        // encode message (hex)
        const hexMsg = stringToBase64(message)
        const params = [hexMsg, address]

        const data = await client?.request({
          topic: session.topic,
          chainId,
          request: {
            method: 'personal_sign',
            params,
          },
        })

        const code = data.error.code
        if (code === 0) {
          return {
            method: 'personal_sign',
            address,
            signature: data.signedMessage,
          }
        } else {
          return {
            method: 'personal_sign',
            address,
          }
        }
      },
    ),
  }

  return {
    ethereumRpc,
  }
}
