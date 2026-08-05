const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true'

export { API_BASE, USE_MOCK }

export async function apiRequest(endpoint, options = {}) {
  const { method = 'GET', body, headers = {} } = options

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body instanceof FormData) {
    delete config.headers['Content-Type']
    config.body = body
  } else if (body !== undefined) {
    config.body = JSON.stringify(body)
  }

  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(error.message || `Request failed: ${response.status}`)
  }

  if (response.status === 204) return null
  return response.json()
}
