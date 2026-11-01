import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  Share2,
  PlusSquare,
  Smartphone,
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { playTapClick } from '../../utils/audio';

export const InstallPromptSheet: React.FC = () => {
  const { showInstallGuide, setShowInstallGuide, mobilePlatform } = useApp();
  const [installedSimulation, setInstalledSimulation] = useState(false);

  if (!showInstallGuide) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-in fade-in">
      <div className="bg-neutral-900 border border-neutral-700 rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center text-neutral-950 font-bold shadow-lg shadow-amber-500/20">
              <span className="font-brand text-xl">K</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-100">Install Kallos Club App</h3>
              <p className="text-[11px] text-neutral-400">
                {mobilePlatform === 'ios' ? 'iOS Home Screen App (Safari)' : 'Android APK Install (Chrome)'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowInstallGuide(false)}
            className="p-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {installedSimulation ? (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-xs text-emerald-200">Installed Successfully!</h4>
            <p className="text-[11px] text-emerald-300/80">
              Kallos Club icon is now active on your {mobilePlatform === 'ios' ? 'iOS' : 'Android'} home screen with full offline access.
            </p>
            <button
              onClick={() => {
                setShowInstallGuide(false);
                setInstalledSimulation(false);
              }}
              className="mt-2 w-full py-2 bg-emerald-500 text-neutral-950 font-bold text-xs rounded-xl"
            >
              Done
            </button>
          </div>
        ) : mobilePlatform === 'ios' ? (
          <div className="space-y-3 text-xs">
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Install Kallos Club directly on your iPhone or iPad for instant turnstile passes, lock screen widgets, and offline access:
            </p>

            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-neutral-200">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 font-bold text-[10px] flex items-center justify-center">1</span>
                <span>Tap the <strong className="text-amber-400">Share button</strong> (⎋) in Safari toolbar</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 font-bold text-[10px] flex items-center justify-center">2</span>
                <span>Scroll down and select <strong className="text-amber-400">Add to Home Screen</strong></span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 font-bold text-[10px] flex items-center justify-center">3</span>
                <span>Tap <strong className="text-amber-400">Add</strong> in the top right corner</span>
              </div>
            </div>

            <button
              onClick={() => {
                playTapClick();
                setInstalledSimulation(true);
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Simulate iOS Installation</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Install the progressive Android application to receive live push notifications, NFC venue beacon integration, and dynamic wallet passes:
            </p>

            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-neutral-200">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 font-bold text-[10px] flex items-center justify-center">1</span>
                <span>Tap <strong className="text-amber-400">Install App</strong> below to add WebAPK</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 font-bold text-[10px] flex items-center justify-center">2</span>
                <span>Launch directly from your Android App Drawer</span>
              </div>
            </div>

            <button
              onClick={() => {
                playTapClick();
                setInstalledSimulation(true);
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Install on Android Device</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
