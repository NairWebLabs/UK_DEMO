import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App as CapApp } from '@capacitor/app';

/**
 * Checks if running inside native iOS or Android app wrapper
 */
export const isNativeMobile = (): boolean => {
  return Capacitor.isNativePlatform();
};

export const getNativePlatform = (): 'ios' | 'android' | 'web' => {
  return Capacitor.getPlatform() as 'ios' | 'android' | 'web';
};

/**
 * Initialize native device hardware features (Status bar, hardware back button)
 */
export const initNativeDevice = (onHardwareBack?: () => void) => {
  if (!isNativeMobile()) return;

  try {
    // Style status bar for OLED dark luxury theme
    StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
    StatusBar.setBackgroundColor({ color: '#0a0a0a' }).catch(() => {});

    // Listen to Android native hardware back button
    if (Capacitor.getPlatform() === 'android' && onHardwareBack) {
      CapApp.addListener('backButton', () => {
        onHardwareBack();
      });
    }
  } catch {
    // Graceful fallback
  }
};

/**
 * Native Haptic Feedback triggers
 */
export const triggerHapticTap = async () => {
  try {
    if (Capacitor.isPluginAvailable('Haptics')) {
      await Haptics.impact({ style: ImpactStyle.Light });
    }
  } catch {
    // fallback
  }
};

export const triggerHapticSuccess = async () => {
  try {
    if (Capacitor.isPluginAvailable('Haptics')) {
      await Haptics.notification({ type: NotificationType.Success });
    }
  } catch {
    // fallback
  }
};

export const triggerHapticScan = async () => {
  try {
    if (Capacitor.isPluginAvailable('Haptics')) {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    }
  } catch {
    // fallback
  }
};
