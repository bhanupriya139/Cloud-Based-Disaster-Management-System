import { useState } from 'react'
import './AdminDashboard.css'

function AdminDashboard({ onNavigate }) {
  const [ngos, setNgos] = useState([
    { id: 1, name: 'Relief Aid Foundation', status: 'Active', location: 'Downtown' },
    { id: 2, name: 'Global Help NGO', status: 'Pending', location: 'Suburb A' },
    { id: 3, name: 'Emergency Response Team', status: 'Active', location: 'Area B' }
  ])

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Volunteer', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Coordinator', status: 'Active' },
    { id: 3, name: 'Bob Johnson', role: 'Admin', status: 'Inactive' }
  ])

  const handleApproveNgo = (id) => {
    setNgos(ngos =>
      ngos.map(ngo => ngo.id === id ? { ...ngo, status: 'Active' } : ngo)
    )
  }

  const handleDeactivateUser = (id) => {
    setUsers(users =>
      users.map(user => user.id === id ? { ...user, status: 'Inactive' } : user)
    )
  }

  return (
    <main className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button type="button" className="logout-btn" onClick={() => onNavigate('home')}>
          Logout
        </button>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-section">
          <h2>System Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total NGOs</h3>
              <p className="stat-number">{ngos.length}</p>
            </div>
            <div className="stat-card">
              <h3>Active Users</h3>
              <p className="stat-number">{users.filter(u => u.status === 'Active').length}</p>
            </div>
            <div className="stat-card">
              <h3>Pending Approvals</h3>
              <p className="stat-number">{ngos.filter(n => n.status === 'Pending').length}</p>
            </div>
            <div className="stat-card">
              <h3>Emergency Alerts</h3>
              <p className="stat-number">5</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>NGO Management</h2>
          <div className="ngo-list">
            {ngos.map(ngo => (
              <div key={ngo.id} className="ngo-card">
                <div className="ngo-info">
                  <h3>{ngo.name}</h3>
                  <p>Location: {ngo.location}</p>
                  <span className={`status ${ngo.status.toLowerCase()}`}>
                    {ngo.status}
                  </span>
                </div>
                <div className="ngo-actions">
                  {ngo.status === 'Pending' && (
                    <button onClick={() => handleApproveNgo(ngo.id)}>Approve</button>
                  )}
                  <button className="secondary">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>User Management</h2>
          <div className="user-list">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>Role: {user.role}</p>
                  <span className={`status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </div>
                <div className="user-actions">
                  {user.status === 'Active' && (
                    <button onClick={() => handleDeactivateUser(user.id)}>Deactivate</button>
                  )}
                  <button className="secondary">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>System Settings</h2>
          <div className="settings-grid">
            <button className="setting-btn" onClick={() => alert('System backup initiated')}>
              Backup System
            </button>
            <button className="setting-btn" onClick={() => alert('Logs exported')}>
              Export Logs
            </button>
            <button className="setting-btn" onClick={() => alert('Notifications sent')}>
              Send Broadcast
            </button>
            <button className="setting-btn" onClick={() => alert('Settings updated')}>
              Update Settings
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminDashboard