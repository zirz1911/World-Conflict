"use client";

import React from "react";
import { activeConflicts } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const severityColors: Record<string, string> = {
  critical: "#dc2626",
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#6b7280",
};

const severityBg: Record<string, string> = {
  critical: "rgba(220,38,38,0.10)",
  high: "rgba(239,68,68,0.08)",
  medium: "rgba(245,158,11,0.08)",
  low: "rgba(107,114,128,0.08)",
};

export default function ActiveConflictsPanel() {
  const { t } = useLanguage();

  return (
    <div className="p-3 space-y-2">
      {activeConflicts.map((conflict) => {
        const color = severityColors[conflict.severity];
        const bg = severityBg[conflict.severity];
        return (
          <div
            key={conflict.id}
            className="rounded-xl p-3 border transition-all hover:brightness-110"
            style={{ backgroundColor: bg, borderColor: color + "22" }}
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
                    {conflict.severity}
                  </span>
                  <span className="text-white/20 text-[9px]">·</span>
                  <span className="text-[10px] text-white/40">{conflict.region}</span>
                </div>
                <div className="text-[13px] font-bold text-white/90 leading-tight truncate">
                  {conflict.name}
                </div>
              </div>
              <div
                className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
              />
            </div>

            {/* Sides */}
            <div className="text-[10px] text-white/50 mb-1.5 leading-relaxed">
              {conflict.sides}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: color + "15", color }}
              >
                {conflict.status}
              </span>
              <div className="flex items-center gap-2">
                {conflict.casualties && (
                  <span className="text-[10px] text-white/40 font-mono">
                    ☠ {conflict.casualties}
                  </span>
                )}
                <span className="text-[10px] text-white/30">
                  {t("since")} {conflict.startYear}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
