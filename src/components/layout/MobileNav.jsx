import { NavLink } from 'react-router-dom'
import { Home, Map, FileWarning, Menu } from 'lucide-react'
import './MobileNav.css'

const items = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/map', icon: Map, label: 'Map' },
  { to: '/report', icon: FileWarning, label: 'Report' },
  { to: '/more', icon: Menu, label: 'More' },
]

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      {items.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}
        >
          <Icon size={22} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
