import React, { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { MobileApp } from './components/mobile/MobileApp';
import { StripeModal } from './components/modals/StripeModal';
import { StaffScannerModal } from './components/admin/StaffScannerModal';
import { InstallPromptSheet } from './components/mobile/InstallPromptSheet';
import { initNativeDevice } from './utils/nativeMobile';

export default function App() {
  useEffect(() => {
    initNativeDevice();
  }, []);

  return (
    <AppProvider>
      <div className="min-h-screen w-full bg-black text-neutral-100 flex flex-col justify-center items-center overflow-hidden">
        {/* The Native App Experience */}
        <MobileApp />

        {/* Global Interactive Native Sheets & Modals */}
        <StripeModal />
        <StaffScannerModal />
        <InstallPromptSheet />
      </div>
    </AppProvider>
  );
}
