import { useEffect, useState } from 'react'
import { Ambulance, Flame, HeartPulse, Plus, X } from 'lucide-react'
import Header from '../components/layout/Header'
import { getNearbyResources } from '../api/services'
import './pages.css'

const NGO_RESOURCES_KEY = 'ngoResources'

const iconMap = {
  Ambulances: Ambulance,
  'Fire Trucks': Flame,
  'Medical Kits': HeartPulse,
}

function getSavedResources() {
  try {
    const saved = JSON.parse(localStorage.getItem(NGO_RESOURCES_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export default function Resources() {
  const [resources, setResources] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState({ type: 'existing', name: '', quantity: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    getNearbyResources(19.076, 72.8777).then((nearbyResources) => {
      const savedResources = getSavedResources()
      const mergedResources = nearbyResources
        .map((resource) => {
          const saved = savedResources.find((item) => item.name === resource.name)
          return saved ? { ...resource, ...saved } : resource
        })
        .concat(savedResources.filter((saved) => !nearbyResources.some((resource) => resource.name === saved.name)))
      setResources(mergedResources)
      setForm((current) => ({ ...current, name: mergedResources[0]?.name || '' }))
    })
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setStatus('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const quantity = Number(form.quantity)
    const name = form.type === 'existing' ? form.name : form.name.trim()

    if (!name || !Number.isInteger(quantity) || quantity < 1) {
      setStatus('Choose a resource and enter a whole quantity greater than zero.')
      return
    }

    const existing = resources.find((resource) => resource.name === name)
    const nextResources = existing
      ? resources.map((resource) => resource.name === name
        ? { ...resource, count: resource.count + quantity, total: resource.total + quantity }
        : resource)
      : [...resources, { name, count: quantity, total: quantity, color: '#0ea5e9' }]

    setResources(nextResources)
    localStorage.setItem(NGO_RESOURCES_KEY, JSON.stringify(nextResources))
    setForm({ type: 'existing', name: nextResources[0]?.name || '', quantity: '' })
    setStatus(`${quantity} ${name} added to your resources.`)
    setIsFormOpen(false)
  }

  return (
    <div className="page">
      <Header userName="NGO" />
      <div className="page-content">
        <div className="page-heading-row">
          <div>
            <h2 className="page-title">Emergency Resources</h2>
            <p className="page-subtitle">Available resources near your location</p>
          </div>
          <button type="button" className="btn-primary" onClick={() => setIsFormOpen((open) => !open)}>
            {isFormOpen ? <X size={17} /> : <Plus size={17} />}
            {isFormOpen ? 'Cancel' : 'Add resource'}
          </button>
        </div>

        {isFormOpen && (
          <form className="form-panel resource-form" onSubmit={handleSubmit}>
            <h3 className="panel-title">Add to resource inventory</h3>
            <div className="resource-form-fields">
              <div className="form-group">
                <label htmlFor="resource-type">What are you adding?</label>
                <select id="resource-type" name="type" value={form.type} onChange={handleChange}>
                  <option value="existing">Quantity to an existing resource</option>
                  <option value="new">A new resource type</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="resource-name">Resource</label>
                {form.type === 'existing' ? (
                  <select id="resource-name" name="name" value={form.name} onChange={handleChange} required>
                    <option value="" disabled>Select a resource</option>
                    {resources.map((resource) => <option key={resource.name} value={resource.name}>{resource.name}</option>)}
                  </select>
                ) : (
                  <input id="resource-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="e.g. Water Bottles" required />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="resource-quantity">Quantity</label>
                <input id="resource-quantity" name="quantity" type="number" min="1" step="1" value={form.quantity} onChange={handleChange} placeholder="0" required />
              </div>
            </div>
            <button type="submit" className="btn-primary">Add resource</button>
          </form>
        )}

        {status && <p className="form-status">{status}</p>}

        <div className="resource-cards grid">
          {resources.map((r) => {
            const Icon = iconMap[r.name] || HeartPulse
            return (
              <div key={r.name} className="resource-card large">
                <div className="resource-icon" style={{ color: r.color }}>
                  <Icon size={32} />
                </div>
                <div className="resource-info">
                  <span>{r.name}</span>
                  <strong>{r.count} / {r.total}</strong>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(r.count / r.total) * 100}%`, background: r.color }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
