"use client";

import React from "react";
import { refugeeData } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const trendArrow: Record<string, string> = {
  up: "↑",
  stable: "→",
  down: "↓",
};

const trendColor: Record<string, string> = {
  up: "#ef4444",
  stable: "#f59e0b",
  down: "#22d3ee",
};

export default function RefugeesPanel() {
  const { t } = useLanguage();

  return (
    <div className="p-3 space-y-2">
      {refugeeData.map((entry, i) => {
        const arrow = trendArrow[entry.trend];
        const color = trendColor[entry.trend];
        return (
          <div
            key={i}
            className="rounded-xl p-3 border border-gray-800/40 bg-gray-900/20 hover:bg-gray-800/20 transition-all"
          >
            {/* Region + trend */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-bold text-white/90">{entry.region}</span>
              <span className="text-[12px] font-bold" style={{ color }}>{arrow}</span>
            </div>

            {/* Stats */}
            <div className="flex gap-4 mb-1.5">
              <div>
                <div className="text-[9px] text-white/30 uppercase">{t("displaced")}</div>
                <div className="text-[11px] font-bold text-amber-400">{entry.displaced}</div>
              </div>
              <div>
                <div className="text-[9px] text-white/30 uppercase">{t("abroad")}</div>
                <div className="text-[11px] font-bold text-gray-400">{entry.refugees}</div>
              </div>
            </div>

            {/* Destination */}
            <div className="text-[10px] text-white/40">
              <span className="text-white/25">{t("destination")}: </span>
              {entry.destination}
            </div>
          </div>
        );
      })}
    </div>
  );
}
