import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Map, FileWarning, Package, Menu } from 'lucide-react'
import './MobileNav.css'

const items = [
  { to: '/ngo-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/ngo-dashboard/map', icon: Map, label: 'Map' },
  { to: '/ngo-dashboard/report', icon: FileWarning, label: 'Report' },
  { to: '/ngo-dashboard/resources', icon: Package, label: 'Resources' },
  { to: '/ngo-dashboard/more', icon: Menu, label: 'More' },
]

export default function NGOMobileNav() {
  return (
    <nav className="mobile-nav">
      {items.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/ngo-dashboard'}
          className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}
        >
          <Icon size={22} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
