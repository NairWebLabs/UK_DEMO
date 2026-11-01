import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Sparkles, Calendar, QrCode, X } from 'lucide-react';

export const NativePushBanner: React.FC = () => {
  const { activeBannerNotif, dismissBannerNotif, mobilePlatform, setActiveTab } = useApp();

  if (!activeBannerNotif) return null;

  const handleClick = () => {
    if (activeBannerNotif.category === 'booking') {
      setActiveTab('bookings');
    } else if (activeBannerNotif.category === 'event') {
      setActiveTab('events');
    } else if (activeBannerNotif.category === 'perk') {
      setActiveTab('perks');
    } else {
      setActiveTab('account');
    }
    dismissBannerNotif();
  };

  if (mobilePlatform === 'ios') {
    // iOS Dynamic Island / Notification Banner
    return (
      <div className="absolute top-12 inset-x-3 z-50 animate-in fade-in slide-in-from-top-6 duration-300">
        <div
          onClick={handleClick}
          className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-700/80 rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-3 cursor-pointer ring-1 ring-amber-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center text-neutral-950 font-bold shadow-md shrink-0">
              <span className="font-brand text-sm">K</span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  KALLOS CLUB • NOW
                </span>
              </div>
              <h4 className="text-xs font-bold text-neutral-100">{activeBannerNotif.title}</h4>
              <p className="text-[11px] text-neutral-300 line-clamp-1">{activeBannerNotif.message}</p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              dismissBannerNotif();
            }}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Android Material 3 Heads-up Notification
  return (
    <div className="absolute top-10 inset-x-2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div
        onClick={handleClick}
        className="bg-neutral-900 border border-neutral-700 rounded-xl p-3 shadow-2xl flex items-center justify-between gap-3 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-medium text-amber-400">Kallos Club</span>
            <h4 className="text-xs font-semibold text-neutral-100">{activeBannerNotif.title}</h4>
            <p className="text-[11px] text-neutral-400 line-clamp-1">{activeBannerNotif.message}</p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            dismissBannerNotif();
          }}
          className="p-1 rounded text-neutral-400 hover:text-neutral-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
