import { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import DisasterMap from '../components/map/DisasterMap'
import { getMapMarkers } from '../api/services'
import { getCurrentLocation } from '../utils/location'
import './pages.css'

export default function LiveMap() {
  const [markers, setMarkers] = useState([])
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([getMapMarkers(), getCurrentLocation()])
      .then(([mapMarkers, currentLocation]) => {
        setMarkers([
          ...mapMarkers,
          { id: 'current-user', type: 'ngo', ...currentLocation, label: 'Your Location' },
        ])
        setLocation(currentLocation)
      })
      .catch((err) => setError(err.message))
  }, [])

  if (!location) {
    return <div className="page"><Header /><div className="page-content loading">{error || 'Finding your location...'}</div></div>
  }

  return (
    <div className="page">
      <Header />
      <div className="page-content">
        <h2 className="page-title">Live Map</h2>
        <p className="page-subtitle">Real-time disaster zones, shelters, hospitals, and NGOs</p>
        <DisasterMap markers={markers} center={[location.lat, location.lng]} height="calc(100vh - 180px)" />
      </div>
    </div>
  )
}
