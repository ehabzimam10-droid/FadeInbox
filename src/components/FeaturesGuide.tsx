import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  Zap,
  Lock,
  Mail,
  RefreshCw,
  Trash2,
  Layers,
  Sparkles,
  CheckCircle2,
  Globe2,
  Laptop,
  Flame,
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function FeaturesGuide() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const steps = [
    {
      num: '01',
      icon: <Mail className="w-5 h-5 text-indigo-500" />,
      title: isRtl ? 'توليد فوري أو مخصص' : 'Instant or Custom Alias',
      desc: isRtl
        ? 'احصل على عنوان بريد إلكتروني مؤقت بضغطة زر واحدة أو اختر اسماً مخصصاً ونطاقاً مفضلاً من بين نطاقات متعددة.'
        : 'Generate a burner email with a single click or create a custom username across multiple resilient domains.',
    },
    {
      num: '02',
      icon: <RefreshCw className="w-5 h-5 text-purple-500" />,
      title: isRtl ? 'استقبال البريد في الوقت الفعلي' : 'Real-Time Live Inbox',
      desc: isRtl
        ? 'استقبل الرسائل النصية، ورسائل الـ HTML المنسقة، والمرفقات بسرعة فائقة وبدون أي تأخير أو حاجة لإعادة تحميل الصفحة.'
        : 'Receive rich HTML messages, confirmation links, and file attachments in real time with automated inbox polling.',
    },
    {
      num: '03',
      icon: <Trash2 className="w-5 h-5 text-rose-500" />,
      title: isRtl ? 'إتلاف ذاتي وتشفير' : 'Auto Self-Destruction',
      desc: isRtl
        ? 'يتلف العنوان ورسائله تلقائياً بمجرد انتهاء المؤقت المحدد (من 10 دقائق حتى 7 أيام) دون ترك أي سجلات رقمية.'
        : 'Addresses and incoming emails are purged permanently upon timer expiry, leaving zero tracking footprint.',
    },
  ];

  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: isRtl ? 'سياسة الخصوصية الصارمة (Zero-Log)' : 'Zero-Log Privacy Architecture',
      desc: isRtl
        ? 'لا نطلب أي بيانات شخصية، أو أرقام هواتف، أو بطاقات ائتمانية. جلستك كزائر مجهولة الهوية بنسبة 100% ومحمية من التتبع.'
        : 'No personal data, phone numbers, or passwords required. Guest sessions operate completely anonymously.',
    },
    {
      icon: <Layers className="w-6 h-6 text-indigo-500" />,
      title: isRtl ? 'معمارية 5 محركات بريد احتياطية' : '5-Engine Redundant Infrastructure',
      desc: isRtl
        ? 'نظام ذكي يربط بين 5 مزودي بريد عالميين (Mail.tm, Mail.gw, 1SecMail, GuerrillaMail, DropMail) لضمان استقرار الخدمة دائماً.'
        : 'Multi-adapter backend aggregates top global temp mail providers, ensuring continuous 99.9% uptime.',
    },
    {
      icon: <Lock className="w-6 h-6 text-purple-500" />,
      title: isRtl ? 'تشفير شامل TLS 1.3' : 'End-to-End TLS 1.3 Encryption',
      desc: isRtl
        ? 'كافة الرسائل والاتصالات بين جهازك والخوادم مشفرة بأحدث بروتوكولات الأمان لمنع أي اعتراض أو تنصت خارجي.'
        : 'Bank-grade HTTPS and TLS 1.3 cryptography guard all network payloads against interception.',
    },
    {
      icon: <Laptop className="w-6 h-6 text-amber-500" />,
      title: isRtl ? 'بيئة مثالية للمطورين والاختبار' : 'Developer Sandbox & QA Testing',
      desc: isRtl
        ? 'أداة مثالية لمهندسي البرمجيات وفرق الجودة لاختبار تدفقات التسجيل، ورسائل التحقق، وأنظمة إرسال البريد.'
        : 'Streamline automated QA pipelines, signup verification workflows, and transactional email testing.',
    },
  ];

  return (
    <section className="w-full space-y-8 pt-6">
      {/* Section Header */}
      <div className="text-center space-y-2.5 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>{isRtl ? 'كيف يعمل FadeInbox؟' : 'How FadeInbox Works'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {isRtl
            ? 'حماية متكاملة لبريدك الأساسي في 3 خطوات بسيطة'
            : 'Complete Inbox Protection in 3 Easy Steps'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {isRtl
            ? 'تخلص من الرسائل الترويجية المزعجة ومخاطر تسريب البيانات الشخصية باستخدام بريد مؤقت آمن وسريع.'
            : 'Shield your personal inbox from spam, trackers, and data breaches using our instant self-destructing disposable email engine.'}
        </p>
      </div>

      {/* 3 Step Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step, idx) => (
          <SpotlightCard key={idx} className="p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
                  {step.icon}
                </div>
                <span className="font-mono text-2xl font-black text-slate-300 dark:text-slate-700">
                  {step.num}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isRtl ? 'تلقائي وآمن بالكامل' : '100% Automated & Secure'}</span>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* 4 Pillars Bento Grid */}
      <div className="space-y-4 pt-4">
        <div className="text-center sm:text-start">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <Flame className="w-4 h-4 text-purple-500" />
            <span>{isRtl ? 'لماذا يفضل الملايين FadeInbox؟' : 'Why Choose FadeInbox?'}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isRtl
              ? 'معايير تقنية عالمية تميزنا عن أي خدمة بريد مؤقت تقليدية'
              : 'Engineered with cutting-edge standards for uncompromising privacy and reliability.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow space-y-2.5"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
