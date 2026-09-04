import React, { useState, useEffect } from 'react';
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
  Eye,
  FileText,
  Code,
  Sparkles,
  KeyRound,
  ExternalLink,
  Copy,
  Volume2,
  VolumeX,
  Bell,
  BellRing,
  BellOff,
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import MagneticButton from './MagneticButton';
import AdSenseUnit from './AdSenseUnit';
import AttachmentPreviewModal, { PreviewAttachmentData } from './AttachmentPreviewModal';
import { MailMessageSummary, MailMessageDetail } from '../types';
import { extractOtpCode, extractSmartActions } from '../utils/otpExtractor';
import {
  isSoundEnabled,
  setSoundEnabled,
  playNotificationChime,
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
} from '../utils/notificationService';

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
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [viewMode, setViewMode] = useState<'html' | 'text'>('html');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedReaderOtp, setCopiedReaderOtp] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [previewAttachment, setPreviewAttachment] = useState<PreviewAttachmentData | null>(null);
  const [pushPerm, setPushPerm] = useState<NotificationPermission>(() => getNotificationPermission());

  // Sync initial sound setting
  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      playNotificationChime();
    }
  };

  const handleTogglePush = async () => {
    if (pushPerm === 'granted') return;
    const result = await requestNotificationPermission();
    setPushPerm(result);
  };

  const handleSave = (msg: MailMessageDetail) => {
    onSaveMessage(msg);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCopyOtp = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedReaderOtp(true);
    setTimeout(() => setCopiedReaderOtp(false), 2000);
  };

  // Smart actions for the currently selected message
  const readerSmartActions = selectedMessage
    ? extractSmartActions(
        selectedMessage.subject,
        selectedMessage.text || selectedMessage.intro,
        selectedMessage.html
      )
    : null;

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

          {/* Action Controls: Push Notifications & Sound */}
          <div className="flex items-center gap-2">
            {isNotificationSupported() && (
              <button
                onClick={handleTogglePush}
                title={
                  pushPerm === 'granted'
                    ? (isRtl ? 'إشعارات المتصفح مفعّلة (تصلك رموز الـ OTP فوراً)' : 'Browser Push Notifications Active')
                    : pushPerm === 'denied'
                    ? (isRtl ? 'الإشعارات محظورة في إعدادات المتصفح' : 'Notifications Blocked in Browser Settings')
                    : (isRtl ? 'تفعيل إشعارات المتصفح (تلقي الأكواد عند تصغير المتصفح)' : 'Enable Browser Push Notifications')
                }
                className={`px-3 py-1.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                  pushPerm === 'granted'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 shadow-sm'
                    : pushPerm === 'denied'
                    ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400 border-rose-200 dark:border-rose-800/40'
                    : 'bg-purple-50 hover:bg-purple-100 dark:bg-[#8b5cf6]/15 hover:dark:bg-[#8b5cf6]/25 text-purple-700 dark:text-[#a78bfa] border-purple-200 dark:border-[#8b5cf6]/30 shadow-sm animate-pulse'
                }`}
              >
                {pushPerm === 'granted' ? (
                  <BellRing className="w-4 h-4 text-emerald-500" />
                ) : pushPerm === 'denied' ? (
                  <BellOff className="w-4 h-4 text-rose-500" />
                ) : (
                  <Bell className="w-4 h-4 text-purple-600 dark:text-[#8b5cf6]" />
                )}
                <span className="hidden sm:inline">
                  {pushPerm === 'granted'
                    ? (isRtl ? 'الإشعارات نشطة' : 'Push Active')
                    : pushPerm === 'denied'
                    ? (isRtl ? 'محظورة' : 'Blocked')
                    : (isRtl ? 'تفعيل إشعارات المتصفح' : 'Enable Push')}
                </span>
              </button>
            )}

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundOn ? (isRtl ? 'كتم التنبيهات الصوتية' : 'Mute Sound') : (isRtl ? 'تشغيل التنبيهات الصوتية' : 'Enable Sound')}
              className={`px-3 py-1.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                soundOn
                  ? 'bg-purple-50 dark:bg-[#8b5cf6]/10 text-purple-600 dark:text-[#a78bfa] border-purple-200 dark:border-[#8b5cf6]/30 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-purple-600 dark:text-[#8b5cf6]" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundOn ? (isRtl ? 'صوت التنبيهات مفعّل' : 'Sound On') : (isRtl ? 'مكتوم' : 'Muted')}</span>
            </button>
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
                  const otpCode = extractOtpCode(msg.intro, msg.subject);

                  return (
                    <div
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

                      {/* Smart OTP Quick Pill on list card */}
                      {otpCode && (
                        <div className="mt-2.5 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(otpCode);
                              setCopiedId(msg.id);
                              setTimeout(() => setCopiedId(null), 2000);
                            }}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-indigo-100 hover:bg-indigo-200 text-indigo-700 dark:bg-indigo-950/80 dark:hover:bg-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700/60 transition-all shadow-xs cursor-pointer"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-600 dark:text-emerald-400">{isRtl ? 'تم النسخ!' : 'Copied!'}</span>
                              </>
                            ) : (
                              <>
                                <KeyRound className="w-3 h-3 text-indigo-500" />
                                <span>{isRtl ? `رمز التحقق: ${otpCode}` : `OTP: ${otpCode}`}</span>
                                <Copy className="w-2.5 h-2.5 opacity-60" />
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {msg.hasAttachments && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-500 font-bold">
                          <Paperclip className="w-3 h-3" />
                          <span>{t('hasAttachments')}</span>
                        </div>
                      )}
                    </div>
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
              <div className="h-full flex flex-col justify-between space-y-3 overflow-hidden">
                {/* Reader Header */}
                <div className="space-y-2.5 pb-2.5 border-b border-slate-200/80 dark:border-slate-800/80">
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

                {/* Smart Actions Banner (Feature 1: OTP & Direct Verification Link) */}
                {readerSmartActions && (readerSmartActions.otpCode || readerSmartActions.verificationLink) && (
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/25 dark:border-indigo-500/35 flex flex-wrap items-center justify-between gap-2.5 animate-in fade-in duration-200">
                    {readerSmartActions.otpCode && (
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                          <KeyRound className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                            {isRtl ? 'رمز التحقق المستخرج' : 'Detected OTP Code'}
                          </span>
                          <span className="font-mono text-base font-black text-indigo-700 dark:text-indigo-300 tracking-wider">
                            {readerSmartActions.otpCode}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyOtp(readerSmartActions.otpCode!)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                        >
                          {copiedReaderOtp ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedReaderOtp ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ الرمز' : 'Copy Code')}</span>
                        </button>
                      </div>
                    )}

                    {readerSmartActions.verificationLink && (
                      <a
                        href={readerSmartActions.verificationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'فتح رابط التفعيل مباشرة' : 'Open Verification Link'}</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Reader Body */}
                <div className="flex-1 overflow-y-auto my-1 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 p-4 border border-slate-200/50 dark:border-slate-800/50">
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

                {/* Attachments Section if present (Feature 3: Safe Sandbox Preview) */}
                {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{t('hasAttachments')} ({selectedMessage.attachments.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedMessage.attachments.map((att) => (
                        <div
                          key={att.id}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          <span className="truncate max-w-[120px] font-semibold">{att.filename}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ({Math.round(att.size / 1024)} KB)
                          </span>

                          <button
                            type="button"
                            onClick={() => setPreviewAttachment(att)}
                            className="p-1 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400 transition-colors cursor-pointer"
                            title={isRtl ? 'معاينة آمنة' : 'Safe Preview'}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={att.downloadUrl.startsWith('http') ? att.downloadUrl : `https://api.mail.tm${att.downloadUrl}`}
                            download={att.filename}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
                            title={isRtl ? 'تحميل' : 'Download'}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        </div>
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
        <AdSenseUnit format="horizontal" responsive={true} showLabel={true} className="mt-4" />
      </div>

      {/* Safe In-Browser Attachment Preview Modal (Feature 3) */}
      <AttachmentPreviewModal
        attachment={previewAttachment}
        onClose={() => setPreviewAttachment(null)}
      />
    </section>
  );
}
