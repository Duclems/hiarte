import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="page page--home">
      <div className="home-main">
        <div className="home-hero-row">
          <section className="home-hero__text" aria-labelledby="hero-title">
            <h1 id="hero-title" className="home-hero__headline">
              <span className="home-hero__line">{t('home.heroLine1')}</span>
              <span className="home-hero__line">{t('home.heroLine2')}</span>
              <span className="home-hero__line">{t('home.heroLine3')}</span>
            </h1>
          </section>
          <div className="home-actions">
            <Link to="/projects" className="home-frame">
              {t('home.ctaExplore')}
            </Link>
            <Link to="/contact" className="home-frame home-frame--outline">
              {t('home.ctaStart')}
            </Link>
          </div>
        </div>
        <p className="home-hero__tagline">
          {t('home.tagline')}
        </p>
        <section className="home-intro" aria-label={t('home.introLabel')}>
          <p>
            {t('home.intro')}
          </p>
        </section>
      </div>
      <div className="home-center">
        <img src={`${import.meta.env.BASE_URL}task_01kjbjkbz1esnva0797r6y7rv3_1772062685_img_0.webp`} alt={t('home.heroImageAlt')} className="home-center__img" />
      </div>
    </div>
  )
}
