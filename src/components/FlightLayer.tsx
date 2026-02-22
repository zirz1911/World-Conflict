'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useTimezone } from '@/contexts/TimezoneContext';
import {
  flightRoutes,
  flights,
  getFlightRouteById,
  generateCurvedPath,
  getPositionAlongCurvedPath,
  type Flight
} from '@/data/flightData';

interface FlightLayerProps {
  map: L.Map | null;
  enabled: boolean;
}

export default function FlightLayer({ map, enabled }: FlightLayerProps) {
  const { timezone, formatTime } = useTimezone();
  const flightPathsRef = useRef<L.Polyline[]>([]);
  const planeMarkersRef = useRef<Map<string, L.Marker>>(new Map());
  const animationFrameRef = useRef<number>();
  const flightProgressRef = useRef<Map<string, number>>(new Map());
  const curvedPathsRef = useRef<Map<string, [number, number][]>>(new Map());

  useEffect(() => {
    if (!map || !enabled) {
      // Clean up if disabled
      flightPathsRef.current.forEach(path => map?.removeLayer(path));
      flightPathsRef.current = [];
      planeMarkersRef.current.forEach(marker => map?.removeLayer(marker));
      planeMarkersRef.current.clear();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    // Initialize flight progress from data
    flights.forEach(flight => {
      if (!flightProgressRef.current.has(flight.id)) {
        flightProgressRef.current.set(flight.id, flight.progress);
      }
    });

    // Generate and draw curved flight paths
    flightRoutes.forEach(route => {
      // Generate curved path
      const curvedPath = generateCurvedPath(route.origin, route.destination);
      curvedPathsRef.current.set(route.id, curvedPath);

      // Draw the path
      const polyline = L.polyline(curvedPath, {
        color: route.color,
        weight: 2,
        opacity: 0.5,
        dashArray: '8, 12',
        className: 'flight-path'
      }).addTo(map);

      // Calculate distance
      const distance = Math.sqrt(
        Math.pow(route.destination[0] - route.origin[0], 2) +
        Math.pow(route.destination[1] - route.origin[1], 2)
      ) * 111; // Rough conversion to km

      // Add route popup
      polyline.bindPopup(`
        <div style="min-width: 220px;">
          <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #1f2937;">✈️ ${route.name}</h3>
          <p style="font-size: 12px; color: #4b5563;">${route.description}</p>
          <p style="font-size: 11px; color: #6b7280; margin-top: 4px;">Distance: ${distance.toFixed(0)} km</p>
        </div>
      `);

      flightPathsRef.current.push(polyline);
    });

    // Create plane markers
    flights.forEach(flight => {
      const route = getFlightRouteById(flight.routeId);
      if (!route) return;

      const curvedPath = curvedPathsRef.current.get(flight.routeId);
      if (!curvedPath) return;

      const progress = flightProgressRef.current.get(flight.id) || flight.progress;
      const position = getPositionAlongCurvedPath(curvedPath, progress);

      const icon = L.divIcon({
        html: `<div style="font-size: 22px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6)); animation: plane-fly 1.5s ease-in-out infinite;">✈️</div>`,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker(position, { icon }).addTo(map);

      // Create popup content (will update with timezone)
      const updatePopup = () => {
        const etaDate = new Date(flight.eta);
        const etaFormatted = formatTime(etaDate);

        marker.bindPopup(`
          <div style="min-width: 280px;">
            <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #1f2937;">✈️ ${flight.flightNumber}</h3>
            <p style="font-size: 12px; margin-bottom: 4px;"><strong>Airline:</strong> ${flight.airline}</p>
            <p style="font-size: 12px; margin-bottom: 4px;"><strong>Aircraft:</strong> ${flight.aircraft}</p>
            <p style="font-size: 12px; margin-bottom: 4px;"><strong>Route:</strong> ${flight.origin} → ${flight.destination}</p>
            <p style="font-size: 12px; margin-bottom: 4px;"><strong>Altitude:</strong> ${flight.altitude.toLocaleString()} ft</p>
            <p style="font-size: 12px; margin-bottom: 4px;"><strong>Speed:</strong> ${flight.speed} mph</p>
            <p style="font-size: 12px; margin-bottom: 8px;"><strong>ETA:</strong> ${etaFormatted} ${timezone.abbreviation}</p>
            <div style="margin-top: 8px;">
              <div style="width: 100%; background: #e5e7eb; border-radius: 9999px; height: 8px;">
                <div style="background: #f97316; height: 8px; border-radius: 9999px; width: ${Math.round(progress * 100)}%;"></div>
              </div>
              <span style="font-size: 11px; color: #6b7280;">${Math.round(progress * 100)}% complete</span>
            </div>
          </div>
        `);
      };

      updatePopup();
      planeMarkersRef.current.set(flight.id, marker);
    });

    // Animation loop
    const animate = () => {
      flights.forEach(flight => {
        const route = getFlightRouteById(flight.routeId);
        if (!route) return;

        const curvedPath = curvedPathsRef.current.get(flight.routeId);
        if (!curvedPath) return;

        const marker = planeMarkersRef.current.get(flight.id);
        if (!marker) return;

        // Update progress (speed factor: speed in mph affects animation speed)
        let progress = flightProgressRef.current.get(flight.id) || flight.progress;
        const speedFactor = flight.speed / 50000; // Adjust for visual speed (faster than ships)
        progress = (progress + speedFactor) % 1.0;
        flightProgressRef.current.set(flight.id, progress);

        // Update marker position
        const newPosition = getPositionAlongCurvedPath(curvedPath, progress);
        marker.setLatLng(newPosition);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      flightPathsRef.current.forEach(path => map.removeLayer(path));
      flightPathsRef.current = [];
      planeMarkersRef.current.forEach(marker => map.removeLayer(marker));
      planeMarkersRef.current.clear();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [map, enabled, timezone, formatTime]);

  return null;
}
