"use client";

import React from "react";
import { conflictAlerts } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const severityColors: Record<string, string> = {
  critical: "#dc2626",
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#6b7280",
};

const severityBg: Record<string, string> = {
  critical: "rgba(220,38,38,0.12)",
  high: "rgba(239,68,68,0.08)",
  medium: "rgba(245,158,11,0.08)",
  low: "rgba(107,114,128,0.06)",
};

export default function AlertsPanel() {
  const { t } = useLanguage();

  return (
    <div className="p-3 space-y-2">
      {conflictAlerts.map((alert) => {
        const color = severityColors[alert.severity];
        const bg = severityBg[alert.severity];
        return (
          <div
            key={alert.id}
            className="rounded-xl p-3 border transition-all hover:brightness-110"
            style={{ backgroundColor: bg, borderColor: color + "25" }}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider"
                    style={{ backgroundColor: color + "20", color }}
                  >
                    {alert.type}
                  </span>
                  <span className="text-[10px] text-white/40">{alert.region}</span>
                </div>
                <div className="text-[11px] text-white/80 leading-snug">
                  {alert.description}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span
                className="text-[9px] font-bold uppercase tracking-widest"
                style={{ color }}
              >
                {alert.severity}
              </span>
              <span className="text-[10px] text-white/30 font-mono">{alert.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
