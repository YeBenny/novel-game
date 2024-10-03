import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { DisconnectOutlined, WalletOutlined } from '@ant-design/icons'
import { Button, Dropdown, Flex, MenuProps } from 'antd'

import { useAppDispatch } from '../../redux/hooks'
import { logout } from '../../redux/reducer/AuthSlice'
import { RootState } from '../../redux/store'
import {
  disconnectWallet,
  getAddress,
  pairing,
} from '../../services/WalletConnect'
import { formatAddress } from '../../utils'

interface WalletConnectButtonProps {
  handleClose?: () => void
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  handleClose,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_cookies, _setCookie, removeCookie] = useCookies([
    'access-token',
    'refresh-token',
  ])
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const signClient = useSelector((state: RootState) => state.auth.signClient)
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const items: MenuProps['items'] = [
    {
      key: 'disconnect',
      label: (
        <Flex gap={8}>
          <DisconnectOutlined />
          {t('navbar.btn.disconnect')}
        </Flex>
      ),
    },
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'disconnect':
        handleDisconnect()
        break
    }
    handleClose?.()
  }

  const handleConnect = async () => {
    if (signClient) {
      setLoading(true)
      pairing(
        signClient,
        (uri) => {
          if (import.meta.env.VITE_SCHEME) {
            window.location.href = `${import.meta.env.VITE_SCHEME}://wcUrl=${uri}`
          }
          setLoading(false)
        },
        () => {
          dispatch(login())
          setAddress(getAddress(signClient))
        },
        (error) => {
          console.error(error)
          setLoading(false)
        },
      )
    }
  }

  const handleDisconnect = async () => {
    setLoading(true)
    await disconnectWallet(signClient)
    removeCookie('access-token')
    removeCookie('refresh-token')
    dispatch(logout())
    setLoading(false)
  }

  return !isLoggedIn || address === '' ? (
    <Button
      type="primary"
      onClick={() => {
        handleConnect()
        handleClose?.()
      }}
      loading={loading}
      ghost
    >
      {t('navbar.btn.connect')}
    </Button>
  ) : (
    <Dropdown menu={{ items, onClick }}>
      <Button
        type="primary"
        icon={<WalletOutlined />}
        size={'large'}
        loading={loading}
      >
        {formatAddress(address)}
      </Button>
    </Dropdown>
  )
}

export default WalletConnectButton
function login(): any {
  throw new Error('Function not implemented.')
}
