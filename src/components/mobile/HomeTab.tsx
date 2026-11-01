import React from 'react';
import { useApp } from '../../context/AppContext';
import { MEMBERSHIP_TIERS } from '../../data/mockData';
import {
  Sparkles,
  QrCode,
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  ShieldCheck,
  UserPlus,
  Flame,
  ArrowUpRight,
  CheckCircle2,
  Users
} from 'lucide-react';

export const HomeTab: React.FC = () => {
  const {
    member,
    venues,
    activeVenueId,
    setActiveVenueId,
    currentVenue,
    bookings,
    events,
    setActiveTab,
    setIsStripeModalOpen,
    simulateReferralShare
  } = useApp();

  const tierConfig = MEMBERSHIP_TIERS.find(t => t.id === member.tier) || MEMBERSHIP_TIERS[1];
  const upcomingBooking = bookings.find(b => b.status === 'confirmed');
  const nextEvent = events.find(e => e.isRsvpd) || events[0];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-24 text-neutral-100">
      {/* Top Profile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={member.avatar}
              alt={member.firstName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/50 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-neutral-100 text-sm">
                Good afternoon, {member.firstName}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tierConfig.colorScheme.badgeBg}`}>
                {tierConfig.badge}
              </span>
              <span className="text-[11px] text-neutral-400 font-mono">
                {member.memberNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Loyalty Points Pill */}
        <button
          onClick={() => setActiveTab('perks')}
          className="flex flex-col items-end px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 transition-colors"
        >
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Perk Points</span>
          <span className="text-amber-400 font-bold text-sm flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {member.pointsBalance.toLocaleString()}
          </span>
        </button>
      </div>

      {/* Hero: Interactive Digital Pass Card Preview */}
      <div
        onClick={() => setActiveTab('pass')}
        className={`relative overflow-hidden rounded-2xl p-5 cursor-pointer shadow-xl border transition-all duration-300 hover:scale-[1.01] ${
          member.tier === 'black'
            ? 'bg-gradient-to-br from-neutral-900 via-neutral-950 to-amber-950/40 border-amber-500/40'
            : member.tier === 'gold'
            ? 'bg-gradient-to-br from-amber-700/80 via-amber-900 to-stone-950 border-amber-500/60'
            : member.tier === 'silver'
            ? 'bg-gradient-to-br from-slate-700 via-slate-900 to-zinc-950 border-slate-500/50'
            : 'bg-gradient-to-br from-neutral-800 to-neutral-950 border-neutral-700/50'
        }`}
      >
        {/* Holographic Watermark Sheen */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-bold">KALLOS CLUB MEMBER PASS</span>
            <h3 className="font-brand text-xl font-bold tracking-wider text-neutral-100 mt-1">
              {tierConfig.name.toUpperCase()}
            </h3>
            <p className="text-xs text-neutral-300/80 mt-0.5">4 UK Venues All-Access</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <QrCode className="w-5 h-5 text-neutral-100" />
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between relative z-10">
          <div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Member Name</div>
            <div className="text-sm font-semibold text-neutral-100 tracking-wide">
              {member.firstName} {member.lastName}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Dynamic Anti-Fraud Active
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-amber-300">
            <span>Tap to Open Pass</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <button
          onClick={() => setActiveTab('bookings')}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/30 hover:bg-neutral-850 transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-medium text-neutral-300 mt-1.5">Book Court</span>
        </button>

        <button
          onClick={() => setActiveTab('pass')}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/30 hover:bg-neutral-850 transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <QrCode className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-medium text-neutral-300 mt-1.5">Scan Pass</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/30 hover:bg-neutral-850 transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Flame className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-medium text-neutral-300 mt-1.5">Events</span>
        </button>

        <button
          onClick={() => {
            simulateReferralShare();
          }}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/30 hover:bg-neutral-850 transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <UserPlus className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-medium text-neutral-300 mt-1.5">+500 Pts</span>
        </button>
      </div>

      {/* Next Upcoming Booking */}
      {upcomingBooking && (
        <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Next Upcoming Session</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
              Confirmed
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-neutral-100">{upcomingBooking.facilityType}</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{upcomingBooking.venueName} • {upcomingBooking.courtNumber || 'Private Suite'}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-neutral-200">{upcomingBooking.date}</span>
              <p className="text-[11px] text-amber-400 font-mono">{upcomingBooking.timeSlot}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
            <span className="text-neutral-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
              Pass Access Code: <strong className="text-neutral-200 font-mono">{upcomingBooking.qrCodeToken}</strong>
            </span>
            <button
              onClick={() => setActiveTab('bookings')}
              className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
            >
              <span>Manage</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* 4-Venue Radar & Live Busyness */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-sm text-neutral-200">UK Venues Live Radar</h3>
          </div>
          <span className="text-[11px] text-neutral-400">Live Occupancy</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {venues.map((venue) => {
            const isSelected = venue.id === activeVenueId;
            const occupancyColor =
              venue.currentCapacity > 75
                ? 'text-amber-400'
                : venue.currentCapacity > 50
                ? 'text-blue-400'
                : 'text-emerald-400';

            return (
              <div
                key={venue.id}
                onClick={() => setActiveVenueId(venue.id)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-neutral-900 border-amber-500/70 ring-1 ring-amber-500/30'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">
                    {venue.city}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </div>

                <div className="text-xs font-semibold text-neutral-100 truncate">
                  {venue.name.replace('Kallos ', '')}
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">{venue.headcount} members</span>
                  <span className={`font-bold ${occupancyColor}`}>{venue.currentCapacity}%</span>
                </div>

                {/* Mini progress meter */}
                <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      venue.currentCapacity > 75
                        ? 'bg-amber-500'
                        : venue.currentCapacity > 50
                        ? 'bg-blue-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${venue.currentCapacity}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Club Event Banner */}
      {nextEvent && (
        <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
          <div className="relative h-28 overflow-hidden">
            <img
              src={nextEvent.image}
              alt={nextEvent.title}
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-semibold text-amber-300 border border-amber-500/30">
              {nextEvent.category.toUpperCase()} • {nextEvent.city}
            </div>
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between">
              <span className="text-xs font-bold text-white drop-shadow-md truncate max-w-[70%]">
                {nextEvent.title}
              </span>
              <span className="text-[11px] text-neutral-200 bg-black/60 px-2 py-0.5 rounded font-mono">
                {nextEvent.date}
              </span>
            </div>
          </div>

          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-neutral-300">
              <Users className="w-3.5 h-3.5 text-neutral-400" />
              <span>{nextEvent.attendeesCount} / {nextEvent.capacity} spots reserved</span>
            </div>
            <button
              onClick={() => setActiveTab('events')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>{nextEvent.isRsvpd ? 'View Ticket' : 'RSVP Now'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Membership Upgrade Banner (If not black tier) */}
      {member.tier !== 'black' && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-600/10 to-transparent border border-amber-500/30 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Upgrade Available</span>
            <h4 className="text-xs font-bold text-neutral-100 mt-0.5">Unlock VIP Founders Black Tier</h4>
            <p className="text-[11px] text-neutral-400">24/7 access, 3x points, and private concierge line.</p>
          </div>
          <button
            onClick={() => {
              setIsStripeModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shrink-0 shadow-md transition-all"
          >
            Upgrade
          </button>
        </div>
      )}
    </div>
  );
};
