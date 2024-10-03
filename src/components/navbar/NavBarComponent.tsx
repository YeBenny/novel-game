import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Col, Flex, Row } from 'antd'

import '../../i18n/config'
import WalletConnectButton from '../walletconnect/WalletConnectButton'
import logo from '/assets/vite.svg'

const NavBarComponent: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <Row
        style={{
          width: '90vw',
          maxWidth: 1280,
          minHeight: '100%',
          margin: 'auto',
        }}
        justify="space-between"
        align="middle"
      >
        <Col>
          <a
            style={{ textDecoration: 'none', color: 'black' }}
            onClick={() => {
              navigate('/')
            }}
          >
            <Flex align="center">
              <img
                style={{ marginRight: '8px' }}
                src={logo}
                width="40"
                height="40"
              />
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                {t('navbar.title')}
              </span>
            </Flex>
          </a>
        </Col>

        <Col>
          <Flex gap={4} justify="flex-end" align="center">
            <WalletConnectButton />
          </Flex>
        </Col>
      </Row>
    </>
  )
}

export default NavBarComponent
