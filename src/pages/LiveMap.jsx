import { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import DisasterMap from '../components/map/DisasterMap'
import { getMapMarkers } from '../api/services'
import './pages.css'

export default function LiveMap() {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    getMapMarkers().then(setMarkers)
  }, [])

  return (
    <div className="page">
      <Header />
      <div className="page-content">
        <h2 className="page-title">Live Map</h2>
        <p className="page-subtitle">Real-time disaster zones, shelters, hospitals, and NGOs</p>
        <DisasterMap markers={markers} height="calc(100vh - 180px)" />
      </div>
    </div>
  )
}
