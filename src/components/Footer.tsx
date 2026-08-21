import React, { useState, useEffect } from 'react';
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
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Layers,
  Award,
  Zap,
} from 'lucide-react';

type ModalType = 'privacy' | 'terms' | 'about' | 'contact' | null;

interface LocalizedLegalData {
  lastUpdated: string;
  privacy: {
    overviewTitle: string;
    overviewText: string;
    storageTitle: string;
    storageText: string;
    adsenseTitle: string;
    adsenseIntro: string;
    adsensePoints: string[];
    adsenseOptOut: string;
    gdprTitle: string;
    gdprText: string;
    ccpaTitle: string;
    ccpaText: string;
    securityTitle: string;
    securityText: string;
    cloudTitle: string;
    cloudText: string;
  };
  terms: {
    scopeTitle: string;
    scopeText: string;
    natureTitle: string;
    natureText: string;
    usageTitle: string;
    usagePoints: string[];
    prohibitedTitle: string;
    prohibitedPoints: string[];
    disclaimerTitle: string;
    disclaimerText: string;
  };
  about: {
    missionTitle: string;
    missionText: string;
    freeBadge: string;
    freeSub: string;
    providerBadge: string;
    providerSub: string;
    devTitle: string;
    devRole: string;
    devBio: string;
    techTitle: string;
    techText: string;
  };
  contact: {
    subTitle: string;
    responseSpeed: string;
    faqs: Array<{ q: string; a: string }>;
  };
}

