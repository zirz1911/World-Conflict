"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TranslationKey } from "@/locales/translations";

export type MapStyle = "dark" | "voyager" | "satellite" | "darkblue" | "positron";

interface MapStyleOption {
  id: MapStyle;
  nameKey: TranslationKey;
  icon: string;
  preview: string;
}

const mapStyles: MapStyleOption[] = [
  { id: "dark", nameKey: "darkMatter", icon: "🌑", preview: "#0a0b0f" },
  { id: "voyager", nameKey: "voyager", icon: "🌍", preview: "#6495ed" },
  { id: "satellite", nameKey: "satellite", icon: "🛰️", preview: "#2d5016" },
  { id: "darkblue", nameKey: "darkBlue", icon: "🌊", preview: "#0c1445" },
  { id: "positron", nameKey: "positron", icon: "☀️", preview: "#e8e8e8" },
];

interface MapStyleSwitcherProps {
  currentStyle: MapStyle;
  onStyleChange: (style: MapStyle) => void;
}

export default function MapStyleSwitcher({
  currentStyle,
  onStyleChange,
}: MapStyleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const currentStyleData = mapStyles.find((s) => s.id === currentStyle);

  return (
    <div className="absolute bottom-3 left-3 z-[1000] select-none">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="glass-panel flex items-center gap-2 px-3 py-2 rounded-xl hover:border-sky-500/20 transition-all cursor-pointer group"
        >
          <span className="text-sm">{currentStyleData?.icon}</span>
          <span className="text-[11px] text-white/60 group-hover:text-white/80 transition-colors">
            {currentStyleData ? t(currentStyleData.nameKey) : ""}
          </span>
        </button>
      ) : (
        <div className="w-[210px] glass-panel rounded-2xl overflow-hidden animate-fade-in">
          <div className="relative">
            <div className="accent-line h-[2px] w-full" />
            <div className="section-header flex items-center justify-between px-4 py-2.5">
              <span className="text-[11px] font-semibold text-white/90">
                {t("mapStyle")}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-2 max-h-[280px] overflow-y-auto">
            {mapStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => {
                  onStyleChange(style.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-all mb-0.5 ${
                  currentStyle === style.id
                    ? "bg-sky-500/10 border border-sky-500/20"
                    : "hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 border border-white/10"
                  style={{ backgroundColor: style.preview }}
                >
                  {style.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className={`text-[11px] leading-tight font-medium ${
                    currentStyle === style.id ? "text-sky-400" : "text-white/60"
                  }`}>
                    {t(style.nameKey)}
                  </div>
                </div>
                {currentStyle === style.id && (
                  <span className="text-sky-400 text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
