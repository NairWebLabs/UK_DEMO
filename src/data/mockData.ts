import { Venue, MembershipTier, MemberProfile, PerkItem, ClubEvent, FacilityBooking, PushNotification, LeaderboardEntry, CheckInRecord, InvoiceRecord } from '../types';

export const VENUES_DATA: Venue[] = [
  {
    id: 'venue-london',
    name: 'Kallos Soho & Mayfair',
    city: 'London',
    area: 'Central London',
    address: '18 Dean Street, Soho, London',
    postcode: 'W1D 3SN',
    phone: '+44 20 7946 0912',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    currentCapacity: 68,
    headcount: 136,
    maxHeadcount: 200,
    facilities: ['Rooftop Padel (3 Courts)', 'Thermal Spa & Cryo', 'Members Cocktail Lounge', 'Artisan Coffee Bar', 'Work Suites'],
    openingHours: '06:00 – 23:30 Daily',
    beaconStatus: 'Active',
    featuredTag: 'Flagship Rooftop'
  },
  {
    id: 'venue-manchester',
    name: 'Kallos Northern Quarter',
    city: 'Manchester',
    area: 'Stevenson Square',
    address: '42 Dale Street, Northern Quarter, Manchester',
    postcode: 'M1 2HF',
    phone: '+44 161 496 0331',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1000&q=80',
    currentCapacity: 52,
    headcount: 78,
    maxHeadcount: 150,
    facilities: ['Boutique Reformer Pilates', 'Cold Plunge Sanctuary', 'Trackman Golf Studio', 'Private Dining Room', 'Media Studio'],
    openingHours: '06:30 – 22:30 Daily',
    beaconStatus: 'Active',
    featuredTag: 'Thermal Haven'
  },
  {
    id: 'venue-bristol',
    name: 'Kallos Harbourside',
    city: 'Bristol',
    area: 'Dockside Basin',
    address: '14 Dockside Promenade, Harbourside, Bristol',
    postcode: 'BS1 5UH',
    phone: '+44 117 496 0884',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    currentCapacity: 41,
    headcount: 49,
    maxHeadcount: 120,
    facilities: ['Panoramic Waterside Sauna', 'Indoor Squash Courts (2)', 'Organic Juice & Bakery', 'Co-Working Deck', 'Kayak Berth'],
    openingHours: '07:00 – 22:00 Daily',
    beaconStatus: 'Active',
    featuredTag: 'Harbour Views'
  },
  {
    id: 'venue-edinburgh',
    name: 'Kallos New Town',
    city: 'Edinburgh',
    area: 'Georgian Quarter',
    address: '28 George Street, New Town, Edinburgh',
    postcode: 'EH2 2PF',
    phone: '+44 131 496 0192',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    currentCapacity: 74,
    headcount: 96,
    maxHeadcount: 130,
    facilities: ['Hydrotherapy Pool', 'Rare Malt Tasting Vault', 'Golf Simulators', 'Private Boardroom', 'Restorative Yoga Loft'],
    openingHours: '06:30 – 23:00 Daily',
    beaconStatus: 'Active',
    featuredTag: 'Heritage Luxury'
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'free',
    name: 'Community Pass',
    priceMonthly: 0,
    priceAnnual: 0,
    currency: '£',
    badge: 'FREE',
    tagline: 'Casual access to club social cafes and public events.',
    colorScheme: {
      bg: 'bg-neutral-900',
      border: 'border-neutral-800',
      text: 'text-neutral-400',
      gradient: 'from-neutral-800 to-neutral-900',
      badgeBg: 'bg-neutral-800 text-neutral-300'
    },
    features: [
      'Access to ground-floor cafes & public terraces',
      'Pay-as-you-go facility bookings (standard rates)',
      'Digital member ID for fast café check-in',
      '1x Loyalty points on food & beverage',
      'Community events newsletter'
    ],
    pointsMultiplier: 1,
    guestPassesPerMonth: 0,
    bookingWindowDays: 3,
    diningDiscountPct: 0
  },
  {
    id: 'silver',
    name: 'Club Silver',
    priceMonthly: 49,
    priceAnnual: 490,
    currency: '£',
    badge: 'SILVER',
    tagline: 'Off-peak wellness, fitness, and dining across 4 UK venues.',
    colorScheme: {
      bg: 'bg-slate-900',
      border: 'border-slate-600/50',
      text: 'text-slate-200',
      gradient: 'from-slate-700 via-slate-800 to-zinc-900',
      badgeBg: 'bg-slate-300 text-slate-950'
    },
    features: [
      'Multi-venue access during off-peak hours',
      '10% discount on all food & beverage orders',
      '1 complimentary guest pass each calendar month',
      '7-day advance booking window for courts & spa',
      '1.5x Loyalty points multiplier on all spend',
      'Access to wellness workshops and fitness slots'
    ],
    pointsMultiplier: 1.5,
    guestPassesPerMonth: 1,
    bookingWindowDays: 7,
    diningDiscountPct: 10
  },
  {
    id: 'gold',
    name: 'Club Gold',
    priceMonthly: 99,
    priceAnnual: 990,
    currency: '£',
    badge: 'MOST POPULAR',
    tagline: 'Unrestricted peak access, 20% dining, and priority club bookings.',
    popular: true,
    colorScheme: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-500/50',
      text: 'text-amber-300',
      gradient: 'from-amber-600/90 via-amber-700 to-stone-900',
      badgeBg: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-neutral-950'
    },
    features: [
      'Full unrestricted peak access across all 4 venues',
      '20% dining & cocktail discount in private bars',
      '3 complimentary guest passes per month',
      '14-day priority booking window for padel & spa',
      '2x Loyalty perk points multiplier',
      'Complimentary towel, locker & luxury grooming products',
      'Exclusive invitations to monthly chef tastings'
    ],
    pointsMultiplier: 2.0,
    guestPassesPerMonth: 3,
    bookingWindowDays: 14,
    diningDiscountPct: 20
  },
  {
    id: 'black',
    name: 'Founders Black Tier',
    priceMonthly: 185,
    priceAnnual: 1850,
    currency: '£',
    badge: 'VIP FOUNDERS',
    tagline: 'The ultimate bespoke leisure membership with 24/7 concierge.',
    colorScheme: {
      bg: 'bg-neutral-950',
      border: 'border-amber-400/80',
      text: 'text-amber-200',
      gradient: 'from-neutral-900 via-zinc-950 to-amber-950/40',
      badgeBg: 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-neutral-950 font-bold'
    },
    features: [
      '24/7 VIP access with dedicated private concierge line',
      'Unlimited guest privileges (up to 3 guests per visit)',
      '30-day advance booking window & court reservations',
      '3x Loyalty perk points multiplier',
      'Permanent reserved private luxury locker & kit laundry',
      'Access to private cigar terraces & secret tasting vaults',
      'VIP table reservations guaranteed at all venue restaurants'
    ],
    pointsMultiplier: 3.0,
    guestPassesPerMonth: 99,
    bookingWindowDays: 30,
    diningDiscountPct: 25
  }
];

