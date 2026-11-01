# Kallos Club — UK Leisure Membership & Community App (iOS & Android)

A cross-platform mobile membership and community application built for a UK leisure brand operating across 4 flagship venues (**London Soho & Mayfair**, **Manchester Northern Quarter**, **Bristol Harbourside**, and **Edinburgh New Town**).

---

## 📱 Key Features Included

- **Free & Paid Membership Tiers**: Community Pass (£0), Club Silver (£49/mo), Club Gold (£99/mo), and Founders Black Tier (£185/mo VIP).
- **Stripe Mobile Checkout**: One-click **Apple Pay** (iOS) and **Google Pay** (Android), with manual credit card input and invoice generation.
- **Dynamic Anti-Fraud Digital Pass**: Rotating cryptographic token updating every 30s with countdown ring, laser scanline, 3D card flip, and Apple/Google Wallet export.
- **Multi-Facility Booking Engine**: Reserve rooftop padel courts, thermal spa & cold plunges, golf simulators, and reformer pilates across all 4 venues.
- **Loyalty Wallet, Perks Store & Referrals**: Earn points on visits and bookings, redeem instant perk vouchers, share invite codes (+500 pts), and view monthly leaderboards.
- **Events Calendar & Real-Time Push Banners**: RSVP to exclusive masterclasses with native drop-down alert banners from the iOS Dynamic Island / Android shade.
- **In-App Staff Operations Terminal (`Staff Mode`)**: Front-desk turnstile optical QR scanner, live 4-venue headcount telemetry (+/- 5 traffic adjustments), and member CRM.
- **Dual Platform Engine**: Live toggle between ** iOS (Cupertino)** and **🤖 Android (Material 3)**.

---

## 🛠️ Tech Stack & Requirements

- **Runtime**: Node.js **18.x** or **20.x** (or higher)
- **Package Manager**: `npm` (v9+), `pnpm`, or `yarn`
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Bundler**: Vite 8
- **Audio & Animations**: Web Audio API (zero external assets), Motion, Canvas Confetti

---

## 🚀 Setup & Installation (Step-by-Step)

### Step 1: Clone the Repository
Clone the project to your local machine:

```bash
git clone https://github.com/your-username/kallos-club-app.git
cd kallos-club-app
```

---

### Step 2: Install Dependencies
Run `npm install` to install all packages:

```bash
npm install
```

*(If you prefer `pnpm` or `yarn`, run `pnpm install` or `yarn install`)*

---

### Step 3: Configure Environment Variables (Optional)
Check the `.env.example` file:

```bash
cp .env.example .env
```

The app includes built-in mock services for Stripe, Apple Pay, Google Pay, QR scanning, and push notifications, so it runs out-of-the-box without requiring third-party API keys for local development.

---

### Step 4: Start the Local Development Server
Run the dev server:

```bash
npm run dev
```

The application will launch at:
```
http://localhost:3000
```
Open this URL in Google Chrome, Safari, or your preferred browser.

---

### Step 5: Build for Production
To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📲 How to Test on Real Mobile Devices (iOS & Android)

### Option A: Local Network Preview on Your Phone
1. Ensure your computer and phone are connected to the same Wi-Fi network.
2. Find your computer's local IP address (e.g., `192.168.1.50`).
3. Run the dev server with host exposure:
   ```bash
   npm run dev -- --host
   ```
4. Open `http://<your-computer-ip>:3000` on your iPhone (Safari) or Android (Chrome).

---

### Option B: Install as a Native PWA (No App Store required)
- **On iPhone / iPad (Safari)**:
  1. Open the app URL in Safari.
  2. Tap the **Share** button (`⎋`) at the bottom of the screen.
  3. Scroll down and tap **Add to Home Screen** (`⊞`).
  4. Tap **Add**. The app will appear on your home screen with its custom icon and run full-screen without Safari browser bars.

