import { apiRequest, USE_MOCK } from './client'
import {
  mockDashboard,
  mockMapMarkers,
  mockEmergencyServices,
  mockNGOs,
  mockAlerts,
  mockAdminStats,
  mockWeather,
  mockReportedDisasters,
  mockNGOAllocationHistory,
} from '../data/mockData'

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))
const NGO_REQUESTS_KEY = 'ngoSignupRequests'

function getStoredNGORequests() {
  try {
    return JSON.parse(localStorage.getItem(NGO_REQUESTS_KEY)) || []
  } catch {
    return []
  }
}

function saveNGORequests(requests) {
  localStorage.setItem(NGO_REQUESTS_KEY, JSON.stringify(requests))
}

export async function getDashboard() {
  if (USE_MOCK) {
    await delay()
    return mockDashboard
  }

  try {
    return await apiRequest('/dashboard')
  } catch (error) {
    console.error('Dashboard request failed, falling back to mock data:', error)
    await delay()
    return mockDashboard
  }
}

export async function getWeather(lat, lng) {
  if (USE_MOCK) {
    await delay()
    return mockWeather
  }
  const params = lat !== undefined && lng !== undefined ? `?lat=${lat}&lng=${lng}` : ''
  return apiRequest(`/weather${params}`)
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

  try {
    return await apiRequest('/map/markers')
  } catch (error) {
    console.error('Map markers request failed, falling back to mock markers:', error)
    await delay()
    return mockMapMarkers
  }
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
    const midpoint = {
      lat: (from.lat + to.lat) / 2,
      lng: (from.lng + to.lng) / 2,
    }
    return {
      type,
      distance: '4.2 km',
      duration: '18 min',
      waypoints: [
        { lat: from.lat, lng: from.lng, label: 'NGO Location' },
        { lat: midpoint.lat, lng: midpoint.lng, label: 'Checkpoint' },
        { lat: to.lat, lng: to.lng, label: 'Disaster Location' },
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

export async function getReportedDisasters() {
  if (USE_MOCK) {
    await delay()
    return mockReportedDisasters
  }
  return apiRequest('/disasters/reported')
}

export async function getNGOAllocationHistory() {
  if (USE_MOCK) {
    await delay()
    return mockNGOAllocationHistory
  }

  return apiRequest('/ngo/allocations/history')
}

export async function getNGOAllocationRoute(allocationId, from) {
  if (USE_MOCK) {
    await delay()
    const allocation = mockNGOAllocationHistory.find((item) => String(item.id) === String(allocationId))
    if (!allocation) return null
    return getSafeRoute(
      { lat: from.latitude, lng: from.longitude },
      { lat: allocation.latitude, lng: allocation.longitude },
    )
  }

  return apiRequest(`/ngo/allocations/${allocationId}/route`, {
    method: 'POST',
    body: { from },
  })
}

export function submitNGOSignupRequest(request) {
  const requests = getStoredNGORequests()
  const nextRequest = {
    ...request,
    id: `NGO-${Date.now()}`,
    status: 'Pending',
    submittedAt: new Date().toISOString(),
  }
  saveNGORequests([...requests, nextRequest])
  return nextRequest
}

export function getNGOSignupRequests() {
  return getStoredNGORequests()
}

export function updateNGOSignupRequest(requestId, status) {
  const requests = getStoredNGORequests()
  const updatedRequests = requests.map((request) => (
    request.id === requestId ? { ...request, status } : request
  ))
  saveNGORequests(updatedRequests)

  if (status === 'Accepted') {
    const approvedUsers = JSON.parse(localStorage.getItem('ngoUsers') || '[]')
    const request = updatedRequests.find((item) => item.id === requestId)
    if (request && !approvedUsers.some((user) => user.email === request.email)) {
      localStorage.setItem('ngoUsers', JSON.stringify([
        ...approvedUsers,
        { name: request.name, email: request.email, password: request.password },
      ]))
    }
  }

  return updatedRequests.find((request) => request.id === requestId)
}
