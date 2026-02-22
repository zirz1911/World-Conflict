'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const REFRESH_INTERVAL_SECS = REFRESH_INTERVAL_MS / 1000;

interface DataRefreshContextType {
  lastRefreshed: Date;
  refreshKey: number;
  nextRefreshIn: number; // seconds remaining
  triggerRefresh: () => void;
}

const DataRefreshContext = createContext<DataRefreshContextType | undefined>(undefined);

export function DataRefreshProvider({ children }: { children: ReactNode }) {
  const [lastRefreshed, setLastRefreshed] = useState<Date>(() => new Date());
  const [refreshKey, setRefreshKey] = useState(0);
  const [nextRefreshIn, setNextRefreshIn] = useState(REFRESH_INTERVAL_SECS);

  const triggerRefresh = useCallback(() => {
    setLastRefreshed(new Date());
    setRefreshKey((k) => k + 1);
    setNextRefreshIn(REFRESH_INTERVAL_SECS);
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const timer = setInterval(triggerRefresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [triggerRefresh]);

  // Countdown every second
  useEffect(() => {
    const countdown = setInterval(() => {
      setNextRefreshIn((prev) => (prev <= 1 ? REFRESH_INTERVAL_SECS : prev - 1));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  return (
    <DataRefreshContext.Provider value={{ lastRefreshed, refreshKey, nextRefreshIn, triggerRefresh }}>
      {children}
    </DataRefreshContext.Provider>
  );
}

export function useDataRefresh() {
  const ctx = useContext(DataRefreshContext);
  if (!ctx) throw new Error('useDataRefresh must be used within DataRefreshProvider');
  return ctx;
}
