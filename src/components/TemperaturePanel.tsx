"use client";

import React from "react";
import { globalTemperatures } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const getTempColor = (temp: number) => {
  if (temp >= 40) return "#dc2626";
  if (temp >= 30) return "#f97316";
  if (temp >= 20) return "#eab308";
  if (temp >= 10) return "#22c55e";
  if (temp >= 0) return "#06b6d4";
  return "#3b82f6";
};

const getAnomalyColor = (a: number) => {
  if (a >= 3) return "#ef4444";
  if (a >= 2) return "#f97316";
  if (a >= 1) return "#eab308";
  return "#22c55e";
};

export default function TemperaturePanel() {
  const { t } = useLanguage();
  const globalAvg = (
    globalTemperatures.reduce((s, item) => s + item.anomaly, 0) / globalTemperatures.length
  ).toFixed(1);

  return (
    <div className="flex flex-col h-full">
      {/* Summary */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.04]">
        <span className="text-[10px] text-white/35">{t("global")}</span>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-red-500/10 border border-red-500/15">
          <span className="text-[10px] text-red-400 font-bold tabular-nums">+{globalAvg}°C</span>
          <span className="text-[9px] text-red-400/60">{t("avgAnomaly")}</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {globalTemperatures.map((item) => {
          const tempColor = getTempColor(item.temp);
          const anomColor = getAnomalyColor(item.anomaly);
          return (
            <div
              key={item.region}
              className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-all group"
            >
              <span className="text-[11px] text-white/50 w-[80px] flex-shrink-0 truncate font-medium">
                {item.region}
              </span>
              <div className="flex-1 flex items-center gap-2">
                {/* Temperature bar */}
                <div className="flex-1 relative h-[6px] bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="absolute h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(Math.abs(item.temp) * 1.2, 100)}%`,
                      left: item.temp >= 0 ? "50%" : undefined,
                      right: item.temp < 0 ? "50%" : undefined,
                      maxWidth: "50%",
                      backgroundColor: tempColor,
                      boxShadow: `0 0 8px ${tempColor}30`,
                    }}
                  />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.08]" />
                </div>
                <span
                  className="text-[12px] font-bold w-[48px] text-right tabular-nums"
                  style={{ color: tempColor }}
                >
                  {item.temp > 0 ? "+" : ""}{item.temp}°
                </span>
              </div>
              {/* Anomaly */}
              <div
                className="flex items-center gap-1 px-1.5 py-0.5 rounded-md flex-shrink-0"
                style={{ backgroundColor: anomColor + "10" }}
              >
                <span className="text-[10px]" style={{ color: anomColor }}>
                  {item.trend === "up" ? "↑" : item.trend === "down" ? "↓" : "→"}
                </span>
                <span
                  className="text-[10px] font-bold tabular-nums"
                  style={{ color: anomColor }}
                >
                  +{item.anomaly}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
