"use client";

import React from "react";
import { weatherAlerts } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const severityColors: Record<string, string> = {
  extreme: "#ef4444",
  severe: "#f97316",
  moderate: "#eab308",
  minor: "#22c55e",
};

const typeEmoji: Record<string, string> = {
  TYPHOON: "🌀",
  HEATWAVE: "🔥",
  BUSHFIRE: "🔥",
  "DUST STORM": "🌪️",
  FLOOD: "🌊",
  LANDSLIDE: "⛰️",
  ERUPTION: "🌋",
  TSUNAMI: "🌊",
};

export default function WeatherAlerts() {
  const { t } = useLanguage();

  const typeTranslations: Record<string, string> = {
    TYPHOON: t("typhoon"),
    HEATWAVE: t("heatwaveAlert"),
    BUSHFIRE: t("bushfire"),
    "DUST STORM": t("dustStorm"),
    FLOOD: t("flood"),
    LANDSLIDE: t("landslide"),
    ERUPTION: t("eruption"),
    TSUNAMI: t("tsunami"),
  };

  const severityTranslations: Record<string, string> = {
    extreme: t("extreme"),
    severe: t("severe"),
    moderate: t("moderate"),
    minor: t("minor"),
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {weatherAlerts.map((alert, idx) => {
          const color = severityColors[alert.severity];
          return (
            <div
              key={alert.id}
              className="px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition-all cursor-pointer group"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                {/* Severity indicator bar */}
                <div className="flex flex-col items-center gap-1 pt-0.5">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: color + "40", boxShadow: `0 0 8px ${color}20` }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{typeEmoji[alert.type] || "⚠️"}</span>
                      <span
                        className="text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-md"
                        style={{
                          color,
                          backgroundColor: color + "12",
                          border: `1px solid ${color}25`,
                        }}
                      >
                        {typeTranslations[alert.type] || alert.type}
                      </span>
                      <span
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider"
                        style={{ color: color + "aa", backgroundColor: color + "08" }}
                      >
                        {severityTranslations[alert.severity] || alert.severity}
                      </span>
                    </div>
                    <span className="text-[9px] text-white/25 font-mono tabular-nums">{alert.time}</span>
                  </div>
                  <div className="text-[10px] text-white/40 font-medium mb-1">{alert.region}</div>
                  <div className="text-[11px] text-white/55 leading-relaxed">
                    {alert.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
