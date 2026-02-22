"use client";

import React, { ReactNode } from "react";

interface FloatingPanelProps {
  children: ReactNode;
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-left" | "center-right";
  width?: string;
  maxHeight?: string;
  title?: string;
  icon?: ReactNode;
  collapsible?: boolean;
}

const positionClasses = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "center-left": "top-1/2 -translate-y-1/2 left-4",
  "center-right": "top-1/2 -translate-y-1/2 right-4",
};

export default function FloatingPanel({
  children,
  className = "",
  position = "top-left",
  width = "w-[320px]",
  maxHeight = "max-h-[600px]",
  title,
  icon,
  collapsible = false,
}: FloatingPanelProps) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div
      className={`
        absolute ${positionClasses[position]} z-[500]
        ${width} ${collapsed ? "h-auto" : maxHeight}
        ${className}
      `}
    >
      <div
        className={`
          bg-[#0c0d12]/80 backdrop-blur-xl
          border border-white/10
          rounded-2xl shadow-2xl
          overflow-hidden
          transition-all duration-300 ease-out
          hover:border-white/20 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)]
          ${collapsed ? "h-auto" : "h-full"}
        `}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        {title && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              {icon && <span className="text-lg">{icon}</span>}
              <span className="text-sm font-semibold text-white/90 tracking-wide">
                {title}
              </span>
            </div>
            {collapsible && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-white/50 hover:text-white/90 transition-colors text-xs"
              >
                {collapsed ? "▼" : "▲"}
              </button>
            )}
          </div>
        )}
        {!collapsed && (
          <div className="overflow-y-auto h-full">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
