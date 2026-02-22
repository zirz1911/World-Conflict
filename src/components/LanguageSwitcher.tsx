"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-sky-500/20 transition-all cursor-pointer"
      >
        <span className="text-[12px]">{language === "th" ? "🇹🇭" : "🇺🇸"}</span>
        <span className="text-[10px] font-semibold text-white/70">
          {language === "th" ? "ไทย" : "EN"}
        </span>
        <span className="text-[8px] text-white/30 ml-0.5">▼</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-[160px] glass-panel rounded-xl overflow-hidden animate-fade-in z-[999]">
          <div className="p-1.5">
            <button
              onClick={() => { setLanguage("en"); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                language === "en"
                  ? "bg-sky-500/10 border border-sky-500/20"
                  : "hover:bg-white/[0.03] border border-transparent"
              }`}
            >
              <span className="text-sm">🇺🇸</span>
              <div className="flex flex-col items-start">
                <span className={`text-[11px] font-medium ${language === "en" ? "text-sky-400" : "text-white/70"}`}>
                  English
                </span>
              </div>
              {language === "en" && <span className="ml-auto text-sky-400 text-xs">✓</span>}
            </button>
            <button
              onClick={() => { setLanguage("th"); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                language === "th"
                  ? "bg-sky-500/10 border border-sky-500/20"
                  : "hover:bg-white/[0.03] border border-transparent"
              }`}
            >
              <span className="text-sm">🇹🇭</span>
              <div className="flex flex-col items-start">
                <span className={`text-[11px] font-medium ${language === "th" ? "text-sky-400" : "text-white/70"}`}>
                  ภาษาไทย
                </span>
              </div>
              {language === "th" && <span className="ml-auto text-sky-400 text-xs">✓</span>}
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {open && (
        <div className="fixed inset-0 z-[998]" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
