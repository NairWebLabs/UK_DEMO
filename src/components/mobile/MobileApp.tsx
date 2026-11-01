import React from 'react';
import { useApp } from '../../context/AppContext';
import { MobileTopBar } from './MobileTopBar';
import { NativePushBanner } from './NativePushBanner';
import { MobileStaffTerminal } from './MobileStaffTerminal';
import { HomeTab } from './HomeTab';
import { PassTab } from './PassTab';
import { BookingsTab } from './BookingsTab';
import { PerksTab } from './PerksTab';
import { EventsTab } from './EventsTab';
import { AccountTab } from './AccountTab';
import {
  Home,
  QrCode,
  Calendar,
  Gift,
  Flame,
  User,
  ShieldAlert
} from 'lucide-react';
import { playTapClick } from '../../utils/audio';

export const MobileApp: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    unreadNotifsCount,
    isStaffMode,
    mobilePlatform
  } = useApp();

  const handleTabChange = (tab: typeof activeTab) => {
    playTapClick();
    setActiveTab(tab);
  };

  return (
    <div className="flex-1 flex flex-col h-screen max-w-md mx-auto bg-neutral-950 relative overflow-hidden shadow-2xl border-x border-neutral-900">
      {/* Native Hardware Status & In-App Top Bar */}
      <MobileTopBar />

      {/* Real-time native push alert drop-down */}
      <NativePushBanner />

      {/* Main View Area: Either Staff Floor Terminal or Member App Tabs */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {isStaffMode ? (
          <MobileStaffTerminal />
        ) : (
          <>
            {activeTab === 'home' && <HomeTab />}
            {activeTab === 'pass' && <PassTab />}
            {activeTab === 'bookings' && <BookingsTab />}
            {activeTab === 'perks' && <PerksTab />}
            {activeTab === 'events' && <EventsTab />}
            {activeTab === 'account' && <AccountTab />}
          </>
        )}
      </div>

      {/* Native Bottom Navigation Bar (Hidden when in Staff Terminal for maximum screen room) */}
      {!isStaffMode && (
        <div
          className={`absolute bottom-0 inset-x-0 z-40 ${
            mobilePlatform === 'ios'
              ? 'bg-neutral-950/90 backdrop-blur-2xl border-t border-neutral-800/80 px-2 pt-2 pb-5'
              : 'bg-neutral-900 border-t border-neutral-800 px-2 pt-1 pb-3'
          }`}
        >
          <div className="flex items-center justify-around max-w-md mx-auto">
            {/* Home */}
            <button
              onClick={() => handleTabChange('home')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'home'
                  ? mobilePlatform === 'ios'
                    ? 'text-amber-400 font-semibold'
                    : 'text-amber-400 font-bold bg-amber-500/15'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Home</span>
            </button>

            {/* Bookings */}
            <button
              onClick={() => handleTabChange('bookings')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? mobilePlatform === 'ios'
                    ? 'text-amber-400 font-semibold'
                    : 'text-amber-400 font-bold bg-amber-500/15'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Book</span>
            </button>

            {/* Center Dynamic Digital Pass */}
            <button
              onClick={() => handleTabChange('pass')}
              className="flex flex-col items-center justify-center -mt-5 cursor-pointer group"
            >
              <div
                className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-105 ${
                  activeTab === 'pass'
                    ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-neutral-950 ring-4 ring-neutral-950 shadow-amber-500/30'
                    : 'bg-neutral-850 text-amber-400 border border-neutral-700/80 ring-4 ring-neutral-950'
                }`}
              >
                <QrCode className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span
                className={`text-[10px] mt-1 font-bold tracking-wider ${
                  activeTab === 'pass' ? 'text-amber-400' : 'text-neutral-400'
                }`}
              >
                PASS
              </span>
            </button>

            {/* Perks */}
            <button
              onClick={() => handleTabChange('perks')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'perks'
                  ? mobilePlatform === 'ios'
                    ? 'text-amber-400 font-semibold'
                    : 'text-amber-400 font-bold bg-amber-500/15'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Gift className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Perks</span>
            </button>

            {/* Events */}
            <button
              onClick={() => handleTabChange('events')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'events'
                  ? mobilePlatform === 'ios'
                    ? 'text-amber-400 font-semibold'
                    : 'text-amber-400 font-bold bg-amber-500/15'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Flame className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Events</span>
            </button>

            {/* Account */}
            <button
              onClick={() => handleTabChange('account')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer relative ${
                activeTab === 'account'
                  ? mobilePlatform === 'ios'
                    ? 'text-amber-400 font-semibold'
                    : 'text-amber-400 font-bold bg-amber-500/15'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Account</span>
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>
          </div>

          {/* iOS Bottom Home Indicator Bar */}
          {mobilePlatform === 'ios' && (
            <div className="w-32 h-1 bg-neutral-600 rounded-full mx-auto mt-2" />
          )}
        </div>
      )}
    </div>
  );
};
