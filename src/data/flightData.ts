// Flight routes and planes data for aviation visualization

export interface FlightRoute {
  id: string;
  name: string;
  origin: [number, number]; // [lat, lng]
  destination: [number, number]; // [lat, lng]
  color: string;
  description: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  routeId: string;
  origin: string;
  destination: string;
  altitude: number; // feet
  speed: number; // mph (for animation speed)
  progress: number; // 0.0 to 1.0 along the route
  eta: string; // ISO timestamp
  aircraft: string;
  airline: string;
}

// Major international flight routes
export const flightRoutes: FlightRoute[] = [
  {
    id: 'bangkok-tokyo',
    name: 'Bangkok → Tokyo',
    origin: [13.7563, 100.5018],  // Bangkok
    destination: [35.6762, 139.6503], // Tokyo
    color: '#f97316',
    description: 'Southeast Asia to Japan corridor'
  },
  {
    id: 'ny-london',
    name: 'New York → London',
    origin: [40.7128, -74.0060],  // New York
    destination: [51.5074, -0.1278], // London
    color: '#ef4444',
    description: 'Trans-Atlantic route'
  },
  {
    id: 'dubai-sydney',
    name: 'Dubai → Sydney',
    origin: [25.2532, 55.3657],   // Dubai
    destination: [-33.8688, 151.2093], // Sydney
    color: '#ec4899',
    description: 'Middle East to Australia'
  },
  {
    id: 'la-singapore',
    name: 'Los Angeles → Singapore',
    origin: [34.0522, -118.2437], // Los Angeles
    destination: [1.3521, 103.8198], // Singapore
    color: '#f59e0b',
    description: 'Trans-Pacific route'
  },
  {
    id: 'london-hong-kong',
    name: 'London → Hong Kong',
    origin: [51.5074, -0.1278],   // London
    destination: [22.3193, 114.1694], // Hong Kong
    color: '#dc2626',
    description: 'Europe to East Asia'
  },
  {
    id: 'tokyo-san-francisco',
    name: 'Tokyo → San Francisco',
    origin: [35.6762, 139.6503],  // Tokyo
    destination: [37.7749, -122.4194], // San Francisco
    color: '#ea580c',
    description: 'Asia to US West Coast'
  },
  {
    id: 'paris-new-york',
    name: 'Paris → New York',
    origin: [48.8566, 2.3522],    // Paris
    destination: [40.7128, -74.0060], // New York
    color: '#e11d48',
    description: 'Europe to US East Coast'
  },
  {
    id: 'delhi-frankfurt',
    name: 'Delhi → Frankfurt',
    origin: [28.6139, 77.2090],   // Delhi
    destination: [50.1109, 8.6821], // Frankfurt
    color: '#f43f5e',
    description: 'India to Europe'
  },
  {
    id: 'seoul-los-angeles',
    name: 'Seoul → Los Angeles',
    origin: [37.5665, 126.9780],  // Seoul
    destination: [34.0522, -118.2437], // Los Angeles
    color: '#fb923c',
    description: 'Korea to US West Coast'
  },
  {
    id: 'singapore-frankfurt',
    name: 'Singapore → Frankfurt',
    origin: [1.3521, 103.8198],   // Singapore
    destination: [50.1109, 8.6821], // Frankfurt
    color: '#fb7185',
    description: 'Southeast Asia to Europe'
  }
];

