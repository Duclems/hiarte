import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const OG_IMAGE_PATH = `${import.meta.env.BASE_URL}hiarte_hands.png`

function getCanonicalUrl() {
  if (typeof window === 'undefined') return ''
  const origin = window.location.origin
  const pathname = window.location.pathname
  return `${origin}${pathname}`.replace(/\/$/, '') || origin + '/'
}

function getBaseUrlWithLang(lang) {
  if (typeof window === 'undefined') return ''
  const origin = window.location.origin
  const pathname = window.location.pathname
  const base = `${origin}${pathname}`
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}lang=${lang}`
}

function setHreflang() {
  const existing = document.querySelectorAll('link[rel="alternate"][hreflang]')
  existing.forEach((el) => el.remove())
  const head = document.head
  const langs = [
    { lang: 'fr', href: getBaseUrlWithLang('fr') },
    { lang: 'en', href: getBaseUrlWithLang('en') },
  ]
  langs.forEach(({ lang, href }) => {
    const link = document.createElement('link')
    link.setAttribute('rel', 'alternate')
    link.setAttribute('hreflang', lang)
    link.setAttribute('href', href)
    head.appendChild(link)
  })
  const xDefault = document.createElement('link')
  xDefault.setAttribute('rel', 'alternate')
  xDefault.setAttribute('hreflang', 'x-default')
  xDefault.setAttribute('href', getBaseUrlWithLang('fr'))
  head.appendChild(xDefault)
}

function ensureMeta(nameOrProp, isProperty = false) {
  const attr = isProperty ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, nameOrProp)
    document.head.appendChild(el)
  }
  return el
}

function ensureLink(rel) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  return el
}

export function HeadMeta() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const canonicalUrl = getCanonicalUrl()
    const ogImage = baseUrl ? `${baseUrl}${OG_IMAGE_PATH}` : OG_IMAGE_PATH
    const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'

    document.documentElement.lang = lang

    const title = t('meta.title')
    const description = t('meta.description')

    document.title = title

    ensureMeta('description').setAttribute('content', description)

    ensureMeta('og:title', true).setAttribute('content', title)
    ensureMeta('og:description', true).setAttribute('content', description)
    ensureMeta('og:image', true).setAttribute('content', ogImage)
    ensureMeta('og:url', true).setAttribute('content', canonicalUrl)
    ensureMeta('og:type', true).setAttribute('content', 'website')
    ensureMeta('og:locale', true).setAttribute('content', i18n.language?.startsWith('fr') ? 'fr_FR' : 'en_GB')

    ensureMeta('twitter:card').setAttribute('content', 'summary_large_image')
    ensureMeta('twitter:title').setAttribute('content', title)
    ensureMeta('twitter:description').setAttribute('content', description)
    ensureMeta('twitter:image').setAttribute('content', ogImage)

    const canonical = ensureLink('canonical')
    canonical.setAttribute('href', canonicalUrl)

    setHreflang()
  }, [t, i18n.language, location.pathname, location.search])

  return null
}
