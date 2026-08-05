import { useEffect, useState } from 'react'
import { Ambulance, Flame, Shield, Users, Phone } from 'lucide-react'
import Header from '../components/layout/Header'
import { getEmergencyServices, requestEmergency, triggerSOS } from '../api/services'
import './pages.css'

const iconMap = {
  ambulance: Ambulance,
  fire: Flame,
  police: Shield,
  rescue: Users,
}

export default function Emergency() {
  const [services, setServices] = useState([])
  const [sosStatus, setSosStatus] = useState(null)
  const [requestStatus, setRequestStatus] = useState(null)

  useEffect(() => {
    getEmergencyServices().then(setServices)
  }, [])

  const handleSOS = async () => {
    setSosStatus(null)
    try {
      const result = await triggerSOS({ lat: 19.076, lng: 72.8777 })
      setSosStatus({ type: 'success', message: result.message })
    } catch (err) {
      setSosStatus({ type: 'error', message: err.message })
    }
  }

  const handleRequest = async (serviceId) => {
    setRequestStatus(null)
    try {
      const result = await requestEmergency(serviceId, { lat: 19.076, lng: 72.8777 })
      setRequestStatus({ type: 'success', message: result.message })
    } catch (err) {
      setRequestStatus({ type: 'error', message: err.message })
    }
  }

  return (
    <div className="page">
      <Header />
      <div className="page-content narrow">
        <div className="sos-section">
          <button type="button" className="sos-btn" onClick={handleSOS}>
            SOS
          </button>
          <p>Tap for immediate emergency assistance</p>
          {sosStatus && <div className={`form-status ${sosStatus.type}`}>{sosStatus.message}</div>}
        </div>

        <h2 className="page-title">Emergency Services</h2>
        <p className="page-subtitle">Request help from nearby emergency responders</p>

        <div className="service-list">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Shield
            return (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <Icon size={28} />
                </div>
                <div className="service-info">
                  <strong>{service.name}</strong>
                  <span>{service.distance} away</span>
                  <span className={`availability ${service.available ? 'available' : 'unavailable'}`}>
                    {service.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-primary btn-sm"
                  disabled={!service.available}
                  onClick={() => handleRequest(service.id)}
                >
                  Request Now
                </button>
              </div>
            )
          })}
        </div>

        {requestStatus && <div className={`form-status ${requestStatus.type}`}>{requestStatus.message}</div>}

        <a href="tel:112" className="helpline-card">
          <Phone size={24} />
          <div>
            <strong>Emergency Helpline 112</strong>
            <span>Available 24/7</span>
          </div>
        </a>
      </div>
    </div>
  )
}
