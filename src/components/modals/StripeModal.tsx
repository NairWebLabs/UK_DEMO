import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MEMBERSHIP_TIERS } from '../../data/mockData';
import { TierLevel } from '../../types';
import {
  X,
  CreditCard,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { playScanBeep, playTapClick } from '../../utils/audio';

export const StripeModal: React.FC = () => {
  const {
    isStripeModalOpen,
    setIsStripeModalOpen,
    targetUpgradeTier,
    member,
    upgradeTier,
    mobilePlatform
  } = useApp();

  const [selectedTier, setSelectedTier] = useState<TierLevel>(targetUpgradeTier || 'black');
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('984');
  const [postcode, setPostcode] = useState('W1D 3SN');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isStripeModalOpen) return null;

  const tierConfig = MEMBERSHIP_TIERS.find(t => t.id === selectedTier) || MEMBERSHIP_TIERS[3];
  const price = billingCycle === 'year' ? tierConfig.priceAnnual : tierConfig.priceMonthly;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    playScanBeep();

    setTimeout(() => {
      upgradeTier(selectedTier, billingCycle, {
        cardLast4: cardNumber.slice(-4) || '4242',
        brand: 'Visa'
      });
      setIsProcessing(false);
      setIsStripeModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-700 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in zoom-in-95">
        {/* Stripe Header */}
        <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
              S
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-neutral-100">Kallos Club Subscription</span>
                <span className="text-[10px] text-neutral-400">via Stripe</span>
              </div>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                256-bit Encrypted Checkout
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsStripeModalOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Plan Picker Strip */}
          <div>
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
              Select Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {MEMBERSHIP_TIERS.filter(t => t.id !== 'free').map((tier) => (
                <button
                  type="button"
                  key={tier.id}
                  onClick={() => {
                    playTapClick();
                    setSelectedTier(tier.id);
                  }}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    selectedTier === tier.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <div className="text-[11px] font-bold truncate">{tier.name}</div>
                  <div className="text-xs font-mono font-bold mt-0.5">
                    £{billingCycle === 'year' ? tier.priceAnnual : tier.priceMonthly}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Billing Cycle Interval */}
          <div className="flex justify-between items-center text-xs p-2 bg-neutral-950 rounded-xl border border-neutral-800">
            <span className="text-neutral-400">Billing Frequency</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setBillingCycle('month')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  billingCycle === 'month' ? 'bg-neutral-800 text-amber-400' : 'text-neutral-500'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('year')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  billingCycle === 'year' ? 'bg-neutral-800 text-amber-400' : 'text-neutral-500'
                }`}
              >
                Annual (Save 17%)
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-neutral-950 to-neutral-900 border border-neutral-800 space-y-1.5 text-xs">
            <div className="flex justify-between font-bold text-neutral-100">
              <span>{tierConfig.name} ({billingCycle === 'year' ? 'Annual' : 'Monthly'})</span>
              <span className="font-mono text-amber-400">£{price.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Includes multi-venue access across London, Manchester, Bristol & Edinburgh, plus {tierConfig.pointsMultiplier}x loyalty booster.
            </p>
          </div>

          {/* Mobile One-Click Wallet Payment (Apple Pay / Google Pay) */}
          <div className="space-y-1.5">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => {
                setIsProcessing(true);
                playScanBeep();
                setTimeout(() => {
                  upgradeTier(selectedTier, billingCycle, {
                    cardLast4: '4242',
                    brand: mobilePlatform === 'ios' ? 'Apple Pay' : 'Google Pay'
                  });
                  setIsProcessing(false);
                  setIsStripeModalOpen(false);
                }, 1000);
              }}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors"
            >
              {mobilePlatform === 'ios' ? (
                <>
                  <span className="text-base font-serif"></span>
                  <span>Pay with Apple Pay</span>
                </>
              ) : (
                <>
                  <span className="text-base font-bold text-blue-600">G</span>
                  <span>Pay with Google Pay</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 my-2 text-[10px] text-neutral-500 uppercase font-semibold text-center">
              <div className="flex-1 h-px bg-neutral-800" />
              <span>Or pay with debit / credit card</span>
              <div className="flex-1 h-px bg-neutral-800" />
            </div>
          </div>

          {/* Card Input Details */}
          <div className="space-y-2 text-xs">
            <div>
              <label className="text-[11px] font-bold text-neutral-300 block mb-1">
                Card Information
              </label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none focus:border-indigo-500"
                  placeholder="Card Number"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">Expires</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs font-mono text-neutral-200 focus:outline-none focus:border-indigo-500"
                  placeholder="MM/YY"
                />
              </div>

              <div>
                <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">CVC</label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs font-mono text-neutral-200 focus:outline-none focus:border-indigo-500"
                  placeholder="CVC"
                />
              </div>

              <div>
                <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">Postcode</label>
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-xs font-mono text-neutral-200 focus:outline-none focus:border-indigo-500"
                  placeholder="W1D 3SN"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:opacity-90 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                <span>Authorizing Stripe Payment...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Pay £{price.toFixed(2)} & Activate {tierConfig.name}</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-neutral-500">
            By confirming, you authorize Kallos Club to charge your card on a recurring {billingCycle} basis. Cancel anytime via Account settings.
          </p>
        </form>
      </div>
    </div>
  );
};
