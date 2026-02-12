import { useTranslation } from 'react-i18next'
import './LanguageSelector.css'

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  const nextLang = currentLang === 'fr' ? 'en' : 'fr'
  const displayLabel = currentLang === 'fr' ? 'Français' : 'English'

  const handleClick = () => {
    i18n.changeLanguage(nextLang)
    localStorage.setItem('hiarte-language', nextLang)
  }

  return (
    <button
      type="button"
      className="language-switcher"
      onClick={handleClick}
      aria-label={currentLang === 'fr' ? 'Passer en anglais' : 'Switch to French'}
    >
      {displayLabel}
    </button>
  )
}
