import { useEffect, useState } from 'react'
import { CloudRain, Droplets, Wind, Eye } from 'lucide-react'
import Header from '../components/layout/Header'
import { getWeather } from '../api/services'
import './pages.css'

export default function Weather() {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getWeather().then(setWeather)
  }, [])

  if (!weather) {
    return (
      <div className="page">
        <Header />
        <div className="page-content loading">Loading weather...</div>
      </div>
    )
  }

  const { current, forecast } = weather

  return (
    <div className="page">
      <Header />
      <div className="page-content">
        <h2 className="page-title">Weather & Forecast</h2>
        <p className="page-subtitle">Current conditions and 5-hour forecast</p>

        <div className="weather-hero">
          <CloudRain size={48} />
          <div>
            <span className="weather-temp">{current.temp}°C</span>
            <span className="weather-condition">{current.condition}</span>
          </div>
        </div>

        <div className="weather-stats grid-4">
          <div className="weather-stat-card">
            <Droplets size={20} />
            <span>Humidity</span>
            <strong>{current.humidity}%</strong>
          </div>
          <div className="weather-stat-card">
            <Wind size={20} />
            <span>Wind</span>
            <strong>{current.windSpeed} km/h</strong>
          </div>
          <div className="weather-stat-card">
            <CloudRain size={20} />
            <span>Rainfall</span>
            <strong>{current.rainfall} mm</strong>
          </div>
          <div className="weather-stat-card">
            <Eye size={20} />
            <span>Visibility</span>
            <strong>{current.visibility} km</strong>
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title">5-Hour Forecast</h3>
          <div className="forecast-row">
            {forecast.map((f) => (
              <div key={f.hour} className="forecast-item">
                <span>{f.hour}</span>
                <CloudRain size={24} />
                <strong>{f.temp}°</strong>
                <small>{f.condition}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
