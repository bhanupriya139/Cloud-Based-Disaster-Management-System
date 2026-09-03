import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Map,
  FileWarning,
  Siren,
  Building2,
  CloudRain,
  Route,
  Bell,
  Shield,
  Phone,
} from 'lucide-react'
import './Sidebar.css'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/map', icon: Map, label: 'Live Map' },
  { to: '/report', icon: FileWarning, label: 'Report Incident' },
  { to: '/emergency', icon: Siren, label: 'Emergency' },
  { to: '/ngos', icon: Building2, label: 'NGO Directory' },
  { to: '/weather', icon: CloudRain, label: 'Weather' },
  { to: '/routes', icon: Route, label: 'Safe Routes' },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Shield size={28} />
        <div>
          <span className="brand-name">Disaster Shield</span>
          <span className="brand-tag">Safety First</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <a href="tel:112" className="helpline-btn">
        <Phone size={18} />
        Emergency Helpline 112
      </a>
    </aside>
  )
}
