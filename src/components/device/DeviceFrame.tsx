import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, Battery, Signal, ShieldCheck } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { deviceFrame, member, currentVenue } = useApp();
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (deviceFrame === 'fullscreen') {
    return (
      <div className="w-full max-w-lg mx-auto min-h-screen bg-neutral-950 shadow-2xl relative flex flex-col border-x border-neutral-800">
        {children}
      </div>
    );
  }

  if (deviceFrame === 'pixel') {
    // Android Google Pixel 9 Frame
    return (
      <div className="py-6 flex items-center justify-center">
        <div className="relative w-[390px] h-[830px] bg-neutral-900 rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-neutral-700/60 border border-neutral-800 flex flex-col">
          {/* Outer bezel accents */}
          <div className="absolute top-28 -left-[2px] w-[3px] h-14 bg-neutral-700 rounded-l-md" />
          <div className="absolute top-48 -left-[2px] w-[3px] h-20 bg-neutral-700 rounded-l-md" />
          <div className="absolute top-36 -right-[2px] w-[3px] h-16 bg-neutral-700 rounded-r-md" />

          {/* Screen */}
          <div className="relative w-full h-full bg-neutral-950 rounded-[40px] overflow-hidden flex flex-col border border-neutral-800/80">
            {/* Android Status Bar */}
            <div className="h-10 px-6 flex items-center justify-between text-neutral-300 text-xs font-medium z-40 bg-neutral-950/70 backdrop-blur-sm select-none">
              <span>{currentTime}</span>

              {/* Centered Camera hole punch */}
              <div className="w-3.5 h-3.5 rounded-full bg-black ring-2 ring-neutral-900 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
              </div>

              <div className="flex items-center gap-1.5 text-neutral-400">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4 text-neutral-200" />
              </div>
            </div>

            {/* Content viewport */}
            <div className="flex-1 overflow-y-auto relative flex flex-col select-none">
              {children}
            </div>

            {/* Android Pill Navigation Bar */}
            <div className="h-4 flex items-center justify-center bg-neutral-950 py-1">
              <div className="w-20 h-1 bg-neutral-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: iPhone 16 Pro Frame
  return (
    <div className="py-6 flex items-center justify-center">
      <div className="relative w-[400px] h-[844px] bg-neutral-900 rounded-[54px] p-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] ring-1 ring-amber-500/10 border-2 border-neutral-700/80 flex flex-col">
        {/* Hardware buttons */}
        <div className="absolute top-24 -left-[3px] w-[3.5px] h-8 bg-neutral-600 rounded-l-md" />
        <div className="absolute top-36 -left-[3px] w-[3.5px] h-14 bg-neutral-600 rounded-l-md" />
        <div className="absolute top-54 -left-[3px] w-[3.5px] h-14 bg-neutral-600 rounded-l-md" />
        <div className="absolute top-32 -right-[3px] w-[3.5px] h-20 bg-neutral-600 rounded-r-md" />

        {/* Screen */}
        <div className="relative w-full h-full bg-neutral-950 rounded-[44px] overflow-hidden flex flex-col border border-neutral-800">
          {/* iOS Status Bar with Dynamic Island */}
          <div className="h-11 px-7 flex items-center justify-between text-neutral-200 text-xs font-semibold z-40 bg-neutral-950/80 backdrop-blur-md select-none shrink-0">
            <span className="text-[13px] tracking-tight">{currentTime}</span>

            {/* Dynamic Island */}
            <div className="w-28 h-6 bg-black rounded-full px-2.5 flex items-center justify-between shadow-sm cursor-pointer hover:scale-105 transition-transform">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] text-amber-300 font-medium">Kallos UK</span>
              </div>
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
            </div>

            <div className="flex items-center gap-1.5 text-neutral-300">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[11px] font-mono">98%</span>
                <Battery className="w-4 h-4 fill-neutral-200 text-neutral-200" />
              </div>
            </div>
          </div>

          {/* App Viewport */}
          <div className="flex-1 overflow-y-auto relative flex flex-col">
            {children}
          </div>

          {/* iOS Home Indicator */}
          <div className="h-5 flex items-center justify-center bg-neutral-950/90 py-1.5 shrink-0">
            <div className="w-32 h-1 bg-neutral-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
