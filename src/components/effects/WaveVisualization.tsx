"use client";

import React, { useEffect, useRef } from "react";
import { windWaveData } from "@/data/mockData";

interface WaveVisualizationProps {
  map: any; // Leaflet map instance
  enabled?: boolean;
}

export default function WaveVisualization({ map, enabled = true }: WaveVisualizationProps) {
  const layerGroupRef = useRef<any>(null);

  useEffect(() => {
    if (!map || typeof window === "undefined") return;

    const initWaveMarkers = async () => {
      const L = (await import("leaflet")).default;

      // Cleanup function: Remove existing layer group if it exists
      const cleanup = () => {
        if (layerGroupRef.current && map.hasLayer(layerGroupRef.current)) {
          map.removeLayer(layerGroupRef.current);
          layerGroupRef.current = null;
        }
      };

      // Always cleanup first to prevent stacking
      cleanup();

      // If not enabled, just cleanup and return
      if (!enabled) {
        return;
      }

      // Create new layer group for wave markers
      layerGroupRef.current = L.layerGroup().addTo(map);

      // Define regions with approximate lat/lng for wave visualization
      const waveRegions = [
        { location: "North Atlantic", lat: 45, lng: -30 },
        { location: "South China Sea", lat: 15, lng: 115 },
        { location: "Mediterranean", lat: 37, lng: 15 },
        { location: "Indian Ocean", lat: -10, lng: 75 },
        { location: "Pacific (East)", lat: 0, lng: -140 },
        { location: "Southern Ocean", lat: -50, lng: 0 },
        { location: "Bay of Bengal", lat: 15, lng: 88 },
        { location: "Caribbean", lat: 18, lng: -75 },
      ];

      // Direction arrows (Unicode arrows)
      const dirArrows: Record<string, string> = {
        N: "↑", NE: "↗", E: "→", SE: "↘",
        S: "↓", SW: "↙", W: "←", NW: "↖",
      };

      // Status colors
      const statusColors: Record<string, string> = {
        typhoon: "#ef4444",
        storm: "#f97316",
        rough: "#eab308",
        moderate: "#06b6d4",
        calm: "#22c55e",
      };

      // Create wave markers
      waveRegions.forEach((region) => {
        const waveData = windWaveData.find((w) => w.location === region.location);
        if (!waveData) return;

        const color = statusColors[waveData.status] || "#06b6d4";
        const arrow = dirArrows[waveData.direction] || "→";
        const size = Math.min(waveData.waveHeight * 5, 40); // Scale wave height to icon size

        // Create custom div icon for wave arrow
        const icon = L.divIcon({
          className: "wave-marker",
          html: `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2px;
            ">
              <div style="
                font-size: ${size}px;
                color: ${color};
                text-shadow: 0 0 10px ${color}88, 0 0 20px ${color}44;
                animation: wave-pulse 2s ease-in-out infinite;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
              ">${arrow}</div>
              <div style="
                font-size: 9px;
                color: ${color};
                background: rgba(8, 9, 12, 0.85);
                padding: 2px 6px;
                border-radius: 4px;
                border: 1px solid ${color}44;
                white-space: nowrap;
                font-weight: 600;
                backdrop-filter: blur(4px);
              ">${waveData.waveHeight}m</div>
            </div>
          `,
          iconSize: [size + 20, size + 30],
          iconAnchor: [(size + 20) / 2, (size + 30) / 2],
        });

        // Create marker
        const marker = L.marker([region.lat, region.lng], { icon }).addTo(layerGroupRef.current);

        // Add popup with details
        marker.bindPopup(
          `<div style="background:#11131a;border:1px solid ${color}44;color:#cbd5e1;padding:8px 12px;border-radius:6px;font-family:Inter,system-ui,sans-serif;font-size:11px;min-width:180px;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="color:${color};font-size:16px;">${arrow}</span>
              <span style="color:${color};font-weight:700;font-size:12px;">${region.location}</span>
            </div>
            <div style="display:flex;gap:12px;color:#94a3b8;font-size:10px;margin-top:6px;">
              <div>
                <div style="color:#64748b;margin-bottom:2px;">Wave</div>
                <div style="color:${color};font-weight:600;">${waveData.waveHeight}m</div>
              </div>
              <div>
                <div style="color:#64748b;margin-bottom:2px;">Wind</div>
                <div style="color:${color};font-weight:600;">${waveData.windSpeed} km/h</div>
              </div>
              <div>
                <div style="color:#64748b;margin-bottom:2px;">Status</div>
                <div style="color:${color};font-weight:600;text-transform:uppercase;">${waveData.status}</div>
              </div>
            </div>
          </div>`,
          { className: "wave-popup", closeButton: false }
        );
      });
    };

    initWaveMarkers();

    // Cleanup on unmount or when dependencies change
    return () => {
      if (layerGroupRef.current && map.hasLayer(layerGroupRef.current)) {
        map.removeLayer(layerGroupRef.current);
        layerGroupRef.current = null;
      }
    };
  }, [map, enabled]);

  if (!enabled) return null;

  return null; // This component only manages Leaflet layers
}