export const INITIAL_MEMBER: MemberProfile = {
  id: 'usr_8829_uk',
  memberNumber: 'KAL-8829-UK',
  firstName: 'Oliver',
  lastName: 'Hastings',
  email: 'o.hastings@mayfairleisure.co.uk',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  tier: 'gold',
  joinDate: '14 Jan 2025',
  renewalDate: '14 Dec 2026',
  billingInterval: 'month',
  status: 'active',
  pointsBalance: 2450,
  lifetimePoints: 8900,
  referralCode: 'HASTINGS-GOLD',
  referralsCount: 4,
  referralEarnings: 2000,
  homeVenueId: 'venue-london',
  paymentMethod: {
    brand: 'Mastercard',
    last4: '4821',
    expMonth: 8,
    expYear: 28
  }
};

export const PERKS_CATALOG: PerkItem[] = [
  {
    id: 'perk-1',
    title: 'Complimentary Padel Hour',
    venueName: 'All Venues',
    category: 'Sports',
    pointsCost: 750,
    requiredTier: 'silver',
    valueString: 'Worth £48.00',
    description: 'Enjoy 60 minutes on any of our panoramic rooftop or indoor padel courts including racket and ball hire.',
    iconName: 'Activity',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=600&q=80',
    expiresInDays: 30,
    isPopular: true
  },
  {
    id: 'perk-2',
    title: 'Signature Espresso Martini & Truffles',
    venueName: 'Soho & Manchester',
    category: 'Dining',
    pointsCost: 400,
    requiredTier: 'free',
    valueString: 'Worth £18.50',
    description: 'Handcrafted cocktail prepared by our master mixologist, paired with dark single-origin chocolate truffles.',
    iconName: 'Coffee',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    expiresInDays: 45,
    isPopular: true
  },
  {
    id: 'perk-3',
    title: '45-Min Contrast Therapy & Sauna',
    venueName: 'All Venues',
    category: 'Wellness',
    pointsCost: 1200,
    requiredTier: 'silver',
    valueString: 'Worth £65.00',
    description: 'Private circuit combining dry cedarwood sauna, glacial plunge pool, and infrared heat therapy suite.',
    iconName: 'Flame',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
    expiresInDays: 60,
    isPopular: true
  },
  {
    id: 'perk-4',
    title: 'Weekend Brunch with Champagne for Two',
    venueName: 'London & Edinburgh',
    category: 'Dining',
    pointsCost: 1800,
    requiredTier: 'gold',
    valueString: 'Worth £95.00',
    description: 'Two courses from our seasonal brunch menu, accompanied by glasses of Laurent-Perrier La Cuvée.',
    iconName: 'Utensils',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
    expiresInDays: 90
  },
  {
    id: 'perk-5',
    title: 'Trackman Golf Simulator 90-Min Session',
    venueName: 'Manchester & Edinburgh',
    category: 'Sports',
    pointsCost: 900,
    requiredTier: 'silver',
    valueString: 'Worth £55.00',
    description: 'Play St Andrews or Pebble Beach on the ultra-precise Trackman 4 radar system with complimentary balls.',
    iconName: 'Target',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80',
    expiresInDays: 30
  },
  {
    id: 'perk-6',
    title: 'Founders Vault Rare Whisky Flight',
    venueName: 'Kallos New Town',
    category: 'Experiences',
    pointsCost: 2200,
    requiredTier: 'black',
    valueString: 'Worth £140.00',
    description: 'Curated 4-dram tasting of 25+ year old rare Highland single malts with our resident head sommelier.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80',
    expiresInDays: 90
  }
];

