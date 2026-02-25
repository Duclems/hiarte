import { useTranslation } from 'react-i18next'
import './LanguageSelector.css'

export function LanguageSelector() {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  const nextLang = currentLang === 'fr' ? 'en' : 'fr'
  const displayLabel = currentLang === 'fr' ? t('language.fr') : t('language.en')

  const handleClick = () => {
    i18n.changeLanguage(nextLang)
    localStorage.setItem('hiarte-language', nextLang)
  }

  return (
    <button
      type="button"
      className="language-switcher"
      onClick={handleClick}
      aria-label={currentLang === 'fr' ? t('a11y.switchToEnglish') : t('a11y.switchToFrench')}
    >
      {displayLabel}
    </button>
  )
}
