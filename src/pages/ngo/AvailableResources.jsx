import { useState } from 'react'
import '../NgoDashboard.css'

function AvailableResources() {
  const [resources, setResources] = useState([
    { id: 1, name: 'Medical Kits', quantity: 50, status: 'Available', category: 'Medical' },
    { id: 2, name: 'Food Packs', quantity: 200, status: 'Low Stock', category: 'Food' },
    { id: 3, name: 'Blankets', quantity: 100, status: 'Available', category: 'Shelter' },
    { id: 4, name: 'Water Bottles', quantity: 300, status: 'Available', category: 'Essentials' }
  ])

  const handleUpdateResource = (id, newQuantity) => {
    setResources(res =>
      res.map(r => r.id === id ? { ...r, quantity: newQuantity } : r)
    )
  }

  const handleRequestMore = (id) => {
    alert(`Requesting more ${resources.find(r => r.id === id).name}`)
  }

  return (
    <div className="available-resources">
      <h2>Available Resources</h2>
      <p>Monitor and manage your resource inventory.</p>
      <div className="resources-list">
        {resources.map(resource => (
          <div key={resource.id} className="resource-card">
            <div className="resource-info">
              <h3>{resource.name}</h3>
              <p>Category: {resource.category}</p>
              <p>Quantity: {resource.quantity}</p>
              <span className={`status ${resource.status.toLowerCase().replace(' ', '-')}`}>
                {resource.status}
              </span>
            </div>
            <div className="resource-actions">
              <input
                type="number"
                min="0"
                value={resource.quantity}
                onChange={(e) => handleUpdateResource(resource.id, parseInt(e.target.value) || 0)}
              />
              <button onClick={() => handleUpdateResource(resource.id, resource.quantity)}>Update</button>
              <button className="secondary" onClick={() => handleRequestMore(resource.id)}>Request More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvailableResources