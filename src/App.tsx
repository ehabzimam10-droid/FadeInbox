import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import {
  MailDomain,
  MailMessageSummary,
  MailMessageDetail,
  SavedEmailHistory,
  ActiveEmailAccount,
} from './types';
import {
  getDomains,
  createAccount,
  getToken,
  getMessages,
  getMessage,
  deleteMessage,
  generateRandomUsername,
  generateRandomPassword,
} from './services/mailApi';
import { saveEmailToHistory, saveMessagePermanently } from './services/storageService';
import { playNotificationChime, startTitleFlashing, sendDesktopNotification } from './utils/notificationService';
import { extractOtpCode } from './utils/otpExtractor';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Inbox from './components/Inbox';
import HistoryDashboard from './components/HistoryDashboard';
import QrCodeModal from './components/QrCodeModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import AuroraBackground from './components/AuroraBackground';
import AdSenseUnit from './components/AdSenseUnit';
import FeaturesGuide from './components/FeaturesGuide';
import ArticlesSection from './components/ArticlesSection';
import { Analytics } from '@vercel/analytics/react';

const LOCAL_ACTIVE_ACCOUNTS_KEY = 'fadeinbox_active_accounts_v2';
const LOCAL_SELECTED_ADDR_KEY = 'fadeinbox_selected_address_v2';
const FIRST_VISIT_KEY = 'fadeinbox_first_visit_created_v1';

