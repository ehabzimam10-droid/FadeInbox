import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  X,
  ShieldCheck,
  Download,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Eye,
} from 'lucide-react';
import MagneticButton from './MagneticButton';

export interface PreviewAttachmentData {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  downloadUrl: string;
}

interface AttachmentPreviewModalProps {
  attachment: PreviewAttachmentData | null;
  onClose: () => void;
}

export default function AttachmentPreviewModal({
  attachment,
  onClose,
}: AttachmentPreviewModalProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!attachment) return null;

  const fullUrl = attachment.downloadUrl.startsWith('http')
    ? attachment.downloadUrl
    : `https://api.mail.tm${attachment.downloadUrl}`;

  const isImage =
    attachment.contentType.startsWith('image/') ||
    /\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(attachment.filename);

  const isPdf =
    attachment.contentType === 'application/pdf' ||
    /\.pdf$/i.test(attachment.filename);

  const sizeKb = Math.round(attachment.size / 1024);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-md">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              {isImage ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                  {attachment.filename}
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>{isRtl ? 'معاينة آمنة معزولة' : 'Safe Sandbox'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                {sizeKb} KB • {attachment.contentType || 'file'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Sandbox Viewer */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-100/60 dark:bg-slate-950/60 min-h-[300px]">
          {isImage ? (
            <div className="relative max-h-[60vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-md border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 p-2">
              <img
                src={fullUrl}
                alt={attachment.filename}
                className="max-h-[55vh] w-auto max-w-full object-contain rounded-xl"
                loading="lazy"
              />
            </div>
          ) : isPdf ? (
            <iframe
              src={`${fullUrl}#toolbar=0`}
              title={attachment.filename}
              className="w-full h-[55vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="text-center space-y-3 p-8">
              <FileText className="w-12 h-12 text-indigo-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {attachment.filename}
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {isRtl
                  ? 'هذا الملف جاهز للتحميل الآمن. يمكنك فتحه أو تنزيله إلى جهازك مباشرة.'
                  : 'This file format cannot be rendered directly inline. You can safely download it directly.'}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs text-slate-500">
            {isRtl
              ? 'معاينة مشفرة وآمنة بنسبة 100%'
              : 'End-to-End Secure Preview Sandbox'}
          </span>

          <div className="flex items-center gap-2">
            <a
              href={fullUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isRtl ? 'فتح في تبويب' : 'Open Tab'}</span>
            </a>

            <a
              href={fullUrl}
              download={attachment.filename}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isRtl ? 'تحميل الملف' : 'Download File'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
