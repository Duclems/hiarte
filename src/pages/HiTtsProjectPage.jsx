import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Text } from '../components/atoms/Text'

export function HiTtsProjectPage() {
  const { t } = useTranslation()

  return (
    <div className="page page--project-hi-tts">
      <header className="page__header">
        <Text as="h1" variant="h1" className="page__title">
          {t('projectHiTts.title')}
        </Text>
        <Text variant="lead">
          {t('projectHiTts.intro')}
        </Text>
      </header>

      <main className="page__content" aria-label={t('projectHiTts.title')}>
        <section className="project-section project-section--hero">
          <div className="project-section__text">
            <Text as="h2" variant="h2">
              {t('projectHiTts.twitchTitle')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.twitchBody1')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.twitchBody2')}
            </Text>
          </div>
          <figure className="project-section__media">
            {/* Image 1 : capture de l’écran principal de Hi‑TTS avec la liste des rewards et l’historique des redeems */}
            <img
              src={`${import.meta.env.BASE_URL}hi-tts-dashboard.webp`}
              alt="Interface Hi‑TTS montrant les rewards Twitch et l’historique des messages lus"
            />
          </figure>
        </section>

        <section className="project-section">
          <div className="project-section__text">
            <Text as="h2" variant="h2">
              {t('projectHiTts.voiceTitle')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.voiceBody1')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.voiceBody2')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.voiceBody3')}
            </Text>
          </div>
          <figure className="project-section__media">
            {/* Image 2 : écran de configuration d’un reward Hi‑TTS avec choix de la voix ElevenLabs et des paramètres */}
            <img
              src={`${import.meta.env.BASE_URL}hi-tts-voice-settings.webp`}
              alt="Écran Hi‑TTS pour configurer la voix ElevenLabs associée à un reward Twitch"
            />
          </figure>
        </section>

        <section className="project-section">
          <div className="project-section__text">
            <Text as="h2" variant="h2">
              {t('projectHiTts.rewardsTitle')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.rewardsBody1')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.rewardsBody2')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.rewardsBody3')}
            </Text>
          </div>
          <figure className="project-section__media">
            {/* Image 3 : zoom sur l’historique des messages lus, avec aperçu du chat / emotes à côté */}
            <img
              src={`${import.meta.env.BASE_URL}hi-tts-history.webp`}
              alt="Historique des messages lus par Hi‑TTS avec le contexte du chat Twitch"
            />
          </figure>
        </section>

        <section className="project-section">
          <div className="project-section__text">
            <Text as="h2" variant="h2">
              {t('projectHiTts.uxTitle')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.uxBody1')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.uxBody2')}
            </Text>
          </div>
          <figure className="project-section__media">
            {/* Image 4 : écran de connexion ou paramètres montrant le sélecteur de langue FR / EN */}
            <img
              src={`${import.meta.env.BASE_URL}hi-tts-language-selector.webp`}
              alt="Sélecteur de langue français / anglais dans l’interface Hi‑TTS"
            />
          </figure>
        </section>

        <section className="project-section">
          <div className="project-section__text">
            <Text as="h2" variant="h2">
              {t('projectHiTts.privacyTitle')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.privacyBody1')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.privacyBody2')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.privacyBody3')}
            </Text>
          </div>
        </section>

        <section className="project-section">
          <div className="project-section__text">
            <Text as="h2" variant="h2">
              {t('projectHiTts.licenseTitle')}
            </Text>
            <Text variant="body">
              {t('projectHiTts.licenseBody1')}
            </Text>
          </div>
        </section>

        <section className="project-section project-section--summary">
          <Text as="h2" variant="h2">
            {t('projectHiTts.summaryTitle')}
          </Text>
          <Text variant="body">
            {t('projectHiTts.summaryBody')}
          </Text>
        </section>

        <nav className="project-section project-section--back">
          <Link to="/projects" className="home-frame home-frame--outline">
            {/* Bouton de retour vers la liste des projets */}
            {t('home.seeProjects')}
          </Link>
        </nav>
      </main>
    </div>
  )
}

