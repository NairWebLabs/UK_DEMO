import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FacilityBooking, Venue } from '../../types';
import { MEMBERSHIP_TIERS } from '../../data/mockData';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Plus,
  Sparkles,
  ChevronRight,
  Filter,
  ShieldAlert
} from 'lucide-react';
import { playTapClick } from '../../utils/audio';

const AVAILABLE_FACILITIES: Array<{
  type: FacilityBooking['facilityType'];
  name: string;
  duration: number;
  price: number;
  pointsEarned: number;
  image: string;
  venues: string[];
  courts: string[];
}> = [
  {
    type: 'Padel Court',
    name: 'Panoramic Sky Padel',
    duration: 60,
    price: 48,
    pointsEarned: 120,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=600&q=80',
    venues: ['venue-london', 'venue-bristol'],
    courts: ['Court 1 (Skyline View)', 'Court 2 (Centre Glass)', 'Court 3 (Enclosed)']
  },
  {
    type: 'Thermal Hydro Spa',
    name: 'Thermal Sauna & Ice Plunge',
    duration: 90,
    price: 35,
    pointsEarned: 80,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    venues: ['venue-london', 'venue-manchester', 'venue-edinburgh'],
    courts: ['Suite Alpha (Cedarwood)', 'Suite Beta (Infrared)']
  },
  {
    type: 'Trackman Golf Simulator',
    name: 'Trackman 4 Championship Studio',
    duration: 60,
    price: 55,
    pointsEarned: 150,
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80',
    venues: ['venue-manchester', 'venue-edinburgh'],
    courts: ['Bay 1 (St Andrews)', 'Bay 2 (Pebble Beach)']
  },
  {
    type: 'Boutique Pilates Reformer',
    name: 'Allegro 2 Reformer Studio',
    duration: 50,
    price: 28,
    pointsEarned: 60,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    venues: ['venue-london', 'venue-manchester'],
    courts: ['Studio Rebalance', 'Reformer Pod 4']
  },
  {
    type: 'Recovery Cryo Chamber',
    name: '-110°C Whole Body Cryotherapy',
    duration: 30,
    price: 40,
    pointsEarned: 100,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
    venues: ['venue-london', 'venue-manchester', 'venue-bristol', 'venue-edinburgh'],
    courts: ['Cryo Chamber 1']
  }
];

const TIME_SLOTS = [
  '08:00 - 09:00',
  '09:30 - 10:30',
  '11:00 - 12:00',
  '14:00 - 15:00',
  '16:00 - 17:00',
  '17:30 - 18:30',
  '19:00 - 20:00',
  '20:30 - 21:30'
];

