import { useEffect, useState } from 'react'
import { Navigation, Shield, Zap } from 'lucide-react'
import Header from '../components/layout/Header'
import DisasterMap from '../components/map/DisasterMap'
import { getSafeRoute } from '../api/services'
import './pages.css'

export default function SafeRoutes() {
  const [routeType, setRouteType] = useState('safest')
  const [route, setRoute] = useState(null)

  useEffect(() => {
    getSafeRoute(
      { lat: 19.076, lng: 72.8777 },
      { lat: 19.07, lng: 72.87 },
      routeType
    ).then(setRoute)
  }, [routeType])

  return (
    <div className="page">
      <Header />
      <div className="page-content">
        <h2 className="page-title">Safe Routes</h2>
        <p className="page-subtitle">Navigate to the nearest relief camp safely</p>

        <div className="route-options">
          <button
            type="button"
            className={`route-option${routeType === 'safest' ? ' active' : ''}`}
            onClick={() => setRouteType('safest')}
          >
            <Shield size={20} />
            Safest Route
          </button>
          <button
            type="button"
            className={`route-option${routeType === 'fastest' ? ' active' : ''}`}
            onClick={() => setRouteType('fastest')}
          >
            <Zap size={20} />
            Fastest Route
          </button>
        </div>

        {route && (
          <div className="route-info">
            <span>{route.distance}</span>
            <span>{route.duration}</span>
          </div>
        )}

        <DisasterMap
          route={route}
          markers={[
            { id: 'start', type: 'hospital', lat: 19.076, lng: 72.8777, label: 'Your Location' },
            { id: 'end', type: 'shelter', lat: 19.07, lng: 72.87, label: 'Relief Camp' },
          ]}
          height="400px"
          showLegend={false}
        />

        <button type="button" className="btn-primary btn-nav">
          <Navigation size={20} />
          Start Navigation
        </button>
      </div>
    </div>
  )
}
