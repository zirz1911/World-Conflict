'use client';

import { useState } from 'react';
import { useTimezone } from '@/contexts/TimezoneContext';
import { timezones } from '@/data/mockData';

export default function TimezoneSelector() {
  const { timezoneId, timezone, setTimezone } = useTimezone();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: string) => {
    setTimezone(id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Timezone Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                   bg-white/[0.02] border border-white/[0.05]
                   hover:bg-white/[0.04] hover:border-white/[0.08]
                   transition-all duration-200"
        aria-label="Select timezone"
      >
        <span className="text-[10px] text-sky-400/70">🌍</span>
        <span className="text-[11px] text-white/80 font-medium tracking-wide">
          {timezone.abbreviation}
        </span>
        <span className="text-[8px] text-white/30">▼</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-[700]"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute top-full right-0 mt-2 w-80 z-[800]
                         glass-panel rounded-xl shadow-2xl overflow-hidden
                         border border-white/10">
            <div className="p-3 border-b border-white/5">
              <h3 className="text-xs font-bold text-white/90 tracking-wide">
                SELECT TIMEZONE
              </h3>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {timezones.map((tz) => {
                const isSelected = tz.id === timezoneId;
                const offsetHours = tz.offset / 60;
                const offsetSign = offsetHours >= 0 ? '+' : '';
                const offsetStr = `UTC${offsetSign}${offsetHours}`;

                return (
                  <button
                    key={tz.id}
                    onClick={() => handleSelect(tz.id)}
                    className={`w-full px-4 py-3 text-left transition-colors
                               hover:bg-white/[0.05] border-b border-white/[0.02]
                               ${isSelected ? 'bg-sky-500/[0.08] border-sky-500/20' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white/95 text-xs tracking-wide">
                            {tz.abbreviation}
                          </span>
                          <span className="text-[10px] text-sky-400/60 font-mono">
                            {offsetStr}
                          </span>
                          {isSelected && (
                            <span className="text-green-400 text-xs">✓</span>
                          )}
                        </div>
                        <div className="text-[10px] text-white/60 mb-1">
                          {tz.name}
                        </div>
                        <div className="text-[9px] text-white/40">
                          {tz.cities.join(', ')}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
