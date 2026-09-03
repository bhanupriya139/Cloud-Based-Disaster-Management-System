import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Bell, UserCheck, Menu } from 'lucide-react'
import './MobileNav.css'

const items = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/alerts', icon: Bell, label: 'Alerts' },
  { to: '/admin/ngo-requests', icon: UserCheck, label: 'NGO Requests' },
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
