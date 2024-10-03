import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Col, ConfigProvider, Layout, Row } from 'antd'

import { antdLang } from '../../i18n/ant'
import { RootState } from '../../redux/store'

const AppLayoutComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const locale = useSelector((state: RootState) => state.locale.locale)

  const { t } = useTranslation()

  return (
    <ConfigProvider locale={antdLang[locale]}>
      <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <Layout.Header
          style={{
            position: 'sticky',
            top: 0,
            paddingLeft: 16,
            paddingRight: 16,
            background: 'white',
            zIndex: 1000,
            boxShadow:
              '0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)',
          }}
        ></Layout.Header>
        <Layout.Content>
          <Row
            style={{ width: '100vw', maxWidth: 1280, margin: 'auto' }}
            justify={'center'}
          >
            <Col xs={24} sm={22}>
              {children}
            </Col>
          </Row>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          {t('footer', { year: new Date().getFullYear() })}
        </Layout.Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default AppLayoutComponent
