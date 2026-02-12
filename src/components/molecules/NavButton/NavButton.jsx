import { NavLink } from 'react-router-dom'
import './NavButton.css'

export function NavButton({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-btn ${isActive ? 'nav-btn--active' : ''}`}
    >
      {children}
    </NavLink>
  )
}
