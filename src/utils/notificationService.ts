/**
 * Sound & Notification Service for FadeInbox
 * Provides Web Audio API synthesized chime sound, tab title flashing, and Web Push notifications.
 */

const SOUND_PREF_KEY = 'fadeinbox_sound_enabled';

let titleInterval: ReturnType<typeof setInterval> | null = null;
let originalTitle = typeof document !== 'undefined' ? document.title : 'FadeInbox';

/**
 * Check if sound notifications are enabled (defaults to true)
 */
export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const val = localStorage.getItem(SOUND_PREF_KEY);
  return val === null ? true : val === 'true';
}

/**
 * Set sound preference
 */
export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SOUND_PREF_KEY, enabled ? 'true' : 'false');
}

/**
 * Play a gentle, high-tech two-tone chime via Web Audio API (Zero external MP3 dependencies)
 */
export function playNotificationChime(): void {
  if (!isSoundEnabled() || typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Tone 1: 587.33 Hz (D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.03);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.36);

    // Tone 2: 880 Hz (A5) Harmonic Sparkle
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.12);
    gain2.gain.setValueAtTime(0, now + 0.12);
    gain2.gain.linearRampToValueAtTime(0.22, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.56);
  } catch (err) {
    console.debug('Web Audio Chime notification silenced:', err);
  }
}

/**
 * Start tab title flashing when a new email arrives in the background
 */
export function startTitleFlashing(count: number = 1, isRtl: boolean = true): void {
  if (typeof document === 'undefined') return;
  if (document.hasFocus()) return; // User is already viewing the page

  if (titleInterval) {
    clearInterval(titleInterval);
  }

  originalTitle = document.title;
  const alertText = isRtl
    ? `(${count}) ✉️ رسالة جديدة وصلت!`
    : `(${count}) ✉️ New Message Received!`;

  let isAlert = true;
  document.title = alertText;

  titleInterval = setInterval(() => {
    if (document.hasFocus()) {
      stopTitleFlashing();
      return;
    }
    document.title = isAlert ? originalTitle : alertText;
    isAlert = !isAlert;
  }, 1200);

  // Stop flashing when window gets focused
  const onFocus = () => {
    stopTitleFlashing();
    window.removeEventListener('focus', onFocus);
  };
  window.addEventListener('focus', onFocus);
}

/**
 * Stop title flashing and restore original title
 */
export function stopTitleFlashing(): void {
  if (titleInterval) {
    clearInterval(titleInterval);
    titleInterval = null;
  }
  if (typeof document !== 'undefined') {
    document.title = 'FadeInbox - البريد المؤقت الذكي | Disposable Temp Mail';
  }
}

/**
 * Check if Web Notification API is supported in current browser
 */
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Get current browser notification permission
 */
export function getNotificationPermission(): NotificationPermission {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
}

/**
 * Request browser notification permission explicitly
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return 'denied';
  try {
    return await Notification.requestPermission();
  } catch (err) {
    console.error('Failed to request notification permission:', err);
    return 'denied';
  }
}

/**
 * Send Web Desktop Notification with smart OTP preview if permitted
 */
export async function sendDesktopNotification(
  senderName: string,
  subject: string,
  otpCode?: string | null
): Promise<void> {
  if (!isNotificationSupported() || Notification.permission !== 'granted') return;

  try {
    const title = otpCode
      ? `FadeInbox: 🔑 رمز التحقق ${otpCode}`
      : `FadeInbox: ✉️ رسالة من ${senderName}`;

    const body = otpCode
      ? `رمز التأكيد: ${otpCode}\nالموضوع: ${subject || 'رسالة تفعيل جديدة'}`
      : (subject || 'وصلت رسالة جديدة إلى بريدك المؤقت');

    const notification = new Notification(title, {
      body,
      icon: '/favicon.png',
      badge: '/favicon.png',
      tag: otpCode ? `fadeinbox-otp-${otpCode}` : `fadeinbox-msg-${Date.now()}`,
      requireInteraction: !!otpCode, // Keeps OTP notification visible until dismissed
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (err) {
    console.debug('Desktop notification error:', err);
  }
}