- **On Android (Google Chrome)**:
  1. Open the app URL in Chrome.
  2. Tap the in-app **Install** button (download icon in the top bar) or Chrome's menu (`⋮`) -> **Install App** / **Add to Home screen**.
  3. The app installs as a native WebAPK in your Android app drawer.

---

## 📦 Packaging for iOS App Store & Google Play Store (Capacitor)

If you wish to distribute this project as a native binary (`.ipa` for iOS / `.aab` for Android):

1. **Install Capacitor CLI and Core**:
   ```bash
   npm install @capacitor/core @capacitor/cli
   npm install @capacitor/ios @capacitor/android
   ```

2. **Initialize Capacitor**:
   ```bash
   npx cap init "Kallos Club" "com.kallosclub.app" --web-dir "dist"
   ```

3. **Build the Web Bundle**:
   ```bash
   npm run build
   ```

4. **Add Native iOS and Android Projects**:
   ```bash
   npx cap add ios
   npx cap add android
   ```

5. **Open in Xcode (for iOS)**:
   ```bash
   npx cap open ios
   ```
   *(Requires macOS with Xcode installed)*

6. **Open in Android Studio (for Android)**:
   ```bash
   npx cap open android
   ```
   *(Requires Android Studio installed)*

---

## 🗂️ Project Directory Structure

```
├── public/
│   ├── manifest.json         # Web App Manifest for mobile standalone mode
├── src/
│   ├── components/
│   │   ├── admin/            # Reception staff scanner kiosk
│   │   ├── common/           # Brand navigation and global headers
│   │   ├── device/           # Cross-platform device frame wrappers
│   │   ├── mobile/           # 100% Mobile app screens & navigation
│   │   │   ├── HomeTab.tsx           # Home overview, 4-venue radar, pass trigger
│   │   │   ├── PassTab.tsx           # Dynamic rotating anti-fraud QR pass
│   │   │   ├── BookingsTab.tsx       # Padel, spa, golf simulator booking engine
│   │   │   ├── PerksTab.tsx          # Perks store, referrals, leaderboard
│   │   │   ├── EventsTab.tsx         # Events calendar & RSVP tickets
│   │   │   ├── AccountTab.tsx        # Stripe subscriptions & invoices
│   │   │   ├── MobileTopBar.tsx      # iOS/Android platform switcher
│   │   │   ├── MobileStaffTerminal.tsx# Floor staff turnstile operations
│   │   │   ├── NativePushBanner.tsx  # Dynamic Island / Heads-up alert drop-downs
│   │   │   └── InstallPromptSheet.tsx# In-app install guide
│   │   └── modals/
│   │       └── StripeModal.tsx       # Apple Pay, Google Pay & Card checkout
│   ├── context/
│   │   └── AppContext.tsx    # State management (venues, member, bookings, perks)
│   ├── data/
│   │   └── mockData.ts       # Mock dataset for 4 UK leisure venues
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── utils/
│   │   ├── audio.ts          # Synthesized Web Audio API sound effects
│   │   └── qrGenerator.tsx   # Anti-fraud dynamic rotating QR SVG generator
│   ├── App.tsx               # Root mobile application container
│   ├── index.css             # Tailwind CSS v4 directives
│   └── main.tsx              # React DOM entry point
├── package.json              # Project dependencies and npm scripts
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

---

## 🧪 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local development server on port 3000 |
| `npm run build` | Compiles and builds production assets to `dist/` |
| `npm run preview` | Runs a local server to preview production build |
| `npm run lint` | Runs TypeScript compiler (`tsc --noEmit`) to verify types |

---

## 💡 Tips & Demo Controls

- **Switch iOS ⇄ Android**: Use the toggle pill at the top of the app (`[  iOS ]` / `[ 🤖 Android ]`) to preview native conventions on each platform.
- **Reception Scanner**: Tap **Staff Mode** in the top bar to simulate scanning member dynamic passes at turnstiles.
- **Reset Demo Data**: Tap the refresh icon or clear browser storage to reset member points, bookings, and check-in logs to default.