export const CLUB_EVENTS: ClubEvent[] = [
  {
    id: 'evt-1',
    title: 'Sunset Padel Social & Spritz Mixer',
    venueId: 'venue-london',
    venueName: 'Kallos Soho & Mayfair',
    city: 'London',
    category: 'Social',
    date: 'Fri, 14 Nov',
    time: '18:30 - 21:30',
    duration: '3 hrs',
    description: 'Friendly American-style round-robin padel tournament followed by rooftop Aperol spritzes and live vinyl DJ sets.',
    host: 'Marcus Vance',
    hostTitle: 'Head of Racquet Sports',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80',
    price: 0,
    requiredTier: 'silver',
    capacity: 32,
    attendeesCount: 28,
    isRsvpd: true,
    tags: ['Padel', 'Cocktails', 'DJ Set']
  },
  {
    id: 'evt-2',
    title: 'Cold Plunge & Wim Hof Breathwork Masterclass',
    venueId: 'venue-manchester',
    venueName: 'Kallos Northern Quarter',
    city: 'Manchester',
    category: 'Wellness',
    date: 'Sun, 16 Nov',
    time: '09:30 - 11:30',
    duration: '2 hrs',
    description: 'Immersive nervous system reset led by certified Wim Hof practitioners with guided glacial tubs and herbal infusion sauna.',
    host: 'Dr. Freya Lindqvist',
    hostTitle: 'Performance Longevity Specialist',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    price: 15,
    requiredTier: 'free',
    capacity: 20,
    attendeesCount: 17,
    isRsvpd: false,
    tags: ['Breathwork', 'Sauna', 'Recovery']
  },
  {
    id: 'evt-3',
    title: 'Artisan Sourdough & Natural Wine Evening',
    venueId: 'venue-bristol',
    venueName: 'Kallos Harbourside',
    city: 'Bristol',
    category: 'Dining',
    date: 'Wed, 19 Nov',
    time: '19:00 - 22:00',
    duration: '3 hrs',
    description: 'Taste low-intervention bio wines paired with freshly baked heritage grains from our dockside woodfired oven.',
    host: 'Chef Julian Cross',
    hostTitle: 'Executive Baker & Wine Director',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    price: 25,
    requiredTier: 'silver',
    capacity: 24,
    attendeesCount: 22,
    isRsvpd: false,
    tags: ['Natural Wine', 'Bakery', 'Private Dinner']
  },
  {
    id: 'evt-4',
    title: 'Founders Private Highland Cellar Tasting',
    venueId: 'venue-edinburgh',
    venueName: 'Kallos New Town',
    city: 'Edinburgh',
    category: 'Masterclass',
    date: 'Sat, 22 Nov',
    time: '20:00 - 22:30',
    duration: '2.5 hrs',
    description: 'An ultra-exclusive evening opening casks rarely poured outside Scotland. Strictly limited to Gold & Founders Black members.',
    host: 'Alasdair MacLeod',
    hostTitle: 'Keeper of the Quaich',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80',
    price: 0,
    requiredTier: 'gold',
    capacity: 14,
    attendeesCount: 12,
    isRsvpd: false,
    tags: ['VIP Only', 'Whisky', 'Tasting']
  }
];

