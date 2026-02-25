import { useTranslation } from 'react-i18next'
import { Text } from '../components/atoms/Text'

export function PrivacyPage() {
  const { t } = useTranslation()
  return (
    <div className="page page--privacy">
      <Text as="h1" variant="h1" className="page__title">
        {t('privacy.title')}
      </Text>
      <Text variant="lead" className="page__subtitle">
        {t('privacy.subtitle')}
      </Text>
      <Text variant="body" className="privacy-intro">
        {t('privacy.intro')}
      </Text>
      <section className="legal-section" aria-labelledby="privacy-data">
        <Text as="h2" id="privacy-data" variant="h2" className="legal-section__title">
          {t('privacy.dataTitle')}
        </Text>
        <Text variant="body" className="legal-section__content">
          {t('privacy.data')}
        </Text>
      </section>
      <section className="legal-section" aria-labelledby="privacy-cookies">
        <Text as="h2" id="privacy-cookies" variant="h2" className="legal-section__title">
          {t('privacy.cookiesTitle')}
        </Text>
        <Text variant="body" className="legal-section__content">
          {t('privacy.cookies')}
        </Text>
      </section>
      <section className="legal-section" aria-labelledby="privacy-rights">
        <Text as="h2" id="privacy-rights" variant="h2" className="legal-section__title">
          {t('privacy.rightsTitle')}
        </Text>
        <Text variant="body" className="legal-section__content">
          {t('privacy.rights')}
        </Text>
      </section>
      <section className="legal-section" aria-labelledby="privacy-contact">
        <Text as="h2" id="privacy-contact" variant="h2" className="legal-section__title">
          {t('privacy.contactTitle')}
        </Text>
        <Text variant="body" className="legal-section__content">
          {t('privacy.contact')}
        </Text>
      </section>
    </div>
  )
}
