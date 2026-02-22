"use client";

import React, { useState, useMemo } from "react";
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

const intelTypes = ["MILITARY", "DIPLOMATIC", "NUCLEAR", "HUMANITARIAN", "POLITICAL", "SIGINT"];
const timeRanges = [
  { label: "1H", minutes: 60 },
  { label: "6H", minutes: 360 },
  { label: "24H", minutes: 1440 },
];

// Parse time string like "4m ago", "1h ago", "6h ago" into minutes
function parseTimeToMinutes(timeStr: string): number {
  const match = timeStr.match(/(\d+)([mh])\s*ago/i);
  if (!match) return 0;

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  return unit === "h" ? value * 60 : value;
}

export default function IntelFeedPanel() {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  // Filter logic
  const filteredEvents = useMemo(() => {
    return intelFeed.filter((event) => {
      // Type filter
      if (selectedType && event.type !== selectedType) {
        return false;
      }

      // Time filter
      if (selectedTime) {
        const eventMinutesAgo = parseTimeToMinutes(event.time);
        if (eventMinutesAgo > selectedTime) {
          return false;
        }
      }

      return true;
    });
  }, [selectedType, selectedTime]);

  return (
    <div className="p-3 space-y-2">
      {/* Type filter chips */}
      <div className="space-y-1">
        <div className="text-[9px] text-white/40 uppercase tracking-wider font-bold">Type</div>
        <div className="flex gap-1.5 overflow-x-auto pb-1.5 scroll-smooth">
          {/* ALL chip */}
          <button
            onClick={() => setSelectedType(null)}
            className={`px-2.5 py-1 rounded-full text-[9px] font-semibold whitespace-nowrap transition-all ${
              selectedType === null
                ? "bg-red-500/30 border border-red-500/80 text-red-300"
                : "border border-white/10 bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            ALL
          </button>

          {/* Type chips */}
          {intelTypes.map((type) => {
            const color = typeColors[type];
            const isActive = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-2.5 py-1 rounded-full text-[9px] font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "border"
                    : "border border-white/10 bg-white/5 hover:bg-white/10"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: color + "25",
                        borderColor: color + "80",
                        color: color,
                      }
                    : { color: "#a0aec0" }
                }
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time filter pills */}
      <div className="space-y-1">
        <div className="text-[9px] text-white/40 uppercase tracking-wider font-bold">Time Range</div>
        <div className="flex gap-1.5">
          {/* ALL pill */}
          <button
            onClick={() => setSelectedTime(null)}
            className={`px-2.5 py-1 rounded-full text-[9px] font-semibold whitespace-nowrap transition-all ${
              selectedTime === null
                ? "bg-red-500/30 border border-red-500/80 text-red-300"
                : "border border-white/10 bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            ALL
          </button>

          {/* Time range pills */}
          {timeRanges.map(({ label, minutes }) => (
            <button
              key={label}
              onClick={() => setSelectedTime(minutes)}
              className={`px-2.5 py-1 rounded-full text-[9px] font-semibold whitespace-nowrap transition-all ${
                selectedTime === minutes
                  ? "bg-amber-500/30 border border-amber-500/80 text-amber-300"
                  : "border border-white/10 bg-white/5 text-white/40 hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter header with count */}
      <div className="flex items-center justify-between pt-2 pb-1">
        <div className="text-[9px] text-white/40 uppercase tracking-wider font-bold">
          Events
          <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono">
            {filteredEvents.length}
          </span>
        </div>
      </div>

      {/* Events list */}
      <div className="space-y-1.5">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-[10px] text-white/30">No events match the selected filters</p>
          </div>
        ) : (
          filteredEvents.map((event) => {
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
          })
        )}
      </div>
    </div>
  );
}
