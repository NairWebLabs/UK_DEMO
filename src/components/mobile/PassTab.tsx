import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DynamicQRCode } from '../../utils/qrGenerator';
import { MEMBERSHIP_TIERS } from '../../data/mockData';
import { playScanBeep, playTapClick } from '../../utils/audio';
import {
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Share2,
  CheckCircle2,
  Sparkles,
  MapPin,
  ExternalLink,
  Info,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PassTab: React.FC = () => {
  const {
    member,
    currentVenue,
    venues,
    processCheckIn,
    setIsStaffScannerOpen
  } = useApp();

  const [isFlipped, setIsFlipped] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [dynamicSeed, setDynamicSeed] = useState(1);
  const [isAddedToWallet, setIsAddedToWallet] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [checkInResult, setCheckInResult] = useState<{ success: boolean; message: string } | null>(null);

  const tierConfig = MEMBERSHIP_TIERS.find(t => t.id === member.tier) || MEMBERSHIP_TIERS[1];

  // Dynamic anti-fraud rotating token countdown (every 30s generates fresh hash)
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setDynamicSeed((s) => s + 1);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dynamicPassToken = `KAL-SEC-${member.memberNumber}-${dynamicSeed}-${member.tier.toUpperCase()}`;

  const handleFlip = () => {
    playTapClick();
    setIsFlipped(!isFlipped);
  };

  const handleSimulateCheckIn = () => {
    const res = processCheckIn(dynamicPassToken, currentVenue.id, 'QR_DYNAMIC_SCAN');
    setCheckInResult(res);
    setTimeout(() => {
      setCheckInResult(null);
    }, 4000);
  };

  const handleAddToWallet = (walletType: 'apple' | 'google') => {
    playTapClick();
    setIsAddedToWallet(true);
    setShowWalletModal(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24 text-neutral-100 flex flex-col items-center">
      {/* Title & Status */}
      <div className="w-full text-center">
        <h2 className="font-brand text-lg font-bold tracking-widest text-neutral-100">
          DIGITAL MEMBERSHIP PASS
        </h2>
        <p className="text-xs text-neutral-400 mt-0.5 flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active & Valid across 4 UK Venues</span>
        </p>
      </div>

      {/* Check-In Success Banner Notification */}
      {checkInResult && (
        <div className="w-full p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-left text-xs">
            <span className="font-bold text-emerald-300">Access Verified!</span>
            <p className="text-emerald-100/80">{checkInResult.message} at {currentVenue.name}</p>
          </div>
        </div>
      )}

      {/* FLIPPABLE PASS CARD */}
      <div className="w-full max-w-sm perspective-[1000px] my-1">
        <div
          className={`relative w-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] shadow-2xl ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* FRONT OF PASS */}
          <div
            className={`w-full rounded-3xl p-6 border flex flex-col justify-between relative overflow-hidden [backface-visibility:hidden] ${
              member.tier === 'black'
                ? 'bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 border-amber-500/50 shadow-amber-500/10'
                : member.tier === 'gold'
                ? 'bg-gradient-to-b from-stone-900 via-amber-950/60 to-neutral-950 border-amber-500/60 shadow-amber-500/15'
                : member.tier === 'silver'
                ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-neutral-950 border-slate-600/60'
                : 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-neutral-700/60'
            }`}
          >
            {/* Holographic Watermark Badge */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-52 h-52 bg-gradient-to-bl from-amber-400/20 via-yellow-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Top Pass Branding */}
            <div className="flex items-start justify-between z-10">
              <div>
                <span className="text-[10px] tracking-widest text-amber-400 font-bold uppercase">
                  UNITED KINGDOM
                </span>
                <h3 className="font-brand text-xl font-bold tracking-wider text-neutral-100">
                  KALLOS CLUB
                </h3>
              </div>

              <div className="text-right">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${tierConfig.colorScheme.badgeBg}`}>
                  {tierConfig.badge}
                </span>
                <p className="text-[10px] text-neutral-400 mt-1 font-mono">
                  EXP: {member.renewalDate}
                </p>
              </div>
            </div>

            {/* Center Dynamic Rotating QR Code Area */}
            <div className="my-5 flex flex-col items-center justify-center z-10">
              <div className="p-3 bg-white rounded-2xl shadow-xl relative group">
                <DynamicQRCode
                  value={dynamicPassToken}
                  size={170}
                  fgColor="#0a0a0a"
                  bgColor="#ffffff"
                />

                {/* Animated security scanner laser sweep */}
                <div className="absolute inset-x-3 top-3 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-scanline pointer-events-none" />
              </div>

              {/* Dynamic countdown ring & anti-fraud indicator */}
              <div className="mt-3 flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 px-3 py-1 rounded-full text-xs">
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                </div>
                <span className="text-neutral-300 font-mono text-[11px]">
                  Refreshes in: <strong className="text-amber-400 font-bold">{secondsLeft}s</strong>
                </span>
                <span className="text-[10px] text-neutral-500">• Anti-Screenshot</span>
              </div>
            </div>

            {/* Member Details & Barcode Token Footer */}
            <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between z-10">
              <div className="flex items-center gap-2.5">
                <img
                  src={member.avatar}
                  alt={member.firstName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40"
                />
                <div>
                  <div className="text-xs font-bold text-neutral-100">
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">
                    ID: {member.memberNumber}
                  </div>
                </div>
              </div>

              <button
                onClick={handleFlip}
                className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 bg-neutral-900 px-2.5 py-1.5 rounded-lg border border-neutral-800 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Card Info</span>
              </button>
            </div>
          </div>

          {/* BACK OF PASS (Rotated 180deg) */}
          <div
            className={`absolute inset-0 w-full rounded-3xl p-6 border flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] ${
              member.tier === 'black'
                ? 'bg-neutral-950 border-amber-500/50'
                : 'bg-neutral-950 border-neutral-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="font-brand text-sm font-bold tracking-wider text-amber-400">
                  BENEFITS & ACCESS RIGHTS
                </span>
                <button
                  onClick={handleFlip}
                  className="p-1 rounded-lg bg-neutral-900 text-neutral-400 hover:text-neutral-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Tier Status</span>
                  <span className="font-semibold text-neutral-200 capitalize">{tierConfig.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Home Venue</span>
                  <span className="font-semibold text-neutral-200">{currentVenue.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Monthly Guest Passes</span>
                  <span className="font-semibold text-amber-400 font-mono">
                    {tierConfig.guestPassesPerMonth} Allowed / Month
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Dining & Bar Discount</span>
                  <span className="font-semibold text-emerald-400 font-mono">
                    {tierConfig.diningDiscountPct}% Off
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900">
                  <span className="text-neutral-400">Priority Booking Window</span>
                  <span className="font-semibold text-neutral-200 font-mono">
                    {tierConfig.bookingWindowDays} Days Advance
                  </span>
                </div>
              </div>

              <div className="mt-4 p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
                <div className="flex items-center gap-1 text-amber-400 font-semibold mb-1">
                  <Info className="w-3 h-3" />
                  <span>Venue Entry Guidelines</span>
                </div>
                Pass is strictly personal. Dynamic QR code must be presented live at reception or contactless turnstile. Screenshots will be flagged by security.
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
              <span>Support: concierge@kallosclub.co.uk</span>
              <button
                onClick={handleFlip}
                className="text-amber-400 font-semibold hover:underline"
              >
                Back to QR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Simulate Scan & Add to Wallet */}
      <div className="w-full max-w-sm space-y-2.5">
        {/* Instant Venue Check-in Test Button */}
        <button
          onClick={handleSimulateCheckIn}
          className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Simulate Live Check-in at {currentVenue.city}</span>
        </button>

        {/* Staff scanner trigger */}
        <button
          onClick={() => setIsStaffScannerOpen(true)}
          className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 font-medium text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Smartphone className="w-4 h-4 text-amber-400" />
          <span>Open Reception Staff Scanner View</span>
        </button>

        {/* Apple & Google Wallet Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => handleAddToWallet('apple')}
            className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <span className="font-bold"></span>
            <span>{isAddedToWallet ? 'Added to Apple Wallet' : 'Apple Wallet'}</span>
          </button>

          <button
            onClick={() => handleAddToWallet('google')}
            className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <span className="font-bold text-blue-400">G</span>
            <span>{isAddedToWallet ? 'Saved to Google Wallet' : 'Google Wallet'}</span>
          </button>
        </div>
      </div>

      {/* Wallet Saved Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 max-w-xs w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-100">Pass Added to Wallet!</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Your Kallos Club {tierConfig.name} pass has been synced with NFC background beacon support.
              </p>
            </div>
            <button
              onClick={() => setShowWalletModal(false)}
              className="w-full py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
