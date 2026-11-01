import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  LayoutDashboard,
  QrCode,
  MapPin,
  Bell,
  RefreshCw,
  Sparkles,
  Award
} from 'lucide-react';
import { MEMBERSHIP_TIERS } from '../../data/mockData';

export const Header: React.FC = () => {
  const {
    appMode,
    setAppMode,
    deviceFrame,
    setDeviceFrame,
    member,
    venues,
    activeVenueId,
    setActiveVenueId,
    currentVenue,
    unreadNotifsCount,
    setActiveTab,
    setIsStaffScannerOpen,
    resetAllData
  } = useApp();

  const currentTierConfig = MEMBERSHIP_TIERS.find(t => t.id === member.tier) || MEMBERSHIP_TIERS[1];

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center text-neutral-950 font-bold shadow-lg shadow-amber-500/20">
              <span className="font-brand text-xl tracking-wider">K</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-brand tracking-widest text-base font-bold text-neutral-100">KALLOS CLUB</span>
                <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase">
                  UK Leisure Brand (4 Venues)
                </span>
              </div>
              <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active: <strong className="text-neutral-200">{currentVenue.name}</strong></span>
              </p>
            </div>
          </div>

          {/* Quick venue switch dropdown for mobile header */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsStaffScannerOpen(true)}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 hover:bg-neutral-800"
              title="Staff QR Scanner"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: View Switcher (Member Mobile App vs Web Admin Dashboard vs Staff Kiosk) */}
        <div className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800 text-xs">
          <button
            onClick={() => setAppMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              appMode === 'mobile'
                ? 'bg-amber-500 text-neutral-950 shadow-sm font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Member Mobile App</span>
          </button>

          <button
            onClick={() => setAppMode('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              appMode === 'admin'
                ? 'bg-amber-500 text-neutral-950 shadow-sm font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Web Admin Portal</span>
          </button>

          <button
            onClick={() => setIsStaffScannerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-amber-400 hover:bg-neutral-800 transition-all border border-amber-500/20"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span>Staff Scanner Kiosk</span>
          </button>
        </div>

        {/* Right side controls: Venue picker, Device switcher & Quick status */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* UK Venue Selector */}
          <div className="flex items-center gap-1 text-xs bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <select
              value={activeVenueId}
              onChange={(e) => setActiveVenueId(e.target.value)}
              className="bg-transparent text-neutral-200 focus:outline-none cursor-pointer pr-1 py-0.5 text-xs font-medium"
            >
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id} className="bg-neutral-900 text-neutral-200">
                  {venue.city}: {venue.name} ({venue.currentCapacity}% full)
                </option>
              ))}
            </select>
          </div>

          {/* Device Mockup Toggle (Only visible in mobile mode) */}
          {appMode === 'mobile' && (
            <div className="hidden lg:flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-[11px]">
              <span className="text-neutral-500 px-1.5">Device:</span>
              <button
                onClick={() => setDeviceFrame('iphone')}
                className={`px-2 py-1 rounded transition-colors ${
                  deviceFrame === 'iphone' ? 'bg-neutral-800 text-amber-400 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="iPhone 16 Pro Frame"
              >
                iOS
              </button>
              <button
                onClick={() => setDeviceFrame('pixel')}
                className={`px-2 py-1 rounded transition-colors ${
                  deviceFrame === 'pixel' ? 'bg-neutral-800 text-amber-400 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Google Pixel Frame"
              >
                Android
              </button>
              <button
                onClick={() => setDeviceFrame('fullscreen')}
                className={`px-2 py-1 rounded transition-colors ${
                  deviceFrame === 'fullscreen' ? 'bg-neutral-800 text-amber-400 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Responsive View"
              >
                Full
              </button>
            </div>
          )}

          {/* Member stats pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAppMode('mobile');
                setActiveTab('perks');
              }}
              className="flex items-center gap-1 text-xs bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{member.pointsBalance.toLocaleString()} pts</span>
            </button>

            <button
              onClick={() => {
                setAppMode('mobile');
                setActiveTab('account');
              }}
              className="relative p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800"
              title="Push Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-neutral-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            <button
              onClick={resetAllData}
              className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
              title="Reset Demo Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
