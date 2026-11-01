import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wifi,
  Battery,
  Signal,
  MapPin,
  ShieldCheck,
  Smartphone,
  Download,
  Users,
  Bell,
  Sparkles
} from 'lucide-react';
import { playTapClick } from '../../utils/audio';

export const MobileTopBar: React.FC = () => {
  const {
    mobilePlatform,
    setMobilePlatform,
    venues,
    activeVenueId,
    setActiveVenueId,
    currentVenue,
    setIsStaffMode,
    isStaffMode,
    setShowInstallGuide,
    unreadNotifsCount,
    setActiveTab
  } = useApp();

  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${h}:${m}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-neutral-800/80">
      {/* 1. NATIVE HARDWARE STATUS BAR */}
      {mobilePlatform === 'ios' ? (
        /* iOS Status Bar with Dynamic Island */
        <div className="h-10 px-6 flex items-center justify-between text-neutral-200 text-xs font-semibold select-none">
          <span className="text-[13px] tracking-tight font-medium">{currentTime}</span>

          {/* Interactive Dynamic Island */}
          <div
            onClick={() => {
              playTapClick();
              setIsStaffMode(!isStaffMode);
            }}
            className="w-28 h-6 bg-neutral-900 ring-1 ring-neutral-800 rounded-full px-2.5 flex items-center justify-between shadow-md cursor-pointer hover:scale-105 transition-transform"
            title="Tap to toggle Staff / Member mode"
          >
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[9px] text-amber-300 font-bold uppercase tracking-wider truncate">
                {currentVenue.city}
              </span>
            </div>
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
          </div>

          <div className="flex items-center gap-1.5 text-neutral-300">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-mono">98%</span>
              <Battery className="w-4 h-4 fill-neutral-200 text-neutral-200" />
            </div>
          </div>
        </div>
      ) : (
        /* Android Material 3 Status Bar */
        <div className="h-9 px-5 flex items-center justify-between text-neutral-300 text-xs font-medium select-none">
          <span className="font-mono text-xs">{currentTime}</span>

          {/* Centered Android Camera Punch-hole */}
          <div className="w-3.5 h-3.5 rounded-full bg-black ring-2 ring-neutral-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
          </div>

          <div className="flex items-center gap-1.5 text-neutral-400">
            <Signal className="w-3.5 h-3.5 text-neutral-300" />
            <Wifi className="w-3.5 h-3.5 text-neutral-300" />
            <Battery className="w-4 h-4 text-neutral-200 fill-neutral-200" />
          </div>
        </div>
      )}

      {/* 2. APP CONTROL STRIP: Cross-Platform Switcher + Venue Picker + Install/Staff */}
      <div className="px-4 py-2 flex items-center justify-between gap-2">
        {/* iOS vs Android Toggle Pill */}
        <div className="flex items-center bg-neutral-900 p-0.5 rounded-full border border-neutral-800 text-[11px] font-semibold">
          <button
            onClick={() => {
              playTapClick();
              setMobilePlatform('ios');
            }}
            className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
              mobilePlatform === 'ios'
                ? 'bg-amber-500 text-neutral-950 shadow-sm font-bold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span> iOS</span>
          </button>
          <button
            onClick={() => {
              playTapClick();
              setMobilePlatform('android');
            }}
            className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
              mobilePlatform === 'android'
                ? 'bg-amber-500 text-neutral-950 shadow-sm font-bold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span>🤖 Android</span>
          </button>
        </div>

        {/* UK Venue Quick Switcher */}
        <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-xl px-2 py-1 text-xs">
          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
          <select
            value={activeVenueId}
            onChange={(e) => setActiveVenueId(e.target.value)}
            className="bg-transparent text-neutral-200 text-xs font-semibold focus:outline-none cursor-pointer pr-1"
          >
            {venues.map((v) => (
              <option key={v.id} value={v.id} className="bg-neutral-900 text-neutral-200">
                {v.city} ({v.currentCapacity}%)
              </option>
            ))}
          </select>
        </div>

        {/* Right side tools: Install App prompt & Staff Terminal Toggle */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              playTapClick();
              setShowInstallGuide(true);
            }}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-400"
            title="Install App"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              playTapClick();
              setIsStaffMode(!isStaffMode);
            }}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all border ${
              isStaffMode
                ? 'bg-amber-500 text-neutral-950 border-amber-500'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'
            }`}
            title="Staff & Venue Reception Mode"
          >
            {isStaffMode ? 'Exit Staff' : 'Staff Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};
