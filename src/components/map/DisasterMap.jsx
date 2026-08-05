import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './DisasterMap.css'

const markerColors = {
  disaster: '#ef4444',
  hospital: '#3b82f6',
  shelter: '#22c55e',
  ngo: '#a855f7',
  fire: '#f97316',
}

function createIcon(type) {
  const color = markerColors[type] || '#64748b'
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })
}

const legendItems = [
  { type: 'disaster', label: 'Disaster Zones', color: '#ef4444' },
  { type: 'hospital', label: 'Hospitals', color: '#3b82f6' },
  { type: 'shelter', label: 'Shelters', color: '#22c55e' },
  { type: 'ngo', label: 'NGOs', color: '#a855f7' },
  { type: 'fire', label: 'Fire Stations', color: '#f97316' },
]

export default function DisasterMap({
  markers = [],
  center = [19.076, 72.8777],
  zoom = 13,
  route = null,
  height = '100%',
  showLegend = true,
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) {
    return <div className="map-loading" style={{ height }}>Loading map...</div>
  }

  const routeCoords = route?.waypoints?.map((w) => [w.lat, w.lng])

  return (
    <div className="disaster-map" style={{ height }}>
      <MapContainer center={center} zoom={zoom} className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={createIcon(m.type)}>
            <Popup>{m.label}</Popup>
          </Marker>
        ))}
        {markers
          .filter((m) => m.type === 'disaster')
          .map((m) => (
            <Circle
              key={`zone-${m.id}`}
              center={[m.lat, m.lng]}
              radius={800}
              pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.15 }}
            />
          ))}
        {routeCoords && (
          <Polyline positions={routeCoords} pathOptions={{ color: '#22c55e', weight: 4, dashArray: '8 8' }} />
        )}
      </MapContainer>
      {showLegend && (
        <div className="map-legend">
          {legendItems.map((item) => (
            <span key={item.type} className="legend-item">
              <span className="legend-dot" style={{ background: item.color }} />
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
