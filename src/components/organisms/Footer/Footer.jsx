import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Footer.css'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copyright">
          {t('footer.copyright', { year })}
        </p>
        <nav className="footer__links">
          <Link to="/contact" className="footer__link">
            {t('nav.contact')}
          </Link>
          <span className="footer__separator" aria-hidden="true">·</span>
          <a href="#legal" className="footer__link">
            {t('footer.legal')}
          </a>
          <span className="footer__separator" aria-hidden="true">·</span>
          <a href="#privacy" className="footer__link">
            {t('footer.privacy')}
          </a>
        </nav>
      </div>
    </footer>
  )
}
