import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  Lock,
  FileText,
  Mail,
  ArrowUp,
  X,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  User,
  CheckCircle2,
  Server,
  Globe2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Layers,
  Award,
  Zap,
} from 'lucide-react';

type ModalType = 'privacy' | 'terms' | 'about' | 'contact' | null;

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Modal sub-tab state
  const [privacyTab, setPrivacyTab] = useState<'overview' | 'adsense' | 'gdpr' | 'security'>('overview');
  const [termsTab, setTermsTab] = useState<'terms' | 'usage' | 'prohibited' | 'disclaimer'>('terms');
  const [aboutTab, setAboutTab] = useState<'about' | 'developer' | 'tech'>('about');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <footer className="w-full max-w-7xl mx-auto mt-14 mb-6 px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl shadow-slate-900/5 dark:shadow-black/30 p-6 sm:p-8 space-y-6">
          {/* Main Top Grid */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
            {/* Brand & Developer Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-start">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/25 ring-1 ring-purple-500/30 bg-slate-900 shrink-0">
                <img
                  src="/favicon.svg"
                  alt="FadeInbox Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                    {t('appName')}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-950/60 dark:to-indigo-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40">
                    {t('proEngine')}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                  {t('footerTagline')}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <span>{t('craftedWithPassion')}</span>
                  <button
                    onClick={() => {
                      setAboutTab('developer');
                      setActiveModal('about');
                    }}
                    className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    <span>EHABOOO (إيهاب قاسم)</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Badges & System Health */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs">
              {/* Online Status */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-[11px]">{t('systemOperational')}</span>
              </div>

              {/* Encryption Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 text-[11px] font-medium">
                <Lock className="w-3.5 h-3.5 text-indigo-500" />
                <span>{t('tlsEncrypted')}</span>
              </div>

              {/* Zero Log */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 text-[11px] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                <span>{t('zeroLogPolicy')}</span>
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
                <span>{t('privacyPolicy')}</span>
              </button>

              <button
                onClick={() => setActiveModal('terms')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                <span>{t('termsOfService')}</span>
              </button>

              <button
                onClick={() => setActiveModal('about')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-indigo-500" />
                <span>{t('aboutDeveloper')}</span>
              </button>

              <button
                onClick={() => setActiveModal('contact')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                <span>{t('contactSupport')}</span>
              </button>
            </div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shrink-0"
              title={t('backToTop')}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{t('backToTop')}</span>
            </button>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="text-center sm:text-start font-medium">
              <span>{t('allRightsReserved')} © {currentYear} </span>
              <span className="font-bold text-slate-900 dark:text-white">
                FadeInbox • EHABOOO (إيهاب قاسم)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              <span>FadeInbox Engine</span>
              <span>•</span>
              <span>{t('autoSelfDestruct')}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ===================== MODALS ===================== */}

      {/* 1. Privacy Policy Modal (Comprehensive & Google AdSense / GDPR / CCPA Compliant) */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl p-5 sm:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl overflow-hidden shadow-md shadow-purple-500/20 ring-1 ring-purple-500/30 bg-slate-900 shrink-0">
                  <img src="/favicon.svg" alt="FadeInbox Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{t('privacyPolicy')}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold">
                      AdSense & GDPR Ready
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isRtl ? 'آخر تحديث: أغسطس 2026' : 'Last Updated: August 2026'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-tabs Navigation */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/70 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setPrivacyTab('overview')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  privacyTab === 'overview'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('tabOverview')}
              </button>
              <button
                onClick={() => setPrivacyTab('adsense')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
                  privacyTab === 'adsense'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('tabAdSense')}</span>
              </button>
              <button
                onClick={() => setPrivacyTab('gdpr')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  privacyTab === 'gdpr'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('tabGdpr')}
              </button>
              <button
                onClick={() => setPrivacyTab('security')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  privacyTab === 'security'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('tabSecurity')}
              </button>
            </div>

            {/* Tab Content 1: Overview */}
            {privacyTab === 'overview' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{isRtl ? '1. فلسفة الخصوصية أولاً واللا سجلات (Zero-Log)' : '1. Privacy-First & Zero-Log Guarantee'}</span>
                  </div>
                  <p>
                    {isRtl
                      ? 'في FadeInbox، نؤمن بأن الخصوصية حق أساسي للجميع. صُممت منصتنا من الصفر بحيث لا تتطلب منك أي بيانات شخصية، أو أرقام هواتف، أو عناوين بريد حقيقية للبدء في توليد العناوين المؤقتة.'
                      : 'At FadeInbox, privacy is a fundamental human right. Our architecture is engineered from the ground up so you never need to provide personal identifiable information, phone numbers, or real email addresses to use our temporary mail services.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {isRtl ? '2. الإتلاف الذاتي والتخزين المؤقت' : '2. Ephemeral Storage & Self-Destruction'}
                  </h4>
                  <p>
                    {isRtl
                      ? 'جميع العناوين ورسائل البريد الواردة مؤقتة بشكل صارم وتعيش فقط في الذاكرة المؤقتة خلال مدة الصلاحية المحددة (من 10 دقائق حتى 7 أيام). بمجرد انتهاء المؤقت، يتم إتلاف الرسائل والعناوين نهائياً وبلا رجعة دون حفظ أي أرشيف دائم.'
                      : 'All temporary addresses and received emails reside strictly in transient memory for the selected duration (10 minutes up to 7 days). Once the lifespan timer expires, messages are permanently purged from cache with zero recoverable trace.'}
                  </p>
                </div>
              </div>
            )}

            {/* Tab Content 2: Google AdSense & Cookies (Crucial for AdSense Approval) */}
            {privacyTab === 'adsense' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
                    <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>{isRtl ? 'إفصاح إعلانات Google وملفات تعريف الارتباط (DART Cookies)' : 'Google AdSense & DART Cookies Disclosure'}</span>
                  </div>
                  <p>
                    {isRtl
                      ? 'تستخدم منصة FadeInbox خدمات إعلانية مقدمة من طرف ثالث، وتحديداً Google AdSense، لعرض الإعلانات عند زيارة موقعنا.'
                      : 'FadeInbox partners with third-party advertising vendors, including Google AdSense, to serve contextual and relevant ads when you visit our website.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {isRtl ? 'كيف تستخدم Google ملفات تعريف الارتباط؟' : 'How Google Uses Advertising Cookies'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-300">
                    <li>
                      {isRtl
                        ? 'تستخدم Google بصفتها مورداً لطرف ثالث ملفات تعريف الارتباط (Cookies) لعرض الإعلانات على موقعنا بناءً على زيارات المستخدمين السابقة لهذا الموقع أو لمواقع أخرى على شبكة الإنترنت.'
                        : 'Google, as a third-party vendor, uses cookies (including DART cookies) to serve ads to users based on their visit to FadeInbox and other sites across the Internet.'}
                    </li>
                    <li>
                      {isRtl
                        ? 'يمكّن استخدام ملفات تعريف الارتباط الإعلانية Google وشركاءها من تقديم إعلانات مخصصة للمستخدمين استناداً إلى سجل تصفحهم العام.'
                        : 'Google\'s use of advertising cookies enables it and its network partners to serve tailored ads to your browser based on visiting our site and/or other sites on the Internet.'}
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-2">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-xs">
                    {isRtl ? 'كيفية إلغاء الاشتراك والتحكم في الإعلانات' : 'User Choice & Ad Opt-Out Options'}
                  </h4>
                  <p>
                    {isRtl
                      ? 'يمكن للمستخدمين إلغاء الاشتراك في الإعلانات المخصصة وتعديل إعدادات خصوصية الإعلانات في أي وقت عبر زيارة:'
                      : 'Users may opt out of personalized advertising at any time by managing their settings via:'}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-[11px] hover:bg-indigo-700 transition-colors"
                    >
                      <span>Google Ads Settings</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="http://www.aboutads.info/choices/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-[11px] hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      <span>AboutAds.info Choices</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content 3: GDPR & CCPA */}
            {privacyTab === 'gdpr' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {isRtl ? 'حقوق المستخدمين بموجب اللائحة الأوروبية العامة (GDPR)' : 'GDPR Compliance (European Union / UK)'}
                  </h4>
                  <p>
                    {isRtl
                      ? 'يحق لكل مستخدم في الاتحاد الأوروبي: الحق في المعرفة والوصول، الحق في طلب مسح البيانات (الحق في النسيان)، والحق في تقييد المعالجة. نظراً لأن منصتنا لا تحتفظ بأي بيانات شخصية للزوار العاديين، فإن بياناتك محمية بشكل كامل وفوري.'
                      : 'Under the General Data Protection Regulation, EU and UK residents are entitled to: The Right of Access, Right to Erasure ("Right to be Forgotten"), and Right to Restrict Processing. Since FadeInbox does not retain permanent identification for guest sessions, your footprint remains zero.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {isRtl ? 'قانون خصوصية المستهلك في كاليفورنيا (CCPA)' : 'California Consumer Privacy Act (CCPA)'}
                  </h4>
                  <p>
                    {isRtl
                      ? 'نحن نلتزم بصرامة بعدم بيع أي بيانات للمستخدمين ("We Do NOT Sell Your Personal Information"). لا نقوم بتسويق أو تبادل أو تحقيق أي مكاسب مالية من تداول بياناتك الشخصية مع أي جهات خارجية.'
                      : 'FadeInbox strictly adheres to a "Do Not Sell My Personal Information" policy. We do not sell, rent, monetize, or broker personal consumer information to any third parties.'}
                  </p>
                </div>
              </div>
            )}

            {/* Tab Content 4: Security & Cloud Storage */}
            {privacyTab === 'security' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-bold text-sm">
                    <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{isRtl ? 'التشفير وحماية البيانات بنقل TLS 1.3' : 'End-to-End TLS 1.3 Transport Security'}</span>
                  </div>
                  <p>
                    {isRtl
                      ? 'يتم تشفير كافة الاتصالات بين متصفحك وخوادم البريد عبر بروتوكولات HTTPS/TLS 1.3 الحديثة والمحمية ضد أي تنصت أو اعتراض خارجي.'
                      : 'All communications between your client device and email mailboxes are protected with state-of-the-art TLS 1.3 and HTTPS encryption, mitigating interception and eavesdropping.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {isRtl ? 'التخزين السحابي للمستخدمين المسجلين (Firebase Cloud Vault)' : 'Cloud Storage for Registered Users'}
                  </h4>
                  <p>
                    {isRtl
                      ? 'عند تسجيل الدخول الاختياري بحساب Google واستخدام الخزنة (Vault)، يتم تشفير وحفظ السجلات في Firebase Firestore تحت معرّف حسابك (UID) فقط، ولا يمكن لأي مستخدم آخر الوصول إليها، وتستطيع حذفها بضغطة زر في أي وقت.'
                      : 'If you opt in to sign in with Google to sync address history or preserve messages in the Vault, data is stored securely in Firebase Firestore scoped strictly to your authenticated UID. You retain complete control to delete any record at any time.'}
                  </p>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 font-mono">
                FadeInbox Privacy Shield v2.4
              </span>
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {t('iUnderstand')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Terms of Service Modal (Professional & Full Compliance) */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl p-5 sm:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-500/20 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {t('termsOfService')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isRtl ? 'اتفاقية الاستخدام والشروط القانونية' : 'Legal Agreement & Terms of Use'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/70 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setTermsTab('terms')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  termsTab === 'terms'
                    ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isRtl ? '1. نطاق الخدمة' : '1. Scope of Service'}
              </button>
              <button
                onClick={() => setTermsTab('usage')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  termsTab === 'usage'
                    ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isRtl ? '2. الاستخدام المسموح' : '2. Permitted Use'}
              </button>
              <button
                onClick={() => setTermsTab('prohibited')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  termsTab === 'prohibited'
                    ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isRtl ? '3. المحظورات' : '3. Prohibitions'}
              </button>
              <button
                onClick={() => setTermsTab('disclaimer')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  termsTab === 'disclaimer'
                    ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isRtl ? '4. إخلاء المسؤولية' : '4. Liability & Disclaimers'}
              </button>
            </div>

            {/* Terms Content */}
            {termsTab === 'terms' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {isRtl ? 'الموافقة على الشروط' : 'Acceptance of Terms'}
                  </h4>
                  <p>
                    {isRtl
                      ? 'باستخدامك لمنصة FadeInbox، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، فيُرجى التوقف فوراً عن استخدام الخدمة.'
                      : 'By accessing or utilizing FadeInbox, you signify full agreement to these Terms of Service. If you disagree with any part of these provisions, you must cease using the platform immediately.'}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {isRtl ? 'طبيعة الخدمة المؤقتة' : 'Automated Disposable Utility'}
                  </h4>
                  <p>
                    {isRtl
                      ? 'توفر المنصة خدمة إنشاء عناوين بريد إلكتروني مؤقتة تستقبل الرسائل لفترة محددة ثم تتلف ذاتياً لحماية صندوق بريدك الأساسي من الرسائل المزعجة وتأكيد الحسابات بشكل آمن.'
                      : 'FadeInbox provides an automated disposable email generator designed for receiving ephemeral messages, software QA testing, and protecting primary inboxes from unwanted solicitations.'}
                  </p>
                </div>
              </div>
            )}

            {termsTab === 'usage' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-xs">
                    {isRtl ? 'الاستخدامات الموصى بها والمشروعة' : 'Authorized & Recommended Use Cases'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5">
                    <li>{isRtl ? 'التسجيل في المواقع والمنتديات التي لا ترغب بمشاركتها بريدك الشخصي الحقيقي.' : 'Signing up for free trials, webinars, or forums without disclosing personal credentials.'}</li>
                    <li>{isRtl ? 'اختبار أنظمة إرسال البريد وتطبيقات الويب والمطورين (QA Testing).' : 'Developer sandbox workflows, automated test pipelines, and QA inbox verification.'}</li>
                    <li>{isRtl ? 'تجنب القوائم البريدية المزعجة وحملات التسويق العشوائي.' : 'Circumventing aggressive marketing trackers and keeping primary mail accounts spam-free.'}</li>
                  </ul>
                </div>
              </div>
            )}

            {termsTab === 'prohibited' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-bold text-xs">
                    <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>{isRtl ? 'الأنشطة المحظورة قطعياً' : 'Strictly Prohibited Conduct'}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-rose-900/90 dark:text-rose-200/90">
                    <li>{isRtl ? 'استخدام الخدمة في أي عمليات احتيال مالي، أو تزييف، أو انتهاك حقوق الغير.' : 'Engaging in cyber fraud, money laundering, phishing, or financial spoofing.'}</li>
                    <li>{isRtl ? 'محاولة إرسال برمجيات خبيثة أو هجمات حجب الخدمة (DDoS).' : 'Attempting to inject malware, automate abusive traffic, or execute denial of service attacks.'}</li>
                    <li>{isRtl ? 'أي استخدام يخالف القوانين والأنظمة المعمول بها دولياً ومحلياً.' : 'Any unlawful conduct violating international telecommunication regulations.'}</li>
                  </ul>
                </div>
              </div>
            )}

            {termsTab === 'disclaimer' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {isRtl ? 'تنبيه عدم استخدام الخدمة للحسابات البنكية أو الرسمية' : 'Critical Non-Permanent Account Warning'}
                  </h4>
                  <p>
                    {isRtl
                      ? 'نظراً لأن العناوين المؤقتة تُحذف تلقائياً، يُحظر ولا يُنصح إطلاقاً باستخدامها في إنشاء حسابات مصرفية، أو معاملات مالية، أو استرجاع كلمات مرور الحسابات الحكومية أو الحساسة، ولا تتحمل المنصة أي مسؤولية عن فقدان الرسائل بعد انتهاء صلاحيتها.'
                      : 'Because addresses self-destruct upon expiration, you MUST NOT use FadeInbox as the primary recovery email for banking, credit cards, government portals, or critical credentials. FadeInbox bears no liability for unrecoverable expired messages.'}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 font-mono">
                FadeInbox TOS Revision 2026.8
              </span>
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {t('acceptTerms')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. About Platform & Developer Modal */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl p-5 sm:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl overflow-hidden shadow-md shadow-purple-500/20 ring-1 ring-purple-500/30 bg-slate-900 shrink-0">
                  <img src="/favicon.svg" alt="FadeInbox Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {t('aboutDeveloper')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    FadeInbox & Lead Architect EHABOOO
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/70 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setAboutTab('about')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  aboutTab === 'about'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('tabAboutProject')}
              </button>
              <button
                onClick={() => setAboutTab('developer')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  aboutTab === 'developer'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('tabAboutDev')}
              </button>
              <button
                onClick={() => setAboutTab('tech')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  aboutTab === 'tech'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('tabTechStack')}
              </button>
            </div>

            {/* Tab 1: About FadeInbox */}
            {aboutTab === 'about' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                    <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{isRtl ? 'رؤية منصة FadeInbox' : 'The Mission of FadeInbox'}</span>
                  </div>
                  <p>
                    {isRtl
                      ? 'صُممت منصة FadeInbox لتكون الحل العصري الأسرع والأكثر أماناً لمشكلة الرسائل المزعجة (Spam) وانتهاكات الخصوصية الرقمية. نوفر صندوق بريد مؤقت فوري يتلف تلقائياً ومجهز بتقنيات متعددة المحركات لضمان عدم توقف الخدمة أبداً.'
                      : 'FadeInbox was created to deliver an ultra-fast, barrier-free, privacy-preserving disposable inbox engine. Our goal is to empower users worldwide against digital tracking, data brokers, and endless spam newsletters.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
                    <div className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">100% Free</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{isRtl ? 'مجانية بالكامل للجميع' : 'Always Free for Everyone'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
                    <div className="text-base font-black text-purple-600 dark:text-purple-400 font-mono">5 Providers</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{isRtl ? 'محركات بريد احتياطية' : 'Redundant Mail Engines'}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Developer Profile */}
            {aboutTab === 'developer' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
                      EQ
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>EHABOOO (إيهاب قاسم)</span>
                        <Sparkles className="w-4 h-4 text-amber-500" />
                      </h4>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                        Lead Software Architect & Creator of FadeInbox
                      </p>
                    </div>
                  </div>

                  <p>
                    {isRtl
                      ? 'مطور برمجيات شغوف ببناء تطبيقات الويب الحديثة ذات الأداء الفائق والواجهات التفاعلية الأنيقة. تم بناء FadeInbox برؤية هندسية تضع خصوصية المستخدم والسرعة العالية في المقام الأول.'
                      : 'A passionate software engineer specialized in crafting high-performance, privacy-centric web applications and modern interactive UI experiences. FadeInbox is built with love and meticulous engineering.'}
                  </p>
                </div>

                {/* Email Box */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-xs">
                    <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="font-mono text-slate-800 dark:text-slate-200 select-all font-semibold">
                      {developerEmail}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs cursor-pointer transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{isRtl ? 'تم النسخ' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t('copyEmail')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Tech Stack */}
            {aboutTab === 'tech' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    <span>{isRtl ? 'محركات البريد الخمسة المتكاملة (Multi-Provider Redundancy)' : '5-Engine Redundant Mail Adapter Architecture'}</span>
                  </h4>
                  <p>
                    {isRtl
                      ? 'لضمان أعلى معايير الاستقرار وتجنب أي انقطاع، يتكامل FadeInbox بسلاسة مع 5 مزودي بريد عالميين:'
                      : 'FadeInbox features a custom multi-adapter engine that seamlessly aggregates and provides fallback redundancy across 5 global temp mail networks:'}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                    <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center font-bold">1. Mail.tm</span>
                    <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center font-bold">2. Mail.gw</span>
                    <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center font-bold">3. 1SecMail</span>
                    <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center font-bold">4. Guerrilla Mail</span>
                    <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center font-bold">5. DropMail.me</span>
                    <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center font-bold text-indigo-600 dark:text-indigo-400">Firebase Cloud</span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Contact & Support Modal */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl p-5 sm:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {t('contactSupport')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isRtl ? 'نسعد دائماً باستقبال اقتراحاتكم واستفساراتكم' : 'Direct Support & Developer Inquiries'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  {t('officialEmail')}
                </span>
                <div className="font-mono text-sm font-bold text-slate-900 dark:text-white select-all">
                  {developerEmail}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isRtl ? 'متوسط وقت الرد: أقل من 24-48 ساعة عمل.' : 'Average response turnaround: < 24-48 hours.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-xs cursor-pointer transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>{isRtl ? 'تم النسخ!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{t('copyEmail')}</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${developerEmail}?subject=FadeInbox%20Inquiry%20-%20Support`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>{t('openEmailClient')}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick FAQ Section */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                <span>{t('tabFaq')}</span>
              </h4>

              <div className="space-y-2">
                {[
                  {
                    q: isRtl ? 'هل الخدمة مجانية دائماً؟' : 'Is FadeInbox completely free?',
                    a: isRtl
                      ? 'نعم، الخدمة الأساسية وتوليد العناوين المؤقتة وحمايتها مجانية بنسبة 100% وبدون أي رسوم خفية.'
                      : 'Yes, generating temporary email addresses, receiving attachments, and instant self-destruction are 100% free.',
                  },
                  {
                    q: isRtl ? 'هل يمكنني استرجاع بريد بعد انتهاء مدته؟' : 'Can I restore an expired address?',
                    a: isRtl
                      ? 'العناوين العادية تتلف ذاتياً مع رسائلها. ولكن إذا قمت بتسجيل الدخول بـ Google وحفظت الرسائل المهمة في الخزنة (Vault)، فستظل محفوظة في حسابك بشكل دائم.'
                      : 'Standard temporary addresses purge upon timer expiration. However, registered Google accounts can bookmark critical emails to the permanent Cloud Vault.',
                  },
                  {
                    q: isRtl ? 'هل يتم حظر الرسائل المزعجة؟' : 'How does spam protection work?',
                    a: isRtl
                      ? 'نعم، بفضل نظام العزل الذاتي، لا يستطيع أي طرف ثالث تعقب عنوان بريدك الحقيقي لأنك تشارك فقط عنوانك المؤقت المعزول.'
                      : 'All incoming emails are isolated within ephemeral instances, preventing sender trackers and marketing bots from acquiring your real email.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-3 text-left ltr:text-left rtl:text-right flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          openFaqIndex === idx ? 'rotate-180 text-indigo-500' : ''
                        }`}
                      />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-3 pb-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/40 dark:border-slate-700/40 pt-2 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