export default function App() {
  // Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('fadeinbox_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Auth & User State
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'inbox' | 'vault'>('inbox');

  // Mail API State
  const [domains, setDomains] = useState<MailDomain[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [activeAccounts, setActiveAccounts] = useState<ActiveEmailAccount[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const [messages, setMessages] = useState<MailMessageSummary[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MailMessageDetail | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);

  // Translation Hook
  const { i18n } = useTranslation();

  // Modal State
  const [showQrModal, setShowQrModal] = useState(false);

  // Track previous message IDs for live audio/push alerts
  const prevMessageIdsRef = useRef<Set<string>>(new Set());

  // Get currently selected active account object
  const currentAccount = activeAccounts.find((a) => a.address === selectedAddress) || activeAccounts[0] || null;

  // Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Sync Theme attribute
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDark) {
      root.classList.add('dark');
      body.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
      localStorage.setItem('fadeinbox_theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
      localStorage.setItem('fadeinbox_theme', 'light');
    }
  }, [isDark]);

  // Persist Active Accounts & Selected Address
  useEffect(() => {
    if (activeAccounts.length > 0) {
      localStorage.setItem(LOCAL_ACTIVE_ACCOUNTS_KEY, JSON.stringify(activeAccounts));
    } else {
      localStorage.removeItem(LOCAL_ACTIVE_ACCOUNTS_KEY);
    }
  }, [activeAccounts]);

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem(LOCAL_SELECTED_ADDR_KEY, selectedAddress);
    }
  }, [selectedAddress]);

  // Initial Mail Engine Initialization
  useEffect(() => {
    initMailEngine();
  }, []);

  const initMailEngine = async () => {
    try {
      const fetchedDomains = await getDomains();
      setDomains(fetchedDomains);
      const defaultDomain = fetchedDomains[0]?.domain || '';
      setSelectedDomain(defaultDomain);

      // Check for saved local active accounts
      const savedAccountsRaw = localStorage.getItem(LOCAL_ACTIVE_ACCOUNTS_KEY);
      const savedSelectedAddr = localStorage.getItem(LOCAL_SELECTED_ADDR_KEY);

      if (savedAccountsRaw) {
        try {
          const parsedAccounts: ActiveEmailAccount[] = JSON.parse(savedAccountsRaw);
          // Filter out accounts that already expired
          const validAccounts = parsedAccounts.filter((a) => a.expiresAt > Date.now());

          if (validAccounts.length > 0) {
            setActiveAccounts(validAccounts);
            const targetAddr = savedSelectedAddr && validAccounts.some((a) => a.address === savedSelectedAddr)
              ? savedSelectedAddr
              : validAccounts[0].address;

            setSelectedAddress(targetAddr);
            const activeAcc = validAccounts.find((a) => a.address === targetAddr) || validAccounts[0];
            fetchInboxMessages(activeAcc.accountToken);
            // Mark first visit as done so returning users are not treated as first-time visitors
            localStorage.setItem(FIRST_VISIT_KEY, 'true');
            return;
          }
        } catch (e) {
          console.error('Error parsing active accounts:', e);
        }
      }

      // If no valid active accounts exist (first visit OR previous accounts expired):
      // Automatically generate a random 30-minute temporary email (Zero-click experience)
      localStorage.setItem(FIRST_VISIT_KEY, 'true');
      await createNewAccount(undefined, undefined, 1800);
    } catch (err) {
      console.error('Mail engine initialization error:', err);
    }
  };

  // Auto Refresh Inbox every 10 seconds for currently selected active account
  useEffect(() => {
    if (!currentAccount?.accountToken) return;

    const interval = setInterval(() => {
      fetchInboxMessages(currentAccount.accountToken, true);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentAccount?.accountToken]);

  // Expiration Check & Expiry Handler Timer (Runs every 1 second)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const expiredList = activeAccounts.filter((a) => a.expiresAt <= now);

      if (expiredList.length > 0) {
        // Save expired addresses into History
        expiredList.forEach((expiredAcc) => {
          saveEmailToHistory(user ? user.uid : null, expiredAcc.address, expiredAcc.accountToken);
        });

        const remainingAccounts = activeAccounts.filter((a) => a.expiresAt > now);
        setActiveAccounts(remainingAccounts);

        // If currently selected address expired, switch or clear
        if (selectedAddress && expiredList.some((e) => e.address === selectedAddress)) {
          if (remainingAccounts.length > 0) {
            const nextAddr = remainingAccounts[0].address;
            setSelectedAddress(nextAddr);
            fetchInboxMessages(remainingAccounts[0].accountToken);
          } else {
            setSelectedAddress(null);
            setMessages([]);
            setSelectedMessage(null);
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeAccounts, selectedAddress, user]);

  // When selectedAddress changes, fetch inbox for that account
  const handleSelectAccount = (address: string) => {
    setSelectedAddress(address);
    const target = activeAccounts.find((a) => a.address === address);
    if (target) {
      setMessages([]);
      setSelectedMessage(null);
      fetchInboxMessages(target.accountToken);
    }
  };

  // Delete Active Account Immediately
  const handleDeleteAccount = async (address: string) => {
    const targetAcc = activeAccounts.find((a) => a.address === address);
    if (!targetAcc) return;

    // Move to expired history
    await saveEmailToHistory(user ? user.uid : null, targetAcc.address, targetAcc.accountToken);

    const remaining = activeAccounts.filter((a) => a.address !== address);
    setActiveAccounts(remaining);

    if (selectedAddress === address) {
      if (remaining.length > 0) {
        const nextAddr = remaining[0].address;
        setSelectedAddress(nextAddr);
        setMessages([]);
        setSelectedMessage(null);
        fetchInboxMessages(remaining[0].accountToken);
      } else {
        setSelectedAddress(null);
        setMessages([]);
        setSelectedMessage(null);
      }
    }
  };

  // Extend Timer by 10 minutes (+600000ms)
  const handleExtendTimer = (address: string) => {
    setActiveAccounts((prev) =>
      prev.map((acc) =>
        acc.address === address
          ? { ...acc, expiresAt: acc.expiresAt + 600000 }
          : acc
      )
    );
  };

  // Create New Account Function (with multi-provider support & retry)
  const createNewAccount = async (
    preferredUsername?: string,
    preferredDomain?: string,
    durationSeconds: number = 600
  ) => {
    setIsGenerating(true);
    const availableDomains = domains.length > 0 ? domains : [
      { id: '1', domain: 'web-library.net', provider: 'mail.tm' as const, isActive: true, isPrivate: false, createdAt: '', updatedAt: '' },
      { id: '2', domain: 'vmail.me', provider: 'mail.gw' as const, isActive: true, isPrivate: false, createdAt: '', updatedAt: '' },
      { id: '3', domain: '1secmail.com', provider: '1secmail' as const, isActive: true, isPrivate: false, createdAt: '', updatedAt: '' },
      { id: '4', domain: 'sharklasers.com', provider: 'guerrillamail' as const, isActive: true, isPrivate: false, createdAt: '', updatedAt: '' },
      { id: '5', domain: 'dropmail.me', provider: 'dropmail' as const, isActive: true, isPrivate: false, createdAt: '', updatedAt: '' },
    ];

    let lastErr: unknown = null;
    const maxAttempts = 3;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const username = preferredUsername || generateRandomUsername();
        const domainObj = (attempt === 0 && preferredDomain)
          ? (availableDomains.find((d) => d.domain === preferredDomain) || availableDomains[0])
          : availableDomains[attempt % availableDomains.length];

        const domainName = domainObj.domain;
        const provider = domainObj.provider || 'mail.tm';
        const fullAddress = `${username}@${domainName}`;
        const password = generateRandomPassword();

        if (attempt > 0) {
          await new Promise((res) => setTimeout(res, 600 * attempt));
        }

        // Create unified multi-provider account and obtain token
        const tokenRes = await getToken(fullAddress, password, provider);

        const expiresAt = Date.now() + durationSeconds * 1000;
        const newAcc: ActiveEmailAccount = {
          id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 6),
          address: tokenRes.id || fullAddress,
          accountToken: tokenRes.token,
          expiresAt,
          durationSeconds,
          createdAt: new Date().toISOString(),
        };

        const finalAddr = tokenRes.id || fullAddress;
        setActiveAccounts((prev) => [newAcc, ...prev.filter((a) => a.address !== finalAddr)]);
        setSelectedAddress(finalAddr);
        setSelectedDomain(domainName);

        setMessages([]);
        setSelectedMessage(null);

        await fetchInboxMessages(tokenRes.token);

        setIsGenerating(false);
        return;
      } catch (err) {
        lastErr = err;
        console.warn(`Account creation attempt ${attempt + 1} failed:`, err);
      }
    }

    // Fallback if all API attempts are rate-limited or blocked
    console.error('All account creation attempts failed. Creating fallback local address.', lastErr);
    const fallbackUser = preferredUsername || generateRandomUsername();
    const fallbackDom = preferredDomain || '1secmail.com';
    const fallbackAddress = `${fallbackUser}@${fallbackDom}`;
    const fallbackToken = JSON.stringify({ provider: '1secmail', address: fallbackAddress });
    const fallbackExpiresAt = Date.now() + durationSeconds * 1000;

    const fallbackAcc: ActiveEmailAccount = {
      id: Date.now().toString(),
      address: fallbackAddress,
      accountToken: fallbackToken,
      expiresAt: fallbackExpiresAt,
      durationSeconds,
      createdAt: new Date().toISOString(),
    };

    setActiveAccounts((prev) => [fallbackAcc, ...prev.filter((a) => a.address !== fallbackAddress)]);
    setSelectedAddress(fallbackAddress);

    setMessages([]);
    setSelectedMessage(null);
    setIsGenerating(false);
  };

  // Fetch Messages Inbox with Live Sound & Push Alerts
  const fetchInboxMessages = async (token: string, silent = false) => {
    if (!silent) setIsRefreshing(true);
    try {
      const msgList = await getMessages(token);

      // Detect newly arrived messages for live audio & visual alerts
      const currentIds = new Set(msgList.map((m) => m.id));
      const newMessages = msgList.filter((m) => !prevMessageIdsRef.current.has(m.id));

      if (newMessages.length > 0 && prevMessageIdsRef.current.size > 0) {
        // Trigger melodic audio chime
        playNotificationChime();
        // Start tab title flashing in browser
        startTitleFlashing(newMessages.length, i18n.language === 'ar');
        // Send desktop push notification with smart OTP preview
        const latest = newMessages[0];
        const extractedOtp = extractOtpCode(latest.subject || '', latest.intro || '');
        sendDesktopNotification(
          latest.from?.name || latest.from?.address || 'FadeInbox',
          latest.subject || 'رسالة جديدة',
          extractedOtp
        );
      }

      prevMessageIdsRef.current = currentIds;
      setMessages(msgList);
    } catch (err: unknown) {
      const error = err as { message?: string };
      if (error.message === '401_UNAUTHORIZED') {
        console.warn('Token unauthorized or expired for current address.');
      }
    } finally {
      if (!silent) setIsRefreshing(false);
    }
  };

  // Fetch Message Detail
  const handleSelectMessage = async (id: string) => {
    if (!currentAccount?.accountToken) return;
    setIsFetchingDetail(true);
    try {
      const detail = await getMessage(id, currentAccount.accountToken);
      setSelectedMessage(detail);
    } catch (err) {
      console.error('Error fetching message detail:', err);
    } finally {
      setIsFetchingDetail(false);
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id: string) => {
    if (!currentAccount?.accountToken) return;
    try {
      await deleteMessage(id, currentAccount.accountToken);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  // Handle Reactivate Old Address from Vault
  const handleReactivateAddress = (item: SavedEmailHistory) => {
    const reactivatedAcc: ActiveEmailAccount = {
      id: Date.now().toString(),
      address: item.address,
      accountToken: item.accountToken,
      expiresAt: Date.now() + 600000, // 10 minutes reactivated
      durationSeconds: 600,
      createdAt: new Date().toISOString(),
    };

    setActiveAccounts((prev) => [reactivatedAcc, ...prev.filter((a) => a.address !== item.address)]);
    setSelectedAddress(item.address);
    setActiveTab('inbox');
    fetchInboxMessages(item.accountToken);
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative">
      {/* Aurora Mesh Gradient Background */}
      <AuroraBackground isDark={isDark} />

      {/* Top Navbar Header */}
      <div className="relative z-10">
        <Navbar
          user={user}
          onOpenAuth={() => setShowAuthModal(true)}
          onSignOut={handleSignOut}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />

        {/* Main Content Body */}
        <main className="max-w-7xl mx-auto w-full pb-12 space-y-6 px-4 sm:px-6">
          {activeTab === 'inbox' ? (
            <>
              {/* Hero Section with Active Email Cards */}
              <Hero
                activeAccounts={activeAccounts}
                selectedAddress={selectedAddress}
                onSelectAccount={handleSelectAccount}
                onDeleteAccount={handleDeleteAccount}
                onCreateNewAccount={createNewAccount}
                domains={domains}
                selectedDomain={selectedDomain}
                onSelectDomain={setSelectedDomain}
                onOpenQrModal={() => setShowQrModal(true)}
                onExtendTimer={handleExtendTimer}
                isGenerating={isGenerating}
                isRefreshing={isRefreshing}
                onManualRefresh={() => currentAccount && fetchInboxMessages(currentAccount.accountToken)}
              />

              {/* Top/Mid Horizontal Ad Unit */}
              <AdSenseUnit format="horizontal" responsive={true} showLabel={true} />

              {/* Incoming Inbox Section */}
              <Inbox
                messages={messages}
                selectedMessage={selectedMessage}
                onSelectMessage={handleSelectMessage}
                onDeleteMessage={handleDeleteMessage}
                onSaveMessage={(msg) => {
                  saveMessagePermanently(
                    user ? user.uid : null,
                    selectedAddress || '',
                    msg
                  );
                }}
                isFetchingDetail={isFetchingDetail}
                activeEmail={selectedAddress}
              />

              {/* Informative Features Guide & Steps Section for Rich User Experience & AdSense Quality Standards */}
              <FeaturesGuide />

              {/* High-Value Editorial Articles & Knowledge Hub Section for AdSense Compliance */}
              <ArticlesSection />
            </>
          ) : (
            /* Premium History & Saved Vault Section */
            <HistoryDashboard
              user={user}
              onOpenAuth={() => setShowAuthModal(true)}
              onReactivateAddress={handleReactivateAddress}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* QR Code Sharing Modal */}
      {showQrModal && selectedAddress && (
        <QrCodeModal
          address={selectedAddress}
          onClose={() => setShowQrModal(false)}
        />
      )}

      {/* Firebase Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}

      {/* Vercel Analytics Tracker */}
      <Analytics />
    </div>
  );
}