export const BookingsTab: React.FC = () => {
  const {
    member,
    venues,
    activeVenueId,
    setActiveVenueId,
    currentVenue,
    bookings,
    bookFacility,
    cancelBooking
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'reserve' | 'my_bookings'>('reserve');
  const [selectedFacility, setSelectedFacility] = useState(AVAILABLE_FACILITIES[0]);
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[2]);
  const [selectedCourt, setSelectedCourt] = useState(AVAILABLE_FACILITIES[0].courts[0]);
  const [usePointsDiscount, setUsePointsDiscount] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<FacilityBooking | null>(null);

  const tierConfig = MEMBERSHIP_TIERS.find(t => t.id === member.tier) || MEMBERSHIP_TIERS[1];

  // Calculate pricing based on membership tier allowances
  // Gold & Black get free padel and spa slots
  const isIncludedInTier =
    (member.tier === 'black') ||
    (member.tier === 'gold' && selectedFacility.type === 'Padel Court') ||
    (member.tier === 'gold' && selectedFacility.type === 'Thermal Hydro Spa');

  const rawPrice = isIncludedInTier ? 0 : selectedFacility.price;
  const pointsDiscountAmount = usePointsDiscount && member.pointsBalance >= 500 ? 15 : 0;
  const finalPrice = Math.max(0, rawPrice - pointsDiscountAmount);

  const handleFacilitySelect = (facility: typeof AVAILABLE_FACILITIES[0]) => {
    playTapClick();
    setSelectedFacility(facility);
    setSelectedCourt(facility.courts[0]);
  };

  const handleConfirmReservation = () => {
    const booking = bookFacility({
      venueId: currentVenue.id,
      venueName: currentVenue.name,
      facilityType: selectedFacility.type,
      date: selectedDate,
      timeSlot: selectedSlot,
      durationMinutes: selectedFacility.duration,
      courtNumber: selectedCourt,
      pricePaid: finalPrice,
      pointsEarned: selectedFacility.pointsEarned
    });

    setBookingSuccess(booking);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24 text-neutral-100">
      {/* Header & Sub-tab switcher */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-brand text-lg font-bold tracking-widest text-neutral-100">
            CLUB BOOKINGS
          </h2>
          <p className="text-xs text-neutral-400">Integrated Facility Reservation Engine</p>
        </div>

        <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs">
          <button
            onClick={() => setActiveSubTab('reserve')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeSubTab === 'reserve'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            New Booking
          </button>
          <button
            onClick={() => setActiveSubTab('my_bookings')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all relative ${
              activeSubTab === 'my_bookings'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span>My Bookings</span>
            {bookings.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-neutral-800 text-amber-400 text-[10px]">
                {bookings.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Target Venue Filter */}
      <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-400">Selected Leisure Venue</div>
            <div className="text-xs font-bold text-neutral-100">{currentVenue.name}</div>
          </div>
        </div>

        <select
          value={activeVenueId}
          onChange={(e) => setActiveVenueId(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 rounded-lg text-xs font-medium text-neutral-200 py-1 px-2 focus:outline-none"
        >
          {venues.map((v) => (
            <option key={v.id} value={v.id}>
              {v.city}
            </option>
          ))}
        </select>
      </div>

      {activeSubTab === 'reserve' ? (
        <>
          {/* Facility Selection Carousel */}
          <div>
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
              Select Experience
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {AVAILABLE_FACILITIES.map((facility) => {
                const isSelected = selectedFacility.type === facility.type;
                const isAvailableAtVenue = facility.venues.includes(activeVenueId);

                return (
                  <div
                    key={facility.type}
                    onClick={() => {
                      if (isAvailableAtVenue) handleFacilitySelect(facility);
                    }}
                    className={`rounded-xl border p-2.5 cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-neutral-900 border-amber-500 ring-1 ring-amber-500/40'
                        : isAvailableAtVenue
                        ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                        : 'bg-neutral-950/40 border-neutral-900 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div className="h-16 rounded-lg overflow-hidden relative mb-2">
                      <img
                        src={facility.image}
                        alt={facility.name}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-neutral-950">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-neutral-100 leading-tight">
                        {facility.type}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-1">
                        <span>{facility.duration} mins</span>
                        <span className="text-amber-400 font-semibold">
                          {isIncludedInTier ? 'FREE (Tier)' : `£${facility.price}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
              Date
            </label>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {['Today', 'Tomorrow', 'Fri, 14 Nov', 'Sat, 15 Nov'].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    playTapClick();
                    setSelectedDate(d);
                  }}
                  className={`py-2 px-1 rounded-xl border font-medium transition-all ${
                    selectedDate === d
                      ? 'bg-amber-500 text-neutral-950 border-amber-500 font-bold'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Court or Bay Specification */}
          <div>
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
              Bay / Court / Suite
            </label>
            <div className="grid grid-cols-2 gap-2">
              {selectedFacility.courts.map((court) => (
                <button
                  key={court}
                  onClick={() => {
                    playTapClick();
                    setSelectedCourt(court);
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs text-left transition-all ${
                    selectedCourt === court
                      ? 'bg-neutral-850 border-amber-500 text-amber-300 font-semibold'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  {court}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
              Available Time Slots
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {TIME_SLOTS.map((slot, idx) => {
                const isBooked = idx === 1; // demo slot reserved
                const isSelected = selectedSlot === slot;

                return (
                  <button
                    key={slot}
                    disabled={isBooked}
                    onClick={() => {
                      playTapClick();
                      setSelectedSlot(slot);
                    }}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : isBooked
                        ? 'bg-neutral-950 border-neutral-900 text-neutral-600 line-through cursor-not-allowed'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span>{slot}</span>
                    {isBooked ? (
                      <span className="text-[10px] text-neutral-600">Reserved</span>
                    ) : (
                      <span className="text-[10px] text-emerald-400">Open</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Points Redemption / Membership Discount Row */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-neutral-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Apply 500 Perk Points for £15 Discount</span>
              </div>
              <input
                type="checkbox"
                checked={usePointsDiscount}
                onChange={(e) => setUsePointsDiscount(e.target.checked)}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Membership Tier Benefit:</span>
              <span className="text-amber-400 font-semibold">
                {isIncludedInTier ? 'Complimentary Unlimited Allowance' : `${tierConfig.diningDiscountPct}% Off on Extras`}
              </span>
            </div>
          </div>

          {/* Summary & Confirm Button */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400">Total Due Today</span>
                <div className="text-lg font-bold text-neutral-100">
                  {finalPrice === 0 ? (
                    <span className="text-emerald-400">Included in {tierConfig.name}</span>
                  ) : (
                    <span>£{finalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <div className="text-right text-[11px] text-amber-400">
                <span>Earns +{selectedFacility.pointsEarned} points</span>
              </div>
            </div>

            <button
              onClick={handleConfirmReservation}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Confirm & Lock In Slot</span>
            </button>
          </div>
        </>
      ) : (
        /* My Bookings Tab */
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 rounded-2xl bg-neutral-900 border border-neutral-800">
              <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">No active reservations.</p>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {b.facilityType}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {b.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-neutral-100">{b.venueName}</h4>
                  <p className="text-xs text-neutral-400">{b.courtNumber || 'General Bay'}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/60 font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Date</span>
                    <span className="text-neutral-200">{b.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Slot</span>
                    <span className="text-amber-400">{b.timeSlot}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-400 font-mono">
                    Token: {b.qrCodeToken}
                  </span>
                  <button
                    onClick={() => cancelBooking(b.id)}
                    className="text-red-400 hover:text-red-300 text-xs font-medium"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Booking Confirmed Pop-up modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-brand text-lg font-bold text-neutral-100">Booking Confirmed!</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Your reservation at <strong className="text-neutral-200">{bookingSuccess.venueName}</strong> is synchronized with club reception.
              </p>
            </div>

            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-neutral-400">Activity:</span>
                <span className="font-semibold text-neutral-200">{bookingSuccess.facilityType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Slot:</span>
                <span className="font-semibold text-amber-400">{bookingSuccess.date} • {bookingSuccess.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Pass Token:</span>
                <span className="font-mono text-emerald-400">{bookingSuccess.qrCodeToken}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setBookingSuccess(null);
                setActiveSubTab('my_bookings');
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
            >
              View in My Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
