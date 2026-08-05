import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, MapPin } from 'lucide-react'
import './Header.css'

export default function Header({ userName = 'Guest', location = 'Mumbai, Maharashtra' }) {
  const [theme, setTheme] = useState('theme-vibrant')
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.classList.remove('theme-cool', 'theme-warm', 'theme-vibrant')
    document.documentElement.classList.add(theme)
  }, [theme])

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
        <div className="theme-toggle" role="tablist" aria-label="Theme selector">
          <button className={`theme-button ${theme === 'theme-vibrant' ? 'active' : ''}`} onClick={() => setTheme('theme-vibrant')} aria-pressed={theme === 'theme-vibrant'} title="Vibrant" />
          <button className={`theme-button ${theme === 'theme-cool' ? 'active' : ''}`} onClick={() => setTheme('theme-cool')} aria-pressed={theme === 'theme-cool'} title="Cool" />
          <button className={`theme-button ${theme === 'theme-warm' ? 'active' : ''}`} onClick={() => setTheme('theme-warm')} aria-pressed={theme === 'theme-warm'} title="Warm" />
        </div>

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
