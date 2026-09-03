import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Map,
  Package,
  Shield,
  Home,
  LogOut,
} from 'lucide-react'
import './Sidebar.css'

const navItems = [
  { to: '/', icon: Home, label: 'Home Page' },
  { to: '/ngo-dashboard', icon: LayoutDashboard, label: 'NGO Dashboard' },
  { to: '/ngo-dashboard/map', icon: Map, label: 'NGO Location' },
  { to: '/ngo-dashboard/resources', icon: Package, label: 'Resources' },
]

export default function NGOSidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isNGOAuthenticated')
    localStorage.removeItem('currentNGOEmail')
    localStorage.removeItem('currentNGOName')
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Shield size={28} />
        <div>
          <span className="brand-name">Disaster Shield</span>
          <span className="brand-tag">NGO Portal</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/ngo-dashboard'}
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
