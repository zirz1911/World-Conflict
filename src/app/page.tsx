"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import TopNavBar from "@/components/TopNavBar";
import LayersSidebar from "@/components/LayersSidebar";
import DailyBriefing from "@/components/DailyBriefing";
import ActiveConflictsPanel from "@/components/ActiveConflictsPanel";
import AlertsPanel from "@/components/AlertsPanel";
import CasualtiesPanel from "@/components/CasualtiesPanel";
import SanctionsPanel from "@/components/SanctionsPanel";
import RefugeesPanel from "@/components/RefugeesPanel";
import IntelFeedPanel from "@/components/IntelFeedPanel";
import { layers as defaultLayers } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapStyle } from "@/components/MapStyleSwitcher";
import { useDataRefresh } from "@/contexts/DataRefreshContext";

const WorldMap = dynamic(() => import("@/components/WorldMap"), {
  ssr: false,
});

type TabId = "active" | "alerts" | "casualties" | "sanctions" | "refugees" | "feed";

const tabConfig: { id: TabId; icon: string; colorClass: string }[] = [
  { id: "active",     icon: "⚔️",  colorClass: "text-red-400" },
  { id: "alerts",     icon: "🔴",  colorClass: "text-red-500" },
  { id: "casualties", icon: "☠️",  colorClass: "text-red-300" },
  { id: "sanctions",  icon: "🚫",  colorClass: "text-sky-400" },
  { id: "refugees",   icon: "🚶",  colorClass: "text-gray-400" },
  { id: "feed",       icon: "📡",  colorClass: "text-amber-400" },
];

