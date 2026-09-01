import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Map,
  Package,
  Building2,
  Bell,
  BarChart3,
  Settings,
  Shield,
  Siren,
  Home,
  LogOut,
} from 'lucide-react'
import './Sidebar.css'

const navItems = [
  { to: '/', icon: Home, label: 'Home Page' },
  { to: '/admin', icon: LayoutDashboard, label: 'Admin Dashboard' },
  { to: '/admin/map', icon: Map, label: 'Live Map' },
  { to: '/admin/emergency', icon: Siren, label: 'Emergency' },
  { to: '/admin/ngos', icon: Building2, label: 'NGO Directory' },
  { to: '/admin/alerts', icon: Bell, label: 'Alerts' },
  { to: '/admin/resources', icon: Package, label: 'Resources' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function AdminSidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated')
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Shield size={28} />
        <div>
          <span className="brand-name">Disaster Shield</span>
          <span className="brand-tag">Admin Panel</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}

        <button type="button" className="nav-item logout-item" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  )
}
