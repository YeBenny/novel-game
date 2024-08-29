import { useTranslation } from "react-i18next"

export default function Welcome() {
  const { t } = useTranslation('welcome')

  return (
    <>
      <div>
        {t('greeting')}
      </div>
    </>
  )
}
