"use client";

import React from "react";
import { casualtiesData } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CasualtiesPanel() {
  const { t } = useLanguage();

  return (
    <div className="p-3 space-y-1.5">
      {/* Header row */}
      <div className="flex items-center gap-2 px-3 py-2 text-[9px] text-white/30 font-semibold uppercase tracking-widest">
        <span className="flex-1">{t("region")}</span>
        <span className="w-16 text-right">{t("killed")}</span>
        <span className="w-16 text-right">{t("wounded")}</span>
      </div>

      {casualtiesData.map((entry, i) => (
        <div
          key={i}
          className="rounded-xl px-3 py-2.5 border border-red-900/20 bg-red-950/10 hover:bg-red-900/10 transition-all"
        >
          {/* Conflict name */}
          <div className="text-[10px] text-red-400/70 font-medium mb-1 truncate">
            {entry.conflict}
          </div>
          {/* Data row */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-white/85 flex-1">{entry.region}</span>
            <div className="w-16 text-right">
              <span className="text-[11px] font-bold text-red-400 tabular-nums">{entry.killed}</span>
            </div>
            <div className="w-16 text-right">
              <span className="text-[11px] font-mono text-amber-400/70 tabular-nums">{entry.wounded}</span>
            </div>
          </div>
          {/* Period */}
          <div className="flex items-center justify-between mt-1">
            <span className="text-[9px] text-white/30">{entry.period}</span>
            <span className="text-[9px] text-white/30">
              {t("civilian")}: <span className="text-white/50">{entry.civilian}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
