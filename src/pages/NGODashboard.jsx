import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, HeartPulse, Building2, FileWarning } from 'lucide-react'
import Header from '../components/layout/Header'
import { getDashboard, getNGOAllocationHistory } from '../api/services'
import './pages.css'

export default function NGODashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [allocations, setAllocations] = useState([])
  useEffect(() => {
    if (localStorage.getItem('isNGOAuthenticated') !== 'true') {
      navigate('/ngo-login')
      return
    }

    getDashboard().then(setData)
    getNGOAllocationHistory().then(setAllocations)
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
          <div className="dashboard-sidebar">
            <div className="panel list-panel">
              <h3 className="panel-title">Disaster Allocation History</h3>
              <div className="service-list">
                {allocations.length === 0 && (
                  <p className="empty-state">No disasters have been allocated to this NGO yet.</p>
                )}
                {allocations.map((allocation) => (
                  <div key={allocation.id} className="service-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="service-info" style={{ marginLeft: 0 }}>
                      <strong>{allocation.type}</strong>
                      <span>{allocation.location}</span>
                      <small>Allocated on {allocation.allocatedOn}</small>
                    </div>
                    <span className={`status-badge ${allocation.status.toLowerCase().replace(' ', '-')}`}>
                      {allocation.status}
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
