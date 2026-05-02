import { useState } from 'react'
import './NgoAuth.css'

function NgoLogin({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    alert(`Login submitted: ${email}`)
    onNavigate('ngo-dashboard')
  }

  return (
    <main className="form-page">
      <div className="form-card">
        <h2>NGO Login</h2>
        <p>Sign in to access disaster response coordination tools.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ngo@example.org"
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
        <p className="form-footer">
          New NGO?{' '}
          <button type="button" className="link-button" onClick={() => onNavigate('register')}>
            Create account
          </button>
        </p>
        <button type="button" className="secondary back-button" onClick={() => onNavigate('home')}>
          Back to Home
        </button>
      </div>
    </main>
  )
}

export default NgoLogin;
