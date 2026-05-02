import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage.jsx'
import NgoLogin from './pages/NgoLogin.jsx'
import NgoRegister from './pages/NgoRegister.jsx'
import UsersDashboard from './pages/UsersDashboard.jsx'
import NgoDashboard from './pages/NgoDashboard.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="app-shell">
      {page === 'home' && <HomePage onNavigate={setPage} />}
      {page === 'login' && <NgoLogin onNavigate={setPage} />}
      {page === 'register' && <NgoRegister onNavigate={setPage} />}
      {page === 'dashboard' && <UsersDashboard onNavigate={setPage} />}
      {page === 'ngo-dashboard' && <NgoDashboard onNavigate={setPage} />}
      {page === 'admin-login' && <AdminLogin onNavigate={setPage} />}
      {page === 'admin-dashboard' && <AdminDashboard onNavigate={setPage} />}
    </div>
  )
}

export default App
