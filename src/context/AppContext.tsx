import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  MemberProfile,
  TierLevel,
  Venue,
  ClubEvent,
  FacilityBooking,
  PerkItem,
  PushNotification,
  LeaderboardEntry,
  CheckInRecord,
  InvoiceRecord,
  VenueCity
} from '../types';
import {
  VENUES_DATA,
  MEMBERSHIP_TIERS,
  INITIAL_MEMBER,
  CLUB_EVENTS,
  INITIAL_BOOKINGS,
  PERKS_CATALOG,
  INITIAL_NOTIFICATIONS,
  LEADERBOARD_USERS,
  INITIAL_CHECKINS,
  INITIAL_INVOICES
} from '../data/mockData';
import { playSuccessChime, playScanBeep } from '../utils/audio';

export type AppViewMode = 'mobile' | 'admin' | 'kiosk_scanner';
export type DeviceFrameType = 'iphone' | 'pixel' | 'fullscreen';
export type MobileTab = 'home' | 'pass' | 'bookings' | 'perks' | 'events' | 'account';

interface AppContextType {
  // Navigation & Frame
  appMode: AppViewMode;
  setAppMode: (mode: AppViewMode) => void;
  deviceFrame: DeviceFrameType;
  setDeviceFrame: (frame: DeviceFrameType) => void;
  activeTab: MobileTab;
  setActiveTab: (tab: MobileTab) => void;

  // Member state
  member: MemberProfile;
  setMember: React.Dispatch<React.SetStateAction<MemberProfile>>;
  upgradeTier: (targetTier: TierLevel, interval: 'month' | 'year', paymentData: { cardLast4: string; brand: string }) => boolean;
  cancelSubscription: () => void;
  addPoints: (points: number, reason?: string) => void;

  // Venues state
  venues: Venue[];
  activeVenueId: string;
  setActiveVenueId: (id: string) => void;
  currentVenue: Venue;
  updateVenueOccupancy: (venueId: string, delta: number) => void;

  // Bookings state
  bookings: FacilityBooking[];
  bookFacility: (newBooking: Omit<FacilityBooking, 'id' | 'status' | 'bookedAt' | 'qrCodeToken'>) => FacilityBooking;
  cancelBooking: (bookingId: string) => void;

  // Events state
  events: ClubEvent[];
  toggleRsvp: (eventId: string) => void;

  // Perks state
  perks: PerkItem[];
  claimedPerksHistory: Array<{ perkId: string; perkTitle: string; claimedAt: string; code: string }>;
  claimPerk: (perk: PerkItem) => { success: boolean; message: string; voucherCode?: string };

  // Notifications state
  notifications: PushNotification[];
  unreadNotifsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  sendBroadcastNotification: (title: string, message: string, targetTier?: TierLevel | 'all') => void;

  // Leaderboard & Checkins
  leaderboard: LeaderboardEntry[];
  checkInLogs: CheckInRecord[];
  processCheckIn: (memberIdOrCode: string, venueId: string, method?: 'QR_DYNAMIC_SCAN' | 'NFC_TAP' | 'RECEPTION_MANUAL') => {
    success: boolean;
    member?: MemberProfile;
    message: string;
  };

  // Invoices
  invoices: InvoiceRecord[];

  // Referral
  referralSuccessCount: number;
  simulateReferralShare: () => string;

  // Modals state
  isStripeModalOpen: boolean;
  setIsStripeModalOpen: (open: boolean) => void;
  targetUpgradeTier: TierLevel | null;
  setTargetUpgradeTier: (tier: TierLevel | null) => void;

  isStaffScannerOpen: boolean;
  setIsStaffScannerOpen: (open: boolean) => void;

  selectedPerkForClaim: PerkItem | null;
  setSelectedPerkForClaim: (perk: PerkItem | null) => void;

  // Mobile Platform (iOS vs Android native styling)
  mobilePlatform: 'ios' | 'android';
  setMobilePlatform: (p: 'ios' | 'android') => void;

  // Staff & Venue Operations Mode (in-app manager)
  isStaffMode: boolean;
  setIsStaffMode: (val: boolean) => void;

  // Real-time mobile push banner drop-down
  activeBannerNotif: PushNotification | null;
  dismissBannerNotif: () => void;
  showPushBanner: (title: string, message: string, category?: PushNotification['category']) => void;

  // In-app Install Prompt
  showInstallGuide: boolean;
  setShowInstallGuide: (val: boolean) => void;

  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Frame & view
  const [appMode, setAppMode] = useState<AppViewMode>('mobile');
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrameType>('iphone');
  const [activeTab, setActiveTab] = useState<MobileTab>('home');

