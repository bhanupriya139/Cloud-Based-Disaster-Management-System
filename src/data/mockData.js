export const mockDashboard = {
  riskLevel: 'High',
  weather: { temp: 26, condition: 'Scattered Rain' },
  airQuality: { label: 'Good', aqi: 42 },
  activeAlerts: 2,
  location: { city: 'Mumbai', state: 'Maharashtra' },
  weatherDetails: {
    humidity: 83,
    windSpeed: 18,
    rainfall: 12,
    visibility: 6,
  },
  alerts: [
    {
      id: 1,
      type: 'warning',
      title: 'Heavy Rainfall Alert',
      description: 'Heavy rainfall expected in Mumbai suburbs for the next 6 hours.',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Flood Warning',
      description: 'Low-lying areas near Mithi River may experience flooding.',
      time: '4 hours ago',
    },
  ],
  resources: [
    { name: 'Ambulances', count: 7, total: 10, color: '#ef4444' },
    { name: 'Fire Trucks', count: 3, total: 5, color: '#f97316' },
    { name: 'Medical Kits', count: 15, total: 20, color: '#22c55e' },
  ],
}

export const mockMapMarkers = [
  { id: 1, type: 'disaster', lat: 19.076, lng: 72.8777, label: 'Disaster Zone' },
  { id: 2, type: 'hospital', lat: 19.082, lng: 72.885, label: 'City Hospital' },
  { id: 3, type: 'shelter', lat: 19.07, lng: 72.87, label: 'Relief Camp' },
  { id: 4, type: 'ngo', lat: 19.09, lng: 72.89, label: 'Red Cross NGO' },
  { id: 5, type: 'fire', lat: 19.065, lng: 72.88, label: 'Fire Station' },
]

export const mockEmergencyServices = [
  { id: 1, name: 'Ambulance', icon: 'ambulance', distance: '2.4 km', available: true },
  { id: 2, name: 'Fire Truck', icon: 'fire', distance: '3.1 km', available: true },
  { id: 3, name: 'Police', icon: 'police', distance: '1.8 km', available: true },
  { id: 4, name: 'Rescue Team', icon: 'rescue', distance: '4.2 km', available: false },
]

export const mockNGOs = [
  {
    id: 1,
    name: 'Red Cross Society',
    category: 'Medical',
    distance: '1.2 km',
    rating: 4.8,
    resources: ['Medical kits', 'Volunteers', 'Food kits'],
  },
  {
    id: 2,
    name: 'Akshaya Patra',
    category: 'Food',
    distance: '2.5 km',
    rating: 4.6,
    resources: ['Food kits', 'Water supply'],
  },
  {
    id: 3,
    name: 'Goonj Foundation',
    category: 'Relief',
    distance: '3.0 km',
    rating: 4.5,
    resources: ['Clothing', 'Volunteers'],
  },
]

export const mockWeather = {
  current: {
    temp: 26,
    condition: 'Scattered Rain',
    humidity: 83,
    windSpeed: 18,
    rainfall: 12,
    visibility: 6,
  },
  forecast: [
    { hour: 'Now', temp: 26, condition: 'Rain' },
    { hour: '1 PM', temp: 27, condition: 'Cloudy' },
    { hour: '2 PM', temp: 28, condition: 'Rain' },
    { hour: '3 PM', temp: 27, condition: 'Heavy Rain' },
    { hour: '4 PM', temp: 26, condition: 'Rain' },
  ],
}

export const mockAlerts = {
  warnings: [
    { id: 1, title: 'Heavy Rainfall Alert', time: '2 hours ago', severity: 'high' },
    { id: 2, title: 'Flood Warning - Mithi River', time: '4 hours ago', severity: 'high' },
    { id: 3, title: 'Traffic Advisory - Western Express Highway', time: '6 hours ago', severity: 'medium' },
  ],
  information: [
    { id: 4, title: 'Relief camp opened at Bandra', time: '1 day ago', severity: 'info' },
    { id: 5, title: 'Helpline 112 operational 24/7', time: '2 days ago', severity: 'info' },
  ],
}

export const mockAdminStats = {
  activeIncidents: 24,
  peopleAffected: 1245,
  resourcesDeployed: 89,
  ngosActive: 12,
  recentActivity: [
    { id: 1, action: 'New flood incident reported in Andheri', time: '5 min ago' },
    { id: 2, action: 'Ambulance dispatched to Bandra', time: '12 min ago' },
    { id: 3, action: 'Relief camp supplies restocked', time: '30 min ago' },
    { id: 4, action: 'Weather alert issued for suburbs', time: '1 hour ago' },
  ],
  resourceStatus: [
    { name: 'Ambulances', available: 7, deployed: 3 },
    { name: 'Fire Trucks', available: 3, deployed: 2 },
    { name: 'Rescue Teams', available: 5, deployed: 4 },
    { name: 'Medical Kits', available: 15, deployed: 5 },
  ],
}

export const incidentTypes = ['Flood', 'Fire', 'Earthquake', 'Landslide', 'Cyclone', 'Other']

export const mockReportedDisasters = [
  { id: 1, location: 'Andheri East', type: 'Flood', status: 'Active' },
  { id: 2, location: 'Bandra West', type: 'Fire', status: 'Resolved' },
  { id: 3, location: 'Dharavi', type: 'Medical Emergency', status: 'In Progress' },
]

export const mockNGOAllocationHistory = [
  { id: 1, location: 'Andheri East', latitude: 19.1197, longitude: 72.8468, type: 'Flood', status: 'Active', allocatedOn: 'Sep 2, 2026' },
  { id: 2, location: 'Bandra West', latitude: 19.0607, longitude: 72.8362, type: 'Fire', status: 'Resolved', allocatedOn: 'Aug 28, 2026' },
  { id: 3, location: 'Dharavi', latitude: 19.0437, longitude: 72.8538, type: 'Medical Emergency', status: 'In Progress', allocatedOn: 'Aug 24, 2026' },
]
