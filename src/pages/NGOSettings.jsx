import Header from '../components/layout/Header'
import { API_BASE, USE_MOCK } from '../api/client'
import './pages.css'

export default function Settings() {
  return (
    <div className="page">
      <Header userName="NGO" />
      <div className="page-content narrow">
        <h2 className="page-title">Settings</h2>
        <p className="page-subtitle">Configure your preferences and API connection</p>

        <div className="panel">
          <h3 className="panel-title">Backend Connection</h3>
          <div className="settings-row">
            <span>API URL</span>
            <code>{API_BASE}</code>
          </div>
          <div className="settings-row">
            <span>Mock Data Mode</span>
            <span className={`badge ${USE_MOCK ? 'warning' : 'success'}`}>
              {USE_MOCK ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <p className="settings-hint">
            Set <code>VITE_API_URL</code> and <code>VITE_USE_MOCK_DATA=false</code> in your <code>.env</code> file to connect to your backend.
          </p>
        </div>

        <div className="panel">
          <h3 className="panel-title">Notifications</h3>
          <label className="toggle-row">
            <span>Disaster alerts</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="toggle-row">
            <span>Weather updates</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="toggle-row">
            <span>Emergency broadcasts</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>

        <div className="panel">
          <h3 className="panel-title">Location</h3>
          <div className="form-group">
            <label htmlFor="city">Default City</label>
            <input id="city" type="text" defaultValue="Mumbai" />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input id="state" type="text" defaultValue="Maharashtra" />
          </div>
        </div>
      </div>
    </div>
  )
}
