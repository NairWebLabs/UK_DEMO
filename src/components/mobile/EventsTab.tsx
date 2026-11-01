import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClubEvent, VenueCity } from '../../types';
import { MEMBERSHIP_TIERS } from '../../data/mockData';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Bell,
  ArrowUpRight,
  Filter,
  Sparkles,
  Ticket
} from 'lucide-react';
import { playTapClick } from '../../utils/audio';

export const EventsTab: React.FC = () => {
  const {
    events,
    toggleRsvp,
    venues,
    member,
    activeVenueId,
    setActiveVenueId
  } = useApp();

  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEventModal, setSelectedEventModal] = useState<ClubEvent | null>(null);

  const categories = ['All', 'Social', 'Wellness', 'Dining', 'Masterclass'];
  const cities: Array<VenueCity | 'All'> = ['All', 'London', 'Manchester', 'Bristol', 'Edinburgh'];

  const filteredEvents = events.filter((e) => {
    const matchCity = selectedCityFilter === 'All' || e.city === selectedCityFilter;
    const matchCat = selectedCategory === 'All' || e.category === selectedCategory;
    return matchCity && matchCat;
  });

  const handleRsvp = (e: React.MouseEvent, evt: ClubEvent) => {
    e.stopPropagation();
    playTapClick();
    toggleRsvp(evt.id);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24 text-neutral-100">
      {/* Header */}
      <div>
        <h2 className="font-brand text-lg font-bold tracking-widest text-neutral-100">
          EVENTS & SOCIALS
        </h2>
        <p className="text-xs text-neutral-400">Exclusive Gatherings across 4 UK Venues</p>
      </div>

      {/* City Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => {
              playTapClick();
              setSelectedCityFilter(city);
            }}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
              selectedCityFilter === city
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
            }`}
          >
            {city === 'All' ? 'All Venues' : city}
          </button>
        ))}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playTapClick();
              setSelectedCategory(cat);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-neutral-800 text-amber-300 font-bold border border-amber-500/40'
                : 'text-neutral-400 hover:text-neutral-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Roster */}
      <div className="space-y-4">
        {filteredEvents.map((evt) => {
          const isFull = evt.attendeesCount >= evt.capacity;
          const tierReq = MEMBERSHIP_TIERS.find(t => t.id === evt.requiredTier);

          return (
            <div
              key={evt.id}
              onClick={() => setSelectedEventModal(evt)}
              className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-lg cursor-pointer hover:border-neutral-700 transition-all group"
            >
              {/* Event Cover Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/30">
                    {evt.category.toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-900/80 backdrop-blur-md text-[10px] font-semibold text-neutral-300 border border-neutral-700">
                    {evt.city}
                  </span>
                </div>

                {evt.isRsvpd && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-neutral-950 font-bold text-[10px] flex items-center gap-1 shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>RSVP CONFIRMED</span>
                  </div>
                )}

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-sm text-neutral-100 group-hover:text-amber-300 transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-[11px] text-neutral-300/80 flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {evt.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {evt.time}
                    </span>
                  </p>
                </div>
              </div>

              {/* Event Details Content */}
              <div className="p-4 space-y-3">
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400">Host:</span>
                    <span className="font-semibold text-neutral-200">{evt.host}</span>
                  </div>

                  <div className="flex items-center gap-1 text-neutral-400 text-[11px]">
                    <Users className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{evt.attendeesCount} / {evt.capacity} booked</span>
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-1 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Tier Access</span>
                    <span className="text-xs font-semibold text-amber-400 capitalize">
                      {tierReq ? tierReq.name : 'All Members'}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleRsvp(e, evt)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      evt.isRsvpd
                        ? 'bg-neutral-800 text-emerald-400 hover:bg-neutral-750 border border-emerald-500/30'
                        : isFull
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/20'
                    }`}
                  >
                    {evt.isRsvpd ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Cancel RSVP</span>
                      </>
                    ) : isFull ? (
                      'Waitlist Only'
                    ) : (
                      <>
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Reserve Spot</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Details Full Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="relative h-44">
              <img
                src={selectedEventModal.image}
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-3 text-left">
              <span className="text-[10px] uppercase font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                {selectedEventModal.category} • {selectedEventModal.city}
              </span>

              <h3 className="font-bold text-base text-neutral-100">
                {selectedEventModal.title}
              </h3>

              <div className="text-xs text-neutral-300 space-y-1.5 py-2 border-y border-neutral-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedEventModal.venueName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedEventModal.date} at {selectedEventModal.time}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">
                {selectedEventModal.description}
              </p>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={(e) => {
                    handleRsvp(e, selectedEventModal);
                    setSelectedEventModal(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs ${
                    selectedEventModal.isRsvpd
                      ? 'bg-neutral-800 text-neutral-300'
                      : 'bg-amber-500 text-neutral-950 shadow-md'
                  }`}
                >
                  {selectedEventModal.isRsvpd ? 'Withdraw Ticket' : 'Confirm RSVP Ticket'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
