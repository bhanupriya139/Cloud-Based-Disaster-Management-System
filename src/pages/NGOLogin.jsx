import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Mail, Key } from 'lucide-react'
import Header from '../components/layout/Header'
import './pages.css'

const DEFAULT_NGO_EMAIL = 'ngo@example.com'
const DEFAULT_NGO_PASSWORD = 'ngo123'
const NGO_USERS_KEY = 'ngoUsers'

function getStoredNGOUsers() {
  const stored = localStorage.getItem(NGO_USERS_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

function saveStoredNGOUsers(users) {
  localStorage.setItem(NGO_USERS_KEY, JSON.stringify(users))
}

export default function NGOLogin() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (localStorage.getItem('isNGOAuthenticated') === 'true') {
      navigate('/ngo-dashboard')
    }
  }, [navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your NGO name.')
        return
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.')
        return
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
      }

      const users = getStoredNGOUsers()
      const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase())
      if (exists || email.toLowerCase() === DEFAULT_NGO_EMAIL) {
        setError('This email is already registered. Please sign in.')
        return
      }

      const newUsers = [...users, { name: name.trim(), email: email.toLowerCase(), password }]
      saveStoredNGOUsers(newUsers)
      localStorage.setItem('isNGOAuthenticated', 'true')
      localStorage.setItem('currentNGOEmail', email.toLowerCase())
      localStorage.setItem('currentNGOName', name.trim())
      navigate('/ngo-dashboard')
      return
    }

    const storedUsers = getStoredNGOUsers()
    const match = storedUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    )

    if (match || (email === DEFAULT_NGO_EMAIL && password === DEFAULT_NGO_PASSWORD)) {
      localStorage.setItem('isNGOAuthenticated', 'true')
      const currentName = match?.name || 'NGO Partner'
      localStorage.setItem('currentNGOName', currentName)
      localStorage.setItem('currentNGOEmail', email.toLowerCase())
      navigate('/ngo-dashboard')
      return
    }

    setError('Invalid NGO credentials. Please try again or sign up if you are new.')
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setError('')
    setSuccess('')
  }

  return (
    <div className="page">
      <Header />
      <div className="page-content narrow">
        <div className="form-panel">
          <h2 className="page-title">NGO {mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
          <p className="page-subtitle">
            {mode === 'signin'
              ? 'Sign in with NGO credentials or switch to sign up for a new account.'
              : 'Create a new NGO account to manage relief operations.'}
          </p>

          {error && <div className="form-status error">{error}</div>}
          {success && <div className="form-status success">{success}</div>}

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="form-group">
                <label htmlFor="ngo-name">
                  <Users size={16} /> NGO Name
                </label>
                <input
                  id="ngo-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your NGO name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="ngo-email">
                <Mail size={16} /> NGO Email
              </label>
              <input
                id="ngo-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ngo@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="ngo-password">
                <Key size={16} /> Password
              </label>
              <input
                id="ngo-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {mode === 'signup' && (
              <div className="form-group">
                <label htmlFor="ngo-confirm-password">
                  <Key size={16} /> Confirm Password
                </label>
                <input
                  id="ngo-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            <button type="submit" className="btn-primary btn-nav">
              <Users size={16} /> {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="form-group" style={{ marginTop: 18, textAlign: 'center' }}>
            <button
              type="button"
              className="btn-nav"
              onClick={switchMode}
              style={{ width: '100%', background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)' }}
            >
              {mode === 'signin'
                ? 'New here? Create an NGO account'
                : 'Already registered? Go to sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
