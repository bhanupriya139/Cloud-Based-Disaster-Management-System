import { useNavigate } from 'react-router-dom'
import { Bell, MapPin } from 'lucide-react'
import './Header.css'

export default function Header({ userName = 'Guest', location = 'Mumbai, Maharashtra' }) {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-greeting">Welcome, {userName}!</h1>
        <div className="header-location">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
      </div>

      <div className="header-actions">

        <button
          type="button"
          className="header-notify"
          aria-label="Notifications"
          title="View alerts"
          onClick={() => navigate('/alerts')}
        >
          <Bell size={20} />
          <span className="notify-dot" />
        </button>
      </div>
    </header>
  )
}