export default function Home() {
  const { t } = useLanguage();
  const { nextRefreshIn, triggerRefresh } = useDataRefresh();
  const [layers, setLayers] = useState(defaultLayers);
  const [mapStyle, setMapStyle] = useState<MapStyle>("satellite");
  const [activeTab, setActiveTab] = useState<TabId>("active");
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [briefingOpen, setBriefingOpen] = useState(true);
  const BRIEFING_H = 39; // px height of briefing strip when open
  const extraTop = briefingOpen ? BRIEFING_H : 0;

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    );
  };

  const windEnabled = layers.find((l) => l.id === "wind")?.enabled ?? false;
  const waveEnabled = layers.find((l) => l.id === "wave")?.enabled ?? false;
  const shippingEnabled = layers.find((l) => l.id === "supply-routes")?.enabled ?? false;
  const flightEnabled = layers.find((l) => l.id === "flight-paths")?.enabled ?? false;

  const tabLabelMap: Record<TabId, string> = {
    active:     t("tabActive"),
    alerts:     t("tabAlerts"),
    casualties: t("tabCasualties"),
    sanctions:  t("tabSanctions"),
    refugees:   t("tabRefugees"),
    feed:       t("tabFeed"),
  };

  const renderActivePanel = () => {
    switch (activeTab) {
      case "active":     return <ActiveConflictsPanel />;
      case "alerts":     return <AlertsPanel />;
      case "casualties": return <CasualtiesPanel />;
      case "sanctions":  return <SanctionsPanel />;
      case "refugees":   return <RefugeesPanel />;
      case "feed":       return <IntelFeedPanel />;
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#080608]">
      {/* Full-screen Map Background */}
      <WorldMap
        windEnabled={windEnabled}
        waveEnabled={waveEnabled}
        shippingEnabled={shippingEnabled}
        flightEnabled={flightEnabled}
        layers={layers}
        mapStyle={mapStyle}
        onStyleChange={setMapStyle}
      />

      {/* Top Navigation */}
      <TopNavBar />

      {/* Daily Briefing Strip */}
      <DailyBriefing open={briefingOpen} onToggle={() => setBriefingOpen(v => !v)} />

      {/* Layer Sidebar - Left */}
      <LayersSidebar layers={layers} onToggleLayer={toggleLayer} topOffset={extraTop} />

      {/* Right Side Panel with Tabs */}
      <div
        className={`
          absolute right-0 z-[500]
          transition-all duration-400 ease-out
          ${sidePanelOpen ? "translate-x-0" : "translate-x-[calc(100%-48px)]"}
        `}
        style={{ width: 380, top: 72 + extraTop, height: `calc(100vh - ${140 + extraTop}px)` }}
      >
        <div className="flex h-full">
          {/* Vertical Tab Bar */}
          <div className="flex flex-col items-center py-2 gap-1 w-[48px] flex-shrink-0">
            {/* Toggle Button */}
            <button
              onClick={() => setSidePanelOpen(!sidePanelOpen)}
              className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-white/50 hover:text-red-400 transition-all mb-2 cursor-pointer"
              title={sidePanelOpen ? t("closePanel") : t("openPanel")}
            >
              <span className="text-sm">{sidePanelOpen ? "›" : "‹"}</span>
            </button>

            {/* Tab Buttons */}
            {tabConfig.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (!sidePanelOpen) setSidePanelOpen(true);
                }}
                className={`
                  w-9 h-9 rounded-xl flex items-center justify-center
                  transition-all duration-200 cursor-pointer relative group
                  ${activeTab === tab.id && sidePanelOpen
                    ? "tab-active border animate-glow-pulse"
                    : "glass-panel hover:border-red-500/20 text-white/40 hover:text-white/70"
                  }
                `}
                title={tabLabelMap[tab.id]}
              >
                <span className={`text-sm ${activeTab === tab.id && sidePanelOpen ? tab.colorClass : ""}`}>
                  {tab.icon}
                </span>
                {/* Tooltip */}
                <div className="absolute right-full mr-2 px-2 py-1 rounded-md bg-[#12060a]/95 border border-red-500/10 text-[10px] text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {tabLabelMap[tab.id]}
                </div>
              </button>
            ))}
          </div>

          {/* Panel Content */}
          {sidePanelOpen && (
            <div className="flex-1 glass-panel rounded-2xl overflow-hidden animate-fade-in-right mr-3">
              <div className="h-full overflow-hidden flex flex-col">
                {/* Panel Header */}
                <div className="relative">
                  <div className="accent-line h-[2px] w-full" />
                  <div className="section-header px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${tabConfig.find(t => t.id === activeTab)?.colorClass}`}>
                        {tabConfig.find(t => t.id === activeTab)?.icon}
                      </span>
                      <span className="text-[13px] font-semibold text-white/90">
                        {tabLabelMap[activeTab]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                      </span>
                      <span className="text-[9px] text-red-400 font-semibold uppercase tracking-wider">{t("live")}</span>
                      <span className="text-white/20 text-[9px]">·</span>
                      <button
                        onClick={triggerRefresh}
                        className="text-[9px] text-white/40 hover:text-red-400 transition-colors font-mono tabular-nums"
                        title="Refresh now"
                      >
                        ↻ {Math.floor(nextRefreshIn / 60)}:{String(nextRefreshIn % 60).padStart(2, "0")}
                      </button>
                    </div>
                  </div>
                </div>
                {/* Panel Body */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                  {renderActivePanel()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[600] animate-slide-up">
        <div className="glass-panel rounded-2xl px-2 py-2 flex items-center gap-1">
          <StatChip icon="⚔️" label={t("conflictsLabel")} value="8" color="#dc2626" />
          <StatDivider />
          <StatChip icon="💥" label={t("alertsLabel")} value="14" color="#ef4444" />
          <StatDivider />
          <StatChip icon="🚫" label={t("sanctionsLabel")} value="8" color="#0891b2" />
          <StatDivider />
          <StatChip icon="🚶" label={t("displacedLabel")} value="43M+" color="#6b7280" />
          <StatDivider />
          <StatChip icon="🔴" label={t("criticalZonesLabel")} value="3" color="#b91c1c" />
        </div>
      </div>
    </div>
  );
}

function StatDivider() {
  return <div className="w-px h-6 bg-gradient-to-b from-transparent via-red-500/20 to-transparent mx-1" />;
}

function StatChip({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/[0.03] transition-all duration-200 cursor-default group"
    >
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] transition-transform group-hover:scale-110"
        style={{
          backgroundColor: color + "15",
          color,
          boxShadow: `0 0 12px ${color}20`,
        }}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] text-white/40 leading-none">{label}</span>
        <span className="text-[14px] font-bold tabular-nums leading-tight" style={{ color }}>{value}</span>
      </div>
    </div>
  );
}
