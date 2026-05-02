import { useState } from 'react'
import './UsersDashboard.css'

function UsersDashboard({ onNavigate }) {
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')

  const incidents = [
    {
      id: 1,
      title: 'Flood Relief - Zone A',
      location: 'Downtown District',
      status: 'Active',
      priority: 'High',
      affected: 1250,
      volunteers: 45,
    },
    {
      id: 2,
      title: 'Earthquake Support',
      location: 'Northern Region',
      status: 'Active',
      priority: 'Critical',
      affected: 3500,
      volunteers: 120,
    },
    {
      id: 3,
      title: 'Medical Supply Distribution',
      location: 'Central Hub',
      status: 'Ongoing',
      priority: 'Medium',
      affected: 800,
      volunteers: 32,
    },
  ]

  const quickActions = [
    { label: 'Report Emergency', icon: '🚨' },
    { label: 'Request Resources', icon: '📦' },
    { label: 'Update Status', icon: '✏️' },
    { label: 'View Reports', icon: '📊' },
  ]

  const handleQuickAction = (action) => {
    setModalType(action)
    setShowModal(true)
  }

  const handleViewIncident = (incident) => {
    setSelectedIncident(incident)
    setModalType('view-incident')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedIncident(null)
    setModalType('')
  }

  const handleReportEmergency = () => {
    alert('Emergency reported! Notification sent to all NGOs.')
    closeModal()
  }

  const handleRequestResources = () => {
    alert('Resource request submitted to available NGOs.')
    closeModal()
  }

  const handleUpdateStatus = () => {
    alert('Status update submitted.')
    closeModal()
  }

  const handleViewReports = () => {
    alert('Generating comprehensive reports...')
    closeModal()
  }

  return (
    <main className="users-dashboard">
      <header className="dashboard-header">
        <div className="header-top">
          <button className="home-link" onClick={() => onNavigate('home')}>← Back to Home</button>
          <h1>Emergency Response Dashboard</h1>
          <button className="logout-btn" onClick={() => onNavigate('home')}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="stats-bar">
          <div className="stat-card">
            <span className="stat-value">5</span>
            <span className="stat-label">Active Incidents</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">2,847</span>
            <span className="stat-label">People Affected</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">197</span>
            <span className="stat-label">Active Volunteers</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">34</span>
            <span className="stat-label">NGOs Mobilized</span>
          </div>
        </section>

        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                className="action-button"
                onClick={() => handleQuickAction(action.label)}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-label">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="incidents-section">
          <h2>Active Incidents</h2>
          <div className="incidents-table">
            <table>
              <thead>
                <tr>
                  <th>Incident</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Affected</th>
                  <th>Volunteers</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id}>
                    <td className="incident-title">{incident.title}</td>
                    <td>{incident.location}</td>
                    <td>
                      <span className={`badge status-${incident.status.toLowerCase()}`}>
                        {incident.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge priority-${incident.priority.toLowerCase()}`}>
                        {incident.priority}
                      </span>
                    </td>
                    <td className="number">{incident.affected.toLocaleString()}</td>
                    <td className="number">{incident.volunteers}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleViewIncident(incident)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="resources-section">
          <h2>Resource Inventory</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>Medical Supplies</h3>
              <p className="resource-value">1,240 units</p>
              <p className="resource-status">70% distributed</p>
            </div>
            <div className="resource-card">
              <h3>Food Packages</h3>
              <p className="resource-value">3,850 packages</p>
              <p className="resource-status">45% delivered</p>
            </div>
            <div className="resource-card">
              <h3>Shelter Tents</h3>
              <p className="resource-value">420 units</p>
              <p className="resource-status">60% deployed</p>
            </div>
            <div className="resource-card">
              <h3>Water Supply</h3>
              <p className="resource-value">8,500 liters</p>
              <p className="resource-status">80% distributed</p>
            </div>
          </div>
        </section>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            
            {modalType === 'Report Emergency' && (
              <div className="modal-form">
                <h2>Report Emergency</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleReportEmergency(); }}>
                  <label>
                    Emergency Type
                    <select required>
                      <option>Flood</option>
                      <option>Earthquake</option>
                      <option>Fire</option>
                      <option>Medical Crisis</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label>
                    Location
                    <input type="text" placeholder="Enter location" required />
                  </label>
                  <label>
                    Severity
                    <select required>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </label>
                  <label>
                    Description
                    <textarea placeholder="Describe the emergency situation" rows="4" required></textarea>
                  </label>
                  <button type="submit">Report Emergency</button>
                </form>
              </div>
            )}

            {modalType === 'Request Resources' && (
              <div className="modal-form">
                <h2>Request Resources</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleRequestResources(); }}>
                  <label>
                    Resource Type
                    <select required>
                      <option>Medical Supplies</option>
                      <option>Food Packages</option>
                      <option>Shelter Tents</option>
                      <option>Water Supply</option>
                      <option>Volunteers</option>
                    </select>
                  </label>
                  <label>
                    Quantity
                    <input type="number" placeholder="Enter quantity" required />
                  </label>
                  <label>
                    Destination
                    <input type="text" placeholder="Enter destination location" required />
                  </label>
                  <label>
                    Priority
                    <select required>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </label>
                  <button type="submit">Request Resources</button>
                </form>
              </div>
            )}

            {modalType === 'Update Status' && (
              <div className="modal-form">
                <h2>Update Incident Status</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleUpdateStatus(); }}>
                  <label>
                    Incident
                    <select required>
                      {incidents.map((inc) => (
                        <option key={inc.id}>{inc.title}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    New Status
                    <select required>
                      <option>Active</option>
                      <option>Ongoing</option>
                      <option>Resolved</option>
                      <option>Monitoring</option>
                    </select>
                  </label>
                  <label>
                    Update Notes
                    <textarea placeholder="Enter status update notes" rows="4"></textarea>
                  </label>
                  <button type="submit">Update Status</button>
                </form>
              </div>
            )}

            {modalType === 'View Reports' && (
              <div className="modal-form">
                <h2>Emergency Reports</h2>
                <div className="reports-list">
                  <div className="report-item">
                    <h3>Daily Operations Report</h3>
                    <p>Summary of all incidents and response actions</p>
                    <button className="secondary">Download</button>
                  </div>
                  <div className="report-item">
                    <h3>Resource Allocation Report</h3>
                    <p>Detailed breakdown of resource distribution</p>
                    <button className="secondary">Download</button>
                  </div>
                  <div className="report-item">
                    <h3>Volunteer Activity Report</h3>
                    <p>Volunteer deployment and work hours</p>
                    <button className="secondary">Download</button>
                  </div>
                  <div className="report-item">
                    <h3>Impact Assessment</h3>
                    <p>Affected population and recovery metrics</p>
                    <button className="secondary">Download</button>
                  </div>
                </div>
              </div>
            )}

            {modalType === 'view-incident' && selectedIncident && (
              <div className="modal-form">
                <h2>{selectedIncident.title}</h2>
                <div className="incident-details">
                  <div className="detail-row">
                    <span className="label">Location:</span>
                    <span className="value">{selectedIncident.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Status:</span>
                    <span className={`badge status-${selectedIncident.status.toLowerCase()}`}>
                      {selectedIncident.status}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Priority:</span>
                    <span className={`badge priority-${selectedIncident.priority.toLowerCase()}`}>
                      {selectedIncident.priority}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">People Affected:</span>
                    <span className="value">{selectedIncident.affected.toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Active Volunteers:</span>
                    <span className="value">{selectedIncident.volunteers}</span>
                  </div>
                  <div className="detail-actions">
                    <button className="secondary" onClick={() => alert('Resource allocated to ' + selectedIncident.title)}>
                      Allocate Resources
                    </button>
                    <button className="secondary" onClick={() => alert('NGOs notified of ' + selectedIncident.title)}>
                      Notify NGOs
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default UsersDashboard;
