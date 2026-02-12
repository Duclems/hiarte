import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavButton } from '../../molecules/NavButton'
import { LanguageSelector } from '../../molecules/LanguageSelector'
import { ThemeToggle } from '../../molecules/ThemeToggle'
import './Header.css'

export function Header() {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ]

  return (
    <header className="header">
      <nav className="header__nav">
        {navItems.map(({ path, label }) => (
          <NavButton key={path} to={path}>
            {label}
          </NavButton>
        ))}
      </nav>
      {pathname === '/' && (
        <div className="header__center">
          <img src="/home_header.png" alt="" className="header__logo-img" />
        </div>
      )}
      <div className="header__actions">
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </header>
  )
}
