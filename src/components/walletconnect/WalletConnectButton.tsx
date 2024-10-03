import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  DisconnectOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Flex, MenuProps } from 'antd'

import { useAppDispatch } from '../../redux/hooks'
import { logout } from '../../redux/reducer/AuthSlice'
import { RootState, store } from '../../redux/store'
import { disconnectWallet, getAddress } from '../../services/WalletConnect'
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
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const items: MenuProps['items'] = [
    {
      key: 'me',
      label: (
        <Flex gap={8}>
          <UserOutlined />
          {t('button.me')}
        </Flex>
      ),
    },
    {
      key: 'disconnect',
      label: (
        <Flex gap={8}>
          <DisconnectOutlined />
          {t('button.disconnect')}
        </Flex>
      ),
    },
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'me':
        navigate('/user')
        break
      case 'disconnect':
        handleDisconnect()
        break
    }
    handleClose?.()
  }

  const handleDisconnect = async () => {
    setLoading(true)
    await disconnectWallet(signClient)
    removeCookie('access-token')
    removeCookie('refresh-token')
    dispatch(logout())
    setLoading(false)
  }

  useEffect(() => {
    if (signClient == null) {
      return
    }
    setAddress(getAddress(signClient))
    const unsubscribe = store.subscribe(() => {
      setAddress(getAddress(signClient))
    })
    return () => unsubscribe()
  }, [signClient])

  return !isLoggedIn || address === '' ? (
    <Flex gap={16}>
      <Button
        type="primary"
        onClick={() => {
          navigate('/login')
          handleClose?.()
        }}
        ghost
      >
        {t('button.login')}
      </Button>
      <Button
        type="primary"
        onClick={() => {
          navigate('/signup')
          handleClose?.()
        }}
        ghost
      >
        {t('button.signup')}
      </Button>
    </Flex>
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
