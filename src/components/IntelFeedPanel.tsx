"use client";

import React from "react";
import { intelFeed } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const severityColors: Record<string, string> = {
  critical: "#dc2626",
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#6b7280",
};

const typeColors: Record<string, string> = {
  SIGINT: "#7c3aed",
  MILITARY: "#dc2626",
  DIPLOMATIC: "#0891b2",
  NUCLEAR: "#dc2626",
  HUMANITARIAN: "#f59e0b",
  POLITICAL: "#7c3aed",
  ECONOMIC: "#0891b2",
};

export default function IntelFeedPanel() {
  const { t } = useLanguage();

  return (
    <div className="p-3 space-y-1.5">
      {intelFeed.map((event) => {
        const severityColor = severityColors[event.severity];
        const typeColor = typeColors[event.type] || "#6b7280";
        return (
          <div
            key={event.id}
            className="rounded-xl px-3 py-2.5 border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
          >
            {/* Top row: type badge + time */}
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider"
                style={{ backgroundColor: typeColor + "20", color: typeColor }}
              >
                {event.type}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/30">{event.region}</span>
                <span className="text-white/15">·</span>
                <span className="text-[9px] text-white/25 font-mono">{event.time}</span>
              </div>
            </div>

            {/* Headline */}
            <div className="text-[11px] text-white/80 leading-snug mb-1.5">
              {event.headline}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-white/30">
                {t("source")}: <span className="text-white/40">{event.source}</span>
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: severityColor, boxShadow: `0 0 6px ${severityColor}60` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
