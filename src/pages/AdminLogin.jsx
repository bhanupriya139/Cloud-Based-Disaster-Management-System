import { useState } from 'react'
import './NgoAuth.css'

function AdminLogin({ onNavigate }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    alert(`Admin login submitted: ${username}`)
    onNavigate('admin-dashboard')
  }

  return (
    <main className="form-page">
      <div className="form-card">
        <h2>Admin Login</h2>
        <p>Sign in to access administrative controls.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>
          <button type="submit">Sign in</button>
        </form>
        <button type="button" className="secondary back-button" onClick={() => onNavigate('home')}>
          Back to Home
        </button>
      </div>
    </main>
  )
}

export default AdminLogin