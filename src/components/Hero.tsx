import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Copy,
  Check,
  QrCode,
  RefreshCw,
  Clock,
  Shuffle,
  ShieldCheck,
  Zap,
  Lock,
  PlusCircle,
  AtSign,
  Trash2,
  Mail,
  Timer,
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import MagneticButton from './MagneticButton';
import AdSenseUnit from './AdSenseUnit';
import { MailDomain, ActiveEmailAccount } from '../types';
import { generateRandomUsername } from '../services/mailApi';

export const DURATION_OPTIONS = [
  { key: '10m', seconds: 600 },
  { key: '30m', seconds: 1800 },
  { key: '1h', seconds: 3600 },
  { key: '5h', seconds: 18000 },
  { key: '10h', seconds: 36000 },
  { key: '1d', seconds: 86400 },
  { key: '3d', seconds: 259200 },
  { key: '7d', seconds: 604800 },
];

export function formatTimeRemaining(expiresAt: number, t?: (key: string) => string): string {
  const diffMs = expiresAt - Date.now();
  if (diffMs <= 0) return '00:00';
  const totalSeconds = Math.floor(diffMs / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const dayUnit = t ? t('unitDayShort') : 'd';
  const hourUnit = t ? t('unitHourShort') : 'h';
  const minUnit = t ? t('unitMinShort') : 'm';

  if (days > 0) {
    return `${days}${dayUnit} ${hours}${hourUnit}`;
  }
  if (hours > 0) {
    return `${hours}${hourUnit} ${mins}${minUnit}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

interface HeroProps {
  activeAccounts: ActiveEmailAccount[];
  selectedAddress: string | null;
  onSelectAccount: (address: string) => void;
  onDeleteAccount: (address: string) => void;
  onCreateNewAccount: (username?: string, domain?: string, durationSeconds?: number) => void;
  domains: MailDomain[];
  selectedDomain: string;
  onSelectDomain: (domain: string) => void;
  onOpenQrModal: () => void;
  onExtendTimer: (address: string) => void;
  isGenerating: boolean;
  isRefreshing: boolean;
  onManualRefresh: () => void;
}

export default function Hero({
  activeAccounts,
  selectedAddress,
  onSelectAccount,
  onDeleteAccount,
  onCreateNewAccount,
  domains,
  selectedDomain,
  onSelectDomain,
  onOpenQrModal,
  onExtendTimer,
  isGenerating,
  isRefreshing,
  onManualRefresh,
}: HeroProps) {
  const { t } = useTranslation();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [customUser, setCustomUser] = useState('');
  const [modalDomain, setModalDomain] = useState(selectedDomain || (domains[0]?.domain ?? ''));
  const [modalDuration, setModalDuration] = useState(600); // default 10 minutes (600s)

  // Close modal on Escape key
  React.useEffect(() => {
    if (!showCreateModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowCreateModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCreateModal]);

  const currentSelectedAccount = activeAccounts.find((a) => a.address === selectedAddress) || activeAccounts[0];

  const handleCopy = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopiedAddress(addr);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const handleGenerateRandomInModal = () => {
    setCustomUser(generateRandomUsername());
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUser = customUser.trim().toLowerCase() || generateRandomUsername();
    const finalDom = modalDomain || selectedDomain || domains[0]?.domain || 'web-library.net';
    onCreateNewAccount(finalUser, finalDom, modalDuration);
    setShowCreateModal(false);
    setCustomUser('');
  };

  return (
    <section className="relative w-full py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Tagline */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-[#8b5cf6]/10 dark:text-[#a78bfa] dark:border-[#8b5cf6]/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-[#8b5cf6]" />
            <span>{t('tagline')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {t('appName')}{' '}
            <span className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 dark:from-purple-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Spatial Vault
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Active Address Spotlight Card (Span 8) */}
          <SpotlightCard className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Card Header & Status */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700 border border-purple-200 dark:bg-[#8b5cf6]/10 dark:text-[#a78bfa] dark:border-[#8b5cf6]/20 inline-block">
                    {t('activeAddress')}
                  </span>
                </div>

                {/* Manual Refresh & Create New Button */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <button
                    onClick={onManualRefresh}
                    disabled={isRefreshing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-200 transition-colors cursor-pointer border border-slate-200 dark:border-white/10 disabled:opacity-50 font-medium"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 text-indigo-600 dark:text-[#8b5cf6] ${
                        isRefreshing ? 'animate-spin' : ''
                      }`}
                    />
                    <span>{isRefreshing ? t('refreshing') : t('refreshNow')}</span>
                  </button>

                  {/* Combined Create New Button */}
                  <MagneticButton
                    variant="primary"
                    onClick={() => {
                      setModalDomain(selectedDomain || (domains[0]?.domain ?? ''));
                      setShowCreateModal(true);
                    }}
                    disabled={isGenerating}
                    className="px-4 py-1.5 text-xs font-bold gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4 text-white" />
                    <span>{t('createNew')}</span>
                  </MagneticButton>
                </div>
              </div>

              {/* Active Address Display Box for Currently Selected Account */}
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-100/90 dark:bg-[#09090b]/80 border border-slate-200/90 dark:border-white/5 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-auto flex-1 min-w-0 text-center sm:text-left ltr:sm:text-left rtl:sm:text-right space-y-1">
                  {isGenerating ? (
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-600 dark:text-[#8b5cf6] font-mono text-lg animate-pulse">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{t('creating')}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white break-all selection:bg-purple-600 selection:text-white">
                          {currentSelectedAccount?.address || t('noActiveAddress')}
                        </span>
                      </div>
                      {currentSelectedAccount && (
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-purple-700 dark:text-purple-300 font-mono font-medium">
                          <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-[#8b5cf6] animate-pulse" />
                          <span>{t('remaining')}: {formatTimeRemaining(currentSelectedAccount.expiresAt, t)}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Direct Action Buttons */}
                {currentSelectedAccount && (
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                    <MagneticButton
                      variant="primary"
                      onClick={() => handleCopy(currentSelectedAccount.address)}
                      disabled={isGenerating}
                      className="px-5 py-2.5 text-xs font-semibold gap-2 flex-1 sm:flex-none"
                    >
                      {copiedAddress === currentSelectedAccount.address ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-300" />
                          <span>{t('copied')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>{t('copyAddress')}</span>
                        </>
                      )}
                    </MagneticButton>

                    <MagneticButton
                      variant="secondary"
                      onClick={onOpenQrModal}
                      className="p-2.5 text-xs font-bold"
                      title={t('qrCode')}
                    >
                      <QrCode className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                    </MagneticButton>

                    {/* Delete Selected Email Button */}
                    <button
                      onClick={() => onDeleteAccount(currentSelectedAccount.address)}
                      className="p-2.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-400 transition-colors border border-rose-200 dark:border-rose-800/40 cursor-pointer text-xs font-bold flex items-center gap-1"
                      title={t('deleteEmail')}
                    >
                      <Trash2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    </button>
                  </div>
                )}
              </div>

              {/* ALL Currently Active Emails List (Requirement 1 & Requirement 3) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-600 dark:text-[#8b5cf6]" />
                    <span>{t('activeEmailsList')}</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-[#8b5cf6]/20 dark:text-purple-300 text-[10px] font-mono font-bold">
                      {activeAccounts.length}
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto custom-scrollbar p-1">
                  {activeAccounts.length === 0 ? (
                    <div className="col-span-full p-4 rounded-2xl bg-slate-100/60 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/10 text-center space-y-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {t('emptyActiveEmails')}
                      </p>
                    </div>
                  ) : (
                    activeAccounts.map((acc) => {
                    const isSelected = acc.address === selectedAddress;
                    const timeLeftStr = formatTimeRemaining(acc.expiresAt, t);

                    return (
                      <div
                        key={acc.id}
                        onClick={() => onSelectAccount(acc.address)}
                        className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-purple-100/90 border-purple-400 shadow-md dark:bg-[#8b5cf6]/20 dark:border-[#8b5cf6]/60'
                            : 'bg-white hover:bg-slate-100/80 border-slate-200/90 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/5'
                        }`}
                      >
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            <p className="font-mono text-xs font-bold text-slate-900 dark:text-white truncate">
                              {acc.address}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                            <Clock className="w-3 h-3 text-purple-600 dark:text-[#8b5cf6]" />
                            <span>{t('remaining')}: {timeLeftStr}</span>
                          </div>
                        </div>

                        {/* Actions for this specific active email */}
                        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => onExtendTimer(acc.address)}
                            className="px-2 py-1 rounded-lg text-[10px] font-bold bg-purple-100 hover:bg-purple-200 text-purple-800 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 dark:text-purple-300 transition-colors border border-purple-200 dark:border-purple-800/30"
                            title={t('extendTimer')}
                          >
                            {t('extendTimer')}
                          </button>
                          <button
                            onClick={() => onDeleteAccount(acc.address)}
                            className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-950/50 dark:hover:bg-rose-900/80 dark:text-rose-400 transition-colors border border-rose-200 dark:border-rose-800/40 cursor-pointer"
                            title={t('deleteEmail')}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Side Perks / Quick Stats Bento Cards (Span 4) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {/* Security Badge Card */}
            <SpotlightCard className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-purple-100 text-purple-800 border border-purple-200 dark:bg-[#8b5cf6]/10 dark:text-[#a78bfa] dark:border-[#8b5cf6]/20">
                <ShieldCheck className="w-5 h-5 shrink-0 text-purple-600 dark:text-[#8b5cf6]" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t('zeroSpamTitle')}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed px-1 pt-1 font-medium">
                {t('zeroSpamDesc')}
              </p>
            </SpotlightCard>

            {/* Instant Webhooks & Encrypted Card */}
            <SpotlightCard className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-indigo-100 text-indigo-800 border border-indigo-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20">
                <Lock className="w-5 h-5 shrink-0 text-indigo-600 dark:text-purple-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t('encryptionTitle')}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed px-1 pt-1 font-medium">
                {t('encryptionDesc')}
              </p>
            </SpotlightCard>

            {/* Manual Google AdSense Unit (Side Column) */}
            <div className="p-3 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm shadow-sm">
              <AdSenseUnit format="auto" responsive={true} showLabel={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Creation & Customization Modal (Requirement 2 & Requirement 4) */}
      {showCreateModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCreateModal(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="w-full max-w-lg p-6 sm:p-7 rounded-[32px] bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-600 dark:text-[#8b5cf6]" />
                <span>{t('createNew')}</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-white/10 dark:hover:bg-white/20 dark:text-slate-300 font-bold text-sm flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-5">
              {/* Username Input with Generate Random Button beside it */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('customUsername')}
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <AtSign className="w-4 h-4 text-slate-400 absolute left-3 rtl:right-3 rtl:left-auto top-3" />
                    <input
                      type="text"
                      value={customUser}
                      onChange={(e) => setCustomUser(e.target.value)}
                      placeholder={t('customUsernamePlaceholder')}
                      className="w-full pl-9 rtl:pr-9 rtl:pl-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  {/* Generate Random Name Button Beside Input */}
                  <button
                    type="button"
                    onClick={handleGenerateRandomInModal}
                    className="px-3.5 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 dark:text-purple-300 border border-indigo-200 dark:border-purple-800/40 text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                    title={t('generateRandomName')}
                  >
                    <Shuffle className="w-4 h-4 text-indigo-600 dark:text-[#8b5cf6]" />
                    <span className="hidden sm:inline">{t('generateRandomName')}</span>
                  </button>
                </div>
              </div>

              {/* Select Domain */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('chooseDomain')}
                </label>
                <select
                  value={modalDomain}
                  onChange={(e) => {
                    setModalDomain(e.target.value);
                    onSelectDomain(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-[#09090b] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono cursor-pointer"
                >
                  {domains.map((d) => (
                    <option key={d.id} value={d.domain}>
                      @{d.domain} ({d.provider || 'mail.tm'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Time Duration (Requirement 2: 10د, 30د, 1س, 5س, 10س, 1ي, 3ي, 7ي) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                  <Timer className="w-4 h-4 text-indigo-600 dark:text-[#8b5cf6]" />
                  <span>{t('selectDuration')}</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {DURATION_OPTIONS.map((opt) => {
                    const isSelected = modalDuration === opt.seconds;
                    return (
                      <button
                        key={opt.seconds}
                        type="button"
                        onClick={() => setModalDuration(opt.seconds)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer border flex flex-col items-center justify-center gap-0.5 ${
                          isSelected
                            ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20'
                            : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:border-white/10'
                        }`}
                      >
                        <span className="font-mono text-sm">{t(`dur_${opt.key}_short`)}</span>
                        <span className="text-[10px] opacity-80">{t(`dur_${opt.key}_full`)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  {t('cancel')}
                </button>
                <MagneticButton
                  type="submit"
                  variant="primary"
                  className="px-6 py-2.5 text-xs font-bold"
                >
                  {t('create')}
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
