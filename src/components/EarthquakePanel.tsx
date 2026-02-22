"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { recentEarthquakes } from "@/data/mockData";

const getMagColor = (mag: number) => {
  if (mag >= 6) return "#ef4444";
  if (mag >= 5) return "#f97316";
  if (mag >= 4) return "#eab308";
  return "#22c55e";
};

export default function EarthquakePanel() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col h-full">
      {/* Summary strip */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.04]">
        <span className="text-[10px] text-white/35 font-mono">24h</span>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 font-bold tabular-nums border border-red-500/15">
          {recentEarthquakes.length} {t("events")}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {recentEarthquakes.map((eq, idx) => {
          const color = getMagColor(eq.magnitude);
          return (
            <div
              key={eq.id}
              className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-all cursor-pointer group"
            >
              {/* Magnitude Badge */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-bold flex-shrink-0 transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: color + "10",
                  color,
                  border: `1px solid ${color}20`,
                  boxShadow: `0 0 12px ${color}10`,
                }}
              >
                {eq.magnitude.toFixed(1)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-white/80 font-medium truncate">{eq.location}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-white/30">
                    {t("depthLabel")}: {eq.depth}km
                  </span>
                  <span className="text-[10px] text-white/20">·</span>
                  <span className="text-[10px] text-white/25 font-mono tabular-nums">{eq.time}</span>
                </div>
              </div>
              {/* Magnitude bar */}
              <div className="w-12 h-1 rounded-full bg-white/[0.05] overflow-hidden flex-shrink-0">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(eq.magnitude / 8) * 100}%`,
                    backgroundColor: color,
                    boxShadow: `0 0 6px ${color}40`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
