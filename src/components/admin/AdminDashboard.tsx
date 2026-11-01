import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MEMBERSHIP_TIERS } from '../../data/mockData';
import { TierLevel } from '../../types';
import {
  Users,
  CreditCard,
  QrCode,
  MapPin,
  TrendingUp,
  Send,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Minus,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { playScanBeep, playTapClick } from '../../utils/audio';

export const AdminDashboard: React.FC = () => {
  const {
    venues,
    updateVenueOccupancy,
    checkInLogs,
    member,
    setMember,
    sendBroadcastNotification,
    setIsStaffScannerOpen,
    invoices,
    bookings,
    events
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'venues' | 'members' | 'checkins' | 'broadcast'>('venues');
  const [memberSearch, setMemberSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [broadcastTitle, setBroadcastTitle] = useState('Weekend Rooftop Padel Open');
  const [broadcastMessage, setBroadcastMessage] = useState('New court slots and complimentary spritz tasting released for London and Manchester venues.');
  const [broadcastTier, setBroadcastTier] = useState<TierLevel | 'all'>('all');
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Mock member CRM roster including Oliver Hastings
  const memberRoster = [
    member,
    {
      id: 'usr_331_uk',
      memberNumber: 'KAL-3310-UK',
      firstName: 'Sienna',
      lastName: 'Sterling',
      email: 's.sterling@mayfair.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      tier: 'black' as TierLevel,
      joinDate: '10 Jan 2024',
      renewalDate: '10 Jan 2027',
      billingInterval: 'year' as const,
      status: 'active' as const,
      pointsBalance: 4850,
      lifetimePoints: 12400,
      referralCode: 'SIENNA-BLACK',
      referralsCount: 8,
      referralEarnings: 4000,
      homeVenueId: 'venue-london',
      paymentMethod: { brand: 'Amex', last4: '1004', expMonth: 11, expYear: 28 }
    },
    {
      id: 'usr_412_uk',
      memberNumber: 'KAL-4122-UK',
      firstName: 'Arthur',
      lastName: 'Pendelton',
      email: 'a.pendelton@edinburgh.scot',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      tier: 'black' as TierLevel,
      joinDate: '02 Mar 2024',
      renewalDate: '02 Mar 2027',
      billingInterval: 'year' as const,
      status: 'active' as const,
      pointsBalance: 3100,
      lifetimePoints: 9200,
      referralCode: 'ARTHUR-BLACK',
      referralsCount: 6,
      referralEarnings: 3000,
      homeVenueId: 'venue-edinburgh',
      paymentMethod: { brand: 'Visa', last4: '8831', expMonth: 9, expYear: 27 }
    },
    {
      id: 'usr_551_uk',
      memberNumber: 'KAL-5519-UK',
      firstName: 'Charlotte',
      lastName: 'Hayes',
      email: 'charlotte.hayes@mcr.nhs.uk',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      tier: 'gold' as TierLevel,
      joinDate: '19 Jun 2024',
      renewalDate: '19 Nov 2026',
      billingInterval: 'month' as const,
      status: 'active' as const,
      pointsBalance: 2890,
      lifetimePoints: 7100,
      referralCode: 'HAYES-GOLD',
      referralsCount: 3,
      referralEarnings: 1500,
      homeVenueId: 'venue-manchester',
      paymentMethod: { brand: 'Mastercard', last4: '9211', expMonth: 4, expYear: 28 }
    },
    {
      id: 'usr_609_uk',
      memberNumber: 'KAL-6091-UK',
      firstName: 'Liam',
      lastName: 'Gallagher-Smith',
      email: 'liam@bristoldocks.co.uk',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      tier: 'silver' as TierLevel,
      joinDate: '05 Aug 2024',
      renewalDate: '05 Dec 2026',
      billingInterval: 'month' as const,
      status: 'active' as const,
      pointsBalance: 2240,
      lifetimePoints: 4600,
      referralCode: 'LIAM-BRISTOL',
      referralsCount: 2,
      referralEarnings: 1000,
      homeVenueId: 'venue-bristol',
      paymentMethod: { brand: 'Visa', last4: '3310', expMonth: 6, expYear: 27 }
    }
  ];

  const filteredRoster = memberRoster.filter(m => {
    const matchesSearch =
      `${m.firstName} ${m.lastName}`.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.memberNumber.toLowerCase().includes(memberSearch.toLowerCase());
    const matchesTier = tierFilter === 'all' || m.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    sendBroadcastNotification(broadcastTitle, broadcastMessage, broadcastTier);
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  const totalHeadcount = venues.reduce((acc, v) => acc + v.headcount, 0);
  const totalMaxHeadcount = venues.reduce((acc, v) => acc + v.maxHeadcount, 0);
  const aggregateOccupancy = Math.round((totalHeadcount / totalMaxHeadcount) * 100);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 text-neutral-100 max-w-7xl mx-auto w-full">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-brand text-2xl font-bold tracking-wider text-neutral-100">
              KALLOS EXECUTIVE PORTAL
            </h1>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Staff Admin v2.4
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Centralized operations & telemetry across 4 UK Flagship Leisure Venues
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStaffScannerOpen(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Launch Staff Reception Scanner</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Total Active Members</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-neutral-100 font-mono">1,482</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% growth this month</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Stripe MRR (UK)</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-neutral-100 font-mono">£84,240</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <span>98.6% renewal rate</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Live Venue Headcount</span>
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-neutral-100 font-mono">
            {totalHeadcount} <span className="text-xs text-neutral-500 font-normal">/ {totalMaxHeadcount}</span>
          </div>
          <div className="text-[11px] text-neutral-400">
            {aggregateOccupancy}% average capacity across 4 clubs
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Bookings Today</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-neutral-100 font-mono">48</div>
          <div className="text-[11px] text-amber-400">
            32 Padel • 16 Thermal Spa
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 text-xs font-semibold">
        <button
          onClick={() => {
            playTapClick();
            setActiveAdminTab('venues');
          }}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeAdminTab === 'venues'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          4 Venues Live Telemetry
        </button>

        <button
          onClick={() => {
            playTapClick();
            setActiveAdminTab('members');
          }}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeAdminTab === 'members'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Member Directory CRM
        </button>

        <button
          onClick={() => {
            playTapClick();
            setActiveAdminTab('checkins');
          }}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeAdminTab === 'checkins'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Check-in Audit Logs ({checkInLogs.length})
        </button>

        <button
          onClick={() => {
            playTapClick();
            setActiveAdminTab('broadcast');
          }}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeAdminTab === 'broadcast'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Push Broadcaster
        </button>
      </div>

      {/* VENUES TELEMETRY SECTION */}
      {activeAdminTab === 'venues' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venues.map((venue) => {
              return (
                <div
                  key={venue.id}
                  className="rounded-3xl bg-neutral-900 border border-neutral-800 p-5 space-y-4 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                        {venue.city} FLAGSHIP
                      </span>
                      <h3 className="text-base font-bold text-neutral-100 mt-0.5">
                        {venue.name}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-500" />
                        {venue.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Beacon: {venue.beaconStatus}</span>
                    </div>
                  </div>

                  {/* Capacity Bar & Real-time Live Controls */}
                  <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Current Occupancy</span>
                      <span className="font-mono font-bold text-neutral-200">
                        {venue.headcount} / {venue.maxHeadcount} members ({venue.currentCapacity}%)
                      </span>
                    </div>

                    <div className="w-full bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          venue.currentCapacity > 75
                            ? 'bg-amber-500'
                            : venue.currentCapacity > 50
                            ? 'bg-blue-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${venue.currentCapacity}%` }}
                      />
                    </div>

                    {/* Live Headcount Simulator +/- */}
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-neutral-400">Simulate Turnstile Traffic:</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            playTapClick();
                            updateVenueOccupancy(venue.id, -5);
                          }}
                          className="px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs"
                          title="Simulate 5 exits"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => {
                            playTapClick();
                            updateVenueOccupancy(venue.id, 5);
                          }}
                          className="px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold text-xs"
                          title="Simulate 5 entries"
                        >
                          +5
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Facilities list */}
                  <div className="text-xs space-y-1">
                    <span className="text-neutral-500 text-[10px] uppercase font-bold">Venue Amenities</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {venue.facilities.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-neutral-800 text-[11px] text-neutral-300"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MEMBER DIRECTORY CRM */}
      {activeAdminTab === 'members' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search member name, ID, or email..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2 text-xs self-start md:self-auto">
              <span className="text-neutral-400">Tier:</span>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200"
              >
                <option value="all">All Tiers</option>
                <option value="black">Founders Black</option>
                <option value="gold">Club Gold</option>
                <option value="silver">Club Silver</option>
                <option value="free">Community Pass</option>
              </select>
            </div>
          </div>

          {/* Member CRM Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Tier & ID</th>
                  <th className="py-3 px-4">Home Venue</th>
                  <th className="py-3 px-4">Points</th>
                  <th className="py-3 px-4">Billing</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredRoster.map((m) => {
                  const isCurrent = m.id === member.id;
                  const tierConfig = MEMBERSHIP_TIERS.find(t => t.id === m.tier) || MEMBERSHIP_TIERS[1];

                  return (
                    <tr key={m.id} className="hover:bg-neutral-850/60 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-2.5">
                        <img
                          src={m.avatar}
                          alt={m.firstName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-bold text-neutral-100 flex items-center gap-1.5">
                            <span>{m.firstName} {m.lastName}</span>
                            {isCurrent && (
                              <span className="text-[9px] bg-amber-500 text-neutral-950 font-bold px-1.5 rounded">
                                ACTIVE USER
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-neutral-400">{m.email}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tierConfig.colorScheme.badgeBg}`}>
                          {tierConfig.badge}
                        </span>
                        <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                          {m.memberNumber}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-neutral-300">
                        {m.homeVenueId === 'venue-london' ? 'London Soho' : m.homeVenueId === 'venue-manchester' ? 'Manchester NQ' : m.homeVenueId === 'venue-bristol' ? 'Bristol' : 'Edinburgh'}
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-amber-400">
                        {m.pointsBalance.toLocaleString()} pts
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-emerald-400 font-medium capitalize">
                          {m.status} ({m.billingInterval})
                        </span>
                        <span className="text-[10px] text-neutral-500 block">
                          Card •••• {m.paymentMethod.last4}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        {isCurrent ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setMember(prev => ({
                                  ...prev,
                                  pointsBalance: prev.pointsBalance + 250
                                }));
                                playScanBeep();
                              }}
                              className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 font-semibold text-[11px]"
                              title="Award 250 Points"
                            >
                              +250 Pts
                            </button>
                          </div>
                        ) : (
                          <span className="text-neutral-500 text-[11px]">Staff Verified</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CHECK-IN AUDIT LOGS */}
      {activeAdminTab === 'checkins' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Real-Time Access Control Logs Across 4 Venues</span>
            <span className="text-emerald-400 font-mono">Turnstile & Scanner Sync: Live</span>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">Venue</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Benefits Redeemed</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {checkInLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-850/50">
                    <td className="py-3 px-4 font-mono text-neutral-400">{log.timestamp}</td>
                    <td className="py-3 px-4 font-semibold text-neutral-100">{log.memberName}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-neutral-800 text-amber-300">
                        {log.memberTier}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-300">{log.venueName}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-neutral-400">
                      {log.method}
                    </td>
                    <td className="py-3 px-4 text-neutral-300">
                      {log.benefitsRedeemed?.join(', ') || 'General Entry'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PUSH BROADCASTER */}
      {activeAdminTab === 'broadcast' && (
        <div className="max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
          <div>
            <h3 className="font-bold text-base text-neutral-100">Send Push Notification Campaign</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Target all members or specific subscription tiers across London, Manchester, Bristol, and Edinburgh.
            </p>
          </div>

          {broadcastSent && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Broadcast dispatched to 1,482 mobile devices! Check notifications feed in Member App.</span>
            </div>
          )}

          <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-neutral-300 block mb-1">Target Membership Audience</label>
              <select
                value={broadcastTier}
                onChange={(e) => setBroadcastTier(e.target.value as any)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-200"
              >
                <option value="all">All Members (1,482 members across 4 UK Venues)</option>
                <option value="black">Founders Black VIP Only</option>
                <option value="gold">Club Gold & Founders Black</option>
                <option value="silver">Club Silver Members</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-neutral-300 block mb-1">Campaign Title</label>
              <input
                type="text"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                placeholder="e.g. Rare Whisky Cellar Tasting Tonight"
              />
            </div>

            <div>
              <label className="font-bold text-neutral-300 block mb-1">Notification Body</label>
              <textarea
                rows={3}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                placeholder="Details of the announcement..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Push Notification Now</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
