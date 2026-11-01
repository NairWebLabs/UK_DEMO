import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MEMBERSHIP_TIERS } from '../../data/mockData';
import { TierLevel } from '../../types';
import {
  CreditCard,
  ShieldCheck,
  Bell,
  FileText,
  ChevronRight,
  Sparkles,
  Check,
  CheckCircle2,
  AlertCircle,
  Download,
  Settings,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { playTapClick } from '../../utils/audio';

export const AccountTab: React.FC = () => {
  const {
    member,
    cancelSubscription,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    invoices,
    venues,
    activeVenueId,
    setActiveVenueId,
    setIsStripeModalOpen,
    setTargetUpgradeTier
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'membership' | 'notifications' | 'billing'>('membership');
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>(member.billingInterval || 'month');
  const [notifPreferences, setNotifPreferences] = useState({
    bookingAlerts: true,
    perkDrops: true,
    eventInvites: true,
    venueOccupancy: false
  });

  const currentTierConfig = MEMBERSHIP_TIERS.find(t => t.id === member.tier) || MEMBERSHIP_TIERS[1];

  const handleOpenUpgrade = (tierId: TierLevel) => {
    playTapClick();
    setTargetUpgradeTier(tierId);
    setIsStripeModalOpen(true);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24 text-neutral-100">
      {/* Header */}
      <div>
        <h2 className="font-brand text-lg font-bold tracking-widest text-neutral-100">
          MEMBERSHIP & ACCOUNT
        </h2>
        <p className="text-xs text-neutral-400">Stripe Subscriptions & Security</p>
      </div>

      {/* Sub tabs */}
      <div className="grid grid-cols-3 gap-1 bg-neutral-900 p-1 rounded-2xl border border-neutral-800 text-xs">
        <button
          onClick={() => {
            playTapClick();
            setActiveSubTab('membership');
          }}
          className={`py-2 rounded-xl font-bold transition-all ${
            activeSubTab === 'membership'
              ? 'bg-amber-500 text-neutral-950 shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Tiers & Plans
        </button>

        <button
          onClick={() => {
            playTapClick();
            setActiveSubTab('notifications');
          }}
          className={`py-2 rounded-xl font-bold transition-all relative ${
            activeSubTab === 'notifications'
              ? 'bg-amber-500 text-neutral-950 shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <span>Notifications</span>
          {notifications.some(n => !n.read) && (
            <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-2 right-2" />
          )}
        </button>

        <button
          onClick={() => {
            playTapClick();
            setActiveSubTab('billing');
          }}
          className={`py-2 rounded-xl font-bold transition-all ${
            activeSubTab === 'billing'
              ? 'bg-amber-500 text-neutral-950 shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Invoices
        </button>
      </div>

      {/* MEMBERSHIP TIERS SUB-TAB */}
      {activeSubTab === 'membership' && (
        <div className="space-y-4">
          {/* Active Plan Card */}
          <div className="p-4 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Current Subscription
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ACTIVE STRIPE BILLING
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-brand text-lg font-bold text-neutral-100">
                  {currentTierConfig.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {currentTierConfig.currency}
                  {member.billingInterval === 'year'
                    ? `${currentTierConfig.priceAnnual}/year`
                    : `${currentTierConfig.priceMonthly}/month`}
                </p>
              </div>

              <div className="text-right text-xs">
                <span className="text-neutral-400 block text-[10px]">Renews On</span>
                <span className="font-mono text-neutral-200 font-semibold">{member.renewalDate}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-neutral-300" />
                <span>{member.paymentMethod.brand} •••• {member.paymentMethod.last4}</span>
              </div>
              <span className="text-emerald-400 text-[11px] font-medium">Auto-renew active</span>
            </div>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-2 p-1 bg-neutral-900 rounded-xl border border-neutral-800 text-xs max-w-xs mx-auto">
            <button
              onClick={() => {
                playTapClick();
                setBillingInterval('month');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                billingInterval === 'month'
                  ? 'bg-neutral-800 text-amber-400 shadow-sm'
                  : 'text-neutral-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => {
                playTapClick();
                setBillingInterval('year');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                billingInterval === 'year'
                  ? 'bg-neutral-800 text-amber-400 shadow-sm'
                  : 'text-neutral-400'
              }`}
            >
              <span>Annual</span>
              <span className="text-[9px] bg-amber-500 text-neutral-950 px-1 py-0.2 rounded font-bold">
                Save 17%
              </span>
            </button>
          </div>

          {/* Tier Cards Comparison */}
          <div className="space-y-3">
            {MEMBERSHIP_TIERS.map((tier) => {
              const isCurrent = member.tier === tier.id;
              const price = billingInterval === 'year' ? tier.priceAnnual : tier.priceMonthly;

              return (
                <div
                  key={tier.id}
                  className={`p-4 rounded-3xl border transition-all relative overflow-hidden ${
                    isCurrent
                      ? 'bg-neutral-900 border-amber-500/70 ring-1 ring-amber-500/30'
                      : tier.popular
                      ? 'bg-neutral-900/90 border-amber-500/30'
                      : 'bg-neutral-900/60 border-neutral-800'
                  }`}
                >
                  {tier.popular && !isCurrent && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-yellow-500 text-neutral-950 font-black text-[9px] px-3 py-0.5 rounded-bl-xl tracking-wider">
                      RECOMMENDED
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-neutral-100">{tier.name}</h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{tier.tagline}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-black text-neutral-100">
                        {tier.currency}{price}
                        <span className="text-[10px] font-normal text-neutral-400">
                          /{billingInterval === 'year' ? 'yr' : 'mo'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="mt-3 space-y-1.5 text-xs text-neutral-300">
                    {tier.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80">
                    {isCurrent ? (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Current Plan</span>
                        </span>
                        {tier.id !== 'free' && (
                          <button
                            onClick={cancelSubscription}
                            className="text-neutral-500 hover:text-red-400 text-xs transition-colors"
                          >
                            Cancel Subscription
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOpenUpgrade(tier.id)}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          tier.id === 'black'
                            ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-neutral-950 shadow-md shadow-amber-500/20'
                            : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Switch to {tier.name} (Stripe Checkout)</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* NOTIFICATIONS SUB-TAB */}
      {activeSubTab === 'notifications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-300">Push Alerts Feed</span>
            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs text-amber-400 hover:underline"
            >
              Mark all as read
            </button>
          </div>

          <div className="space-y-2.5">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                  notif.read
                    ? 'bg-neutral-900/50 border-neutral-800/80 text-neutral-400'
                    : 'bg-neutral-900 border-amber-500/30 text-neutral-200 ring-1 ring-amber-500/10'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        notif.read ? 'bg-neutral-600' : 'bg-amber-400 animate-pulse'
                      }`}
                    />
                    <h4 className="font-bold text-neutral-100 text-xs">{notif.title}</h4>
                  </div>
                  <span className="text-[10px] text-neutral-500 whitespace-nowrap">{notif.timestamp}</span>
                </div>
                <p className="mt-1 text-neutral-300/80 leading-relaxed text-[11px] pl-4">
                  {notif.message}
                </p>
              </div>
            ))}
          </div>

          {/* Push Preferences */}
          <div className="mt-4 p-4 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
            <h4 className="font-bold text-xs text-neutral-200">Push Notification Settings</h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Booking reminders & court alerts</span>
                <input
                  type="checkbox"
                  checked={notifPreferences.bookingAlerts}
                  onChange={(e) => setNotifPreferences({ ...notifPreferences, bookingAlerts: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Exclusive perk & points drop</span>
                <input
                  type="checkbox"
                  checked={notifPreferences.perkDrops}
                  onChange={(e) => setNotifPreferences({ ...notifPreferences, perkDrops: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-400">VIP tasting & masterclass invites</span>
                <input
                  type="checkbox"
                  checked={notifPreferences.eventInvites}
                  onChange={(e) => setNotifPreferences({ ...notifPreferences, eventInvites: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BILLING & INVOICES SUB-TAB */}
      {activeSubTab === 'billing' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Connected Payment Processor</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 text-xs">
                  S
                </div>
                <div>
                  <span className="text-xs font-bold text-neutral-100">Stripe Billing Portal</span>
                  <p className="text-[11px] text-neutral-400">UK Direct Debit & Visa/Mastercard</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PCI-DSS Compliant
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              Invoice History
            </h4>
            <div className="space-y-2">
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-bold text-neutral-100">{inv.tierName}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">
                        {inv.id} • {inv.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="font-mono font-bold text-neutral-100">
                        £{inv.amount.toFixed(2)}
                      </span>
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 block mt-0.5">
                        {inv.status}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        playTapClick();
                        alert(`Downloading receipt ${inv.id} for £${inv.amount.toFixed(2)}.`);
                      }}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