export const INITIAL_BOOKINGS: FacilityBooking[] = [
  {
    id: 'bk-901',
    venueId: 'venue-london',
    venueName: 'Kallos Soho & Mayfair',
    facilityType: 'Padel Court',
    date: 'Today, 17:30',
    timeSlot: '17:30 - 18:30',
    durationMinutes: 60,
    courtNumber: 'Court 2 (Panoramic Sky)',
    pricePaid: 0,
    pointsEarned: 120,
    status: 'confirmed',
    bookedAt: 'Yesterday, 14:20',
    qrCodeToken: 'BK-LON-PADEL-2026-901'
  },
  {
    id: 'bk-902',
    venueId: 'venue-london',
    venueName: 'Kallos Soho & Mayfair',
    facilityType: 'Thermal Hydro Spa',
    date: 'Tomorrow, 11:00',
    timeSlot: '11:00 - 12:30',
    durationMinutes: 90,
    pricePaid: 25,
    pointsEarned: 50,
    status: 'confirmed',
    bookedAt: '3 days ago',
    qrCodeToken: 'BK-LON-SPA-2026-902'
  }
];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif-1',
    title: 'Padel Court Reservation Ready',
    message: 'Your booking for Court 2 at Kallos Soho begins in 3 hours. Quick check-in available via your digital pass.',
    category: 'booking',
    timestamp: '15m ago',
    read: false,
    actionUrl: '/bookings'
  },
  {
    id: 'notif-2',
    title: '+500 Points Awarded!',
    message: 'Your friend James signed up with your invite code HASTINGS-GOLD. 500 bonus points credited to your wallet.',
    category: 'perk',
    timestamp: '2h ago',
    read: false,
    actionUrl: '/perks'
  },
  {
    id: 'notif-3',
    title: 'New Event: Sunset Spritz Mixer',
    message: 'Spots just opened for Gold Members at Kallos Soho rooftop this Friday. RSVP before capacity fills.',
    category: 'event',
    timestamp: '1d ago',
    read: true,
    actionUrl: '/events'
  },
  {
    id: 'notif-4',
    title: 'Edinburgh New Town Renovation Complete',
    message: 'The Hydrotherapy Pool and Golf Suites are now officially open to all members.',
    category: 'venue',
    timestamp: '3d ago',
    read: true
  }
];

