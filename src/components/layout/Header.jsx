import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, MapPin } from 'lucide-react'
import { getNGOLocationName } from '../../data/ngoLocation'
import { getSavedUserLocation, reverseGeocode, saveUserLocation } from '../../utils/location'
import './Header.css'

export default function Header({ userName = 'Guest', location }) {
  const navigate = useNavigate()
  const [savedUserLocation, setSavedUserLocation] = useState(
    userName === 'NGO' ? null : getSavedUserLocation,
  )

  useEffect(() => {
    if (userName !== 'NGO' && savedUserLocation && !savedUserLocation.label) {
      reverseGeocode(savedUserLocation)
        .then((label) => {
          if (!label) return
          const updatedLocation = { ...savedUserLocation, label }
          saveUserLocation(updatedLocation)
          setSavedUserLocation(updatedLocation)
        })
        .catch(() => {})
    }
  }, [savedUserLocation, userName])

  const displayedLocation = location || (userName === 'NGO'
    ? getNGOLocationName()
    : savedUserLocation?.label || 'Mumbai, Maharashtra')

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-greeting">Welcome, {userName}!</h1>
        <div className="header-location">
          <MapPin size={14} />
          <span>{displayedLocation}</span>
        </div>
      </div>

      <div className="header-actions">

        <button
          type="button"
          className="header-notify"
          aria-label="Notifications"
          title="View alerts"
          onClick={() => navigate(userName === 'NGO' ? '/ngo-dashboard/alerts' : '/alerts')}
        >
          <Bell size={20} />
          <span className="notify-dot" />
        </button>
      </div>
    </header>
  )
}
