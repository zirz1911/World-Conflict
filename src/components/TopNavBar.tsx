"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTimezone } from "@/contexts/TimezoneContext";
import LanguageSwitcher from "./LanguageSwitcher";
import TimezoneSelector from "./TimezoneSelector";

export default function TopNavBar() {
  const { t } = useLanguage();
  const { currentTime } = useTimezone();
  const [activeAlerts] = useState(22);

  return (
    <header className="absolute top-0 left-0 right-0 z-[600] select-none">
      {/* Top gradient accent line */}
      <div className="accent-line h-[2px] w-full" />

      {/* Nav Content */}
      <div className="glass-panel border-t-0 rounded-none flex items-center justify-between px-5 py-2.5">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Logo & Name */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600/20 to-red-900/10 border border-red-600/25 flex items-center justify-center">
              <span className="text-base">⚔️</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-white/95 tracking-wide leading-tight">
                {t("appName")}
              </span>
              <span className="text-[9px] text-red-400/60 font-medium tracking-widest uppercase leading-tight">
                {t("monitoringStatus")}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-red-500/15 to-transparent" />

          {/* Live Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/[0.08] border border-red-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-[10px] font-bold text-red-400 tracking-wider uppercase">{t("live")}</span>
          </div>

          {/* Alert Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/[0.08] border border-amber-500/15">
            <span className="text-xs">⚠️</span>
            <span className="text-[10px] font-bold text-amber-400 tabular-nums">{activeAlerts}</span>
            <span className="text-[10px] text-amber-400/70 font-medium">{t("activeAlerts")}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Severity Indicators */}
          <div className="flex items-center gap-2.5">
            <SeverityPill color="#dc2626" label={t("critical")} count={3} />
            <SeverityPill color="#ef4444" label={t("high")} count={9} />
            <SeverityPill color="#f59e0b" label={t("medium")} count={6} />
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-red-500/15 to-transparent" />

          {/* Clock */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
            <span className="text-[10px] text-red-400/50">⏱</span>
            <span className="text-[11px] text-white/70 font-mono tabular-nums tracking-wider">{currentTime}</span>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-red-500/15 to-transparent" />

          {/* Timezone Selector */}
          <TimezoneSelector />

          {/* Divider */}
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-red-500/15 to-transparent" />

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

function SeverityPill({ color, label, count }: { color: string; label: string; count: number }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/[0.03] transition-colors">
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}40` }}
      />
      <span className="text-[10px] text-white/50 font-medium">{label}</span>
      <span className="text-[10px] font-bold tabular-nums" style={{ color }}>{count}</span>
    </div>
  );
}
