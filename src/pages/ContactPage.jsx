import { useTranslation } from 'react-i18next'
import { Text } from '../components/atoms/Text'
import { Button } from '../components/atoms/Button'

export function ContactPage() {
  const { t } = useTranslation()
  return (
    <div className="page">
      <Text as="h1" variant="h1" className="page__title">
        {t('contact.title')}
      </Text>
      <Text variant="lead">
        {t('contact.subtitle')}
      </Text>
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <Text variant="body">{t('contact.email')} : contact@hiarte.com</Text>
        <Text variant="body">{t('contact.phone')} : 01 23 45 67 89</Text>
        <Button variant="primary">{t('contact.sendMessage')}</Button>
      </div>
    </div>
  )
}
