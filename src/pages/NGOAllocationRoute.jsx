import { useEffect, useState } from 'react'
import { ArrowLeft, MapPin, Navigation } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import DisasterMap from '../components/map/DisasterMap'
import { getNGOAllocationHistory, getNGOAllocationRoute } from '../api/services'
import { getNGOLocation } from '../data/ngoLocation'
import './pages.css'

export default function NGOAllocationRoute() {
  const { allocationId } = useParams()
  const [location] = useState(getNGOLocation)
  const [allocation, setAllocation] = useState(null)
  const [route, setRoute] = useState(null)

  useEffect(() => {
    getNGOAllocationHistory().then((allocations) => {
      const selectedAllocation = allocations.find((item) => String(item.id) === String(allocationId))
      setAllocation(selectedAllocation || null)
      if (selectedAllocation) {
        getNGOAllocationRoute(allocationId, location).then(setRoute)
      }
    })
  }, [allocationId, location])

  if (!allocation || !route) {
    return (
      <div className="page">
        <Header userName="NGO" />
        <div className="page-content loading">Loading assigned route...</div>
      </div>
    )
  }

  return (
    <div className="page">
      <Header userName="NGO" />
      <div className="page-content">
        <Link to="/ngo-dashboard/alerts" className="back-link"><ArrowLeft size={16} /> Back to notifications</Link>
        <h2 className="page-title">Route to {allocation.type}</h2>
        <p className="page-subtitle">Admin-assigned route from your NGO location to {allocation.location}</p>

        <div className="route-info">
          <span><MapPin size={16} /> {location.name} to {allocation.location}</span>
          <span>{route.distance}</span>
          <span>{route.duration}</span>
        </div>

        <DisasterMap
          route={route}
          markers={[
            { id: 'ngo-location', type: 'ngo', lat: location.latitude, lng: location.longitude, label: location.name },
            { id: 'allocated-disaster', type: 'disaster', lat: allocation.latitude, lng: allocation.longitude, label: allocation.location },
          ]}
          center={[allocation.latitude, allocation.longitude]}
          height="calc(100vh - 300px)"
        />

        <button type="button" className="btn-primary btn-nav">
          <Navigation size={20} /> Start Navigation
        </button>
      </div>
    </div>
  )
}