export const LEADERBOARD_USERS: LeaderboardEntry[] = [
  {
    rank: 1,
    memberId: 'usr-331',
    name: 'Sienna Sterling',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    tier: 'black',
    homeCity: 'London',
    pointsEarnedThisMonth: 4850,
    visitsCount: 19
  },
  {
    rank: 2,
    memberId: 'usr-8829_uk',
    name: 'Oliver Hastings (You)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tier: 'gold',
    homeCity: 'London',
    pointsEarnedThisMonth: 3420,
    visitsCount: 14
  },
  {
    rank: 3,
    memberId: 'usr-412',
    name: 'Arthur Pendelton',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    tier: 'black',
    homeCity: 'Edinburgh',
    pointsEarnedThisMonth: 3100,
    visitsCount: 16
  },
  {
    rank: 4,
    memberId: 'usr-551',
    name: 'Dr. Charlotte Hayes',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    tier: 'gold',
    homeCity: 'Manchester',
    pointsEarnedThisMonth: 2890,
    visitsCount: 12
  },
  {
    rank: 5,
    memberId: 'usr-609',
    name: 'Liam Gallagher-Smith',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    tier: 'silver',
    homeCity: 'Bristol',
    pointsEarnedThisMonth: 2240,
    visitsCount: 11
  }
];

export const INITIAL_CHECKINS: CheckInRecord[] = [
  {
    id: 'chk-881',
    memberId: 'usr_8829_uk',
    memberName: 'Oliver Hastings',
    memberTier: 'gold',
    venueId: 'venue-london',
    venueName: 'Kallos Soho & Mayfair',
    timestamp: 'Today, 08:14',
    method: 'QR_DYNAMIC_SCAN',
    benefitsRedeemed: ['Morning Towel Service', 'Off-peak Padel Credit'],
    status: 'GRANTED'
  },
  {
    id: 'chk-880',
    memberId: 'usr-331',
    memberName: 'Sienna Sterling',
    memberTier: 'black',
    venueId: 'venue-london',
    venueName: 'Kallos Soho & Mayfair',
    timestamp: 'Today, 07:42',
    method: 'NFC_TAP',
    benefitsRedeemed: ['VIP Locker Key', 'Valet Reserved'],
    status: 'GRANTED'
  },
  {
    id: 'chk-879',
    memberId: 'usr-551',
    memberName: 'Dr. Charlotte Hayes',
    memberTier: 'gold',
    venueId: 'venue-manchester',
    venueName: 'Kallos Northern Quarter',
    timestamp: 'Yesterday, 18:30',
    method: 'QR_DYNAMIC_SCAN',
    benefitsRedeemed: ['Cryo Chamber Access'],
    status: 'GRANTED'
  }
];

export const INITIAL_INVOICES: InvoiceRecord[] = [
  {
    id: 'INV-2026-11-01',
    date: '14 Oct 2026',
    amount: 99.00,
    status: 'paid',
    tierName: 'Club Gold (Monthly)',
    pdfUrl: '#'
  },
  {
    id: 'INV-2026-09-01',
    date: '14 Sep 2026',
    amount: 99.00,
    status: 'paid',
    tierName: 'Club Gold (Monthly)',
    pdfUrl: '#'
  },
  {
    id: 'INV-2026-08-01',
    date: '14 Aug 2026',
    amount: 49.00,
    status: 'paid',
    tierName: 'Club Silver (Monthly)',
    pdfUrl: '#'
  }
];
