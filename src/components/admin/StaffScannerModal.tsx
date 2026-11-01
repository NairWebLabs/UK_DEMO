import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  QrCode,
  ShieldCheck,
  CheckCircle2,
  X,
  Smartphone,
  MapPin,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { playScanBeep, playSuccessChime } from '../../utils/audio';

export const StaffScannerModal: React.FC = () => {
  const {
    isStaffScannerOpen,
    setIsStaffScannerOpen,
    venues,
    currentVenue,
    member,
    processCheckIn
  } = useApp();

  const [selectedVenueId, setSelectedVenueId] = useState(currentVenue.id);
  const [manualCode, setManualCode] = useState(member.memberNumber);
  const [lastScanResult, setLastScanResult] = useState<{
    success: boolean;
    message: string;
    member?: any;
  } | null>(null);

  if (!isStaffScannerOpen) return null;

  const handleScanPass = () => {
    playScanBeep();
    const res = processCheckIn(manualCode, selectedVenueId, 'QR_DYNAMIC_SCAN');
    setLastScanResult(res);
  };

  const handleQuickScanMember = () => {
    playScanBeep();
    const res = processCheckIn(member.memberNumber, selectedVenueId, 'QR_DYNAMIC_SCAN');
    setLastScanResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-700 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in zoom-in-95">
        {/* Scanner Terminal Header */}
        <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-100">Reception Access Scanner</h3>
              <p className="text-[10px] text-neutral-400">Station #4 • Door Turnstile</p>
            </div>
          </div>

          <button
            onClick={() => setIsStaffScannerOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner Viewport Simulation */}
        <div className="p-5 space-y-4">
          {/* Venue Selector */}
          <div className="flex items-center justify-between text-xs bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
            <span className="text-neutral-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Venue Station:
            </span>
            <select
              value={selectedVenueId}
              onChange={(e) => setSelectedVenueId(e.target.value)}
              className="bg-neutral-900 text-neutral-200 font-semibold px-2 py-1 rounded focus:outline-none"
            >
              {venues.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          {/* Scanner Viewfinder Box */}
          <div className="relative h-44 bg-neutral-950 rounded-2xl border-2 border-dashed border-amber-500/40 flex flex-col items-center justify-center text-center p-4 overflow-hidden">
            <div className="absolute inset-x-8 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-scanline" />

            <QrCode className="w-12 h-12 text-neutral-600 mb-2" />
            <span className="text-xs text-neutral-300 font-medium">Ready to scan digital dynamic QR code</span>
            <p className="text-[10px] text-neutral-500 mt-0.5">Turnstile optical lens operational</p>

            {/* Test trigger button right inside viewport */}
            <button
              onClick={handleQuickScanMember}
              className="mt-3 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all"
            >
              Test Scan Oliver Hastings Pass ({member.tier.toUpperCase()})
            </button>
          </div>

          {/* Manual Code Input Option */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-400 uppercase">
              Or Manual Member ID / NFC Pass Token
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs font-mono text-neutral-200 uppercase"
                placeholder="KAL-8829-UK"
              />
              <button
                onClick={handleScanPass}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
              >
                Verify
              </button>
            </div>
          </div>

          {/* Scan Result Feedback Banner */}
          {lastScanResult && (
            <div
              className={`p-3.5 rounded-2xl border text-xs space-y-1.5 animate-in fade-in ${
                lastScanResult.success
                  ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                  : 'bg-red-950/80 border-red-500/60 text-red-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{lastScanResult.message}</span>
              </div>
              {lastScanResult.member && (
                <div className="text-[11px] text-neutral-300 pl-6 space-y-0.5">
                  <p>Status: <strong className="text-emerald-400 font-mono">ACTIVE TURNSTILE PASS</strong></p>
                  <p>Points Balance: <strong className="text-amber-300 font-mono">{lastScanResult.member.pointsBalance} pts</strong></p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-neutral-950 border-t border-neutral-800 text-center">
          <button
            onClick={() => setIsStaffScannerOpen(false)}
            className="text-xs text-neutral-400 hover:text-neutral-200 font-medium"
          >
            Close Scanner Terminal
          </button>
        </div>
      </div>
    </div>
  );
};
