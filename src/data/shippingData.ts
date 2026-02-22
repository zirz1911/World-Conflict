// Shipping routes and ships data for maritime visualization

export interface ShippingRoute {
  id: string;
  name: string;
  path: [number, number][]; // [lat, lng] coordinates
  color: string;
  description: string;
}

export interface Ship {
  id: string;
  name: string;
  routeId: string;
  origin: string;
  destination: string;
  cargo: string;
  speed: number; // knots (for animation speed calculation)
  progress: number; // 0.0 to 1.0 along the route
  eta: string; // ISO timestamp
  vesselType: string;
  flag: string;
}

// Major shipping routes
export const shippingRoutes: ShippingRoute[] = [
  {
    id: 'suez-route',
    name: 'Suez Canal Route',
    path: [
      [51.5, -0.1],      // London
      [43.3, 5.4],       // Marseille
      [37.0, 25.0],      // Eastern Mediterranean
      [31.3, 32.3],      // Port Said (Suez Canal entrance)
      [29.9, 32.5],      // Suez Canal
      [27.9, 33.8],      // Red Sea
      [12.8, 43.3],      // Bab-el-Mandeb Strait
      [8.0, 50.0],       // Arabian Sea
      [1.3, 103.8]       // Singapore
    ],
    color: '#22d3ee',
    description: 'Major Europe-Asia trade route via Suez Canal'
  },
  {
    id: 'panama-route',
    name: 'Panama Canal Route',
    path: [
      [40.7, -74.0],     // New York
      [25.8, -80.2],     // Miami
      [9.1, -79.4],      // Panama Canal
      [8.9, -79.5],      // Pacific entrance
      [-12.0, -77.0],    // Lima
      [-33.9, -71.6],    // Valparaiso
      [-35.0, -100.0],   // Pacific Ocean
      [35.7, 139.8]      // Tokyo
    ],
    color: '#06b6d4',
    description: 'Trans-Pacific route connecting Americas and Asia'
  },
  {
    id: 'trans-pacific',
    name: 'Trans-Pacific Route',
    path: [
      [34.0, -118.2],    // Los Angeles
      [30.0, -130.0],    // Pacific Ocean
      [25.0, -150.0],    // Mid-Pacific
      [21.3, -157.8],    // Honolulu
      [15.0, 170.0],     // Central Pacific
      [35.7, 139.8],     // Tokyo
      [37.6, 126.0],     // Seoul
      [31.2, 121.5]      // Shanghai
    ],
    color: '#0ea5e9',
    description: 'Direct US West Coast to East Asia shipping lane'
  },
  {
    id: 'indian-ocean',
    name: 'Indian Ocean Route',
    path: [
      [1.3, 103.8],      // Singapore
      [6.9, 79.9],       // Colombo
      [19.0, 72.8],      // Mumbai
      [23.0, 58.0],      // Arabian Sea
      [25.3, 51.5]       // Doha
    ],
    color: '#0284c7',
    description: 'Southeast Asia to Middle East corridor'
  }
];

// Active ships on routes
export const ships: Ship[] = [
  {
    id: 'ship-001',
    name: 'MSC Gülsün',
    routeId: 'suez-route',
    origin: 'Rotterdam',
    destination: 'Singapore',
    cargo: 'Containers (23,756 TEU)',
    speed: 22,
    progress: 0.35,
    eta: '2026-02-24T08:00:00Z',
    vesselType: 'Container Ship',
    flag: '🇨🇭 Switzerland'
  },
  {
    id: 'ship-002',
    name: 'CSCL Globe',
    routeId: 'suez-route',
    origin: 'Hamburg',
    destination: 'Shanghai',
    cargo: 'Containers (19,100 TEU)',
    speed: 20,
    progress: 0.65,
    eta: '2026-02-22T14:30:00Z',
    vesselType: 'Container Ship',
    flag: '🇨🇳 China'
  },
  {
    id: 'ship-003',
    name: 'Ever Given',
    routeId: 'suez-route',
    origin: 'Felixstowe',
    destination: 'Hong Kong',
    cargo: 'Containers (20,124 TEU)',
    speed: 21,
    progress: 0.15,
    eta: '2026-02-26T10:00:00Z',
    vesselType: 'Container Ship',
    flag: '🇵🇦 Panama'
  },
  {
    id: 'ship-004',
    name: 'CMA CGM Marco Polo',
    routeId: 'panama-route',
    origin: 'New York',
    destination: 'Yokohama',
    cargo: 'Containers (16,022 TEU)',
    speed: 24,
    progress: 0.42,
    eta: '2026-02-25T06:00:00Z',
    vesselType: 'Container Ship',
    flag: '🇫🇷 France'
  },
  {
    id: 'ship-005',
    name: 'Maersk Triple E',
    routeId: 'trans-pacific',
    origin: 'Long Beach',
    destination: 'Shanghai',
    cargo: 'Containers (18,270 TEU)',
    speed: 19,
    progress: 0.58,
    eta: '2026-02-21T12:00:00Z',
    vesselType: 'Container Ship',
    flag: '🇩🇰 Denmark'
  },
  {
    id: 'ship-006',
    name: 'COSCO Shipping Universe',
    routeId: 'trans-pacific',
    origin: 'Los Angeles',
    destination: 'Ningbo',
    cargo: 'Containers (21,237 TEU)',
    speed: 23,
    progress: 0.28,
    eta: '2026-02-27T18:00:00Z',
    vesselType: 'Container Ship',
    flag: '🇨🇳 China'
  },
  {
    id: 'ship-007',
    name: 'APL Temasek',
    routeId: 'indian-ocean',
    origin: 'Singapore',
    destination: 'Dubai',
    cargo: 'Containers (14,000 TEU)',
    speed: 22,
    progress: 0.48,
    eta: '2026-02-20T09:00:00Z',
    vesselType: 'Container Ship',
    flag: '🇸🇬 Singapore'
  },
  {
    id: 'ship-008',
    name: 'Maran Gas Apollonia',
    routeId: 'suez-route',
    origin: 'Marseille',
    destination: 'Yokohama',
    cargo: 'LNG (173,400 m³)',
    speed: 19,
    progress: 0.52,
    eta: '2026-02-23T16:00:00Z',
    vesselType: 'LNG Tanker',
    flag: '🇬🇷 Greece'
  },
  {
    id: 'ship-009',
    name: 'Pioneering Spirit',
    routeId: 'trans-pacific',
    origin: 'Seattle',
    destination: 'Busan',
    cargo: 'Heavy Lift Equipment',
    speed: 14,
    progress: 0.73,
    eta: '2026-02-19T22:00:00Z',
    vesselType: 'Heavy Lift Vessel',
    flag: '🇳🇱 Netherlands'
  },
  {
    id: 'ship-010',
    name: 'Emma Maersk',
    routeId: 'panama-route',
    origin: 'Cartagena',
    destination: 'Tokyo',
    cargo: 'Containers (15,550 TEU)',
    speed: 25,
    progress: 0.61,
    eta: '2026-02-22T07:30:00Z',
    vesselType: 'Container Ship',
    flag: '🇩🇰 Denmark'
  }
];

// Helper function to get route by ID
export function getRouteById(id: string): ShippingRoute | undefined {
  return shippingRoutes.find(route => route.id === id);
}

// Helper function to get ships by route
export function getShipsByRoute(routeId: string): Ship[] {
  return ships.filter(ship => ship.routeId === routeId);
}

// Helper function to calculate position along path
export function getPositionAlongPath(
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
