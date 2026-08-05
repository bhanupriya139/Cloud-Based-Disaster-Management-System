import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  CloudRain,
  Wind,
  FileWarning,
  Siren,
  Route,
  Ambulance,
  Flame,
  HeartPulse,
} from 'lucide-react'
import Header from '../components/layout/Header'
import DisasterMap from '../components/map/DisasterMap'
import { getDashboard, getMapMarkers } from '../api/services'
import './pages.css'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    getDashboard().then(setData)
    getMapMarkers().then(setMarkers)
  }, [])

  if (!data) {
    return (
      <div className="page">
        <Header />
        <div className="page-content loading">Loading dashboard...</div>
      </div>
    )
  }

  const location = `${data.location.city}, ${data.location.state}`

  return (
    <div className="page">
      <Header location={location} />
      <div className="page-content">
        <div className="stat-cards">
          <div className="stat-card danger">
            <AlertTriangle size={22} />
            <div>
              <span className="stat-label">Risk Level</span>
              <span className="stat-value">{data.riskLevel}</span>
            </div>
          </div>
          <div className="stat-card">
            <CloudRain size={22} />
            <div>
              <span className="stat-label">Weather</span>
              <span className="stat-value">{data.weather.temp}°C, {data.weather.condition}</span>
            </div>
          </div>
          <div className="stat-card success">
            <Wind size={22} />
            <div>
              <span className="stat-label">Air Quality</span>
              <span className="stat-value">{data.airQuality.label}, AQI {data.airQuality.aqi}</span>
            </div>
          </div>
          <div className="stat-card warning">
            <AlertTriangle size={22} />
            <div>
              <span className="stat-label">Disaster Alerts</span>
              <span className="stat-value">{data.activeAlerts} Active</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="panel map-panel">
            <h2 className="panel-title">Live Disaster Map</h2>
            <DisasterMap markers={markers} height="420px" />
          </div>

          <div className="dashboard-sidebar">
            <div className="panel">
              <h2 className="panel-title">Weather Update</h2>
              <div className="weather-stats">
                <div className="weather-stat">
                  <span>Humidity</span>
                  <strong>{data.weatherDetails.humidity}%</strong>
                </div>
                <div className="weather-stat">
                  <span>Wind Speed</span>
                  <strong>{data.weatherDetails.windSpeed} km/h</strong>
                </div>
                <div className="weather-stat">
                  <span>Rainfall</span>
                  <strong>{data.weatherDetails.rainfall} mm</strong>
                </div>
                <div className="weather-stat">
                  <span>Visibility</span>
                  <strong>{data.weatherDetails.visibility} km</strong>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2 className="panel-title">Active Alerts</h2>
              <div className="alert-list">
                {data.alerts.map((alert) => (
                  <div key={alert.id} className="alert-item">
                    <AlertTriangle size={16} className="alert-icon" />
                    <div>
                      <strong>{alert.title}</strong>
                      <p>{alert.description}</p>
                      <span className="alert-time">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <Link to="/report" className="action-btn report">
            <FileWarning size={24} />
            Report Incident
          </Link>
          <Link to="/emergency" className="action-btn emergency">
            <Siren size={24} />
            Emergency Help
          </Link>
          <Link to="/routes" className="action-btn routes">
            <Route size={24} />
            Safe Routes
          </Link>
        </div>

        <div className="panel">
          <h2 className="panel-title">Emergency Resources Nearby</h2>
          <div className="resource-cards">
            {data.resources.map((r) => (
              <div key={r.name} className="resource-card">
                <div className="resource-icon">
                  {r.name.includes('Ambulance') && <Ambulance size={24} />}
                  {r.name.includes('Fire') && <Flame size={24} />}
                  {r.name.includes('Medical') && <HeartPulse size={24} />}
                </div>
                <div className="resource-info">
                  <span>{r.name}</span>
                  <strong>{r.count} Available</strong>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(r.count / r.total) * 100}%`, background: r.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
