import { apiRequest, USE_MOCK } from './client'
import {
  mockDashboard,
  mockMapMarkers,
  mockEmergencyServices,
  mockNGOs,
  mockWeather,
  mockAlerts,
  mockAdminStats,
} from '../data/mockData'

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getDashboard() {
  if (USE_MOCK) {
    await delay()
    return mockDashboard
  }
  return apiRequest('/dashboard')
}

export async function getWeather() {
  if (USE_MOCK) {
    await delay()
    return mockWeather
  }
  return apiRequest('/weather')
}

export async function getActiveAlerts() {
  if (USE_MOCK) {
    await delay()
    return mockAlerts
  }
  return apiRequest('/alerts/active')
}

export async function getMapMarkers() {
  if (USE_MOCK) {
    await delay()
    return mockMapMarkers
  }
  return apiRequest('/map/markers')
}

export async function getNearbyResources(lat, lng) {
  if (USE_MOCK) {
    await delay()
    return mockDashboard.resources
  }
  const params = lat && lng ? `?lat=${lat}&lng=${lng}` : ''
  return apiRequest(`/resources/nearby${params}`)
}

export async function getNGOs(filters = {}) {
  if (USE_MOCK) {
    await delay()
    let ngos = mockNGOs
    if (filters.category) {
      ngos = ngos.filter((n) => n.category.toLowerCase() === filters.category.toLowerCase())
    }
    return ngos
  }
  const params = new URLSearchParams(filters).toString()
  return apiRequest(`/ngos${params ? `?${params}` : ''}`)
}

export async function getEmergencyServices() {
  if (USE_MOCK) {
    await delay()
    return mockEmergencyServices
  }
  return apiRequest('/emergency/services')
}

export async function requestEmergency(serviceId, location) {
  if (USE_MOCK) {
    await delay(500)
    return { success: true, requestId: `REQ-${Date.now()}`, message: 'Emergency request submitted' }
  }
  return apiRequest('/emergency/request', {
    method: 'POST',
    body: { serviceId, location },
  })
}

export async function reportIncident(formData) {
  if (USE_MOCK) {
    await delay(500)
    return { success: true, incidentId: `INC-${Date.now()}`, message: 'Incident reported successfully' }
  }
  return apiRequest('/incidents/report', {
    method: 'POST',
    body: formData,
  })
}

export async function getSafeRoute(from, to, type = 'safest') {
  if (USE_MOCK) {
    await delay()
    return {
      type,
      distance: '4.2 km',
      duration: '18 min',
      waypoints: [
        { lat: 19.076, lng: 72.8777, label: 'Your Location' },
        { lat: 19.08, lng: 72.88, label: 'Checkpoint' },
        { lat: 19.07, lng: 72.87, label: 'Relief Camp' },
      ],
    }
  }
  return apiRequest('/routes/safe', {
    method: 'POST',
    body: { from, to, type },
  })
}

export async function getAdminStats() {
  if (USE_MOCK) {
    await delay()
    return mockAdminStats
  }
  return apiRequest('/admin/stats')
}

export async function triggerSOS(location) {
  if (USE_MOCK) {
    await delay(500)
    return { success: true, sosId: `SOS-${Date.now()}`, message: 'SOS signal sent. Help is on the way.' }
  }
  return apiRequest('/emergency/sos', {
    method: 'POST',
    body: { location },
  })
}
