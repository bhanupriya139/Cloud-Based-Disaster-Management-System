import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  AlertTriangle,
  Users,
  Package,
  Building2,
  LayoutDashboard,
  Bell,
  BarChart3,
} from 'lucide-react'
import Header from '../components/layout/Header'
import { getAdminStats } from '../api/services'
import './pages.css'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('isAdminAuthenticated') !== 'true') {
      navigate('/admin-login')
      return
    }

    getAdminStats().then(setStats)
  }, [navigate])

  if (!stats) {
    return (
      <div className="page">
        <Header userName="Admin" />
        <div className="page-content loading">Loading admin dashboard...</div>
      </div>
    )
  }

  return (
    <div className="page">
      <Header userName="Admin" />
      <div className="page-content">
        <h2 className="page-title">Admin Dashboard</h2>
        <p className="page-subtitle">Authority control panel for disaster management</p>

        <div className="stat-cards">
          <div className="stat-card danger">
            <AlertTriangle size={22} />
            <div>
              <span className="stat-label">Active Incidents</span>
              <span className="stat-value">{stats.activeIncidents}</span>
            </div>
          </div>
          <div className="stat-card warning">
            <Users size={22} />
            <div>
              <span className="stat-label">People Affected</span>
              <span className="stat-value">{stats.peopleAffected.toLocaleString()}</span>
            </div>
          </div>
          <div className="stat-card">
            <Package size={22} />
            <div>
              <span className="stat-label">Resources Deployed</span>
              <span className="stat-value">{stats.resourcesDeployed}</span>
            </div>
          </div>
          <div className="stat-card success">
            <Building2 size={22} />
            <div>
              <span className="stat-label">NGOs Active</span>
              <span className="stat-value">{stats.ngosActive}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="panel">
            <h3 className="panel-title">Resource Status</h3>
            <div className="admin-resource-list">
              {stats.resourceStatus.map((r) => (
                <div key={r.name} className="admin-resource-row">
                  <span>{r.name}</span>
                  <span className="available">{r.available} available</span>
                  <span className="deployed">{r.deployed} deployed</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <h3 className="panel-title">Recent Activity</h3>
            <div className="activity-log">
              {stats.recentActivity.map((a) => (
                <div key={a.id} className="activity-item">
                  <span>{a.action}</span>
                  <small>{a.time}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MoreMenu() {
  const links = [
    { to: '/admin/ngos', icon: Building2, label: 'NGO Directory' },
    { to: '/admin/alerts', icon: Bell, label: 'Alerts' },
    { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/admin', icon: LayoutDashboard, label: 'Admin Dashboard' },
  ]

  return (
    <div className="page">
      <Header />
      <div className="page-content narrow">
        <h2 className="page-title">More</h2>
        <div className="more-menu">
          {links.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} className="more-item">
              <Icon size={22} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
