import { useState } from 'react'
import '../NgoDashboard.css'

function ActiveAllocation() {
  const [activeRequests, setActiveRequests] = useState([
    { id: 1, type: 'Medical Aid', location: 'Downtown', status: 'Pending', priority: 'High' },
    { id: 2, type: 'Food Supplies', location: 'Suburb A', status: 'In Progress', priority: 'Medium' },
    { id: 3, type: 'Shelter', location: 'Area B', status: 'Completed', priority: 'Low' }
  ])

  const handleAcceptRequest = (id) => {
    setActiveRequests(requests =>
      requests.map(req => req.id === id ? { ...req, status: 'In Progress' } : req)
    )
  }

  const handleCompleteRequest = (id) => {
    setActiveRequests(requests =>
      requests.map(req => req.id === id ? { ...req, status: 'Completed' } : req)
    )
  }

  return (
    <div className="active-allocation">
      <h2>Active Allocation</h2>
      <p>Manage ongoing relief requests and allocations.</p>
      <div className="requests-list">
        {activeRequests.map(request => (
          <div key={request.id} className="request-card">
            <div className="request-info">
              <h3>{request.type}</h3>
              <p>Location: {request.location}</p>
              <p>Priority: <span className={`priority ${request.priority.toLowerCase()}`}>{request.priority}</span></p>
              <span className={`status ${request.status.toLowerCase().replace(' ', '-')}`}>
                {request.status}
              </span>
            </div>
            <div className="request-actions">
              {request.status === 'Pending' && (
                <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
              )}
              {request.status === 'In Progress' && (
                <button onClick={() => handleCompleteRequest(request.id)}>Mark Complete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActiveAllocation