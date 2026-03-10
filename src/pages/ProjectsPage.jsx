import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Text } from '../components/atoms/Text'

export function ProjectsPage() {
  const { t } = useTranslation()

  return (
    <div className="page">
      <Text as="h1" variant="h1" className="page__title">
        {t('projects.title')}
      </Text>
      <div className="page__grid" style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
        <article className="project-card project-card--hi-tts" aria-labelledby="project-hi-tts-title">
          <div className="project-card__header">
            <div className="project-card__logo" aria-hidden="true" />
            <Text as="h2" variant="h2" id="project-hi-tts-title">
              {t('projects.hiTts.title')}
            </Text>
          </div>
          <Text variant="body">
            {t('projects.hiTts.summary')}
          </Text>
          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/projects/hi-tts" className="home-frame">
              {t('projects.hiTts.cta')}
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