  // Core Data
  const [member, setMember] = useState<MemberProfile>(() => {
    const saved = localStorage.getItem('kallos_member_data');
    return saved ? JSON.parse(saved) : INITIAL_MEMBER;
  });

  const [venues, setVenues] = useState<Venue[]>(() => {
    const saved = localStorage.getItem('kallos_venues_data');
    return saved ? JSON.parse(saved) : VENUES_DATA;
  });

  const [activeVenueId, setActiveVenueId] = useState<string>('venue-london');

  const [bookings, setBookings] = useState<FacilityBooking[]>(() => {
    const saved = localStorage.getItem('kallos_bookings_data');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [events, setEvents] = useState<ClubEvent[]>(() => {
    const saved = localStorage.getItem('kallos_events_data');
    return saved ? JSON.parse(saved) : CLUB_EVENTS;
  });

  const [perks] = useState<PerkItem[]>(PERKS_CATALOG);
  const [claimedPerksHistory, setClaimedPerksHistory] = useState<Array<{ perkId: string; perkTitle: string; claimedAt: string; code: string }>>([]);

  const [notifications, setNotifications] = useState<PushNotification[]>(() => {
    const saved = localStorage.getItem('kallos_notifs_data');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(LEADERBOARD_USERS);
  const [checkInLogs, setCheckInLogs] = useState<CheckInRecord[]>(INITIAL_CHECKINS);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(INITIAL_INVOICES);
  const [referralSuccessCount, setReferralSuccessCount] = useState<number>(4);

  // Mobile Platform (iOS vs Android)
  const [mobilePlatform, setMobilePlatform] = useState<'ios' | 'android'>('ios');
  const [isStaffMode, setIsStaffMode] = useState<boolean>(false);
  const [activeBannerNotif, setActiveBannerNotif] = useState<PushNotification | null>(null);
  const [showInstallGuide, setShowInstallGuide] = useState<boolean>(false);

  // Modals
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const [targetUpgradeTier, setTargetUpgradeTier] = useState<TierLevel | null>(null);
  const [isStaffScannerOpen, setIsStaffScannerOpen] = useState(false);
  const [selectedPerkForClaim, setSelectedPerkForClaim] = useState<PerkItem | null>(null);

  const showPushBanner = (title: string, message: string, category: PushNotification['category'] = 'perk') => {
    const bannerNotif: PushNotification = {
      id: `banner-${Date.now()}`,
      title,
      message,
      category,
      timestamp: 'Just now',
      read: false
    };
    setActiveBannerNotif(bannerNotif);
    playScanBeep();

    setTimeout(() => {
      setActiveBannerNotif(null);
    }, 4500);
  };

  const dismissBannerNotif = () => {
    setActiveBannerNotif(null);
  };

  // Save changes to localStorage for continuous demo persistence
  useEffect(() => {
    localStorage.setItem('kallos_member_data', JSON.stringify(member));
  }, [member]);

  useEffect(() => {
    localStorage.setItem('kallos_bookings_data', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('kallos_events_data', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('kallos_notifs_data', JSON.stringify(notifications));
  }, [notifications]);

  const currentVenue = venues.find(v => v.id === activeVenueId) || venues[0];
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  // Points addition
  const addPoints = (points: number, reason?: string) => {
    setMember(prev => ({
      ...prev,
      pointsBalance: prev.pointsBalance + points,
      lifetimePoints: prev.lifetimePoints + points
    }));

    if (reason) {
      const newNotif: PushNotification = {
        id: `notif-${Date.now()}`,
        title: `+${points} Points Earned`,
        message: reason,
        category: 'perk',
        timestamp: 'Just now',
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
      showPushBanner(`+${points} Points Earned`, reason, 'perk');
    }
  };

  // Tier Upgrade with Stripe simulation
  const upgradeTier = (
    targetTier: TierLevel,
    interval: 'month' | 'year',
    paymentData: { cardLast4: string; brand: string }
  ) => {
    const tierConfig = MEMBERSHIP_TIERS.find(t => t.id === targetTier);
    if (!tierConfig) return false;

    const price = interval === 'year' ? tierConfig.priceAnnual : tierConfig.priceMonthly;

    setMember(prev => ({
      ...prev,
      tier: targetTier,
      billingInterval: interval,
      status: 'active',
      renewalDate: interval === 'year' ? '14 Dec 2027' : '14 Jan 2027',
      paymentMethod: {
        brand: paymentData.brand || 'Visa',
        last4: paymentData.cardLast4 || '4242',
        expMonth: 12,
        expYear: 29
      }
    }));

    // Generate new invoice
    const newInvoice: InvoiceRecord = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      date: 'Today',
      amount: price,
      status: 'paid',
      tierName: `${tierConfig.name} (${interval === 'year' ? 'Annual' : 'Monthly'})`,
      pdfUrl: '#'
    };
    setInvoices(prev => [newInvoice, ...prev]);

    // Send push notification
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: `Welcome to ${tierConfig.name}!`,
      message: `Your membership has been upgraded. All ${tierConfig.name} digital perks & priority bookings are now active.`,
      category: 'tier',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    showPushBanner(`Welcome to ${tierConfig.name}!`, `Membership activated via Stripe (${interval === 'year' ? 'Annual' : 'Monthly'})`, 'tier');

    playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    return true;
  };

  const cancelSubscription = () => {
    setMember(prev => ({
      ...prev,
      tier: 'free',
      status: 'active'
    }));

    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: 'Membership Updated',
      message: 'Your subscription will revert to Community Pass at the end of the billing period.',
      category: 'tier',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Book facility
  const bookFacility = (newBooking: Omit<FacilityBooking, 'id' | 'status' | 'bookedAt' | 'qrCodeToken'>) => {
    const createdBooking: FacilityBooking = {
      ...newBooking,
      id: `bk-${Date.now().toString().slice(-4)}`,
      status: 'confirmed',
      bookedAt: 'Just now',
      qrCodeToken: `KAL-BK-${Date.now().toString().slice(-6)}`
    };

    setBookings(prev => [createdBooking, ...prev]);

    // Points earned on booking
    if (newBooking.pointsEarned > 0) {
      addPoints(newBooking.pointsEarned, `Earned for booking ${newBooking.facilityType}`);
    }

    // Add push confirmation
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: `${newBooking.facilityType} Reserved!`,
      message: `Confirmed for ${newBooking.date} at ${newBooking.timeSlot} (${newBooking.venueName}). Access code in your pass wallet.`,
      category: 'booking',
      timestamp: 'Just now',
      read: false,
      actionUrl: '/bookings'
    };
    setNotifications(prev => [newNotif, ...prev]);

    playSuccessChime();
    return createdBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  // RSVP Event
  const toggleRsvp = (eventId: string) => {
    setEvents(prev =>
      prev.map(evt => {
        if (evt.id === eventId) {
          const newRsvpd = !evt.isRsvpd;
          const countChange = newRsvpd ? 1 : -1;

          if (newRsvpd) {
            playSuccessChime();
            confetti({
              particleCount: 40,
              spread: 50,
              origin: { y: 0.7 }
            });

            // Notification
            const newNotif: PushNotification = {
              id: `notif-${Date.now()}`,
              title: `RSVP Confirmed: ${evt.title}`,
              message: `You're on the guestlist for ${evt.date} at ${evt.time} at ${evt.venueName}.`,
              category: 'event',
              timestamp: 'Just now',
              read: false,
              actionUrl: '/events'
            };
            setNotifications(n => [newNotif, ...n]);
          }

          return {
            ...evt,
            isRsvpd: newRsvpd,
            attendeesCount: Math.max(0, evt.attendeesCount + countChange)
          };
        }
        return evt;
      })
    );
  };

  // Claim Perk
  const claimPerk = (perk: PerkItem) => {
    if (member.pointsBalance < perk.pointsCost) {
      return { success: false, message: 'Insufficient points balance.' };
    }

    const voucherCode = `PERK-${perk.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    setMember(prev => ({
      ...prev,
      pointsBalance: prev.pointsBalance - perk.pointsCost
    }));

    setClaimedPerksHistory(prev => [
      {
        perkId: perk.id,
        perkTitle: perk.title,
        claimedAt: 'Just now',
        code: voucherCode
      },
      ...prev
    ]);

    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: `Perk Voucher Unlocked: ${perk.title}`,
      message: `Voucher ${voucherCode} is ready. Present your digital QR pass at reception or bar to redeem.`,
      category: 'perk',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(n => [newNotif, ...n]);

    playSuccessChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 }
    });

    return { success: true, message: 'Perk unlocked successfully!', voucherCode };
  };

  // Referrals
  const simulateReferralShare = () => {
    const newCount = referralSuccessCount + 1;
    setReferralSuccessCount(newCount);
    addPoints(500, 'Friend joined using your referral invite link!');
    playSuccessChime();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
    return `https://kallosclub.co.uk/join?ref=${member.referralCode}`;
  };

  // Notification management
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const sendBroadcastNotification = (title: string, message: string, targetTier: TierLevel | 'all' = 'all') => {
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title,
      message: `${message} ${targetTier !== 'all' ? `(Target: ${targetTier.toUpperCase()} tier)` : ''}`,
      category: 'venue',
      timestamp: 'Just now',
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
    showPushBanner(title, message, 'venue');
    playScanBeep();
  };

  // Venue Occupancy
  const updateVenueOccupancy = (venueId: string, delta: number) => {
    setVenues(prev =>
      prev.map(v => {
        if (v.id === venueId) {
          const newHeadcount = Math.max(5, Math.min(v.maxHeadcount, v.headcount + delta));
          const newCapacity = Math.round((newHeadcount / v.maxHeadcount) * 100);
          return {
            ...v,
            headcount: newHeadcount,
            currentCapacity: newCapacity
          };
        }
        return v;
      })
    );
  };

  // Staff Check-in Scanner Simulation
  const processCheckIn = (
    memberIdOrCode: string,
    venueId: string,
    method: 'QR_DYNAMIC_SCAN' | 'NFC_TAP' | 'RECEPTION_MANUAL' = 'QR_DYNAMIC_SCAN'
  ) => {
    playScanBeep();
    const targetVenue = venues.find(v => v.id === venueId) || currentVenue;

    // Check if matches current user
    const isCurrentMember =
      memberIdOrCode.toUpperCase().includes(member.memberNumber) ||
      memberIdOrCode.toUpperCase().includes('KAL-8829') ||
      memberIdOrCode.toUpperCase().includes('HASTINGS') ||
      memberIdOrCode.toUpperCase().includes('TOKEN');

    const checkedMember = isCurrentMember
      ? member
      : {
          ...member,
          memberNumber: memberIdOrCode,
          firstName: 'Guest',
          lastName: 'Member',
          tier: 'silver' as TierLevel
        };

    // Calculate benefits granted based on tier
    const benefits: string[] = [];
    if (checkedMember.tier === 'black') {
      benefits.push('VIP 24/7 Access', 'Complimentary Valet & Locker', 'Guest Pass (3 allowed)');
    } else if (checkedMember.tier === 'gold') {
      benefits.push('Peak Venue Access', '20% Dining Benefit', 'Towel & Locker Access');
    } else if (checkedMember.tier === 'silver') {
      benefits.push('Standard Access', '10% Dining Benefit');
    } else {
      benefits.push('Café & Public Terrace Access');
    }

    const newCheckIn: CheckInRecord = {
      id: `chk-${Date.now().toString().slice(-4)}`,
      memberId: checkedMember.id,
      memberName: `${checkedMember.firstName} ${checkedMember.lastName}`,
      memberTier: checkedMember.tier,
      venueId: targetVenue.id,
      venueName: targetVenue.name,
      timestamp: 'Just now',
      method,
      benefitsRedeemed: benefits,
      status: 'GRANTED'
    };

    setCheckInLogs(prev => [newCheckIn, ...prev]);

    // Update venue occupancy +1
    updateVenueOccupancy(targetVenue.id, 1);

    // If it was the logged in user, award +50 check-in points!
    if (isCurrentMember) {
      addPoints(50, `Venue check-in at ${targetVenue.name}`);
      playSuccessChime();
    }

    return {
      success: true,
      member: checkedMember,
      message: `Access granted: ${checkedMember.firstName} ${checkedMember.lastName} (${checkedMember.tier.toUpperCase()})`
    };
  };

  const resetAllData = () => {
    localStorage.clear();
    setMember(INITIAL_MEMBER);
    setVenues(VENUES_DATA);
    setBookings(INITIAL_BOOKINGS);
    setEvents(CLUB_EVENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setLeaderboard(LEADERBOARD_USERS);
    setCheckInLogs(INITIAL_CHECKINS);
    setInvoices(INITIAL_INVOICES);
    setReferralSuccessCount(4);
    playScanBeep();
  };

  return (
    <AppContext.Provider
      value={{
        appMode,
        setAppMode,
        deviceFrame,
        setDeviceFrame,
        activeTab,
        setActiveTab,
        member,
        setMember,
        upgradeTier,
        cancelSubscription,
        addPoints,
        venues,
        activeVenueId,
        setActiveVenueId,
        currentVenue,
        updateVenueOccupancy,
        bookings,
        bookFacility,
        cancelBooking,
        events,
        toggleRsvp,
        perks,
        claimedPerksHistory,
        claimPerk,
        notifications,
        unreadNotifsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        sendBroadcastNotification,
        leaderboard,
        checkInLogs,
        processCheckIn,
        invoices,
        referralSuccessCount,
        simulateReferralShare,
        isStripeModalOpen,
        setIsStripeModalOpen,
        targetUpgradeTier,
        setTargetUpgradeTier,
        isStaffScannerOpen,
        setIsStaffScannerOpen,
        selectedPerkForClaim,
        setSelectedPerkForClaim,
        mobilePlatform,
        setMobilePlatform,
        isStaffMode,
        setIsStaffMode,
        activeBannerNotif,
        dismissBannerNotif,
        showPushBanner,
        showInstallGuide,
        setShowInstallGuide,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
