import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  Code2,
  Lock,
  FileText,
  Mail,
  ArrowUp,
  X,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Heart,
  Globe2,
  CheckCircle2,
  User,
} from 'lucide-react';

type ModalType = 'privacy' | 'terms' | 'about' | 'contact' | null;

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const isRtl = i18n.language === 'ar';
  const currentYear = new Date().getFullYear();
  const developerEmail = 'EHABOOO.FadeInbox@gmail.com';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <>
      <footer className="w-full max-w-7xl mx-auto mt-14 mb-6 px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl shadow-slate-900/5 dark:shadow-black/30 p-6 sm:p-8 space-y-6">
          {/* Main Top Grid */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
            {/* Brand & Developer Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-start">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                    {t('appName')}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40">
                    Pro Engine
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
                  {isRtl
                    ? 'منصة البريد المؤقت الذكي والآمن لحماية خصوصيتك ومنع الرسائل العشوائية والتتبع.'
                    : 'Smart and secure temporary email engine engineered for zero spam and absolute privacy.'}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <span>{isRtl ? 'تم التطوير بكل شغف بواسطة' : 'Crafted with passion by'}</span>
                  <button
                    onClick={() => setActiveModal('about')}
                    className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    <span>EHABOOO (إيهاب قاسم)</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Badges & System Health */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              {/* Online Status */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-[11px]">
                  {isRtl ? 'خوادم البريد: نشطة ومتصلة' : 'System: Operational'}
                </span>
              </div>

              {/* Encryption Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 text-[11px] font-medium">
                <Lock className="w-3.5 h-3.5 text-indigo-500" />
                <span>{isRtl ? 'تشفير TLS كامل' : 'TLS Encrypted'}</span>
              </div>

              {/* Zero Log */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 text-[11px] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                <span>{isRtl ? 'بدون سجلات تعقب' : 'Zero-Log Policy'}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <button
                onClick={() => setActiveModal('privacy')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>{isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
              </button>

              <button
                onClick={() => setActiveModal('terms')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                <span>{isRtl ? 'شروط الاستخدام' : 'Terms of Service'}</span>
              </button>

              <button
                onClick={() => setActiveModal('about')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-indigo-500" />
                <span>{isRtl ? 'عن المطور' : 'About Developer'}</span>
              </button>

              <button
                onClick={() => setActiveModal('contact')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                <span>{isRtl ? 'تواصل معنا' : 'Contact & Support'}</span>
              </button>
            </div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shrink-0"
              title={isRtl ? 'العودة للأعلى' : 'Back to top'}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{isRtl ? 'العودة للأعلى' : 'Top'}</span>
            </button>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="text-center sm:text-start font-medium">
              <span>{isRtl ? 'جميع الحقوق محفوظة' : 'All rights reserved'} © {currentYear} </span>
              <span className="font-bold text-slate-900 dark:text-white">
                EHABOOO (إيهاب قاسم)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
              <span>FadeInbox Engine</span>
              <span>•</span>
              <span>Auto Self-Destruct Email System</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ===================== MODALS ===================== */}

      {/* 1. Privacy Policy Modal */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-600 text-white shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isRtl ? 'حماية خصوصيتك هي أولويتنا القصوى' : 'Your privacy is our top priority'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/40 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-0.5">
                    {isRtl ? '1. إتلاف ذاتي فوري وتلقائي' : '1. Automatic Self-Destruction'}
                  </strong>
                  {isRtl
                    ? 'جميع العناوين والرسائل الواردة مؤقتة ويتم حذفها تلقائياً عند انتهاء المدة المحددة دون حفظ أي نسخة على خوادمنا.'
                    : 'All temporary email addresses and incoming messages automatically expire and are purged without retaining permanent logs.'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/40 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-0.5">
                    {isRtl ? '2. بدون طلب أي بيانات شخصية' : '2. No Personal Data Required'}
                  </strong>
                  {isRtl
                    ? 'لا يتطلب استخدام الخدمة الأساسية إدخال رقم هاتفك أو بريدك الحقيقي أو أي بطاقة دفع.'
                    : 'You can generate temporary addresses without entering your phone number, real email address, or credit card.'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/40 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-0.5">
                    {isRtl ? '3. اتصال مشفر وآمن' : '3. End-to-End Encrypted Access'}
                  </strong>
                  {isRtl
                    ? 'يتم الاتصال ومزامنة الرسائل عبر بروتوكول TLS/HTTPS المشفر لضمان عدم اعتراض أي بيانات أثناء النقل.'
                    : 'All communications are transmitted over encrypted TLS/HTTPS channels to ensure data security.'}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {isRtl ? 'فهمت وموافق' : 'I Understand'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Terms of Service Modal */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-purple-600 text-white shadow-md">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {isRtl ? 'شروط الاستخدام' : 'Terms of Service'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isRtl ? 'إرشادات الاستخدام العادل للخدمة' : 'Fair use terms and conditions'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                <strong className="text-slate-900 dark:text-white block font-bold">
                  {isRtl ? 'الاستخدام المسموح به' : 'Permitted Use'}
                </strong>
                <p>
                  {isRtl
                    ? 'الخدمة مصممة لاختبار البرمجيات، وتفعيل الحسابات والتسجيل في المواقع لتجنب السبام، وحماية بريدك الشخصي.'
                    : 'The service is intended for software testing, signups, preventing unwanted spam, and testing email workflows.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                <strong className="text-slate-900 dark:text-white block font-bold">
                  {isRtl ? 'الأنشطة المحظورة' : 'Prohibited Activities'}
                </strong>
                <p>
                  {isRtl
                    ? 'يُحظر تماماً استخدام الخدمة في أي أنشطة احتيالية أو غير قانونية أو إرسال هجمات إلكترونية أو رسائل غير مرغوب فيها.'
                    : 'Using this service for fraud, spamming, illicit transactions, or illegal activities is strictly prohibited.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                <strong className="text-slate-900 dark:text-white block font-bold">
                  {isRtl ? 'إخلاء المسؤولية عن البريد المنتهي' : 'Expiration Notice'}
                </strong>
                <p>
                  {isRtl
                    ? 'لا يُنصح باستخدام هذه العناوين المؤقتة للحسابات الحساسة مثل البنوك أو الوثائق الرسمية الدائمة.'
                    : 'Do not use temporary email addresses for critical accounts such as banking, government services, or permanent credentials.'}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {isRtl ? 'موافق على الشروط' : 'Accept Terms'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. About Developer Modal */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white shadow-md">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {isRtl ? 'عن المطور' : 'About Developer'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    EHABOOO (إيهاب قاسم)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Developer Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-base flex items-center justify-center shadow-md">
                  EQ
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    EHABOOO (إيهاب قاسم)
                  </h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    Software Engineer & Creator of FadeInbox
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isRtl
                  ? 'تم تصميم وبناء FadeInbox بهدف توفير أسرع وأقوى منصة بريد مؤقت تحترم خصوصية المستخدمين وتمنحهم تجربة استخدام فورية وسلسة وخالية من المتاعب.'
                  : 'FadeInbox was built to deliver the fastest, most reliable temporary email system with zero-logs, multi-provider redundancy, and a privacy-first philosophy.'}
              </p>
            </div>

            {/* Direct Contact Button inside About */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  <span className="font-mono text-slate-700 dark:text-slate-300 select-all">
                    {developerEmail}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-[11px] font-bold text-slate-700 dark:text-slate-200 shadow-xs cursor-pointer transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{isRtl ? 'تم النسخ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'نسخ' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {isRtl ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* 4. Contact & Support Modal */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-600 text-white shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {isRtl ? 'تواصل ودعم' : 'Contact & Support'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isRtl ? 'نسعد دائماً باقتراحاتكم وملاحظاتكم' : 'We welcome your feedback & inquiries'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isRtl
                ? 'إذا كان لديك أي استفسار أو اقتراح لتحسين منصة FadeInbox، يمكنك مراسلة المطور مباشرة عبر البريد الإلكتروني أدناه:'
                : 'For any feature suggestions, bug reports, or business inquiries, feel free to email the developer directly:'}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {isRtl ? 'البريد الإلكتروني المباشر' : 'Official Support Email'}
                  </span>
                  <div className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {developerEmail}
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'تم النسخ!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'نسخ البريد' : 'Copy Email'}</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${developerEmail}?subject=FadeInbox%20Inquiry`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>{isRtl ? 'إرسال بريد إلكتروني مباشر' : 'Open Email Client'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              {isRtl ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