const LEGAL_DICTIONARY: Record<string, LocalizedLegalData> = {
  ar: {
    lastUpdated: 'آخر تحديث: أغسطس 2026',
    privacy: {
      overviewTitle: '1. فلسفة الخصوصية أولاً واللا سجلات (Zero-Log)',
      overviewText:
        'في FadeInbox، نؤمن بأن الخصوصية حق أساسي للجميع. صُممت منصتنا من الصفر بحيث لا تتطلب منك أي بيانات شخصية، أو أرقام هواتف، أو عناوين بريد حقيقية للبدء في توليد العناوين المؤقتة.',
      storageTitle: '2. الإتلاف الذاتي والتخزين المؤقت',
      storageText:
        'جميع العناوين ورسائل البريد الواردة مؤقتة بشكل صارم وتعيش فقط في الذاكرة المؤقتة خلال مدة الصلاحية المحددة. بمجرد انتهاء المؤقت، يتم إتلاف الرسائل والعناوين نهائياً وبلا رجعة دون حفظ أي أرشيف دائم.',
      adsenseTitle: 'إفصاح إعلانات Google وملفات تعريف الارتباط (DART Cookies)',
      adsenseIntro:
        'تستخدم منصة FadeInbox خدمات إعلانية مقدمة من طرف ثالث، وتحديداً Google AdSense، لعرض الإعلانات عند زيارة موقعنا.',
      adsensePoints: [
        'تستخدم Google بصفتها مورداً لطرف ثالث ملفات تعريف الارتباط (Cookies) لعرض الإعلانات على موقعنا بناءً على زيارات المستخدمين السابقة لهذا الموقع أو لمواقع أخرى على شبكة الإنترنت.',
        'يمكّن استخدام ملفات تعريف الارتباط الإعلانية Google وشركاءها من تقديم إعلانات مخصصة للمستخدمين استناداً إلى سجل تصفحهم العام.',
      ],
      adsenseOptOut: 'يمكن للمستخدمين إلغاء الاشتراك في الإعلانات المخصصة وتعديل إعدادات خصوصية الإعلانات في أي وقت عبر زيارة:',
      gdprTitle: 'حقوق المستخدمين بموجب اللائحة الأوروبية العامة (GDPR)',
      gdprText:
        'يحق لكل مستخدم في الاتحاد الأوروبي: الحق في المعرفة والوصول، الحق في طلب مسح البيانات (الحق في النسيان)، والحق في تقييد المعالجة. نظراً لأن منصتنا لا تحتفظ بأي بيانات شخصية للزوار العاديين، فإن بياناتك محمية بشكل كامل وفوري.',
      ccpaTitle: 'قانون خصوصية المستهلك في كاليفورنيا (CCPA)',
      ccpaText:
        'نحن نلتزم بصرامة بعدم بيع أي بيانات للمستخدمين ("Do Not Sell My Personal Information"). لا نقوم بتسويق أو تبادل أو تحقيق أي مكاسب مالية من تداول بياناتك الشخصية مع أي جهات خارجية.',
      securityTitle: 'التشفير وحماية البيانات بنقل TLS 1.3',
      securityText:
        'يتم تشفير كافة الاتصالات بين متصفحك وخوادم البريد عبر بروتوكولات HTTPS/TLS 1.3 الحديثة والمحمية ضد أي تنصت أو اعتراض خارجي.',
      cloudTitle: 'التخزين السحابي للمستخدمين المسجلين (Firebase Cloud Vault)',
      cloudText:
        'عند تسجيل الدخول الاختياري بحساب Google واستخدام الخزنة (Vault)، يتم تشفير وحفظ السجلات في Firebase Firestore تحت معرّف حسابك (UID) فقط، ولا يمكن لأي مستخدم آخر الوصول إليها، وتستطيع حذفها بضغطة زر في أي وقت.',
    },
    terms: {
      scopeTitle: 'الموافقة على الشروط',
      scopeText:
        'باستخدامك لمنصة FadeInbox، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، فيُرجى التوقف فوراً عن استخدام الخدمة.',
      natureTitle: 'طبيعة الخدمة المؤقتة',
      natureText:
        'توفر المنصة خدمة إنشاء عناوين بريد إلكتروني مؤقتة تستقبل الرسائل لفترة محددة ثم تتلف ذاتياً لحماية صندوق بريدك الأساسي من الرسائل المزعجة وتأكيد الحسابات بشكل آمن.',
      usageTitle: 'الاستخدامات الموصى بها والمشروعة',
      usagePoints: [
        'التسجيل في المواقع والمنتديات التي لا ترغب بمشاركتها بريدك الشخصي الحقيقي.',
        'اختبار أنظمة إرسال البريد وتطبيقات الويب للمطورين (QA Testing).',
        'تجنب القوائم البريدية المزعجة وحملات التسويق العشوائي.',
      ],
      prohibitedTitle: 'الأنشطة المحظورة قطعياً',
      prohibitedPoints: [
        'استخدام الخدمة في أي عمليات احتيال مالي، أو تزييف، أو انتهاك حقوق الغير.',
        'محاولة إرسال برمجيات خبيثة أو هجمات حجب الخدمة (DDoS).',
        'أي استخدام يخالف القوانين والأنظمة المعمول بها دولياً ومحلياً.',
      ],
      disclaimerTitle: 'تنبيه عدم استخدام الخدمة للحسابات البنكية أو الرسمية',
      disclaimerText:
        'نظراً لأن العناوين المؤقتة تُحذف تلقائياً، يُحظر ولا يُنصح إطلاقاً باستخدامها في إنشاء حسابات مصرفية، أو معاملات مالية، أو استرجاع كلمات مرور الحسابات الحكومية أو الحساسة، ولا تتحمل المنصة أي مسؤولية عن فقدان الرسائل بعد انتهاء صلاحيتها.',
    },
    about: {
      missionTitle: 'رؤية منصة FadeInbox',
      missionText:
        'صُممت منصة FadeInbox لتكون الحل العصري الأسرع والأكثر أماناً لمشكلة الرسائل المزعجة وانتهاكات الخصوصية الرقمية. نوفر صندوق بريد مؤقت فوري يتلف تلقائياً ومجهز بتقنيات متعددة المحركات لضمان عدم توقف الخدمة أبداً.',
      freeBadge: '100% مجانية',
      freeSub: 'مجانية بالكامل للجميع',
      providerBadge: '5 محركات',
      providerSub: 'محركات بريد احتياطية',
      devTitle: 'EHABOOO (إيهاب قاسم)',
      devRole: 'Lead Software Architect & Creator of FadeInbox',
      devBio:
        'مطور برمجيات شغوف ببناء تطبيقات الويب الحديثة ذات الأداء الفائق والواجهات التفاعلية الأنيقة. تم بناء FadeInbox برؤية هندسية تضع خصوصية المستخدم والسرعة العالية في المقام الأول.',
      techTitle: 'محركات البريد الخمسة المتكاملة (Multi-Provider Redundancy)',
      techText:
        'لضمان أعلى معايير الاستقرار وتجنب أي انقطاع، يتكامل FadeInbox بسلاسة مع 5 مزودي بريد عالميين (Mail.tm, Mail.gw, 1SecMail, Guerrilla Mail, DropMail.me).',
    },
    contact: {
      subTitle: 'نسعد دائماً باستقبال اقتراحاتكم واستفساراتكم',
      responseSpeed: 'متوسط وقت الرد: أقل من 24-48 ساعة عمل.',
      faqs: [
        {
          q: 'هل الخدمة مجانية دائماً؟',
          a: 'نعم، الخدمة الأساسية وتوليد العناوين المؤقتة وحمايتها مجانية بنسبة 100% وبدون أي رسوم خفية.',
        },
        {
          q: 'هل يمكنني استرجاع بريد بعد انتهاء مدته؟',
          a: 'العناوين العادية تتلف ذاتياً مع رسائلها. ولكن إذا قمت بتسجيل الدخول بـ Google وحفظت الرسائل المهمة في الخزنة (Vault)، فستظل محفوظة في حسابك بشكل دائم.',
        },
        {
          q: 'هل يتم حظر الرسائل المزعجة؟',
          a: 'نعم، بفضل نظام العزل الذاتي، لا يستطيع أي طرف ثالث تعقب عنوان بريدك الحقيقي لأنك تشارك فقط عنوانك المؤقت المعزول.',
        },
      ],
    },
  },
  en: {
    lastUpdated: 'Last Updated: August 2026',
    privacy: {
      overviewTitle: '1. Privacy-First & Zero-Log Guarantee',
      overviewText:
        'At FadeInbox, privacy is a fundamental human right. Our architecture is engineered from the ground up so you never need to provide personal identifiable information, phone numbers, or real email addresses to use our temporary mail services.',
      storageTitle: '2. Ephemeral Storage & Self-Destruction',
      storageText:
        'All temporary addresses and received emails reside strictly in transient memory for the selected duration (10 minutes up to 7 days). Once the lifespan timer expires, messages are permanently purged from cache with zero recoverable trace.',
      adsenseTitle: 'Google AdSense & DART Cookies Disclosure',
      adsenseIntro:
        'FadeInbox partners with third-party advertising vendors, including Google AdSense, to serve contextual and relevant ads when you visit our website.',
      adsensePoints: [
        'Google, as a third-party vendor, uses cookies (including DART cookies) to serve ads to users based on their visit to FadeInbox and other sites across the Internet.',
        "Google's use of advertising cookies enables it and its network partners to serve tailored ads to your browser based on visiting our site and/or other sites on the Internet.",
      ],
      adsenseOptOut: 'Users may opt out of personalized advertising at any time by managing their settings via:',
      gdprTitle: 'GDPR Compliance (European Union / UK)',
      gdprText:
        'Under the General Data Protection Regulation, EU and UK residents are entitled to: The Right of Access, Right to Erasure ("Right to be Forgotten"), and Right to Restrict Processing. Since FadeInbox does not retain permanent identification for guest sessions, your footprint remains zero.',
      ccpaTitle: 'California Consumer Privacy Act (CCPA)',
      ccpaText:
        'FadeInbox strictly adheres to a "Do Not Sell My Personal Information" policy. We do not sell, rent, monetize, or broker personal consumer information to any third parties.',
      securityTitle: 'End-to-End TLS 1.3 Transport Security',
      securityText:
        'All communications between your client device and email mailboxes are protected with state-of-the-art TLS 1.3 and HTTPS encryption, mitigating interception and eavesdropping.',
      cloudTitle: 'Cloud Storage for Registered Users',
      cloudText:
        'If you opt in to sign in with Google to sync address history or preserve messages in the Vault, data is stored securely in Firebase Firestore scoped strictly to your authenticated UID. You retain complete control to delete any record at any time.',
    },
    terms: {
      scopeTitle: 'Acceptance of Terms',
      scopeText:
        'By accessing or utilizing FadeInbox, you signify full agreement to these Terms of Service. If you disagree with any part of these provisions, you must cease using the platform immediately.',
      natureTitle: 'Automated Disposable Utility',
      natureText:
        'FadeInbox provides an automated disposable email generator designed for receiving ephemeral messages, software QA testing, and protecting primary inboxes from unwanted solicitations.',
      usageTitle: 'Authorized & Recommended Use Cases',
      usagePoints: [
        'Signing up for free trials, webinars, or forums without disclosing personal credentials.',
        'Developer sandbox workflows, automated test pipelines, and QA inbox verification.',
        'Circumventing aggressive marketing trackers and keeping primary mail accounts spam-free.',
      ],
      prohibitedTitle: 'Strictly Prohibited Conduct',
      prohibitedPoints: [
        'Engaging in cyber fraud, money laundering, phishing, or financial spoofing.',
        'Attempting to inject malware, automate abusive traffic, or execute denial of service attacks.',
        'Any unlawful conduct violating international telecommunication regulations.',
      ],
      disclaimerTitle: 'Critical Non-Permanent Account Warning',
      disclaimerText:
        'Because addresses self-destruct upon expiration, you MUST NOT use FadeInbox as the primary recovery email for banking, credit cards, government portals, or critical credentials. FadeInbox bears no liability for unrecoverable expired messages.',
    },
    about: {
      missionTitle: 'The Mission of FadeInbox',
      missionText:
        'FadeInbox was created to deliver an ultra-fast, barrier-free, privacy-preserving disposable inbox engine. Our goal is to empower users worldwide against digital tracking, data brokers, and endless spam newsletters.',
      freeBadge: '100% Free',
      freeSub: 'Always Free for Everyone',
      providerBadge: '5 Providers',
      providerSub: 'Redundant Mail Engines',
      devTitle: 'EHABOOO (إيهاب قاسم)',
      devRole: 'Lead Software Architect & Creator of FadeInbox',
      devBio:
        'A passionate software engineer specialized in crafting high-performance, privacy-centric web applications and modern interactive UI experiences. FadeInbox is built with love and meticulous engineering.',
      techTitle: '5-Engine Redundant Mail Adapter Architecture',
      techText:
        'FadeInbox features a custom multi-adapter engine that seamlessly aggregates and provides fallback redundancy across 5 global temp mail networks (Mail.tm, Mail.gw, 1SecMail, Guerrilla Mail, DropMail.me).',
    },
    contact: {
      subTitle: 'Direct Support & Developer Inquiries',
      responseSpeed: 'Average response turnaround: < 24-48 hours.',
      faqs: [
        {
          q: 'Is FadeInbox completely free?',
          a: 'Yes, generating temporary email addresses, receiving attachments, and instant self-destruction are 100% free.',
        },
        {
          q: 'Can I restore an expired address?',
          a: 'Standard temporary addresses purge upon timer expiration. However, registered Google accounts can bookmark critical emails to the permanent Cloud Vault.',
        },
        {
          q: 'How does spam protection work?',
          a: 'All incoming emails are isolated within ephemeral instances, preventing sender trackers and marketing bots from acquiring your real email.',
        },
      ],
    },
  },
  zh: {
    lastUpdated: '最后更新：2026年8月',
    privacy: {
      overviewTitle: '1. 隐私优先与零日志保证',
      overviewText:
        '在 FadeInbox，隐私是基本人权。我们的架构经过专门设计，您无需提供个人可识别信息、手机号或真实邮箱即可使用我们的临时邮箱服务。',
      storageTitle: '2. 临时存储与自动销毁',
      storageText:
        '所有临时地址和接收到的邮件仅在选定的有效期内保存在临时内存中。一旦计时器到期，邮件将从缓存中永久清除，不留痕迹。',
      adsenseTitle: 'Google AdSense 与 DART Cookie 公告',
      adsenseIntro:
        'FadeInbox 与第三方广告提供商（包括 Google AdSense）合作，在您访问我们的网站时展示相关广告。',
      adsensePoints: [
        'Google 作为第三方供应商，使用 Cookie（包括 DART Cookie）根据用户访问 FadeInbox 和互联网上其他网站的记录向其投放广告。',
        'Google 对广告 Cookie 的使用使其及其合作伙伴能够根据用户访问本网站和/或互联网其他网站的情况向您的浏览器投放广告。',
      ],
      adsenseOptOut: '用户可以随时通过以下链接选择退出个性化广告：',
      gdprTitle: 'GDPR 合规性（欧盟与英国）',
      gdprText:
        '根据《通用数据保护条例》(GDPR)，用户享有知情权、访问权、被遗忘权和限制处理权。由于 FadeInbox 不保留访客的永久身份信息，您的数字足迹始终为零。',
      ccpaTitle: '加州消费者隐私法案 (CCPA)',
      ccpaText:
        'FadeInbox 严格遵守“不出售我的个人信息”政策。我们绝不会向任何第三方出售、出租或交易用户的个人信息。',
      securityTitle: '端到端 TLS 1.3 传输加密',
      securityText:
        '您的设备与邮箱之间的所有网络通信均受到行业顶级的 TLS 1.3 和 HTTPS 加密保护，有效防止任何中间人监听。',
      cloudTitle: '已登录用户的云端保险库 (Firebase Cloud Vault)',
      cloudText:
        '如果您选择使用 Google 账号登录以同步历史记录或永久保存邮件，数据将严格隔离加密保存在 Firebase Firestore 中，您可随时一键删除。',
    },
    terms: {
      scopeTitle: '条款接受与服务范围',
      scopeText:
        '访问或使用 FadeInbox 即表示您完全同意这些服务条款。如果您不同意这些规定的任何部分，请立即停止使用本平台。',
      natureTitle: '自动化即用即弃临时邮箱',
      natureText:
        'FadeInbox 提供自动化临时邮箱生成服务，专为接收临时验证邮件、软件开发测试以及保护主邮箱免受垃圾邮件干扰而设计。',
      usageTitle: '授权与推荐使用场景',
      usagePoints: [
        '注册试用、论坛或网页时，无需泄露真实的个人主邮箱。',
        '开发者沙盒测试、自动化流水线测试以及 QA 收件箱验证。',
        '阻断营销追踪器，保持个人主邮箱清新无垃圾。',
      ],
      prohibitedTitle: '严禁的滥用行为',
      prohibitedPoints: [
        '从事网络欺诈、洗钱、钓鱼攻击或金融诈骗活动。',
        '尝试注入恶意软件、自动化恶意流量或发起 DDoS 拒绝服务攻击。',
        '违反当地或国际法律法规的任何非法行为。',
      ],
      disclaimerTitle: '重要非永久账户安全警告',
      disclaimerText:
        '由于临时邮箱到期即自动销毁，切勿将 FadeInbox 用于银行账户、信用卡、政务服务或关键账户的安全恢复邮箱。FadeInbox 对过期邮件的丢失概不负责。',
    },
    about: {
      missionTitle: 'FadeInbox 的使命',
      missionText:
        'FadeInbox 旨在提供一个超快速、无门槛、尊重隐私的一次性收件箱引擎。我们的目标是保护全球用户免受追踪、数据交易和垃圾邮件的困扰。',
      freeBadge: '100% 免费',
      freeSub: '始终面向全员免费',
      providerBadge: '5 大引擎',
      providerSub: '多线路冗余容灾',
      devTitle: 'EHABOOO (إيهاب قاسم)',
      devRole: '主创软件架构师 & FadeInbox 创始人',
      devBio:
        '热衷于打造高性能、注重隐私的现代 Web 应用和精致交互 UI。FadeInbox 倾注了用心与精密的工程设计。',
      techTitle: '五大引擎自适应多核架构',
      techText:
        'FadeInbox 拥有自研多适配器引擎，可无缝聚合 5 大全球临时邮件网络 (Mail.tm, Mail.gw, 1SecMail, Guerrilla Mail, DropMail.me) 并实现毫秒级自动容灾。',
    },
    contact: {
      subTitle: '直接支持与开发者联系',
      responseSpeed: '平均回复时间：24-48 个工作小时内。',
      faqs: [
        {
          q: 'FadeInbox 是完全免费的吗？',
          a: '是的，生成临时邮箱地址、接收邮件及附件以及自动自毁功能 100% 免费。',
        },
        {
          q: '过期后的邮箱可以恢复吗？',
          a: '普通临时邮箱到期即彻底销毁。但如果您登录 Google 账号并将重要邮件保存至云端保险库，该邮件将永久保存。',
        },
        {
          q: '防垃圾邮件是如何工作的？',
          a: '所有接收到的邮件都在隔离沙盒中处理，发件人的追踪像素和营销机器人永远无法探测到您的真实身份。',
        },
      ],
    },
  },
  es: {
    lastUpdated: 'Última actualización: Agosto 2026',
    privacy: {
      overviewTitle: '1. Privacidad Primero y Cero Registros',
      overviewText:
        'En FadeInbox, la privacidad es un derecho humano. No recopilamos datos personales, números de teléfono ni correos reales para usar nuestro servicio temporal.',
      storageTitle: '2. Almacenamiento Efímero y Autodestrucción',
      storageText:
        'Todas las direcciones y correos entrantes residen estrictamente en la memoria temporal durante el tiempo seleccionado y se purgan permanentemente al expirar.',
      adsenseTitle: 'Divulgación de Google AdSense y Cookies DART',
      adsenseIntro:
        'FadeInbox utiliza Google AdSense para mostrar anuncios relevantes a nuestros visitantes.',
      adsensePoints: [
        'Google utiliza cookies para publicar anuncios basados en las visitas anteriores de los usuarios a este y otros sitios web.',
        'El uso de cookies publicitarias permite a Google y sus socios mostrar anuncios basados en su navegación en Internet.',
      ],
      adsenseOptOut: 'Puede inhabilitar la publicidad personalizada en cualquier momento visitando:',
      gdprTitle: 'Cumplimiento del RGPD (Unión Europea)',
      gdprText:
        'Cumplimos plenamente con los derechos de acceso, rectificación y supresión (derecho al olvido) del Reglamento General de Protección de Datos.',
      ccpaTitle: 'Ley de Privacidad del Consumidor de California (CCPA)',
      ccpaText:
        'FadeInbox no vende ni monetiza su información personal a terceros bajo ninguna circunstancia.',
      securityTitle: 'Seguridad y Cifrado TLS 1.3',
      securityText:
        'Todas las conexiones están protegidas con cifrado TLS 1.3 y HTTPS de última generación.',
      cloudTitle: 'Almacenamiento Seguro para Usuarios Registrados',
      cloudText:
        'Los correos guardados en la Bóveda se almacenan de forma segura en Firebase Firestore vinculados únicamente a su cuenta.',
    },
    terms: {
      scopeTitle: 'Aceptación de los Términos',
      scopeText:
        'El uso de FadeInbox implica la aceptación plena de estos términos de servicio.',
      natureTitle: 'Utilidad Desechable Automatizada',
      natureText:
        'FadeInbox está diseñado para recibir correos temporales, pruebas de software y evitar el spam en su bandeja de entrada.',
      usageTitle: 'Usos Permitidos',
      usagePoints: [
        'Registros en foros y pruebas sin revelar su correo personal.',
        'Pruebas de desarrollo y control de calidad (QA).',
        'Evitar el spam y listas de distribución masiva.',
      ],
      prohibitedTitle: 'Actividades Prohibidas',
      prohibitedPoints: [
        'Fraude cibernético, phishing o actividades ilegales.',
        'Envío de malware o ataques de denegación de servicio (DDoS).',
      ],
      disclaimerTitle: 'Advertencia de Uso No Permanente',
      disclaimerText:
        'No use FadeInbox para cuentas bancarias o servicios críticos, ya que las direcciones expiran automáticamente.',
    },
    about: {
      missionTitle: 'Misión de FadeInbox',
      missionText:
        'FadeInbox fue creado para ofrecer un servicio de correo temporal ultrarrápido, seguro y respetuoso con la privacidad.',
      freeBadge: '100% Gratis',
      freeSub: 'Siempre gratis para todos',
      providerBadge: '5 Proveedores',
      providerSub: 'Redundancia automática',
      devTitle: 'EHABOOO (إيهاب قاسم)',
      devRole: 'Arquitecto Líder y Creador',
      devBio:
        'Ingeniero de software especializado en aplicaciones web de alto rendimiento y enfocadas en la privacidad del usuario.',
      techTitle: 'Arquitectura Multi-Motor',
      techText:
        'Integración con 5 redes de correo temporal globales para garantizar la máxima disponibilidad.',
    },
    contact: {
      subTitle: 'Soporte y Contacto Directo',
      responseSpeed: 'Tiempo promedio de respuesta: < 24-48 horas.',
      faqs: [
        {
          q: '¿FadeInbox es completamente gratis?',
          a: 'Sí, todas las funciones de correo temporal y autodestrucción son 100% gratuitas.',
        },
        {
          q: '¿Puedo recuperar un correo expirado?',
          a: 'Las direcciones estándar se purgan al expirar. Solo los correos guardados en la Bóveda con cuenta Google permanecen.',
        },
      ],
    },
  },
};

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Modal sub-tab state
  const [privacyTab, setPrivacyTab] = useState<'overview' | 'adsense' | 'gdpr' | 'security'>('overview');
  const [termsTab, setTermsTab] = useState<'terms' | 'usage' | 'prohibited' | 'disclaimer'>('terms');
  const [aboutTab, setAboutTab] = useState<'about' | 'developer' | 'tech'>('about');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const currentLangCode = i18n.language || 'en';
  const legalData = LEGAL_DICTIONARY[currentLangCode] || LEGAL_DICTIONARY.en;
  const currentYear = new Date().getFullYear();
  const developerEmail = 'EHABOOO.FadeInbox@gmail.com';

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

      {/* 1. Privacy Policy Modal */}
      {activeModal === 'privacy' && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
        >
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
                    {legalData.lastUpdated}
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

            {/* Tab 1: Overview */}
            {privacyTab === 'overview' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{legalData.privacy.overviewTitle}</span>
                  </div>
                  <p>{legalData.privacy.overviewText}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {legalData.privacy.storageTitle}
                  </h4>
                  <p>{legalData.privacy.storageText}</p>
                </div>
              </div>
            )}

            {/* Tab 2: AdSense & Cookies */}
            {privacyTab === 'adsense' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
                    <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>{legalData.privacy.adsenseTitle}</span>
                  </div>
                  <p>{legalData.privacy.adsenseIntro}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-300">
                    {legalData.privacy.adsensePoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-2">
                  <p className="font-bold text-indigo-900 dark:text-indigo-200">{legalData.privacy.adsenseOptOut}</p>
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

            {/* Tab 3: GDPR & CCPA */}
            {privacyTab === 'gdpr' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {legalData.privacy.gdprTitle}
                  </h4>
                  <p>{legalData.privacy.gdprText}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {legalData.privacy.ccpaTitle}
                  </h4>
                  <p>{legalData.privacy.ccpaText}</p>
                </div>
              </div>
            )}

            {/* Tab 4: Security & Cloud */}
            {privacyTab === 'security' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-bold text-sm">
                    <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{legalData.privacy.securityTitle}</span>
                  </div>
                  <p>{legalData.privacy.securityText}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {legalData.privacy.cloudTitle}
                  </h4>
                  <p>{legalData.privacy.cloudText}</p>
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

      {/* 2. Terms of Service Modal */}
      {activeModal === 'terms' && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
        >
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
                    {legalData.lastUpdated}
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
                {legalData.terms.scopeTitle}
              </button>
              <button
                onClick={() => setTermsTab('usage')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  termsTab === 'usage'
                    ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {legalData.terms.usageTitle}
              </button>
              <button
                onClick={() => setTermsTab('prohibited')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  termsTab === 'prohibited'
                    ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {legalData.terms.prohibitedTitle}
              </button>
              <button
                onClick={() => setTermsTab('disclaimer')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  termsTab === 'disclaimer'
                    ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {legalData.terms.disclaimerTitle}
              </button>
            </div>

            {/* Terms Content */}
            {termsTab === 'terms' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {legalData.terms.scopeTitle}
                  </h4>
                  <p>{legalData.terms.scopeText}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {legalData.terms.natureTitle}
                  </h4>
                  <p>{legalData.terms.natureText}</p>
                </div>
              </div>
            )}

            {termsTab === 'usage' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-xs">
                    {legalData.terms.usageTitle}
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5">
                    {legalData.terms.usagePoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {termsTab === 'prohibited' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-bold text-xs">
                    <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>{legalData.terms.prohibitedTitle}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-rose-900/90 dark:text-rose-200/90">
                    {legalData.terms.prohibitedPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {termsTab === 'disclaimer' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                    {legalData.terms.disclaimerTitle}
                  </h4>
                  <p>{legalData.terms.disclaimerText}</p>
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
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
        >
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
                    <span>{legalData.about.missionTitle}</span>
                  </div>
                  <p>{legalData.about.missionText}</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
                    <div className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">{legalData.about.freeBadge}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{legalData.about.freeSub}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
                    <div className="text-base font-black text-purple-600 dark:text-purple-400 font-mono">{legalData.about.providerBadge}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{legalData.about.providerSub}</div>
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
                        <span>{legalData.about.devTitle}</span>
                        <Sparkles className="w-4 h-4 text-amber-500" />
                      </h4>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                        {legalData.about.devRole}
                      </p>
                    </div>
                  </div>

                  <p>{legalData.about.devBio}</p>
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
                        <span>{t('copied')}</span>
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
                    <span>{legalData.about.techTitle}</span>
                  </h4>
                  <p>{legalData.about.techText}</p>
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
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
        >
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
                    {legalData.contact.subTitle}
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
                  {legalData.contact.responseSpeed}
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
                      <span>{t('copied')}</span>
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
                {legalData.contact.faqs.map((item, idx) => (
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
