"use client";

import React, { useState } from "react";
import { airQualityData } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const getAqiColor = (aqi: number) => {
  if (aqi > 300) return "#7f1d1d";
  if (aqi > 200) return "#991b1b";
  if (aqi > 150) return "#ef4444";
  if (aqi > 100) return "#f97316";
  if (aqi > 50) return "#eab308";
  return "#22c55e";
};

type Pollutant = "pm25" | "pm10" | "o3" | "no2" | "so2";

export default function AirQualityPanel() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Pollutant>("pm25");
  const pollutants: { key: Pollutant; label: string }[] = [
    { key: "pm25", label: t("pm25") },
    { key: "pm10", label: t("pm10") },
    { key: "o3", label: t("o3") },
    { key: "no2", label: t("no2") },
    { key: "so2", label: t("so2") },
  ];

  const getAqiLabel = (aqi: number) => {
    if (aqi > 300) return t("hazardous");
    if (aqi > 200) return t("veryUnhealthy");
    if (aqi > 150) return t("unhealthy");
    if (aqi > 100) return t("sensitive");
    if (aqi > 50) return t("moderateAqi");
    return t("good");
  };

  const sorted = [...airQualityData].sort((a, b) => b.aqi - a.aqi);

  return (
    <div className="flex flex-col h-full">
      {/* Pollutant selector */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-white/[0.04] bg-white/[0.01]">
        {pollutants.map((p) => (
          <button
            key={p.key}
            onClick={() => setSelected(p.key)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
              selected === p.key
                ? "bg-sky-500/15 text-sky-400 border border-sky-500/20"
                : "text-white/30 hover:text-white/50 hover:bg-white/[0.03] border border-transparent"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {sorted.map((city, idx) => {
          const val = city[selected];
          const color = getAqiColor(city.aqi);
          return (
            <div
              key={city.city}
              className="flex items-center gap-3 px-4 py-2 border-b border-white/[0.03] hover:bg-white/[0.02] transition-all cursor-pointer group"
            >
              {/* Rank */}
              <span className="text-[10px] text-white/15 font-mono tabular-nums w-4 text-right flex-shrink-0">
                {idx + 1}
              </span>
              <div className="w-[70px] flex-shrink-0">
                <div className="text-[11px] text-white/80 font-medium">{city.city}</div>
                <div className="text-[9px] text-white/25">{city.country}</div>
              </div>
              <div className="flex-1 h-[4px] bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min((city.aqi / 500) * 100, 100)}%`,
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}30`,
                  }}
                />
              </div>
              <div className="text-right flex-shrink-0 w-[55px]">
                <span className="text-[12px] font-bold tabular-nums" style={{ color }}>
                  {val}
                </span>
                <span className="text-[8px] text-white/20 ml-0.5">
                  {selected === "pm25" || selected === "pm10" ? "µg" : "ppb"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 px-4 py-2 border-t border-white/[0.04] bg-white/[0.01]">
        {[
          { c: "#22c55e", l: t("good") },
          { c: "#eab308", l: t("moderateAqi") },
          { c: "#f97316", l: t("unhealthy") },
          { c: "#ef4444", l: t("hazardous") },
        ].map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            <span
              className="w-[6px] h-[6px] rounded-full"
              style={{ backgroundColor: item.c, boxShadow: `0 0 4px ${item.c}40` }}
            />
            <span className="text-[8px] text-white/30">{item.l}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
