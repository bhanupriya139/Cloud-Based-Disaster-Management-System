import { useState } from 'react'
import './NgoAuth.css'

function NgoRegister({ onNavigate }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    alert(`Registration submitted for: ${name}`)
  }

  return (
    <main className="form-page">
      <div className="form-card">
        <h2>NGO Registration</h2>
        <p>Create an account to join the disaster management network.</p>
        <form onSubmit={handleSubmit}>
          <label>
            NGO name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Relief Aid Foundation"
              required
            />
          </label>
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
              placeholder="Create a password"
              required
            />
          </label>
          <label>
            Confirm password
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat your password"
              required
            />
          </label>
          <button type="submit">Register NGO</button>
        </form>
        <p className="form-footer">
          Already registered?{' '}
          <button type="button" className="link-button" onClick={() => onNavigate('login')}>
            Sign in
          </button>
        </p>
        <button type="button" className="secondary back-button" onClick={() => onNavigate('home')}>
          Back to Home
        </button>
      </div>
    </main>
  )
}

export default NgoRegister;
