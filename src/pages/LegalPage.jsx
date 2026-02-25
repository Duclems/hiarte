import { useTranslation } from 'react-i18next'
import { Text } from '../components/atoms/Text'

export function LegalPage() {
  const { t } = useTranslation()
  return (
    <div className="page page--legal">
      <Text as="h1" variant="h1" className="page__title">
        {t('legal.title')}
      </Text>
      <Text variant="lead" className="page__subtitle">
        {t('legal.subtitle')}
      </Text>
      <section className="legal-section" aria-labelledby="legal-editor">
        <Text as="h2" id="legal-editor" variant="h2" className="legal-section__title">
          {t('legal.editorTitle')}
        </Text>
        <Text variant="body" className="legal-section__content">
          {t('legal.editor')}
        </Text>
      </section>
      <section className="legal-section" aria-labelledby="legal-host">
        <Text as="h2" id="legal-host" variant="h2" className="legal-section__title">
          {t('legal.hostTitle')}
        </Text>
        <Text variant="body" className="legal-section__content">
          {t('legal.host')}
        </Text>
      </section>
      <section className="legal-section" aria-labelledby="legal-rights">
        <Text as="h2" id="legal-rights" variant="h2" className="legal-section__title">
          {t('legal.rightsTitle')}
        </Text>
        <Text variant="body" className="legal-section__content">
          {t('legal.rights')}
        </Text>
      </section>
    </div>
  )
}
