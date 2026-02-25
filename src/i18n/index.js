import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from '../locales/fr.json'
import en from '../locales/en.json'

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'fr'
  const params = new URLSearchParams(window.location.search)
  const langParam = params.get('lang')
  if (langParam === 'en' || langParam === 'fr') {
    localStorage.setItem('hiarte-language', langParam)
    return langParam
  }
  return localStorage.getItem('hiarte-language') || 'fr'
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
