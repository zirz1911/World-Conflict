"use client";

import React from "react";
import { sanctionsData } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const statusColors: Record<string, string> = {
  active: "#0891b2",
  partial: "#f59e0b",
  lifted: "#6b7280",
};

export default function SanctionsPanel() {
  const { t } = useLanguage();

  return (
    <div className="p-3 space-y-2">
      {sanctionsData.map((sanction) => {
        const color = statusColors[sanction.status];
        return (
          <div
            key={sanction.id}
            className="rounded-xl p-3 border border-sky-900/20 bg-sky-950/10 hover:bg-sky-900/10 transition-all"
          >
            {/* Target + status */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-bold text-white/90">{sanction.target}</span>
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{ backgroundColor: color + "20", color }}
              >
                {sanction.status}
              </span>
            </div>

            {/* By */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[9px] text-white/30 uppercase">{t("by")}:</span>
              <span className="text-[10px] text-sky-400/80 font-medium">{sanction.by}</span>
            </div>

            {/* Reason */}
            <div className="text-[10px] text-white/50 mb-1.5 leading-snug">{sanction.reason}</div>

            {/* Since */}
            <div className="text-[9px] text-white/30">
              {t("since")}: <span className="text-white/50 font-mono">{sanction.since}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
