const USER_LOCATION_KEY = 'userLocation'

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Location access is not available in this browser.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ lat: coords.latitude, lng: coords.longitude }),
      () => reject(new Error('Unable to get your location. Please allow location access and try again.')),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  })
}

export function saveUserLocation(location) {
  localStorage.setItem(USER_LOCATION_KEY, JSON.stringify(location))
}

export function getSavedUserLocation() {
  try {
    return JSON.parse(localStorage.getItem(USER_LOCATION_KEY))
  } catch {
    return null
  }
}

export async function reverseGeocode({ lat, lng }) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18`,
  )
  if (!response.ok) throw new Error('Unable to resolve location name.')

  const address = (await response.json()).address || {}
  return [
    address.village || address.town || address.suburb || address.hamlet,
    address.city || address.municipality || address.county,
    address.state_district || address.district,
  ].filter(Boolean).filter((part, index, parts) => parts.indexOf(part) === index).join(', ')
}
