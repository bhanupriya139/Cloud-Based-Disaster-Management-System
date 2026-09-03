import { useState } from 'react'
import { Camera, Mic, Video, MapPin, Send } from 'lucide-react'
import Header from '../components/layout/Header'
import { reportIncident } from '../api/services'
import { incidentTypes } from '../data/mockData'
import './pages.css'

export default function ReportIncident() {
  const [form, setForm] = useState({
    type: 'Flood',
    description: '',
    location: '',
  })
  const [files, setFiles] = useState({ photo: null, video: null, audio: null })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const formData = new FormData()
    formData.append('type', form.type)
    formData.append('description', form.description)
    formData.append('location', form.location)
    if (files.photo) formData.append('photo', files.photo)
    if (files.video) formData.append('video', files.video)
    if (files.audio) formData.append('audio', files.audio)

    try {
      const result = await reportIncident(formData)
      setStatus({ type: 'success', message: result.message })
      setForm({ type: 'Flood', description: '', location: '' })
      setFiles({ photo: null, video: null, audio: null })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <Header userName="NGO" />
      <div className="page-content narrow">
        <h2 className="page-title">Report Incident</h2>
        <p className="page-subtitle">Help authorities respond faster by reporting what you see</p>

        <form className="form-panel" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">Incident Type</label>
            <select
              id="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              {incidentTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Upload Media</label>
            <div className="media-uploads">
              {[
                { key: 'photo', icon: Camera, label: 'Photo' },
                { key: 'video', icon: Video, label: 'Video' },
                { key: 'audio', icon: Mic, label: 'Audio' },
              ].map(({ key, icon: Icon, label }) => (
                <label key={key} className="media-btn">
                  <Icon size={20} />
                  <span>{files[key] ? files[key].name.slice(0, 12) : label}</span>
                  <input
                    type="file"
                    accept={key === 'photo' ? 'image/*' : key === 'video' ? 'video/*' : 'audio/*'}
                    hidden
                    onChange={(e) => setFiles({ ...files, [key]: e.target.files[0] })}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">
              <MapPin size={14} /> Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Enter address or use current location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={4}
              placeholder="Describe the incident in detail..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          {status && (
            <div className={`form-status ${status.type}`}>{status.message}</div>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            <Send size={18} />
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  )
}
