import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PerkItem } from '../../types';
import { MEMBERSHIP_TIERS } from '../../data/mockData';
import {
  Sparkles,
  Gift,
  Share2,
  Trophy,
  Copy,
  Check,
  UserPlus,
  ArrowRight,
  TrendingUp,
  Award,
  Crown,
  Lock,
  ExternalLink
} from 'lucide-react';
import { playTapClick } from '../../utils/audio';

export const PerksTab: React.FC = () => {
  const {
    member,
    perks,
    claimPerk,
    claimedPerksHistory,
    leaderboard,
    referralSuccessCount,
    simulateReferralShare,
    setSelectedPerkForClaim
  } = useApp();

  const [activeSection, setActiveSection] = useState<'rewards' | 'referrals' | 'leaderboard'>('rewards');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedLink, setCopiedLink] = useState(false);
  const [claimFeedback, setClaimFeedback] = useState<{ message: string; success: boolean } | null>(null);

  const tierConfig = MEMBERSHIP_TIERS.find(t => t.id === member.tier) || MEMBERSHIP_TIERS[1];

  const categories = ['All', 'Dining', 'Wellness', 'Sports', 'Experiences'];

  const filteredPerks = perks.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  const handleCopyLink = () => {
    playTapClick();
    navigator.clipboard?.writeText?.(`https://kallosclub.co.uk/join?ref=${member.referralCode}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleClaim = (perk: PerkItem) => {
    playTapClick();
    const result = claimPerk(perk);
    setClaimFeedback(result);
    setTimeout(() => setClaimFeedback(null), 3500);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24 text-neutral-100">
      {/* Points Balance Hero Card */}
      <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-amber-500/30 shadow-xl">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl" />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
              LOYALTY WALLET
            </span>
            <div className="text-3xl font-black text-neutral-100 tracking-tight flex items-baseline gap-1 mt-1">
              <span>{member.pointsBalance.toLocaleString()}</span>
              <span className="text-xs font-semibold text-amber-400">PTS</span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Lifetime Earned: <strong className="text-neutral-200">{member.lifetimePoints.toLocaleString()} pts</strong>
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {tierConfig.pointsMultiplier}x Points Booster
            </span>
            <p className="text-[10px] text-neutral-400 mt-1.5">
              Rank #{2} on Leaderboard
            </p>
          </div>
        </div>

        {/* Earning perks summary strip */}
        <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 relative z-10">
          <span>Check-in: <strong className="text-neutral-200">+50</strong></span>
          <span>•</span>
          <span>Bookings: <strong className="text-neutral-200">+120</strong></span>
          <span>•</span>
          <span>Referral: <strong className="text-amber-400">+500</strong></span>
        </div>
      </div>

      {/* Section Switcher */}
      <div className="grid grid-cols-3 gap-1 bg-neutral-900 p-1 rounded-2xl border border-neutral-800 text-xs">
        <button
          onClick={() => {
            playTapClick();
            setActiveSection('rewards');
          }}
          className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSection === 'rewards'
              ? 'bg-amber-500 text-neutral-950 shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Perks Store</span>
        </button>

        <button
          onClick={() => {
            playTapClick();
            setActiveSection('referrals');
          }}
          className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSection === 'referrals'
              ? 'bg-amber-500 text-neutral-950 shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Referrals</span>
        </button>

        <button
          onClick={() => {
            playTapClick();
            setActiveSection('leaderboard');
          }}
          className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSection === 'leaderboard'
              ? 'bg-amber-500 text-neutral-950 shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Leaderboard</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {claimFeedback && (
        <div
          className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between ${
            claimFeedback.success
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
              : 'bg-red-950/80 border-red-500/50 text-red-200'
          }`}
        >
          <span>{claimFeedback.message}</span>
        </div>
      )}

      {/* REWARDS STORE SECTION */}
      {activeSection === 'rewards' && (
        <div className="space-y-4">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Perks Grid */}
          <div className="space-y-3">
            {filteredPerks.map((perk) => {
              const canAfford = member.pointsBalance >= perk.pointsCost;
              const meetsTier =
                perk.requiredTier === 'free' ||
                (perk.requiredTier === 'silver' && ['silver', 'gold', 'black'].includes(member.tier)) ||
                (perk.requiredTier === 'gold' && ['gold', 'black'].includes(member.tier)) ||
                (perk.requiredTier === 'black' && member.tier === 'black');

              return (
                <div
                  key={perk.id}
                  className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex gap-3 relative overflow-hidden"
                >
                  <img
                    src={perk.image}
                    alt={perk.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                          {perk.category} • {perk.valueString}
                        </span>
                        {!meetsTier && (
                          <span className="text-[10px] flex items-center gap-0.5 text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">
                            <Lock className="w-2.5 h-2.5 text-amber-500" />
                            {perk.requiredTier.toUpperCase()}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-neutral-100 mt-0.5 leading-tight">
                        {perk.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                        {perk.description}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between pt-1 border-t border-neutral-800/60">
                      <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                        <Sparkles className="w-3 h-3" />
                        <span>{perk.pointsCost.toLocaleString()} pts</span>
                      </div>

                      <button
                        disabled={!canAfford || !meetsTier}
                        onClick={() => handleClaim(perk)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          !meetsTier
                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            : canAfford
                            ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-sm cursor-pointer'
                            : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        }`}
                      >
                        {!meetsTier ? 'Tier Locked' : canAfford ? 'Redeem Voucher' : 'Need More Pts'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Claimed Perks Voucher History */}
          {claimedPerksHistory.length > 0 && (
            <div className="pt-3 border-t border-neutral-800">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Active Claimed Vouchers
              </h4>
              <div className="space-y-2">
                {claimedPerksHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-neutral-950 border border-emerald-500/30 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-neutral-200">{item.perkTitle}</span>
                      <p className="text-[10px] text-neutral-400">Present dynamic pass with voucher</p>
                    </div>
                    <span className="font-mono font-bold text-amber-400 bg-neutral-900 px-2 py-1 rounded border border-neutral-800">
                      {item.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* REFERRAL HUB SECTION */}
      {activeSection === 'referrals' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <UserPlus className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-brand text-base font-bold text-neutral-100">Invite Members, Earn 500 Pts</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                Share your unique code with friends. When they join any tier, both of you receive 500 loyalty points automatically.
              </p>
            </div>

            {/* Custom Referral Code Box */}
            <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-neutral-500">Your Exclusive Code</span>
                <div className="font-mono text-base font-black text-amber-400 tracking-wider">
                  {member.referralCode}
                </div>
              </div>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Test Referral Simulator Button */}
            <button
              onClick={() => {
                simulateReferralShare();
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simulate Friend Joining (+500 Pts Test)</span>
            </button>
          </div>

          {/* Referral Stats */}
          <div className="grid grid-cols-2 gap-2.5 text-center text-xs">
            <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
              <span className="text-neutral-400 text-[11px] block">Successful Invites</span>
              <span className="text-xl font-bold text-neutral-100 font-mono mt-1 block">
                {referralSuccessCount} Members
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
              <span className="text-neutral-400 text-[11px] block">Points From Referrals</span>
              <span className="text-xl font-bold text-amber-400 font-mono mt-1 block">
                {(referralSuccessCount * 500).toLocaleString()} PTS
              </span>
            </div>
          </div>
        </div>
      )}

      {/* LEADERBOARD SECTION */}
      {activeSection === 'leaderboard' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400">Monthly Leisure Standings</span>
            <span className="text-amber-400 font-mono">Resets in 12 days</span>
          </div>

          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-3 gap-2 text-center pt-2">
            {/* Rank 2 */}
            <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-end relative">
              <span className="w-5 h-5 rounded-full bg-slate-400 text-neutral-950 text-[10px] font-bold flex items-center justify-center mb-1">
                2
              </span>
              <img
                src={leaderboard[1].avatar}
                alt={leaderboard[1].name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-400 mb-1"
              />
              <span className="text-[11px] font-bold text-neutral-200 truncate w-full">
                Oliver (You)
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-bold">
                {leaderboard[1].pointsEarnedThisMonth} pts
              </span>
            </div>

            {/* Rank 1 (Gold Crown) */}
            <div className="p-3 rounded-2xl bg-neutral-900 border border-amber-500/60 ring-1 ring-amber-500/30 flex flex-col items-center justify-end relative -translate-y-2">
              <Crown className="w-5 h-5 text-amber-400 mb-0.5 animate-bounce" />
              <img
                src={leaderboard[0].avatar}
                alt={leaderboard[0].name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400 mb-1"
              />
              <span className="text-[11px] font-bold text-amber-300 truncate w-full">
                {leaderboard[0].name}
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-bold">
                {leaderboard[0].pointsEarnedThisMonth} pts
              </span>
            </div>

            {/* Rank 3 */}
            <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-end relative">
              <span className="w-5 h-5 rounded-full bg-amber-700 text-amber-100 text-[10px] font-bold flex items-center justify-center mb-1">
                3
              </span>
              <img
                src={leaderboard[2].avatar}
                alt={leaderboard[2].name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-700 mb-1"
              />
              <span className="text-[11px] font-bold text-neutral-200 truncate w-full">
                Arthur P.
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-bold">
                {leaderboard[2].pointsEarnedThisMonth} pts
              </span>
            </div>
          </div>

          {/* Roster list */}
          <div className="space-y-2">
            {leaderboard.map((user) => {
              const isCurrentUser = user.memberId === member.id;

              return (
                <div
                  key={user.memberId}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    isCurrentUser
                      ? 'bg-amber-500/10 border-amber-500/40 ring-1 ring-amber-500/20'
                      : 'bg-neutral-900 border-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-neutral-400 w-4 text-center">
                      #{user.rank}
                    </span>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-bold text-neutral-100 flex items-center gap-1.5">
                        <span>{user.name}</span>
                        {isCurrentUser && (
                          <span className="text-[9px] bg-amber-500 text-neutral-950 font-bold px-1.5 rounded">YOU</span>
                        )}
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        {user.homeCity} • {user.visitsCount} visits this month
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-amber-400">
                      {user.pointsEarnedThisMonth.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-neutral-500 block">PTS</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
