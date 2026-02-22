"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Layer {
  id: string;
  label: string;
  color: string;
  enabled: boolean;
}

interface LayersSidebarProps {
  layers: Layer[];
  onToggleLayer: (id: string) => void;
  topOffset?: number;
}

const layerIcons: Record<string, string> = {
  "armed-conflict": "⚔️",
  protests: "✊",
  terrorism: "💥",
  coup: "🗳️",
  sanctions: "🚫",
  refugees: "🚶",
  "supply-routes": "🔗",
  "flight-paths": "✈️",
};

export default function LayersSidebar({ layers: layerState, onToggleLayer, topOffset = 0 }: LayersSidebarProps) {
  const [open, setOpen] = useState(true);
  const { t } = useLanguage();

  const layerLabels: Record<string, string> = {
    "armed-conflict": t("armedConflict"),
    protests: t("protests"),
    terrorism: t("terrorism"),
    coup: t("coup"),
    sanctions: t("sanctions"),
    refugees: t("refugees"),
    "supply-routes": t("supplyRoutes"),
    "flight-paths": "FLIGHT PATHS",
  };

  const enabledCount = layerState.filter((l) => l.enabled).length;

  return (
    <div className="absolute left-3 z-[1000] select-none transition-all duration-300" style={{ top: 72 + topOffset }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="glass-panel w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-red-400 transition-all cursor-pointer group"
          title={t("layers")}
        >
          <span className="text-base">☰</span>
          <div className="absolute left-full ml-2 px-2 py-1 rounded-md bg-[#12060a]/95 border border-red-500/10 text-[10px] text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {t("layers")} ({enabledCount})
          </div>
        </button>
      ) : (
        <div className="w-[220px] glass-panel rounded-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="relative">
            <div className="accent-line h-[2px] w-full" />
            <div className="section-header flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-red-400 text-sm">☰</span>
                <span className="text-[12px] font-semibold text-white/90">{t("layers")}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 font-bold tabular-nums">
                  {enabledCount}/{layerState.length}
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 transition-all cursor-pointer"
              >✕</button>
            </div>
          </div>

          {/* Layer List */}
          <div className="p-2 max-h-[400px] overflow-y-auto">
            {layerState.map((layer) => {
              const icon = layerIcons[layer.id] || "●";
              return (
                <button
                  key={layer.id}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer
                    transition-all duration-200 mb-0.5
                    ${layer.enabled
                      ? "bg-white/[0.04] hover:bg-white/[0.06]"
                      : "hover:bg-white/[0.02] opacity-50"
                    }
                  `}
                  onClick={() => onToggleLayer(layer.id)}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[12px] flex-shrink-0 transition-all"
                    style={{
                      backgroundColor: layer.enabled ? layer.color + "18" : "transparent",
                      color: layer.enabled ? layer.color : "#4b5563",
                      border: `1px solid ${layer.enabled ? layer.color + "30" : "#1e293b"}`,
                      boxShadow: layer.enabled ? `0 0 10px ${layer.color}15` : "none",
                    }}
                  >
                    {icon}
                  </div>
                  <span className={`text-[11px] font-medium flex-1 text-left transition-colors ${
                    layer.enabled ? "text-white/80" : "text-white/30"
                  }`}>
                    {layerLabels[layer.id] || layer.label}
                  </span>
                  <div
                    className="w-8 h-4 rounded-full flex items-center transition-all duration-300 px-0.5"
                    style={{
                      backgroundColor: layer.enabled ? layer.color + "30" : "#1e293b",
                      justifyContent: layer.enabled ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: layer.enabled ? layer.color : "#4b5563",
                        boxShadow: layer.enabled ? `0 0 6px ${layer.color}60` : "none",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
