import { NavLink } from 'react-router-dom'
import './NavButton.css'

export function NavButton({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-btn ${isActive ? 'nav-btn--active' : ''}`}
      onClick={onClick}
    >
      {children}
    </NavLink>
  )
}
