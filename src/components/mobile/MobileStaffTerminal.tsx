import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MEMBERSHIP_TIERS } from '../../data/mockData';
import { TierLevel } from '../../types';
import {
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  Send,
  Search,
  Plus,
  Minus,
  MapPin,
  ArrowLeft,
  Sparkles,
  Smartphone,
  CreditCard,
  TrendingUp,
  X
} from 'lucide-react';
import { playScanBeep, playTapClick } from '../../utils/audio';

export const MobileStaffTerminal: React.FC = () => {
  const {
    setIsStaffMode,
    venues,
    currentVenue,
    activeVenueId,
    setActiveVenueId,
    updateVenueOccupancy,
    checkInLogs,
    member,
    setMember,
    sendBroadcastNotification,
    processCheckIn,
    mobilePlatform
  } = useApp();

  const [terminalTab, setTerminalTab] = useState<'scan' | 'occupancy' | 'members' | 'broadcast'>('scan');
  const [manualCode, setManualCode] = useState(member.memberNumber);
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string; member?: any } | null>(null);
  const [broadcastTitle, setBroadcastTitle] = useState('Padel Court Availability');
  const [broadcastMsg, setBroadcastMsg] = useState('2 rooftop courts opened up at Soho & Mayfair for evening sessions.');
  const [targetTier, setTargetTier] = useState<TierLevel | 'all'>('all');
  const [memberSearch, setMemberSearch] = useState('');

  const handleTestScan = (codeToScan: string) => {
    playScanBeep();
    const res = processCheckIn(codeToScan, activeVenueId, 'QR_DYNAMIC_SCAN');
    setScanResult(res);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMsg) return;
    sendBroadcastNotification(broadcastTitle, broadcastMsg, targetTier);
    playScanBeep();
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 text-neutral-100 overflow-y-auto pb-24">
      {/* Staff Mode Header Banner */}
      <div className="p-4 bg-gradient-to-r from-amber-950/70 via-neutral-900 to-neutral-950 border-b border-amber-500/30 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              playTapClick();
              setIsStaffMode(false);
            }}
            className="p-1.5 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-brand text-xs font-bold text-amber-400">STAFF PORTAL</span>
              <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-500 text-neutral-950">
                Staff PIN Authorized
              </span>
            </div>
            <p className="text-[11px] text-neutral-300">Station: {currentVenue.name}</p>
          </div>
        </div>

        <button
          onClick={() => {
            playTapClick();
            setIsStaffMode(false);
          }}
          className="px-2.5 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-medium"
        >
          Exit to Member Mode
        </button>
      </div>

      {/* Staff Terminal Sub-tabs */}
      <div className="grid grid-cols-4 gap-1 p-2 bg-neutral-900 border-b border-neutral-800 text-xs font-semibold">
        <button
          onClick={() => {
            playTapClick();
            setTerminalTab('scan');
          }}
          className={`py-2 rounded-xl transition-all text-center ${
            terminalTab === 'scan' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          Scanner
        </button>

        <button
          onClick={() => {
            playTapClick();
            setTerminalTab('occupancy');
          }}
          className={`py-2 rounded-xl transition-all text-center ${
            terminalTab === 'occupancy' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          4 Venues
        </button>

        <button
          onClick={() => {
            playTapClick();
            setTerminalTab('members');
          }}
          className={`py-2 rounded-xl transition-all text-center ${
            terminalTab === 'members' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          Members
        </button>

        <button
          onClick={() => {
            playTapClick();
            setTerminalTab('broadcast');
          }}
          className={`py-2 rounded-xl transition-all text-center ${
            terminalTab === 'broadcast' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          Push Alert
        </button>
      </div>

      {/* CONTENT SECTIONS */}
      <div className="p-4 space-y-4">
        {/* SCANNER VIEWPORT */}
        {terminalTab === 'scan' && (
          <div className="space-y-4">
            {/* Viewfinder */}
            <div className="relative h-56 bg-neutral-900 rounded-3xl border-2 border-dashed border-amber-500/40 overflow-hidden flex flex-col items-center justify-center p-4 text-center">
              <div className="absolute inset-x-8 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-scanline" />
              
              <QrCode className="w-14 h-14 text-neutral-600 mb-2" />
              <h4 className="text-xs font-bold text-neutral-200">Optical Reception Camera Active</h4>
              <p className="text-[11px] text-neutral-500 max-w-xs mt-0.5">
                Scan dynamic rotating member QR passes or NFC tokens at turnstiles
              </p>

              {/* Instant Scan Button */}
              <button
                onClick={() => handleTestScan(member.memberNumber)}
                className="mt-3 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Scan Oliver Hastings Pass ({member.tier.toUpperCase()})
              </button>
            </div>

            {/* Manual input */}
            <div className="p-3 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-2">
              <label className="text-[11px] font-bold text-neutral-400 uppercase">Manual Pass Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs font-mono uppercase text-neutral-200"
                  placeholder="KAL-8829-UK"
                />
                <button
                  onClick={() => handleTestScan(manualCode)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold text-xs rounded-xl border border-neutral-700"
                >
                  Verify
                </button>
              </div>
            </div>

            {/* Scan Feedback */}
            {scanResult && (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/60 rounded-2xl text-xs space-y-1 animate-in zoom-in-95">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{scanResult.message}</span>
                </div>
                <p className="text-[11px] text-emerald-200/80 pl-7">
                  Venue: {currentVenue.name} • Benefits Granted: Locker, Towel & 20% Bar Discount
                </p>
              </div>
            )}

            {/* Recent Check-in Logs */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-neutral-400 uppercase">Live Turnstile Activity</h4>
              <div className="space-y-1.5">
                {checkInLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-neutral-200">{log.memberName}</span>
                      <p className="text-[10px] text-neutral-500">{log.venueName} • {log.timestamp}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {log.memberTier.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4 VENUES TELEMETRY */}
        {terminalTab === 'occupancy' && (
          <div className="space-y-3">
            <div className="text-xs text-neutral-400">
              Live floor capacity telemetry across all 4 UK locations:
            </div>

            {venues.map((v) => (
              <div key={v.id} className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400">{v.city}</span>
                    <h4 className="text-xs font-bold text-neutral-100">{v.name}</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-200">
                    {v.headcount} / {v.maxHeadcount} ({v.currentCapacity}%)
                  </span>
                </div>

                <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      v.currentCapacity > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${v.currentCapacity}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[11px] text-neutral-400">Live Traffic Control:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateVenueOccupancy(v.id, -5)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-bold"
                    >
                      -5 Exits
                    </button>
                    <button
                      onClick={() => updateVenueOccupancy(v.id, 5)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 text-amber-400 text-xs font-bold"
                    >
                      +5 Entries
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MEMBER CRM */}
        {terminalTab === 'members' && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search member directory..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="p-3.5 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={member.avatar} alt={member.firstName} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-100">{member.firstName} {member.lastName}</h4>
                  <p className="text-[10px] text-neutral-400 font-mono">{member.memberNumber} • {member.tier.toUpperCase()}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono font-bold text-amber-400">{member.pointsBalance} pts</div>
                <button
                  onClick={() => {
                    setMember(prev => ({ ...prev, pointsBalance: prev.pointsBalance + 100 }));
                    playScanBeep();
                  }}
                  className="mt-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold"
                >
                  +100 Pts
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PUSH BROADCAST */}
        {terminalTab === 'broadcast' && (
          <form onSubmit={handleSendBroadcast} className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3 text-xs">
            <h4 className="font-bold text-sm text-neutral-100">Send Instant Push Alert</h4>
            <p className="text-[11px] text-neutral-400">Broadcasts directly to iOS and Android member devices</p>

            <div>
              <label className="text-[11px] text-neutral-400 block mb-1">Target Tier</label>
              <select
                value={targetTier}
                onChange={(e) => setTargetTier(e.target.value as any)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-neutral-200"
              >
                <option value="all">All Members (4 UK Venues)</option>
                <option value="black">Founders Black VIP Only</option>
                <option value="gold">Club Gold Members</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-neutral-400 block mb-1">Alert Title</label>
              <input
                type="text"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-neutral-200"
              />
            </div>

            <div>
              <label className="text-[11px] text-neutral-400 block mb-1">Message Body</label>
              <textarea
                rows={2}
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs text-neutral-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Push to All Devices</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
