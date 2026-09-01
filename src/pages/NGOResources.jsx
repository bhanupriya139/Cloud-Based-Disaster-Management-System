import { useEffect, useState } from 'react'
import { Ambulance, Flame, HeartPulse } from 'lucide-react'
import Header from '../components/layout/Header'
import { getNearbyResources } from '../api/services'
import './pages.css'

const iconMap = {
  Ambulances: Ambulance,
  'Fire Trucks': Flame,
  'Medical Kits': HeartPulse,
}

export default function Resources() {
  const [resources, setResources] = useState([])

  useEffect(() => {
    getNearbyResources(19.076, 72.8777).then(setResources)
  }, [])

  return (
    <div className="page">
      <Header />
      <div className="page-content">
        <h2 className="page-title">Emergency Resources</h2>
        <p className="page-subtitle">Available resources near your location</p>

        <div className="resource-cards grid">
          {resources.map((r) => {
            const Icon = iconMap[r.name] || HeartPulse
            return (
              <div key={r.name} className="resource-card large">
                <div className="resource-icon" style={{ color: r.color }}>
                  <Icon size={32} />
                </div>
                <div className="resource-info">
                  <span>{r.name}</span>
                  <strong>{r.count} / {r.total}</strong>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(r.count / r.total) * 100}%`, background: r.color }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
