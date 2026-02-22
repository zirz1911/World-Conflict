"use client";

import React from "react";
import { disasterHotspots } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const typeColors: Record<string, string> = {
  earthquake: "#ef4444",
  storm: "#3b82f6",
  flood: "#06b6d4",
  wildfire: "#f97316",
  volcano: "#dc2626",
  tsunami: "#8b5cf6",
  pollution: "#94a3b8",
  heatwave: "#eab308",
};

const typeEmoji: Record<string, string> = {
  earthquake: "◆",
  storm: "⟐",
  flood: "≋",
  wildfire: "▲",
  volcano: "▼",
  tsunami: "〰",
  pollution: "●",
  heatwave: "◉",
};

const severityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
const severityColors: Record<string, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
  low: "#22c55e",
};

export default function DisasterFeed() {
  const { t } = useLanguage();

  const severityTranslations: Record<string, string> = {
    critical: t("critical"),
    high: t("high"),
    medium: t("medium"),
    minor: t("minor"),
  };

  const typeTranslations: Record<string, string> = {
    earthquake: t("earthquakeType"),
    storm: t("stormType"),
    flood: t("floodType"),
    wildfire: t("wildfireType"),
    volcano: t("volcanoType"),
    tsunami: t("tsunamiType"),
    pollution: t("pollutionType"),
    heatwave: t("heatwaveType"),
  };

  const sorted = [...disasterHotspots].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Summary */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.04]">
        <span className="text-[10px] text-white/35">{t("totalEvents")}: {sorted.length}</span>
        <span className="text-[10px] text-white/25">{t("allEvents")}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sorted.map((spot) => {
          const color = typeColors[spot.type] || "#94a3b8";
          const sevColor = severityColors[spot.severity] || "#eab308";
          return (
            <div
              key={spot.id}
              className="flex items-start gap-3 px-4 py-2.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-all cursor-pointer group"
            >
              {/* Type Icon */}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[12px] flex-shrink-0 mt-0.5 transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: color + "10",
                  color,
                  border: `1px solid ${color}20`,
                  boxShadow: `0 0 10px ${color}10`,
                }}
              >
                {typeEmoji[spot.type] || "●"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-medium text-white/80 truncate">{spot.label}</span>
                  <span
                    className="text-[8px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 uppercase tracking-wider"
                    style={{
                      color: sevColor,
                      backgroundColor: sevColor + "10",
                      border: `1px solid ${sevColor}20`,
                    }}
                  >
                    {severityTranslations[spot.severity] || spot.severity}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9px] text-white/25 font-medium">
                    {typeTranslations[spot.type] || spot.type}
                  </span>
                </div>
                <div className="text-[10px] text-white/40 leading-relaxed">{spot.detail}</div>
                {spot.value && (
                  <span
                    className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md"
                    style={{ color, backgroundColor: color + "10", border: `1px solid ${color}15` }}
                  >
                    {spot.value}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
