import { useState } from 'react'
import { Check, X, Bell } from 'lucide-react'
import Header from '../components/layout/Header'
import { getNGOSignupRequests, updateNGOSignupRequest } from '../api/services'
import './pages.css'

export default function AdminNGORequests() {
  const [requests, setRequests] = useState(getNGOSignupRequests)

  const handleDecision = (requestId, status) => {
    const updatedRequest = updateNGOSignupRequest(requestId, status)
    setRequests((current) => current.map((request) => (
      request.id === requestId ? updatedRequest : request
    )))
  }

  const pendingRequests = requests.filter((request) => request.status === 'Pending')

  return (
    <div className="page">
      <Header userName="Admin" />
      <div className="page-content narrow">
        <h2 className="page-title">NGO Registration Requests</h2>
        <p className="page-subtitle">Review NGO information before granting portal access</p>

        <div className="panel">
          <h3 className="panel-title"><Bell size={18} /> Pending requests ({pendingRequests.length})</h3>
          <div className="service-list">
            {pendingRequests.length === 0 && (
              <p className="empty-state">There are no pending NGO registration requests.</p>
            )}
            {pendingRequests.map((request) => (
              <div key={request.id} className="ngo-request-card">
                <div className="service-info">
                  <strong>{request.name}</strong>
                  <span>{request.email} | {request.phone}</span>
                  <span>{request.address}</span>
                  <p>{request.organizationInfo}</p>
                </div>
                <div className="request-actions">
                  <button type="button" className="btn-primary btn-sm" onClick={() => handleDecision(request.id, 'Accepted')}>
                    <Check size={16} /> Accept
                  </button>
                  <button type="button" className="btn-danger btn-sm" onClick={() => handleDecision(request.id, 'Rejected')}>
                    <X size={16} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title">Decision history</h3>
          <div className="service-list">
            {requests.filter((request) => request.status !== 'Pending').map((request) => (
              <div key={request.id} className="service-card">
                <div className="service-info">
                  <strong>{request.name}</strong>
                  <span>{request.email}</span>
                </div>
                <span className={`status-badge ${request.status.toLowerCase()}`}>{request.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
