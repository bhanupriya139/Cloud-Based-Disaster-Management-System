import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Users, HeartPulse, Building2, FileWarning, Route } from 'lucide-react'
import Header from '../components/layout/Header'
import { getDashboard, getMapMarkers, getReportedDisasters } from '../api/services'
import DisasterMap from '../components/map/DisasterMap'
import './pages.css'

export default function NGODashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [markers, setMarkers] = useState([])
  const [disasters, setDisasters] = useState([])

  useEffect(() => {
    if (localStorage.getItem('isNGOAuthenticated') !== 'true') {
      navigate('/ngo-login')
      return
    }

    getDashboard().then(setData)
    getMapMarkers().then(setMarkers)
    getReportedDisasters().then(setDisasters)
  }, [navigate])

  if (!data) {
    return (
      <div className="page">
        <Header userName="NGO" />
        <div className="page-content loading">Loading NGO dashboard...</div>
      </div>
    )
  }

  return (
    <div className="page">
      <Header userName="NGO" />
      <div className="page-content">
        <h2 className="page-title">NGO Dashboard</h2>
        <p className="page-subtitle">Manage incident response and track resources.</p>

        <div className="stat-cards">
          <div className="stat-card success">
            <Users size={22} />
            <div>
              <span className="stat-label">Volunteers</span>
              <span className="stat-value">{data.volunteers || 120}</span>
            </div>
          </div>
          <div className="stat-card">
            <HeartPulse size={22} />
            <div>
              <span className="stat-label">Active Missions</span>
              <span className="stat-value">{data.ngoMissions || 8}</span>
            </div>
          </div>
          <div className="stat-card warning">
            <Building2 size={22} />
            <div>
              <span className="stat-label">Supplies Delivered</span>
              <span className="stat-value">{data.suppliesDelivered || 54}</span>
            </div>
          </div>
          <div className="stat-card danger">
            <FileWarning size={22} />
            <div>
              <span className="stat-label">Open Requests</span>
              <span className="stat-value">{data.openRequests || 14}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="panel map-panel">
            <h2 className="panel-title">Field Map</h2>
            <DisasterMap markers={markers} height="420px" />
          </div>
          <div className="dashboard-sidebar">
            <div className="panel">
              <h3 className="panel-title">NGO Actions</h3>
              <div className="service-list">
                <Link to="/ngo-dashboard/report" className="service-card">
                  <div className="service-icon"><FileWarning size={18} /></div>
                  <div className="service-info">
                    <strong>Report New Incident</strong>
                    <span>Share latest field details.</span>
                  </div>
                </Link>
                <Link to="/ngo-dashboard/routes" className="service-card">
                  <div className="service-icon"><Route size={18} /></div>
                  <div className="service-info">
                    <strong>Plan Safe Routes</strong>
                    <span>Coordinate movement and relief deliveries.</span>
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="panel list-panel" style={{ marginTop: '20px' }}>
              <h3 className="panel-title">Reported Disasters</h3>
              <div className="service-list">
                {disasters.map((d) => (
                  <div key={d.id} className="service-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="service-info" style={{ marginLeft: 0 }}>
                      <strong>{d.type}</strong>
                      <span>{d.location}</span>
                    </div>
                    <span className={`status-badge ${d.status.toLowerCase().replace(' ', '-')}`}>
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
