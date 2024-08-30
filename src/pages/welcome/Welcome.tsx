import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { getUser } from '../../apis/getUser'

export default function Welcome() {
  const { t } = useTranslation('welcome')
  const [userName, setUserName] = useState('')
  const userInfo = {
    id: '123'
  }

  useEffect(() => {
    const getData = async () => {
      const data = await getUser(userInfo)
      setUserName(data.userName)
    }
    getData()
  }, [])

  return (
    <>
      <div>
        {t('greeting') + userName + '!'}
      </div>
    </>
  )
}
