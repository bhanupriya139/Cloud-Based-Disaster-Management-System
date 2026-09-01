import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Map, Package, Bell, Menu } from 'lucide-react'
import './MobileNav.css'

const items = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/map', icon: Map, label: 'Map' },
  { to: '/admin/alerts', icon: Bell, label: 'Alerts' },
  { to: '/admin/resources', icon: Package, label: 'Resources' },
  { to: '/admin/more', icon: Menu, label: 'More' },
]

export default function AdminMobileNav() {
  return (
    <nav className="mobile-nav">
      {items.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/admin'}
          className={({ isActive }) => `mobile-nav-item${isActive ? ' active' : ''}`}
        >
          <Icon size={22} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
