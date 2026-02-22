"use client";

import React, { useState, useEffect } from "react";

const briefings = [
  {
    label: "SITREP",
    color: "#ef4444",
    text: "Ukraine: RU forces pressing near Pokrovsk, overnight Shahed strikes on Kharkiv. Gaza: IDF operations in Rafah ongoing, 40+ casualties. Sudan: RSF in S. Khartoum, 150K+ dead — UN worst crisis. DPRK: 10K+ troops in Russia confirmed by ROK intel.",
  },
  {
    label: "FLASH",
    color: "#f59e0b",
    text: "Iran enrichment at 60% — IAEA warns of weapons-grade threshold breach. DRC: M23 within 8km of Goma, MONUSCO on alert. Myanmar junta airstrike kills 14 civilians in Sagaing. Georgia: 200+ pro-EU protesters arrested in Tbilisi crackdown.",
  },
  {
    label: "INTEL",
    color: "#7c3aed",
    text: "PLA carrier group enters Taiwan Strait exercise zone — US INDOPACOM monitoring. Qatar-brokered Gaza ceasefire talks resume in Cairo. Russia deploys additional S-400 battery near Kherson. US-China defence hotline reactivated after 3-year pause.",
  },
];

interface DailyBriefingProps {
  open: boolean;
  onToggle: () => void;
}

export default function DailyBriefing({ open, onToggle }: DailyBriefingProps) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % briefings.length);
        setFading(false);
      }, 300);
    }, 8000);
    return () => clearInterval(interval);
  }, [open]);

  const current = briefings[idx];

  if (!open) {
    return (
      <div className="absolute top-[52px] right-[180px] z-[590]">
        <button
          onClick={onToggle}
          className="glass-panel px-3 py-1 rounded-b-lg border-t-0 flex items-center gap-1.5 text-white/30 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <span className="text-[8px]">▼</span>
          <span className="text-[9px] font-bold tracking-widest uppercase">Briefing</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-[52px] left-0 right-0 z-[590]">
      <div
        className="glass-panel border-t-0 border-x-0 border-b-0 rounded-none flex items-center gap-4 px-5"
        style={{ height: 38 }}
      >
        {/* Label badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="relative flex h-1.5 w-1.5"
          >
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: current.color }}
            />
            <span
              className="relative inline-flex rounded-full h-1.5 w-1.5"
              style={{ backgroundColor: current.color }}
            />
          </span>
          <span
            className="text-[9px] font-bold tracking-widest uppercase"
            style={{ color: current.color }}
          >
            {current.label}
          </span>
          <span className="text-white/15 text-[9px]">|</span>
          {/* Dot indicators */}
          <div className="flex gap-1">
            {briefings.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFading(true); setTimeout(() => { setIdx(i); setFading(false); }, 150); }}
                className="w-1 h-1 rounded-full transition-all cursor-pointer"
                style={{ backgroundColor: i === idx ? current.color : "rgba(255,255,255,0.15)" }}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-white/10 flex-shrink-0" />

        {/* Briefing text */}
        <p
          className="flex-1 text-[11px] text-white/65 leading-tight truncate transition-opacity duration-300"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {current.text}
        </p>

        {/* Close button */}
        <button
          onClick={onToggle}
          className="w-5 h-5 rounded flex items-center justify-center text-white/20 hover:text-white/60 transition-colors flex-shrink-0 text-[10px] cursor-pointer"
        >
          ✕
        </button>
      </div>
      {/* Bottom accent */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${current.color}40, transparent)` }} />
    </div>
  );
}
