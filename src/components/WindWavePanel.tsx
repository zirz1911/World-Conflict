"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { windWaveData } from "@/data/mockData";

const statusColors: Record<string, string> = {
  typhoon: "#ef4444",
  storm: "#f97316",
  rough: "#eab308",
  moderate: "#06b6d4",
  calm: "#22c55e",
};

const dirArrows: Record<string, string> = {
  N: "↑", NE: "↗", E: "→", SE: "↘",
  S: "↓", SW: "↙", W: "←", NW: "↖",
};

export default function WindWavePanel() {
  const { t } = useLanguage();

  const statusTranslations: Record<string, string> = {
    typhoon: t("typhoonStatus"),
    storm: t("stormStatus"),
    rough: t("roughStatus"),
    moderate: t("moderateStatus"),
    calm: t("calmStatus"),
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {windWaveData.map((item, i) => {
          const color = statusColors[item.status] || "#06b6d4";
          return (
            <div
              key={i}
              className="px-4 py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="text-lg transition-transform group-hover:scale-110"
                    style={{ color, textShadow: `0 0 10px ${color}40` }}
                  >
                    {dirArrows[item.direction] || "→"}
                  </span>
                  <span className="text-[11px] text-white/80 font-medium">{item.location}</span>
                </div>
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
                  style={{
                    color,
                    backgroundColor: color + "10",
                    border: `1px solid ${color}20`,
                  }}
                >
                  {statusTranslations[item.status] || item.status}
                </span>
              </div>
              {/* Data grid */}
              <div className="grid grid-cols-3 gap-2 ml-7">
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/25 mb-0.5">{t("wind")}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[13px] text-cyan-400 font-bold tabular-nums">{item.windSpeed}</span>
                    <span className="text-[8px] text-white/20">km/h</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/25 mb-0.5">{t("wave")}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[13px] text-blue-400 font-bold tabular-nums">{item.waveHeight}</span>
                    <span className="text-[8px] text-white/20">m</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/25 mb-0.5">{t("direction")}</span>
                  <span className="text-[13px] text-white/50 font-bold">{item.direction}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
