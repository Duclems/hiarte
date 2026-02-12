import { useTranslation } from 'react-i18next'
import { Text } from '../components/atoms/Text'

export function ProjectsPage() {
  const { t } = useTranslation()
  return (
    <div className="page">
      <Text as="h1" variant="h1" className="page__title">
        {t('projects.title')}
      </Text>
      <Text variant="lead">
        {t('projects.subtitle')}
      </Text>
      <div className="page__grid" style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="project-card">
            <Text as="h3" variant="h3">{t('projects.project')} {i}</Text>
            <Text variant="body">{t('projects.description')} {i}...</Text>
          </div>
        ))}
      </div>
    </div>
  )
}
