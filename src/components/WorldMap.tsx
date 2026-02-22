"use client";

import React, { useEffect, useRef, useState } from "react";
import { conflictHotspots } from "@/data/mockData";
import WindParticleSystem from "./effects/WindParticleSystem";
import ShippingLayer from "./ShippingLayer";
import FlightLayer from "./FlightLayer";
import MapStyleSwitcher, { MapStyle } from "./MapStyleSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const typeIcons: Record<string, string> = {
  "armed-conflict": "⚔️",
  protests: "✊",
  terrorism: "💥",
  coup: "🗳️",
  sanctions: "🚫",
  refugees: "🚶",
};

const typeColors: Record<string, string> = {
  "armed-conflict": "#dc2626",
  protests: "#f59e0b",
  terrorism: "#7c2d12",
  coup: "#7c3aed",
  sanctions: "#0891b2",
  refugees: "#6b7280",
};

const severitySizes: Record<string, number> = {
  critical: 20,
  high: 15,
  medium: 11,
  low: 8,
};

interface Layer {
  id: string;
  label: string;
  color: string;
  enabled: boolean;
}

interface WorldMapProps {
  windEnabled?: boolean;
  waveEnabled?: boolean;
  shippingEnabled?: boolean;
  flightEnabled?: boolean;
  layers?: Layer[];
  mapStyle?: MapStyle;
  onStyleChange?: (style: MapStyle) => void;
}

const getMapTiles = (style: MapStyle) => {
  const tiles = {
    dark: [
      {
        url: "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
        options: { subdomains: "abcd", maxZoom: 19 },
      },
      {
        url: "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png",
        options: { subdomains: "abcd", maxZoom: 19, opacity: 0.35 },
      },
    ],
    voyager: [
      {
        url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        options: { subdomains: "abcd", maxZoom: 19 },
      },
    ],
    satellite: [
      {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        options: { maxZoom: 19 },
      },
      {
        url: "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png",
        options: { subdomains: "abcd", maxZoom: 19, opacity: 0.5 },
      },
    ],
    darkblue: [
      {
        url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
        options: { maxZoom: 20 },
      },
    ],
    positron: [
      {
        url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        options: { subdomains: "abcd", maxZoom: 19 },
      },
    ],
  };
  return tiles[style] || tiles.dark;
};

