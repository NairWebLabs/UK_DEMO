// Subtle synthesized sound effects using standard Web Audio API (no external sound assets needed)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    // Elegant luxury chime chord (E5, B5)
    osc1.frequency.setValueAtTime(659.25, now);
    osc1.frequency.exponentialRampToValueAtTime(880.0, now + 0.12);

    osc2.frequency.setValueAtTime(987.77, now + 0.08);
    osc2.frequency.exponentialRampToValueAtTime(1318.5, now + 0.25);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.05);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  } catch {
    // Graceful fallback if audio is disabled
  }
}

export function playScanBeep() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.setValueAtTime(1800, now + 0.08);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  } catch {
    // Graceful fallback
  }
}

export function playTapClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

    gainNode.gain.setValueAtTime(0.04, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Graceful fallback
  }
}
