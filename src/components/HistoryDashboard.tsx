import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'firebase/auth';
import {
  Sparkles,
  History,
  Bookmark,
  Trash2,
  Copy,
  Check,
  Mail,
  ShieldCheck,
  Calendar,
  Lock,
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import MagneticButton from './MagneticButton';
import AdSenseUnit from './AdSenseUnit';
import { SavedEmailHistory, SavedMessage } from '../types';
import {
  getEmailHistory,
  deleteEmailHistoryItem,
  getSavedMessages,
  deleteSavedMessage,
} from '../services/storageService';

interface HistoryDashboardProps {
  user: User | null;
  onOpenAuth: () => void;
  onReactivateAddress: (item: SavedEmailHistory) => void;
}

export default function HistoryDashboard({
  user,
  onOpenAuth,
  onReactivateAddress,
}: HistoryDashboardProps) {
  const { t } = useTranslation();
  const [historyItems, setHistoryItems] = useState<SavedEmailHistory[]>([]);
  const [savedMsgs, setSavedMsgs] = useState<SavedMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'history' | 'saved'>('saved');
  const [readingMsg, setReadingMsg] = useState<SavedMessage | null>(null);

  const userId = user ? user.uid : null;

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [hist, msgs] = await Promise.all([
        getEmailHistory(userId),
        getSavedMessages(userId),
      ]);
      setHistoryItems(hist);
      setSavedMsgs(msgs);
    } catch (err) {
      console.error('Error loading vault data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteHistory = async (id: string) => {
    await deleteEmailHistoryItem(userId, id);
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteSavedMsg = async (id: string) => {
    await deleteSavedMessage(userId, id);
    setSavedMsgs((prev) => prev.filter((m) => m.id !== id));
    if (readingMsg?.id === id) setReadingMsg(null);
  };

  return (
    <section className="w-full py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Banner if guest */}
        {!user && (
          <SpotlightCard className="p-6 bg-gradient-to-r from-purple-100 via-indigo-50 to-white dark:from-purple-950/60 dark:via-[#18181b]/80 dark:to-[#09090b] border-purple-200 dark:border-[#8b5cf6]/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left ltr:sm:text-left rtl:sm:text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-200/60 text-purple-800 dark:bg-[#8b5cf6]/20 dark:text-[#a78bfa] border border-purple-300 dark:border-[#8b5cf6]/30 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cloud Persistence Vault</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t('premiumDashboard')}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl font-medium">
                  {t('unlockPerks')}
                </p>
              </div>

              <MagneticButton
                variant="primary"
                onClick={onOpenAuth}
                className="px-5 py-2.5 text-xs font-bold gap-2 whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t('loginGoogle')}</span>
              </MagneticButton>
            </div>
          </SpotlightCard>
        )}

        {/* Dashboard Vault Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700 dark:bg-[#8b5cf6]/10 dark:text-[#a78bfa]">
              <Lock className="w-5 h-5 text-purple-600 dark:text-[#8b5cf6]" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('savedMessages')}
            </h2>
          </div>

          <div className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'saved'
                  ? 'bg-white dark:bg-[#18181b] text-purple-700 dark:text-purple-400 shadow-sm border border-slate-200 dark:border-white/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{t('savedMessages')}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-100 text-purple-700 dark:bg-[#8b5cf6]/10 dark:text-[#a78bfa] font-bold">
                {savedMsgs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-white dark:bg-[#18181b] text-purple-700 dark:text-purple-400 shadow-sm border border-slate-200 dark:border-white/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>{t('savedHistory')}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-100 text-purple-700 dark:bg-[#8b5cf6]/10 dark:text-[#a78bfa] font-bold">
                {historyItems.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {isLoading ? (
          <div className="p-12 text-center text-indigo-500 font-medium text-xs animate-pulse">
            {t('loadingVaultRecords')}
          </div>
        ) : activeTab === 'saved' ? (
          /* Permanently Saved Messages List & Reader */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <SpotlightCard className="lg:col-span-5 p-4 min-h-[400px]">
              {savedMsgs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-2">
                  <Bookmark className="w-8 h-8 opacity-40" />
                  <p className="text-xs">{t('noSavedMessages')}</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
                  {savedMsgs.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => setReadingMsg(msg)}
                      className={`w-full text-left ltr:text-left rtl:text-right p-3.5 rounded-2xl transition-all duration-200 cursor-pointer border ${
                        readingMsg?.id === msg.id
                          ? 'bg-amber-500/10 border-amber-500/40'
                          : 'bg-white hover:bg-slate-100/90 dark:bg-slate-900/40 dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {msg.fromName || msg.fromAddress}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-indigo-950 dark:text-indigo-200 truncate mb-1">
                        {msg.subject}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        {msg.intro}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </SpotlightCard>

            <SpotlightCard className="lg:col-span-7 p-6 min-h-[400px] flex flex-col justify-between">
              {readingMsg ? (
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {readingMsg.subject}
                      </h3>
                      <button
                        onClick={() => handleDeleteSavedMsg(readingMsg.id)}
                        className="p-1.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t('delete')}</span>
                      </button>
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
                      <p>
                        <strong className="text-slate-900 dark:text-white">{t('fromLabel')}:</strong>{' '}
                        {readingMsg.fromName} ({readingMsg.fromAddress})
                      </p>
                      <p>
                        <strong className="text-slate-900 dark:text-white">{t('savedToLabel')}:</strong>{' '}
                        {readingMsg.emailAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto max-h-[280px] p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/50 my-2">
                    {readingMsg.html ? (
                      <iframe
                        title="Saved Email Body"
                        srcDoc={readingMsg.html}
                        className="w-full min-h-[220px] border-0 rounded-xl bg-white"
                      />
                    ) : (
                      <pre className="text-xs text-slate-800 dark:text-slate-200 font-sans whitespace-pre-wrap">
                        {readingMsg.text || readingMsg.intro}
                      </pre>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-2">
                  <Mail className="w-10 h-10 stroke-1" />
                  <p className="text-xs">{t('selectSavedMessageToView')}</p>
                </div>
              )}
            </SpotlightCard>
          </div>
        ) : (
          /* Address Generation History List */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {historyItems.length === 0 ? (
              <div className="col-span-full p-12 text-center text-slate-400 text-xs bg-slate-100/50 dark:bg-slate-900/30 rounded-3xl border border-slate-200 dark:border-slate-800">
                {t('noSavedHistory')}
              </div>
            ) : (
              historyItems.map((item) => (
                <SpotlightCard key={item.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={() => handleDeleteHistory(item.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="font-mono text-xs font-bold text-slate-900 dark:text-white break-all">
                    {item.address}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
                    <MagneticButton
                      variant="secondary"
                      onClick={() => handleCopy(item.address, item.id)}
                      className="px-3 py-1 text-[11px] font-bold gap-1 flex-1"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>{t('copied')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{t('copy')}</span>
                        </>
                      )}
                    </MagneticButton>

                    <MagneticButton
                      variant="primary"
                      onClick={() => onReactivateAddress(item)}
                      className="px-3 py-1 text-[11px] font-bold gap-1"
                    >
                      <span>{t('reactivate')}</span>
                    </MagneticButton>
                  </div>
                </SpotlightCard>
              ))
            )}
          </div>
        )}

        {/* Dashboard Bottom Ad Placement */}
        <div className="w-full bg-white/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-3 backdrop-blur-sm shadow-sm mt-4">
          <AdSenseUnit format="horizontal" responsive={true} showLabel={true} />
        </div>
      </div>
    </section>
  );
}
