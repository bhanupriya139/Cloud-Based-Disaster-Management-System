import { useState } from 'react'
import './NgoDashboard.css'
import NgoHome from './ngo/NgoHome.jsx'
import ActiveAllocation from './ngo/ActiveAllocation.jsx'
import AvailableResources from './ngo/AvailableResources.jsx'
import History from './ngo/History.jsx'

function NgoDashboard({ onNavigate }) {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <NgoHome />
      case 'active':
        return <ActiveAllocation />
      case 'resources':
        return <AvailableResources />
      case 'history':
        return <History />
      default:
        return <NgoHome />
    }
  }

  return (
    <div className="ngo-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>NGO Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={currentPage === 'home' ? 'active' : ''}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </button>
          <button
            className={currentPage === 'active' ? 'active' : ''}
            onClick={() => setCurrentPage('active')}
          >
            Active Allocation
          </button>
          <button
            className={currentPage === 'resources' ? 'active' : ''}
            onClick={() => setCurrentPage('resources')}
          >
            Available Resources
          </button>
          <button
            className={currentPage === 'history' ? 'active' : ''}
            onClick={() => setCurrentPage('history')}
          >
            History
          </button>
        </nav>
        <button className="logout-btn" onClick={() => onNavigate('home')}>
          Logout
        </button>
      </aside>
      <main className="dashboard-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default NgoDashboard