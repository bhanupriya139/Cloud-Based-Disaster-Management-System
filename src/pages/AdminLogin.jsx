import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, Key } from 'lucide-react'
import Header from '../components/layout/Header'
import './pages.css'

const ADMIN_USERNAME = 'admin@example.com'
const ADMIN_PASSWORD = 'admin123'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (localStorage.getItem('isAdminAuthenticated') === 'true') {
      navigate('/admin')
    }
  }, [navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdminAuthenticated', 'true')
      navigate('/admin')
      return
    }

    setError('Invalid admin credentials. Please try again.')
  }

  return (
    <div className="page">
      <Header />
      <div className="page-content narrow">
        <div className="form-panel">
          <h2 className="page-title">Admin Sign In</h2>
          <p className="page-subtitle">Enter your admin credentials to access the dashboard.</p>

          {error && <div className="form-status error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="admin-email">
                <Mail size={16} /> Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="admin-password">
                <Key size={16} /> Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn-primary btn-nav">
              <Lock size={16} /> Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
