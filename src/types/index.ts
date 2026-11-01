export type TierLevel = 'free' | 'silver' | 'gold' | 'black';

export type VenueCity = 'London' | 'Manchester' | 'Bristol' | 'Edinburgh';

export interface Venue {
  id: string;
  name: string;
  city: VenueCity;
  area: string;
  address: string;
  postcode: string;
  phone: string;
  image: string;
  currentCapacity: number; // percentage 0-100
  headcount: number;
  maxHeadcount: number;
  facilities: string[];
  openingHours: string;
  beaconStatus: 'Active' | 'Connecting' | 'Offline';
  featuredTag?: string;
}

export interface MembershipTier {
  id: TierLevel;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  currency: string;
  badge: string;
  tagline: string;
  popular?: boolean;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    gradient: string;
    badgeBg: string;
  };
  features: string[];
  pointsMultiplier: number;
  guestPassesPerMonth: number;
  bookingWindowDays: number;
  diningDiscountPct: number;
}

export interface MemberProfile {
  id: string;
  memberNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  tier: TierLevel;
  joinDate: string;
  renewalDate: string;
  billingInterval: 'month' | 'year';
  status: 'active' | 'paused' | 'past_due';
  pointsBalance: number;
  lifetimePoints: number;
  referralCode: string;
  referralsCount: number;
  referralEarnings: number;
  homeVenueId: string;
  paymentMethod: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
}

export interface PerkItem {
  id: string;
  title: string;
  venueName?: string;
  category: 'Dining' | 'Wellness' | 'Sports' | 'Experiences';
  pointsCost: number;
  requiredTier: TierLevel;
  valueString: string;
  description: string;
  iconName: string;
  image: string;
  expiresInDays: number;
  isPopular?: boolean;
}

export interface ClubEvent {
  id: string;
  title: string;
  venueId: string;
  venueName: string;
  city: VenueCity;
  category: 'Wellness' | 'Social' | 'Masterclass' | 'Tournaments' | 'Dining';
  date: string;
  time: string;
  duration: string;
  description: string;
  host: string;
  hostTitle: string;
  image: string;
  price: number; // 0 = free
  requiredTier: TierLevel;
  capacity: number;
  attendeesCount: number;
  isRsvpd?: boolean;
  tags: string[];
}

export interface FacilityBooking {
  id: string;
  venueId: string;
  venueName: string;
  facilityType: 'Padel Court' | 'Thermal Hydro Spa' | 'Trackman Golf Simulator' | 'Boutique Pilates Reformer' | 'Private Boardroom' | 'Recovery Cryo Chamber';
  date: string;
  timeSlot: string;
  durationMinutes: number;
  courtNumber?: string;
  pricePaid: number;
  pointsEarned: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  bookedAt: string;
  qrCodeToken: string;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  category: 'perk' | 'event' | 'booking' | 'tier' | 'venue';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  venueId?: string;
}

export interface LeaderboardEntry {
  rank: number;
  memberId: string;
  name: string;
  avatar: string;
  tier: TierLevel;
  homeCity: VenueCity;
  pointsEarnedThisMonth: number;
  visitsCount: number;
}

export interface CheckInRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberTier: TierLevel;
  venueId: string;
  venueName: string;
  timestamp: string;
  method: 'QR_DYNAMIC_SCAN' | 'NFC_TAP' | 'RECEPTION_MANUAL';
  benefitsRedeemed?: string[];
  status: 'GRANTED' | 'RESTRICTED' | 'WARNING';
}

export interface InvoiceRecord {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending';
  tierName: string;
  pdfUrl: string;
}
