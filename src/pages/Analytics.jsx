import Header from '../components/layout/Header'
import './pages.css'

export default function Analytics() {
  return (
    <div className="page">
      <Header />
      <div className="page-content">
        <h2 className="page-title">Analytics</h2>
        <p className="page-subtitle">Disaster response metrics and trends</p>

        <div className="stat-cards">
          <div className="stat-card">
            <div>
              <span className="stat-label">Incidents This Week</span>
              <span className="stat-value">47</span>
            </div>
          </div>
          <div className="stat-card success">
            <div>
              <span className="stat-label">Resolved</span>
              <span className="stat-value">38</span>
            </div>
          </div>
          <div className="stat-card warning">
            <div>
              <span className="stat-label">Avg Response Time</span>
              <span className="stat-value">12 min</span>
            </div>
          </div>
          <div className="stat-card danger">
            <div>
              <span className="stat-label">Active Now</span>
              <span className="stat-value">9</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title">Response Overview</h3>
          <p className="placeholder-text">
            Connect to your backend <code>/api/analytics</code> endpoint to display charts and trends here.
          </p>
        </div>
      </div>
    </div>
  )
}
