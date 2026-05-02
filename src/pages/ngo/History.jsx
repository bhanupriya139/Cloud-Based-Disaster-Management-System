import '../NgoDashboard.css'

function History() {
  const historyData = [
    { id: 1, type: 'Medical Aid', location: 'Downtown', date: '2024-05-01', status: 'Completed' },
    { id: 2, type: 'Food Supplies', location: 'Suburb A', date: '2024-04-28', status: 'Completed' },
    { id: 3, type: 'Shelter', location: 'Area B', date: '2024-04-25', status: 'Completed' },
    { id: 4, type: 'Water Distribution', location: 'City Center', date: '2024-04-20', status: 'Completed' }
  ]

  return (
    <div className="history">
      <h2>History</h2>
      <p>View past relief operations and allocations.</p>
      <div className="history-list">
        {historyData.map(item => (
          <div key={item.id} className="history-card">
            <div className="history-info">
              <h3>{item.type}</h3>
              <p>Location: {item.location}</p>
              <p>Date: {item.date}</p>
              <span className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History