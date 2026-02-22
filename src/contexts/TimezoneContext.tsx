'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { timezones, getTimezoneById, formatTimeWithTimezone, type Timezone } from '@/data/mockData';

interface TimezoneContextType {
  timezoneId: string;
  timezone: Timezone;
  setTimezone: (id: string) => void;
  formatTime: (date: Date) => string;
  getCurrentTime: () => string;
  currentTime: string;
}

const TimezoneContext = createContext<TimezoneContextType | undefined>(undefined);

interface TimezoneProviderProps {
  children: ReactNode;
}

export function TimezoneProvider({ children }: TimezoneProviderProps) {
  const [timezoneId, setTimezoneId] = useState<string>('utc');
  const [currentTime, setCurrentTime] = useState<string>('');

  // Load timezone preference from localStorage on mount
  useEffect(() => {
    const savedTimezone = localStorage.getItem('timezone');
    if (savedTimezone && getTimezoneById(savedTimezone)) {
      setTimezoneId(savedTimezone);
    }
  }, []);

  // Update current time every second
  useEffect(() => {
    const updateTime = () => {
      const tz = getTimezoneById(timezoneId);
      if (tz) {
        const now = new Date();
        const timeStr = formatTimeWithTimezone(now, tz.offset);
        setCurrentTime(`${timeStr} ${tz.abbreviation}`);
      }
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezoneId]);

  const setTimezone = (id: string) => {
    const tz = getTimezoneById(id);
    if (tz) {
      setTimezoneId(id);
      localStorage.setItem('timezone', id);
    }
  };

  const formatTime = (date: Date): string => {
    const tz = getTimezoneById(timezoneId);
    if (!tz) return date.toISOString();
    return formatTimeWithTimezone(date, tz.offset);
  };

  const getCurrentTime = (): string => {
    return currentTime;
  };

  const timezone = getTimezoneById(timezoneId) || timezones[0];

  const value: TimezoneContextType = {
    timezoneId,
    timezone,
    setTimezone,
    formatTime,
    getCurrentTime,
    currentTime
  };

  return (
    <TimezoneContext.Provider value={value}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone() {
  const context = useContext(TimezoneContext);
  if (context === undefined) {
    throw new Error('useTimezone must be used within a TimezoneProvider');
  }
  return context;
}
