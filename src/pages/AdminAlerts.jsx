import { useEffect, useState } from 'react'
import { AlertTriangle, Info } from 'lucide-react'
import Header from '../components/layout/Header'
import { getActiveAlerts } from '../api/services'
import './pages.css'

export default function Alerts() {
  const [alerts, setAlerts] = useState(null)

  useEffect(() => {
    getActiveAlerts().then(setAlerts)
  }, [])

  if (!alerts) {
    return (
      <div className="page">
        <Header />
        <div className="page-content loading">Loading alerts...</div>
      </div>
    )
  }

  return (
    <div className="page">
      <Header />
      <div className="page-content narrow">
        <h2 className="page-title">Alerts</h2>
        <p className="page-subtitle">Stay informed about warnings and updates</p>

        <div className="panel">
          <h3 className="panel-title">
            <AlertTriangle size={18} /> Warnings
          </h3>
          <div className="alert-timeline">
            {alerts.warnings.map((a) => (
              <div key={a.id} className={`timeline-item severity-${a.severity}`}>
                <div className="timeline-dot" />
                <div>
                  <strong>{a.title}</strong>
                  <span className="alert-time">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title">
            <Info size={18} /> Information
          </h3>
          <div className="alert-timeline">
            {alerts.information.map((a) => (
              <div key={a.id} className="timeline-item severity-info">
                <div className="timeline-dot" />
                <div>
                  <strong>{a.title}</strong>
                  <span className="alert-time">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
