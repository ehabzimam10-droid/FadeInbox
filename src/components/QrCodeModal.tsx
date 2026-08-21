import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import { QrCode, Copy, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';

interface QrCodeModalProps {
  address: string;
  onClose: () => void;
}

export default function QrCodeModal({ address, onClose }: QrCodeModalProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-sm p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 text-center">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('qrCode')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="p-6 rounded-2xl bg-white shadow-inner border border-slate-200 inline-block mx-auto">
          <QRCodeSVG
            value={`mailto:${address}`}
            size={180}
            level="H"
            includeMargin={false}
          />
        </div>

        {/* Address & Scan Prompt */}
        <div className="space-y-2">
          <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 break-all bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            {address}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {t('scanQr')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <MagneticButton
            variant="secondary"
            onClick={handleCopy}
            className="w-full py-2.5 text-xs font-bold gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{t('copied')}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t('copyAddress')}</span>
              </>
            )}
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
