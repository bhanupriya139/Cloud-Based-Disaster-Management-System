import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminLayout from './components/layout/AdminLayout'
import NGOLayout from './components/layout/NGOLayout'
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
import AdminLogin from './pages/AdminLogin'
import NGOLogin from './pages/NGOLogin'
import NGODashboard from './pages/NGODashboard'

// NGO Specific Pages
import NGOMap from './pages/NGOMap'
import NGOResources from './pages/NGOResources'
import NGOAlerts from './pages/NGOAlerts'
import NGOAllocationRoute from './pages/NGOAllocationRoute'

// Admin Specific Pages
import AdminNGODirectory from './pages/AdminNGODirectory'
import AdminNGORequests from './pages/AdminNGORequests'
import AdminAlerts from './pages/AdminAlerts'
import AdminResources from './pages/AdminResources'
import AdminAnalytics from './pages/AdminAnalytics'
import AdminSettings from './pages/AdminSettings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="ngo-login" element={<NGOLogin />} />
        <Route path="admin-login" element={<AdminLogin />} />
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
          <Route path="more" element={<MoreMenu />} />
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="ngos" element={<AdminNGODirectory />} />
          <Route path="ngo-requests" element={<AdminNGORequests />} />
          <Route path="alerts" element={<AdminAlerts />} />
          <Route path="resources" element={<AdminResources />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="more" element={<MoreMenu />} />
        </Route>
        <Route path="ngo-dashboard" element={<NGOLayout />}>
          <Route index element={<NGODashboard />} />
          <Route path="map" element={<NGOMap />} />
          <Route path="resources" element={<NGOResources />} />
          <Route path="alerts" element={<NGOAlerts />} />
          <Route path="routes/:allocationId" element={<NGOAllocationRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
