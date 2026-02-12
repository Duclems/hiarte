import { useTranslation } from 'react-i18next'
import { Text } from '../components/atoms/Text'

export function AboutPage() {
  const { t } = useTranslation()
  return (
    <div className="page">
      <Text as="h1" variant="h1" className="page__title">
        {t('about.title')}
      </Text>
      <Text variant="lead">
        {t('about.subtitle')}
      </Text>
      <Text variant="body" style={{ marginTop: '1.5rem' }}>
        {t('about.content')}
      </Text>
    </div>
  )
}
