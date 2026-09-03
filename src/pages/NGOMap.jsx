import { useEffect, useState } from 'react'
import { LocateFixed, MapPin, Save } from 'lucide-react'
import Header from '../components/layout/Header'
import DisasterMap from '../components/map/DisasterMap'
import { getMapMarkers } from '../api/services'
import './pages.css'

const NGO_LOCATION_KEY = 'ngoLocation'
const defaultLocation = {
  name: 'Mumbai NGO Office',
  latitude: 19.076,
  longitude: 72.8777,
}

function getSavedLocation() {
  try {
    const saved = JSON.parse(localStorage.getItem(NGO_LOCATION_KEY))
    return saved ? { ...defaultLocation, ...saved } : defaultLocation
  } catch {
    return defaultLocation
  }
}

export default function NGOMap() {
  const [markers, setMarkers] = useState([])
  const [location, setLocation] = useState(getSavedLocation)
  const [form, setForm] = useState(() => {
    const saved = getSavedLocation()
    return {
      name: saved.name,
      latitude: String(saved.latitude),
      longitude: String(saved.longitude),
    }
  })
  const [status, setStatus] = useState('')

  useEffect(() => {
    getMapMarkers().then(setMarkers)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const latitude = Number(form.latitude)
    const longitude = Number(form.longitude)

    if (!form.name.trim() || !Number.isFinite(latitude) || !Number.isFinite(longitude)
      || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      setStatus('Enter a name and valid latitude and longitude values.')
      return
    }

    const nextLocation = { name: form.name.trim(), latitude, longitude }
    localStorage.setItem(NGO_LOCATION_KEY, JSON.stringify(nextLocation))
    setLocation(nextLocation)
    setStatus('NGO location updated.')
  }

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Location access is not available in this browser.')
      return
    }

    setStatus('Finding your current location...')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setForm((current) => ({
          ...current,
          latitude: coords.latitude.toFixed(6),
          longitude: coords.longitude.toFixed(6),
        }))
        setStatus('Coordinates loaded. Save to update the NGO location.')
      },
      () => setStatus('Could not access your location. Enter coordinates manually.'),
    )
  }

  const ngoMarker = {
    id: 'current-ngo',
    type: 'ngo',
    lat: location.latitude,
    lng: location.longitude,
    label: location.name,
  }

  return (
    <div className="page">
      <Header userName="NGO" />
      <div className="page-content">
        <h2 className="page-title">NGO Location</h2>
        <p className="page-subtitle">View and update your organization&apos;s location on the response map.</p>

        <div className="dashboard-grid">
          <div className="panel map-panel">
            <h3 className="panel-title"><MapPin size={18} /> {location.name}</h3>
            <DisasterMap
              key={`${location.latitude}-${location.longitude}`}
              markers={[...markers, ngoMarker]}
              center={[location.latitude, location.longitude]}
              height="calc(100vh - 250px)"
            />
          </div>

          <form className="form-panel" onSubmit={handleSubmit}>
            <h3 className="panel-title">Change NGO location</h3>
            <div className="form-group">
              <label htmlFor="ngo-location-name">Location name</label>
              <input id="ngo-location-name" name="name" type="text" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="ngo-latitude">Latitude</label>
              <input id="ngo-latitude" name="latitude" type="number" step="any" min="-90" max="90" value={form.latitude} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="ngo-longitude">Longitude</label>
              <input id="ngo-longitude" name="longitude" type="number" step="any" min="-180" max="180" value={form.longitude} onChange={handleChange} required />
            </div>
            <button type="button" className="btn-primary btn-sm" onClick={useCurrentLocation}>
              <LocateFixed size={16} /> Use current location
            </button>
            <button type="submit" className="btn-primary btn-nav">
              <Save size={16} /> Save location
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
