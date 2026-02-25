import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const OG_IMAGE_PATH = '/oui.webp'

function getCanonicalUrl() {
  if (typeof window === 'undefined') return ''
  const origin = window.location.origin
  const pathname = window.location.pathname
  return `${origin}${pathname}`.replace(/\/$/, '') || origin + '/'
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
  }, [t, i18n.language, location.pathname])

  return null
}
