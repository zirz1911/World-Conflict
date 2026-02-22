'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useTimezone } from '@/contexts/TimezoneContext';
import {
  shippingRoutes,
  ships,
  getRouteById,
  getPositionAlongPath,
  type Ship
} from '@/data/shippingData';

interface ShippingLayerProps {
  map: L.Map | null;
  enabled: boolean;
}

export default function ShippingLayer({ map, enabled }: ShippingLayerProps) {
  const { timezone, formatTime } = useTimezone();
  const routeLinesRef = useRef<L.Polyline[]>([]);
  const shipMarkersRef = useRef<Map<string, L.Marker>>(new Map());
  const animationFrameRef = useRef<number>();
  const shipProgressRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (!map || !enabled) {
      // Clean up if disabled
      routeLinesRef.current.forEach(line => map?.removeLayer(line));
      routeLinesRef.current = [];
      shipMarkersRef.current.forEach(marker => map?.removeLayer(marker));
      shipMarkersRef.current.clear();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    // Initialize ship progress from data
    ships.forEach(ship => {
      if (!shipProgressRef.current.has(ship.id)) {
        shipProgressRef.current.set(ship.id, ship.progress);
      }
    });

    // Draw shipping routes
    shippingRoutes.forEach(route => {
      const polyline = L.polyline(route.path, {
        color: route.color,
        weight: 2,
        opacity: 0.6,
        dashArray: '10, 10',
        className: 'shipping-route'
      }).addTo(map);

      // Add route popup
      polyline.bindPopup(`
        <div style="min-width: 220px;">
          <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #1f2937;">🚢 ${route.name}</h3>
          <p style="font-size: 12px; color: #4b5563;">${route.description}</p>
        </div>
      `);

      routeLinesRef.current.push(polyline);
    });

    // Create ship markers
    ships.forEach(ship => {
      const route = getRouteById(ship.routeId);
      if (!route) return;

      const progress = shipProgressRef.current.get(ship.id) || ship.progress;
      const position = getPositionAlongPath(route.path, progress);

      const icon = L.divIcon({
        html: `<div style="font-size: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); animation: ship-float 2s ease-in-out infinite;">🚢</div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(position, { icon }).addTo(map);

      // Create popup content (will update with timezone)
      const updatePopup = () => {
        const etaDate = new Date(ship.eta);
        const etaFormatted = formatTime(etaDate);

        marker.bindPopup(`
          <div style="min-width: 280px;">
            <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #1f2937;">🚢 ${ship.name}</h3>
            <p style="font-size: 12px; margin-bottom: 4px;"><strong>Type:</strong> ${ship.vesselType}</p>
            <p style="font-size: 12px; margin-bottom: 4px;"><strong>Flag:</strong> ${ship.flag}</p>
            <p style="font-size: 12px; margin-bottom: 4px;"><strong>Route:</strong> ${ship.origin} → ${ship.destination}</p>
            <p style="font-size: 12px; margin-bottom: 4px;"><strong>Cargo:</strong> ${ship.cargo}</p>
            <p style="font-size: 12px; margin-bottom: 4px;"><strong>Speed:</strong> ${ship.speed} knots</p>
            <p style="font-size: 12px; margin-bottom: 8px;"><strong>ETA:</strong> ${etaFormatted} ${timezone.abbreviation}</p>
            <div style="margin-top: 8px;">
              <div style="width: 100%; background: #e5e7eb; border-radius: 9999px; height: 8px;">
                <div style="background: #22d3ee; height: 8px; border-radius: 9999px; width: ${Math.round(progress * 100)}%;"></div>
              </div>
              <span style="font-size: 11px; color: #6b7280;">${Math.round(progress * 100)}% complete</span>
            </div>
          </div>
        `);
      };

      updatePopup();
      shipMarkersRef.current.set(ship.id, marker);
    });

    // Animation loop
    const animate = () => {
      ships.forEach(ship => {
        const route = getRouteById(ship.routeId);
        if (!route) return;

        const marker = shipMarkersRef.current.get(ship.id);
        if (!marker) return;

        // Update progress (speed factor: speed in knots affects animation speed)
        let progress = shipProgressRef.current.get(ship.id) || ship.progress;
        const speedFactor = ship.speed / 100000; // Adjust for visual speed
        progress = (progress + speedFactor) % 1.0;
        shipProgressRef.current.set(ship.id, progress);

        // Update marker position
        const newPosition = getPositionAlongPath(route.path, progress);
        marker.setLatLng(newPosition);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      routeLinesRef.current.forEach(line => map.removeLayer(line));
      routeLinesRef.current = [];
      shipMarkersRef.current.forEach(marker => map.removeLayer(marker));
      shipMarkersRef.current.clear();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [map, enabled, timezone, formatTime]);

  return null;
}
