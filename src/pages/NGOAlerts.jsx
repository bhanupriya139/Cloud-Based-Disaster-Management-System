import { useEffect, useState } from 'react'
import { Bell, Navigation } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import { getNGOAllocationHistory } from '../api/services'
import './pages.css'

export default function NGOAlerts() {
  const [allocations, setAllocations] = useState(null)

  useEffect(() => {
    getNGOAllocationHistory().then(setAllocations)
  }, [])

  if (!allocations) {
    return (
      <div className="page">
        <Header userName="NGO" />
        <div className="page-content loading">Loading NGO notifications...</div>
      </div>
    )
  }

  const activeAllocations = allocations.filter((allocation) => {
    const status = allocation.status?.toLowerCase()
    return status !== 'resolved' && status !== 'completed'
  })

  return (
    <div className="page">
      <Header userName="NGO" />
      <div className="page-content narrow">
        <h2 className="page-title">NGO Notifications</h2>
        <p className="page-subtitle">Disaster assignments sent by the administration</p>

        <div className="panel">
          <h3 className="panel-title"><Bell size={18} /> Allocated disasters</h3>
          <div className="service-list">
            {activeAllocations.length === 0 && (
              <p className="empty-state">There are no new disaster assignments for this NGO.</p>
            )}
            {activeAllocations.map((allocation) => (
              <div key={allocation.id} className="service-card notification-card">
                <div className="service-info">
                  <strong>{allocation.type}</strong>
                  <span>{allocation.location}</span>
                  <small>Allocated on {allocation.allocatedOn}</small>
                </div>
                <div className="notification-actions">
                  <span className={`status-badge ${allocation.status.toLowerCase().replace(' ', '-')}`}>
                    {allocation.status}
                  </span>
                  <Link to={`/ngo-dashboard/routes/${allocation.id}`} className="btn-primary btn-sm">
                    <Navigation size={16} /> View Route
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