// Active flights
export const flights: Flight[] = [
  {
    id: 'flight-001',
    flightNumber: 'TG660',
    routeId: 'bangkok-tokyo',
    origin: 'Bangkok (BKK)',
    destination: 'Tokyo (NRT)',
    altitude: 35000,
    speed: 550,
    progress: 0.42,
    eta: '2026-02-17T22:30:00Z',
    aircraft: 'Boeing 787-9',
    airline: 'Thai Airways'
  },
  {
    id: 'flight-002',
    flightNumber: 'BA112',
    routeId: 'ny-london',
    origin: 'New York (JFK)',
    destination: 'London (LHR)',
    altitude: 38000,
    speed: 580,
    progress: 0.67,
    eta: '2026-02-18T06:15:00Z',
    aircraft: 'Airbus A350-1000',
    airline: 'British Airways'
  },
  {
    id: 'flight-003',
    flightNumber: 'EK413',
    routeId: 'dubai-sydney',
    origin: 'Dubai (DXB)',
    destination: 'Sydney (SYD)',
    altitude: 41000,
    speed: 560,
    progress: 0.53,
    eta: '2026-02-18T18:45:00Z',
    aircraft: 'Airbus A380-800',
    airline: 'Emirates'
  },
  {
    id: 'flight-004',
    flightNumber: 'SQ37',
    routeId: 'la-singapore',
    origin: 'Los Angeles (LAX)',
    destination: 'Singapore (SIN)',
    altitude: 39000,
    speed: 570,
    progress: 0.28,
    eta: '2026-02-19T05:30:00Z',
    aircraft: 'Airbus A350-900ULR',
    airline: 'Singapore Airlines'
  },
  {
    id: 'flight-005',
    flightNumber: 'BA15',
    routeId: 'london-hong-kong',
    origin: 'London (LHR)',
    destination: 'Hong Kong (HKG)',
    altitude: 37000,
    speed: 565,
    progress: 0.71,
    eta: '2026-02-18T14:20:00Z',
    aircraft: 'Boeing 777-300ER',
    airline: 'British Airways'
  },
  {
    id: 'flight-006',
    flightNumber: 'NH7',
    routeId: 'tokyo-san-francisco',
    origin: 'Tokyo (NRT)',
    destination: 'San Francisco (SFO)',
    altitude: 36000,
    speed: 550,
    progress: 0.38,
    eta: '2026-02-17T09:45:00Z',
    aircraft: 'Boeing 787-10',
    airline: 'ANA'
  },
  {
    id: 'flight-007',
    flightNumber: 'AF007',
    routeId: 'paris-new-york',
    origin: 'Paris (CDG)',
    destination: 'New York (JFK)',
    altitude: 38000,
    speed: 575,
    progress: 0.55,
    eta: '2026-02-17T18:30:00Z',
    aircraft: 'Boeing 777-200ER',
    airline: 'Air France'
  },
  {
    id: 'flight-008',
    flightNumber: 'AI121',
    routeId: 'delhi-frankfurt',
    origin: 'Delhi (DEL)',
    destination: 'Frankfurt (FRA)',
    altitude: 37000,
    speed: 560,
    progress: 0.62,
    eta: '2026-02-18T04:15:00Z',
    aircraft: 'Boeing 787-8',
    airline: 'Air India'
  },
  {
    id: 'flight-009',
    flightNumber: 'KE017',
    routeId: 'seoul-los-angeles',
    origin: 'Seoul (ICN)',
    destination: 'Los Angeles (LAX)',
    altitude: 39000,
    speed: 565,
    progress: 0.45,
    eta: '2026-02-17T11:20:00Z',
    aircraft: 'Airbus A380-800',
    airline: 'Korean Air'
  },
  {
    id: 'flight-010',
    flightNumber: 'SQ326',
    routeId: 'singapore-frankfurt',
    origin: 'Singapore (SIN)',
    destination: 'Frankfurt (FRA)',
    altitude: 40000,
    speed: 570,
    progress: 0.34,
    eta: '2026-02-18T06:45:00Z',
    aircraft: 'Airbus A350-900',
    airline: 'Singapore Airlines'
  },
  {
    id: 'flight-011',
    flightNumber: 'JL005',
    routeId: 'tokyo-san-francisco',
    origin: 'Tokyo (HND)',
    destination: 'San Francisco (SFO)',
    altitude: 35000,
    speed: 555,
    progress: 0.78,
    eta: '2026-02-17T08:10:00Z',
    aircraft: 'Boeing 787-9',
    airline: 'Japan Airlines'
  },
  {
    id: 'flight-012',
    flightNumber: 'QF1',
    routeId: 'dubai-sydney',
    origin: 'Dubai (DXB)',
    destination: 'Sydney (SYD)',
    altitude: 41000,
    speed: 560,
    progress: 0.19,
    eta: '2026-02-19T19:30:00Z',
    aircraft: 'Airbus A380-800',
    airline: 'Qantas'
  }
];

// Helper function to get route by ID
export function getFlightRouteById(id: string): FlightRoute | undefined {
  return flightRoutes.find(route => route.id === id);
}

// Helper function to generate curved path between two points
export function generateCurvedPath(
  start: [number, number],
  end: [number, number],
  numPoints: number = 60
): [number, number][] {
  const path: [number, number][] = [];

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;

    // Linear interpolation for lat/lng
    const lat = start[0] + (end[0] - start[0]) * t;
    const lng = start[1] + (end[1] - start[1]) * t;

    // Add arc for curved effect (simulating great circle route)
    // Peak height depends on distance
    const distance = Math.sqrt(
      Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2)
    );
    const arcHeight = Math.sin(t * Math.PI) * (distance * 0.15);

    path.push([lat + arcHeight, lng]);
  }

  return path;
}

// Helper function to get position along curved path
export function getPositionAlongCurvedPath(
  path: [number, number][],
  progress: number
): [number, number] {
  const totalSegments = path.length - 1;
  const exactPosition = progress * totalSegments;
  const segmentIndex = Math.floor(exactPosition);
  const segmentProgress = exactPosition - segmentIndex;

  if (segmentIndex >= totalSegments) {
    return path[path.length - 1];
  }

  const start = path[segmentIndex];
  const end = path[segmentIndex + 1];

  const lat = start[0] + (end[0] - start[0]) * segmentProgress;
  const lng = start[1] + (end[1] - start[1]) * segmentProgress;

  return [lat, lng];
}
