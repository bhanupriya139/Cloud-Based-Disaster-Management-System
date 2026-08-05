import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import LiveMap from './pages/LiveMap'
import ReportIncident from './pages/ReportIncident'
import Emergency from './pages/Emergency'
import NGODirectory from './pages/NGODirectory'
import Weather from './pages/Weather'
import SafeRoutes from './pages/SafeRoutes'
import Alerts from './pages/Alerts'
import Resources from './pages/Resources'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import AdminDashboard, { MoreMenu } from './pages/AdminDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="map" element={<LiveMap />} />
          <Route path="report" element={<ReportIncident />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="ngos" element={<NGODirectory />} />
          <Route path="weather" element={<Weather />} />
          <Route path="routes" element={<SafeRoutes />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="resources" element={<Resources />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="more" element={<MoreMenu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