export default function WorldMap({
  windEnabled = false,
  waveEnabled = false,
  shippingEnabled = false,
  flightEnabled = false,
  layers = [],
  mapStyle = "dark",
  onStyleChange
}: WorldMapProps) {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const tileLayersRef = useRef<any[]>([]);

  const typeTranslations: Record<string, string> = {
    "armed-conflict": t("armedConflictType"),
    protests: t("protestsType"),
    terrorism: t("terrorismType"),
    coup: t("coupType"),
    sanctions: t("sanctionsType"),
    refugees: t("refugeesType"),
  };

  const severityTranslations: Record<string, string> = {
    critical: t("critical"),
    high: t("high"),
    medium: t("medium"),
    low: "Low",
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      if (!mapRef.current) return;

      if ((mapRef.current as any)._leaflet_id) {
        mapInstanceRef.current?.remove();
        mapInstanceRef.current = null;
      }
      if (mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [20, 20],
        zoom: 3,
        minZoom: 2,
        maxZoom: 10,
        zoomControl: false,
        attributionControl: false,
        worldCopyJump: true,
      });

      mapInstanceRef.current = map;

      const tiles = getMapTiles(mapStyle);
      tiles.forEach((tile) => {
        const layer = L.tileLayer(tile.url, tile.options).addTo(map);
        tileLayersRef.current.push(layer);
      });

      const layerGroups: Record<string, any> = {};

      conflictHotspots.forEach((spot) => {
        const size = severitySizes[spot.severity];
        const color = typeColors[spot.type] || "#6b7280";
        const isCritical = spot.severity === "critical";

        if (!layerGroups[spot.type]) {
          layerGroups[spot.type] = L.layerGroup().addTo(map);
        }

        const icon = L.divIcon({
          className: "conflict-marker",
          html: `
            <div style="position:relative;width:${size}px;height:${size}px;">
              <div style="position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:${color};opacity:0.88;box-shadow:0 0 ${size * 1.2}px ${color}88;"></div>
              <div style="position:absolute;width:${size}px;height:${size}px;border-radius:50%;border:1.5px solid ${color};animation:pulse-ring 2s ease-out infinite;opacity:0.5;"></div>
              ${isCritical ? `<div style="position:absolute;width:${size * 2.5}px;height:${size * 2.5}px;top:-${size * 0.75}px;left:-${size * 0.75}px;border-radius:50%;border:1px solid ${color}66;animation:pulse-ring 3s ease-out infinite 0.4s;opacity:0.25;"></div>` : ""}
            </div>
          `,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = L.marker([spot.lat, spot.lng], { icon }).addTo(layerGroups[spot.type]);

        marker.bindPopup(
          `<div style="background:#12060a;border:1px solid ${color}44;color:#cbd5e1;padding:10px 14px;border-radius:6px;font-family:Inter,system-ui,sans-serif;font-size:11px;min-width:200px;box-shadow:0 8px 32px #00000088;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
              <span style="color:${color};font-size:14px;">${typeIcons[spot.type] || "●"}</span>
              <span style="color:${color};font-weight:700;font-size:12px;">${spot.label}</span>
            </div>
            <div style="color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">
              ${typeTranslations[spot.type] || spot.type} · ${severityTranslations[spot.severity] || spot.severity}
            </div>
            <div style="color:#94a3b8;font-size:11px;line-height:1.4;">${spot.detail}</div>
            ${spot.value ? `<div style="margin-top:6px;padding:4px 8px;background:${color}15;border:1px solid ${color}33;border-radius:4px;color:${color};font-weight:600;font-size:11px;display:inline-block;">${spot.value}</div>` : ""}
          </div>`,
          { className: "conflict-popup", closeButton: false }
        );

        marker.on('click', () => {
          map.setView([spot.lat, spot.lng], 6, { animate: true, duration: 0.5 });
        });
      });

      (mapInstanceRef.current as any).layerGroups = layerGroups;

      const zoomDiv = document.createElement("div");
      zoomDiv.style.cssText = "position:absolute;bottom:16px;right:16px;z-index:1000;display:flex;flex-direction:column;gap:1px;border-radius:8px;overflow:hidden;";
      zoomDiv.innerHTML = `
        <button id="zm-in" style="width:32px;height:32px;background:#120606;border:none;color:#64748b;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:background .15s;" onmouseover="this.style.background='#2a0c0c'" onmouseout="this.style.background='#120606'">+</button>
        <button id="zm-out" style="width:32px;height:32px;background:#120606;border:none;color:#64748b;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:background .15s;" onmouseover="this.style.background='#2a0c0c'" onmouseout="this.style.background='#120606'">−</button>
      `;
      mapRef.current?.appendChild(zoomDiv);
      document.getElementById("zm-in")?.addEventListener("click", () => map.zoomIn());
      document.getElementById("zm-out")?.addEventListener("click", () => map.zoomOut());

      setMapReady(true);
    };

    initMap();
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return;
    const map = mapInstanceRef.current;
    const L = (window as any).L;
    if (!L) return;
    tileLayersRef.current.forEach((layer) => map.removeLayer(layer));
    tileLayersRef.current = [];
    const tiles = getMapTiles(mapStyle);
    tiles.forEach((tile) => {
      const layer = L.tileLayer(tile.url, tile.options).addTo(map);
      tileLayersRef.current.push(layer);
    });
  }, [mapStyle, mapReady]);

  useEffect(() => {
    if (!mapInstanceRef.current || !layers.length) return;
    const map = mapInstanceRef.current;
    const layerGroups = (map as any).layerGroups;
    if (!layerGroups) return;
    layers.forEach((layer) => {
      const layerGroup = layerGroups[layer.id];
      if (layerGroup) {
        if (layer.enabled) {
          if (!map.hasLayer(layerGroup)) map.addLayer(layerGroup);
        } else {
          if (map.hasLayer(layerGroup)) map.removeLayer(layerGroup);
        }
      }
    });
  }, [layers]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      {mapReady && mapInstanceRef.current && (
        <>
          <WindParticleSystem map={mapInstanceRef.current} enabled={windEnabled} />
          <ShippingLayer map={mapInstanceRef.current} enabled={shippingEnabled} />
          <FlightLayer map={mapInstanceRef.current} enabled={flightEnabled} />
        </>
      )}
      {onStyleChange && (
        <MapStyleSwitcher currentStyle={mapStyle} onStyleChange={onStyleChange} />
      )}
    </div>
  );
}
