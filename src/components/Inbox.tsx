import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Inbox as InboxIcon,
  Mail,
  Trash2,
  Bookmark,
  Check,
  Paperclip,
  Download,
  Calendar,
  User,
  ArrowLeft,
  Eye,
  FileText,
  Code,
  Sparkles,
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import MagneticButton from './MagneticButton';
import AdSenseUnit from './AdSenseUnit';
import { MailMessageSummary, MailMessageDetail } from '../types';

interface InboxProps {
  messages: MailMessageSummary[];
  selectedMessage: MailMessageDetail | null;
  onSelectMessage: (id: string) => void;
  onDeleteMessage: (id: string) => void;
  onSaveMessage: (msg: MailMessageDetail) => void;
  isFetchingDetail: boolean;
  activeEmail: string | null;
}

export default function Inbox({
  messages,
  selectedMessage,
  onSelectMessage,
  onDeleteMessage,
  onSaveMessage,
  isFetchingDetail,
}: InboxProps) {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'html' | 'text'>('html');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (msg: MailMessageDetail) => {
    onSaveMessage(msg);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <section className="w-full py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-3.5">
        {/* Header Title Bar */}
        <div className="flex items-center justify-between -mt-2 mb-3.5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700 dark:bg-[#8b5cf6]/10 dark:text-[#a78bfa]">
              <InboxIcon className="w-5 h-5 text-purple-600 dark:text-[#8b5cf6]" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('inboxTitle')}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700 border border-purple-200 dark:bg-[#8b5cf6]/10 dark:text-[#a78bfa] dark:border-[#8b5cf6]/20">
              {messages.length}
            </span>
          </div>
        </div>

        {/* Split View Bento Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[520px]">
          {/* Left Column: Email List (Span 5 on large screens) */}
          <SpotlightCard className="lg:col-span-5 p-4 flex flex-col h-[520px]">
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="relative p-4 rounded-full bg-purple-100 text-purple-600 dark:bg-[#8b5cf6]/10 dark:text-[#8b5cf6] animate-pulse">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {t('emptyInbox')}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed font-medium">
                      {t('emptyInboxSub')}
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => {
                  const isSelected = selectedMessage?.id === msg.id;
                  const dateStr = new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <button
                      key={msg.id}
                      onClick={() => onSelectMessage(msg.id)}
                      className={`w-full text-left ltr:text-left rtl:text-right p-3.5 rounded-2xl transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? 'bg-purple-100/90 border-purple-300 shadow-sm dark:bg-[#8b5cf6]/20 dark:border-[#8b5cf6]/40'
                          : 'bg-white hover:bg-slate-100/90 border-slate-200/80 text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/5 dark:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                          {msg.from?.name || msg.from?.address || 'Unknown'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {dateStr}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-200 truncate mb-1">
                        {msg.subject || '(No Subject)'}
                      </h4>

                      <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {msg.intro}
                      </p>

                      {msg.hasAttachments && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-500 font-bold">
                          <Paperclip className="w-3 h-3" />
                          <span>{t('hasAttachments')}</span>
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </SpotlightCard>

          {/* Right Column: Email Reader Detail (Span 7) */}
          <SpotlightCard className="lg:col-span-7 p-6 flex flex-col h-[520px]">
            {isFetchingDetail ? (
              <div className="h-full flex flex-col items-center justify-center space-y-3 text-indigo-500 animate-pulse">
                <Mail className="w-8 h-8 animate-bounce" />
                <span className="text-xs font-medium">{t('loadingMessageBody')}</span>
              </div>
            ) : selectedMessage ? (
              <div className="h-full flex flex-col justify-between space-y-4 overflow-hidden">
                {/* Reader Header */}
                <div className="space-y-3 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white break-words">
                      {selectedMessage.subject || '(No Subject)'}
                    </h3>

                    {/* View Mode Switcher */}
                    <div className="flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                      <button
                        onClick={() => setViewMode('html')}
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 cursor-pointer ${
                          viewMode === 'html'
                            ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                      >
                        <Code className="w-3 h-3" />
                        {t('richHtml')}
                      </button>
                      <button
                        onClick={() => setViewMode('text')}
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 cursor-pointer ${
                          viewMode === 'text'
                            ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                      >
                        <FileText className="w-3 h-3" />
                        {t('rawText')}
                      </button>
                    </div>
                  </div>

                  {/* Sender & Timestamp Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                        {(selectedMessage.from?.name || selectedMessage.from?.address || 'U')[0].toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {selectedMessage.from?.name || 'Unknown'}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          &lt;{selectedMessage.from?.address}&gt;
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Reader Body */}
                <div className="flex-1 overflow-y-auto my-2 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 p-4 border border-slate-200/50 dark:border-slate-800/50">
                  {viewMode === 'html' && selectedMessage.html ? (
                    <iframe
                      title="Email Content"
                      srcDoc={Array.isArray(selectedMessage.html) ? selectedMessage.html.join('') : selectedMessage.html}
                      className="w-full h-full border-0 min-h-[220px] rounded-xl bg-white"
                      sandbox="allow-popups allow-popups-to-escape-sandbox"
                    />
                  ) : (
                    <pre className="text-xs text-slate-800 dark:text-slate-200 font-sans whitespace-pre-wrap leading-relaxed break-words">
                      {selectedMessage.text || selectedMessage.intro || 'No text body available.'}
                    </pre>
                  )}
                </div>

                {/* Attachments Section if present */}
                {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{t('hasAttachments')} ({selectedMessage.attachments.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedMessage.attachments.map((att) => (
                        <a
                          key={att.id}
                          href={`https://api.mail.tm${att.downloadUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-xs font-medium text-indigo-600 dark:text-indigo-400 transition-colors border border-slate-200 dark:border-slate-700"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[140px]">{att.filename}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ({Math.round(att.size / 1024)} KB)
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reader Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
                  <MagneticButton
                    variant="danger"
                    onClick={() => onDeleteMessage(selectedMessage.id)}
                    className="px-3.5 py-1.5 text-xs font-semibold gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t('deleteMessage')}</span>
                  </MagneticButton>

                  <MagneticButton
                    variant="primary"
                    onClick={() => handleSave(selectedMessage)}
                    className="px-4 py-1.5 text-xs font-bold gap-1.5"
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>{t('saved')}</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{t('saveMessage')}</span>
                      </>
                    )}
                  </MagneticButton>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3 text-slate-400">
                <Eye className="w-10 h-10 stroke-1" />
                <p className="text-xs max-w-xs">{t('selectMessage')}</p>
              </div>
            )}
          </SpotlightCard>
        </div>

        {/* In-feed / Bottom Inbox Ad Unit */}
        <div className="w-full bg-white/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-3 backdrop-blur-sm shadow-sm mt-4">
          <AdSenseUnit format="horizontal" responsive={true} showLabel={true} />
        </div>
      </div>
    </section>
  );
}
