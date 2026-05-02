import '../NgoDashboard.css'

function NgoHome() {
  return (
    <div className="ngo-home">
      <h2>Welcome to NGO Dashboard</h2>
      <p>Manage disaster relief operations from here.</p>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Active Requests</h3>
          <p className="stat-number">12</p>
        </div>
        <div className="stat-card">
          <h3>Available Resources</h3>
          <p className="stat-number">450</p>
        </div>
        <div className="stat-card">
          <h3>Completed Missions</h3>
          <p className="stat-number">89</p>
        </div>
        <div className="stat-card">
          <h3>Volunteers</h3>
          <p className="stat-number">156</p>
        </div>
      </div>
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>Medical aid delivered to Downtown area</li>
          <li>Food supplies allocated to Suburb A</li>
          <li>New volunteer team joined</li>
        </ul>
      </div>
    </div>
  )
}

export default NgoHome