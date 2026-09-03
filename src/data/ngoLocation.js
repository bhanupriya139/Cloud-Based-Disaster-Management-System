const NGO_LOCATION_KEY = 'ngoLocation'
const DEFAULT_NGO_LOCATION = 'Mumbai NGO Office'
const DEFAULT_NGO_COORDINATES = { latitude: 19.076, longitude: 72.8777 }

export function getNGOLocation() {
  try {
    const savedLocation = JSON.parse(localStorage.getItem(NGO_LOCATION_KEY))
    return savedLocation ? { ...DEFAULT_NGO_COORDINATES, ...savedLocation } : { name: DEFAULT_NGO_LOCATION, ...DEFAULT_NGO_COORDINATES }
  } catch {
    return { name: DEFAULT_NGO_LOCATION, ...DEFAULT_NGO_COORDINATES }
  }
}

export function getNGOLocationName() {
  return getNGOLocation().name
}