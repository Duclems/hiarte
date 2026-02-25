import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Footer.css'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__company">
          {t('footer.microEnterprise')}
          <span className="footer__separator" aria-hidden="true"> · </span>
          SIREN 999934052
          <span className="footer__separator" aria-hidden="true"> · </span>
          <a href="mailto:contact@hiarte.fr" className="footer__link">contact@hiarte.fr</a>
        </p>
        <nav className="footer__links">
          <Link to="/contact" className="footer__link">
            {t('nav.contact')}
          </Link>
          <span className="footer__separator" aria-hidden="true">·</span>
          <Link to="/mentions-legales" className="footer__link">
            {t('footer.legal')}
          </Link>
          <span className="footer__separator" aria-hidden="true">·</span>
          <Link to="/politique-confidentialite" className="footer__link">
            {t('footer.privacy')}
          </Link>
        </nav>
        <p className="footer__copyright">
          {t('footer.copyright', { year })}
        </p>
      </div>
    </footer>
  )
}
