import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BookOpen,
  Shield,
  Code2,
  Lock,
  ChevronRight,
  X,
  Clock,
  Sparkles,
  CheckCircle2,
  Share2,
  Check,
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';

interface ArticleData {
  id: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  content: string[];
}

interface ArticlesSectionData {
  badge: string;
  heading: string;
  subheading: string;
  readArticle: string;
  closeArticle: string;
  shareArticle: string;
  copiedLink: string;
  articles: ArticleData[];
}

const ARTICLES_DICTIONARY: Record<string, ArticlesSectionData> = {
  ar: {
    badge: 'المركز المعرفي ومقالات الأمان',
    heading: 'أدلة إرشادية ومقالات متعمقة في حماية الخصوصية الرقمية',
    subheading: 'تعرف على كيفية حماية بريدك الأساسي، وأسرار معمارية البريد المؤقت، وأفضل ممارسات الأمان ومكافحة التتبع.',
    readArticle: 'قراءة المقال كاملاً',
    closeArticle: 'إغلاق المقال',
    shareArticle: 'مشاركة المقال',
    copiedLink: 'تم نسخ الرابط!',
    articles: [
      {
        id: 'spam-protection-guide',
        category: 'الخصوصية ومكافحة التتبع',
        readTime: '4 دقائق قراءة',
        title: 'الدليل الشامل للتخلص من الرسائل المزعجة (Spam) وحماية الهوية الرقمية',
        excerpt: 'لماذا تشكل مشاركة بريدك الإلكتروني الشخصي في كل موقع خطراً حقيقياً؟ وكيف تمنع شركات التسويق وسماسرة البيانات من ملاحقتك.',
        content: [
          'في العصر الرقمي الحالي، أصبح عنوان بريدك الإلكتروني الشخصي بمثابة "رقم هويتك الرقمية" الذي يربط بين كافة حساباتك البنكية، وشبكات التواصل الاجتماعي، والخدمات الحكومية. ومع ذلك، تقوم معظم المواقع والمنتديات والمتاجر بطلب بريدك قبل السماح لك بتصفح محتواها أو تنزيل ملف.',
          'عندما تقدم بريدك الحقيقي لموقع غير موثوق، فإنك تعرض نفسك لثلاثة مخاطر كبرى: بيع بياناتك لسماسرة الإعلانات (Data Brokers)، إغراق صندوقك بمئات الرسائل الترويجية العشوائية، والأسوأ من ذلك، تعرض بريدك للتسريب عند اختراق قاعدة بيانات ذلك الموقع.',
          'هنا تكمن القوة الاستثنائية للبريد المؤقت (Disposable Email). من خلال توليد عنوان مؤقت مخصص ينتهي تلقائياً بعد دقائق أو ساعات، يمكنك تفعيل الحساب أو استلام رمز التأكيد فوراً، ثم إتلاف العنوان بالكامل دون أن تترك وراءك أي أثر رقمي يمكن تتبعه أو استهدافه بحملات السبام.',
        ],
      },
      {
        id: 'zero-log-architecture',
        category: 'الهندسة التقنية والتشفير',
        readTime: '5 دقائق قراءة',
        title: 'داخل النظام: كيف تعمل معمارية الإتلاف الذاتي والتخزين المؤقت (Zero-Log)؟',
        excerpt: 'فهم المعمارية البرمجية التي تضمن مسح الرسائل والعناوين نهائياً من الذاكرة المؤقتة بمجرد انتهاء الصلاحية دون حفظ أي سجلات دائمية.',
        content: [
          'تعتمد منصة FadeInbox على فلسفة أمنية صارمة تُعرف بـ "الخصوصية عبر التصميم" (Privacy by Design). على عكس خدمات البريد التقليدية التي تحتفظ بسجلات المراسلات على خوادم دائمة لسنوات، تعمل خوادم البريد المؤقت لدينا بنظام الذاكرة المتطايرة (In-Memory Ephemeral Storage).',
          'بمجرد إنشاء عنوان بريد جديد، يُخصص له مؤقت تنازلي دقيق. خلال فترة نشاطه، يستقبل العنوان الرسائل المشفرة عبر بروتوكولات TLS 1.3 الحديثة، ويتم إرسالها للمتصفح عبر اتصالات آمنة.',
          'فور انتهاء المؤقت المحدد (من 10 دقائق حتى 7 أيام)، يقوم النظام بعملية مسح فيزيائي قطعي (Cryptographic Purge) تُتلف العنوان وكافة مرفقاته ورسائله نهائياً، مما يجعل استرجاع البيانات أمراً مستحيلاً حتى على مديري الخوادم أنفسهم، وهو ما يضمن لك أعلى معايير الخصوصية العالمية.',
        ],
      },
      {
        id: 'qa-developers-testing',
        category: 'دليل المطورين وفرق الجودة',
        readTime: '4 دقائق قراءة',
        title: 'دليل مهندسي البرمجيات: أتمتة اختبارات التسجيل والتحقق من أكواد OTP',
        excerpt: 'كيف يستفيد مطورو تطبيقات الويب وفرق اختبار الجودة (QA) من البريد المؤقت لتسريع دورات الفحص وتجربة سيناريوهات التسجيل.',
        content: [
          'أحد أكبر التحديات التي تواجه مهندسي البرمجيات ومختبري الأنظمة أثناء تطوير تطبيقات الويب وتطبيقات الجوال هو اختبار مسارات تسجيل المستخدمين الجدد (Signup Flows) والتحقق من وصول رسائل التفعيل وأكواد OTP متعددة العوامل.',
          'استخدام البريد الشخصي في الاختبارات يؤدي إلى تلويث الصندوق الحقيقي ويستهلك وقتاً طويلاً في إنشاء حسابات تجريبية يدويًا. بينما يتيح FadeInbox للمطورين توليد عدد غير محدود من العناوين الفورية على نطاقات متنوعة.',
          'بفضل ميزة "المستخرج الذكي لرموز OTP"، يستطيع المطور نسخ كود التحقق أو فتح رابط التفعيل بنقرة واحدة مباشرة دون الحاجة للغوص داخل كود HTML الرسالة، مما يختصر وقت اختبار تدفقات التسجيل بنسبة تزيد عن 80%.',
        ],
      },
      {
        id: 'phishing-data-breach-defense',
        category: 'الأمن السيبراني والدفاع الرقمي',
        readTime: '6 دقائق قراءة',
        title: 'الدفاع ضد التصيد الاحتيالي وتسريبات قواعد البيانات: لماذا يعتبر البريد المؤقت خط الدفاع الأول؟',
        excerpt: 'تحليل شامل لكيفية تحييد هجمات التصيد الاحتيالي ومنع ربط بياناتك الشخصية عبر المنصات المختلفة.',
        content: [
          'تعتمد هجمات الهندسة الاجتماعية والتصيد الاحتيالي (Phishing) على جمع أكبر قدر ممكن من المعلومات عن الضحية عبر ربط بريده الإلكتروني المسرب في قواعد بيانات مختلفة لمعرفة اهتماماته والخدمات المشترك بها.',
          'عندما تستخدم بريداً مؤقتاً منفصلاً لكل خدمة غير أساسية، فإنك تقوم بما يسمى "تفتيت البصمة الرقمية" (Digital Footprint Compartmentalization). فإذا تم اختراق أحد تلك المواقع وتسريب قاعدة بياناته، فلن يحصل المخترق سوى على بريد مؤقت قد تم إتلافه بالفعل منذ أسابيع!',
          'هذه الاستراتيجية تجعل من المستحيل على القراصنة ربط حساباتك ببعضها أو استهدافك برسائل احتيالية موجهة، مما يجعل البريد المؤقت وسيلة دفاع سيبراني وقائية لا غنى عنها لكل مستخدم للإنترنت.',
        ],
      },
    ],
  },
  en: {
    badge: 'Knowledge Hub & Security Insights',
    heading: 'In-Depth Guides & Articles on Digital Privacy Protection',
    subheading: 'Learn how to safeguard your primary email, master temporary email architecture, and implement industry-leading privacy best practices.',
    readArticle: 'Read Full Article',
    closeArticle: 'Close Article',
    shareArticle: 'Share Article',
    copiedLink: 'Link Copied!',
    articles: [
      {
        id: 'spam-protection-guide',
        category: 'Privacy & Anti-Tracking',
        readTime: '4 min read',
        title: 'The Ultimate Guide to Eliminating Spam & Guarding Digital Identity',
        excerpt: 'Why sharing your primary personal email on every website is a major risk, and how disposable burner emails stop data brokers.',
        content: [
          'In modern digital architecture, your personal email address acts as your primary digital identity, tethering sensitive financial accounts, social profiles, and essential services. Yet, countless websites demand an email address just to read an article or download a file.',
          'Submitting your genuine address to untrusted portals exposes you to three critical vulnerabilities: third-party data broker monetisation, relentless marketing spam, and severe credential compromise if the target service suffers a security breach.',
          'Disposable temporary emails offer an impenetrable defensive barrier. By spinning up self-destructing addresses on demand, you receive confirmation tokens and activation links instantly, purging the address permanently once your task is complete.',
        ],
      },
      {
        id: 'zero-log-architecture',
        category: 'Engineering & Cryptography',
        readTime: '5 min read',
        title: 'Under the Hood: How Zero-Log Architecture & In-Memory Purging Work',
        excerpt: 'Explore the technical mechanics that guarantee total memory eradication of messages upon timer expiry with zero forensic trails.',
        content: [
          'FadeInbox is engineered upon strict Privacy-by-Design paradigms. Unlike legacy webmail providers that archive correspondence across persistent database clusters for years, our engine operates with ephemeral in-memory buffering.',
          'When a disposable address is provisioned, a deterministic countdown timer initiates. Incoming payloads are encrypted in transit via bank-grade TLS 1.3 cryptography and delivered to the client session in real time.',
          'Upon timer expiration (ranging from 10 minutes to 7 days), a physical cryptographic purge permanently shreds all associated metadata, headers, and attachments, making forensic data recovery technically impossible.',
        ],
      },
      {
        id: 'qa-developers-testing',
        category: 'Developer Handbook & QA',
        readTime: '4 min read',
        title: 'The Developer Guide: Streamlining Automated Signup & OTP Testing',
        excerpt: 'How software engineers and QA teams leverage temporary mail engines to accelerate validation pipelines and OTP extraction.',
        content: [
          'A pervasive bottleneck in modern software QA pipelines is verifying user registration flows, email verification webhooks, and multi-factor authentication (MFA) OTP codes.',
          'Testing with personal email accounts clutters inbox histories and requires tedious manual cleanup. FadeInbox empowers developers to spin up unlimited isolated addresses across resilient domain clusters.',
          'With automated OTP extraction, verification tokens and direct activation links are isolated into 1-click actions, accelerating regression testing cycles by over 80%.',
        ],
      },
      {
        id: 'phishing-data-breach-defense',
        category: 'Cybersecurity & Threat Defense',
        readTime: '6 min read',
        title: 'Phishing Defense & Data Breach Shield: Why Disposable Mail is Essential',
        excerpt: 'How burner emails compartmentalize your digital footprint and render credential leaks completely harmless.',
        content: [
          'Targeted phishing and social engineering campaigns rely on correlating a victim’s email address across leaked databases to reconstruct behavioral profiles.',
          'Using discrete disposable email aliases for non-critical platforms enforces digital footprint compartmentalization. In the event of a third-party breach, attackers only capture an inert, long-expired alias.',
          'This proactive cyber hygiene neutralizes cross-site tracking, credential stuffing, and spear-phishing threats at zero cost.',
        ],
      },
    ],
  },
  zh: {
    badge: '知识中心与安全洞察',
    heading: '深度指南：全方位守护您的数字隐私与收件箱安全',
    subheading: '掌握一次性临时邮箱的底层架构、垃圾邮件拦截秘籍与前沿网络安全防护策略。',
    readArticle: '阅读完整文章',
    closeArticle: '关闭文章',
    shareArticle: '分享文章',
    copiedLink: '链接已复制！',
    articles: [
      {
        id: 'spam-protection-guide',
        category: '隐私与反追踪',
        readTime: '4 分钟阅读',
        title: '彻底告别垃圾邮件与隐私泄露的终极防护指南',
        excerpt: '为什么在任何网站随意填写主邮箱是巨大隐患？了解如何通过一次性邮箱阻断数据贩子追踪。',
        content: [
          '在数字化时代，个人主邮箱犹如您的“数字身份证”，深度绑定银行、社交网络与关键政务服务。然而，无数下载站和论坛却强制要求填写邮箱才能获取资源。',
          '向不受信任的网站提交真实邮箱会带来三大风险：数据被非法倒卖、垃圾邮件轰炸，以及网站数据库遭黑客入侵时的凭证泄露。',
          'FadeInbox 一次性临时邮箱提供坚实护盾。您可以在数秒内生成具备自动销毁时效的临时邮箱，秒收验证码后彻底销毁，不留任何数字痕迹。',
        ],
      },
      {
        id: 'zero-log-architecture',
        category: '技术工程与加密',
        readTime: '5 分钟阅读',
        title: '架构解密：零日志（Zero-Log）与内存自毁系统如何运作？',
        excerpt: '深入了解倒计时结束后永久物理粉碎邮件数据的核心机制与端到端加密体系。',
        content: [
          'FadeInbox 严格遵循“设计即隐私”原则。与长期持久化存储邮件的传统邮箱不同，本系统采用纯内存级临时缓冲架构。',
          '当临时邮箱创建后，精确的倒计时随之启动。所有邮件在传输过程中均受顶级 TLS 1.3 和 HTTPS 加密保护。',
          '倒计时一旦归零（10分钟至7天），系统将执行不可逆的加密粉碎清除，物理抹除全部邮件正文与附件。',
        ],
      },
      {
        id: 'qa-developers-testing',
        category: '开发者手册与测试',
        readTime: '4 分钟阅读',
        title: '工程师效率指南：自动化注册流程与 OTP 验证码测试',
        excerpt: 'QA 团队与全栈开发人员如何利用临时邮箱提升测试效率并实现验证码一键提取。',
        content: [
          '在软件研发和 QA 测试流程中，验证用户注册链路、激活邮件发送与 MFA 验证码接收是必不可少的繁琐步骤。',
          '使用个人邮箱进行测试不仅会污染收件箱，更难以模拟大批量多用户场景。FadeInbox 支持跨多域名秒级生成无限独立测试邮箱。',
          '结合智能 OTP 提取引擎，测试人员可一键复制验证码或直达激活链接，大幅提升自动化与回归测试效率。',
        ],
      },
      {
        id: 'phishing-data-breach-defense',
        category: '网络安全与防御',
        readTime: '6 分钟阅读',
        title: '抵御钓鱼攻击与数据泄露：为什么临时邮箱是第一道防线？',
        excerpt: '通过隔离数字足迹，让任何第三方数据库泄露对您的核心主账号毫无影响。',
        content: [
          '针对性钓鱼攻击（Phishing）高度依赖黑客在不同泄露数据库中交叉对比受害者的邮箱，进而分析出受害者的行为画像。',
          '为非核心网站使用独立一次性邮箱，即可实现“数字足迹物理隔离”。即便某家网站数据泄露，黑客拿到的也仅仅是一个早已过期的无用地址。',
          '这种防御策略从根本上瓦解了撞库攻击与定向社工钓鱼，是现代网民不可或缺的主动防御工具。',
        ],
      },
    ],
  },
  es: {
    badge: 'Centro de Conocimiento y Seguridad',
    heading: 'Guías completas sobre privacidad y seguridad digital',
    subheading: 'Aprenda a proteger su correo principal, comprender el correo temporal y aplicar las mejores prácticas de seguridad.',
    readArticle: 'Leer artículo completo',
    closeArticle: 'Cerrar artículo',
    shareArticle: 'Compartir artículo',
    copiedLink: '¡Enlace copiado!',
    articles: [
      {
        id: 'spam-protection-guide',
        category: 'Privacidad y Anti-Rastreo',
        readTime: '4 min de lectura',
        title: 'Guía definitiva para eliminar el spam y proteger su identidad digital',
        excerpt: 'Por qué compartir su correo personal en cualquier sitio es peligroso y cómo las direcciones desechables evitan el rastreo.',
        content: [
          'Su correo electrónico personal es su identidad digital principal. Compartirlo en sitios no verificados expone sus datos a ventas publicitarias y fugas de seguridad.',
          'FadeInbox le permite generar correos desechables que reciben códigos al instante y se autodestruyen sin dejar rastros.',
        ],
      },
      {
        id: 'zero-log-architecture',
        category: 'Ingeniería y Cifrado',
        readTime: '5 min de lectura',
        title: 'Arquitectura Zero-Log: Cómo funciona la autodestrucción en memoria',
        excerpt: 'Conozca cómo se eliminan permanentemente los mensajes sin almacenar registros duraderos.',
        content: [
          'FadeInbox utiliza almacenamiento efímero en memoria volátil y cifrado TLS 1.3 para proteger todas las comunicaciones.',
          'Al finalizar el temporizador, los datos se purgan físicamente para garantizar máxima privacidad.',
        ],
      },
      {
        id: 'qa-developers-testing',
        category: 'Guía para Desarrolladores y QA',
        readTime: '4 min de lectura',
        title: 'Manual para Desarrolladores: Pruebas de registro y extracción de OTP',
        excerpt: 'Optimice los flujos de prueba de software y reciba códigos de verificación con un solo clic.',
        content: [
          'Pruebe flujos de registro sin ensuciar su bandeja de entrada personal y copie códigos OTP de inmediato.',
        ],
      },
      {
        id: 'phishing-data-breach-defense',
        category: 'Ciberseguridad y Defensa',
        readTime: '6 min de lectura',
        title: 'Defensa contra Phishing y filtraciones de bases de datos',
        excerpt: 'Compartimente su huella digital para que las filtraciones no afecten sus cuentas principales.',
        content: [
          'El uso de correos temporales neutraliza los ataques de phishing y evita que sus cuentas sean vinculadas.',
        ],
      },
    ],
  },
  fr: {
    badge: 'Centre de Connaissances & Sécurité',
    heading: 'Guides approfondis sur la protection de la vie privée numérique',
    subheading: 'Découvrez comment protéger votre boîte mail principale et maîtriser l’architecture des e-mails jetables.',
    readArticle: 'Lire l’article complet',
    closeArticle: 'Fermer l’article',
    shareArticle: 'Partager l’article',
    copiedLink: 'Lien copié !',
    articles: [
      {
        id: 'spam-protection-guide',
        category: 'Confidentialité & Anti-Traçage',
        readTime: '4 min de lecture',
        title: 'Le guide ultime pour éliminer le spam et protéger votre identité',
        excerpt: 'Pourquoi partager votre e-mail personnel partout est un risque majeur et comment l’e-mail jetable vous protège.',
        content: [
          'Votre adresse personnelle est votre identité numérique. FadeInbox crée des adresses éphémères pour recevoir des codes et s’auto-détruire en toute sécurité.',
        ],
      },
      {
        id: 'zero-log-architecture',
        category: 'Ingénierie & Cryptographie',
        readTime: '5 min de lecture',
        title: 'Architecture Zéro-Journalisation : Comment fonctionne l’auto-destruction',
        excerpt: 'Comprenez la suppression définitive des e-mails en mémoire sans aucun archivage persistant.',
        content: [
          'Grâce à une mise en mémoire tampon chiffrée en TLS 1.3, toutes les données sont définitivement purgées à l’expiration du compte à rebours.',
        ],
      },
      {
        id: 'qa-developers-testing',
        category: 'Guide Développeurs & QA',
        readTime: '4 min de lecture',
        title: 'Guide Développeurs : Automatisation des tests d’inscription et OTP',
        excerpt: 'Accélérez la validation des formulaires et copiez les codes de vérification en un clic.',
        content: [
          'Générez des adresses de test illimitées pour vos suites de tests QA sans polluer votre boîte personnelle.',
        ],
      },
      {
        id: 'phishing-data-breach-defense',
        category: 'Cybersécurité & Défense',
        readTime: '6 min de lecture',
        title: 'Défense contre le phishing et les fuites de données',
        excerpt: 'Compartimentez votre empreinte numérique pour neutraliser les attaques ciblées.',
        content: [
          'Les e-mails jetables rendent les fuites de bases de données tierces totalement inoffensives pour vos comptes réels.',
        ],
      },
    ],
  },
  de: {
    badge: 'Wissenszentrum & Sicherheit',
    heading: 'Ausführliche Leitfäden zum Schutz digitaler Privatsphäre',
    subheading: 'Erfahren Sie, wie Sie Ihr Hauptpostfach vor Spam und Datenlecks mit Einweg-E-Mails schützen.',
    readArticle: 'Vollständigen Artikel lesen',
    closeArticle: 'Artikel schließen',
    shareArticle: 'Artikel teilen',
    copiedLink: 'Link kopiert!',
    articles: [
      {
        id: 'spam-protection-guide',
        category: 'Datenschutz & Anti-Tracking',
        readTime: '4 Min. Lesezeit',
        title: 'Der ultimative Leitfaden zur Spam-Vermeidung und Identitätssicherung',
        excerpt: 'Warum die Weitergabe Ihrer echten E-Mail-Adresse riskant ist und wie Wegwerf-E-Mails Abhilfe schaffen.',
        content: [
          'Schützen Sie Ihre digitale Identität vor Datenbrokern und Werbeflut mit sofortigen Wegwerf-E-Mail-Adressen.',
        ],
      },
      {
        id: 'zero-log-architecture',
        category: 'Technik & Verschlüsselung',
        readTime: '5 Min. Lesezeit',
        title: 'Zero-Log-Architektur: Wie die speicherbasierte Selbstzerstörung funktioniert',
        excerpt: 'Erfahren Sie, wie Nachrichten nach Ablauf unwiderruflich aus dem flüchtigen Speicher gelöscht werden.',
        content: [
          'Bankübliche TLS 1.3-Verschlüsselung und vollständige Bereinigung garantieren maximale Sicherheit.',
        ],
      },
      {
        id: 'qa-developers-testing',
        category: 'Entwicklerhandbuch & QA',
        readTime: '4 Min. Lesezeit',
        title: 'Entwickler-Handbuch: Effizientes Testen von Registrierungen und OTP-Codes',
        excerpt: 'Automatisieren Sie QA-Pipelines und extrahieren Sie Bestätigungscodes mit nur einem Klick.',
        content: [
          'Sparen Sie wertvolle Zeit bei Registrierungstests durch blitzschnelle Einweg-E-Mail-Generierung.',
        ],
      },
      {
        id: 'phishing-data-breach-defense',
        category: 'Cybersicherheit & Schutz',
        readTime: '6 Min. Lesezeit',
        title: 'Phishing-Schutz und Datenleck-Abwehr im modernen Internet',
        excerpt: 'Kompartimentieren Sie Ihren digitalen Fußabdruck gegen Identitätsdiebstahl.',
        content: [
          'Datenpannen bei Drittanbietern bleiben dank kurzlebiger Adressen für Ihr Hauptkonto völlig folgenlos.',
        ],
      },
    ],
  },
  ru: {
    badge: 'База Знаний и Безопасность',
    heading: 'Подробные руководства по защите цифровой приватности',
    subheading: 'Узнайте, как защитить основной почтовый ящик от спама и утечек данных с помощью одноразовой почты.',
    readArticle: 'Читать полностью',
    closeArticle: 'Закрыть статью',
    shareArticle: 'Поделиться',
    copiedLink: 'Ссылка скопирована!',
    articles: [
      {
        id: 'spam-protection-guide',
        category: 'Конфиденциальность',
        readTime: '4 мин чтения',
        title: 'Полное руководство по избавлению от спама и защите личности в сети',
        excerpt: 'Почему публикация личного e-mail на непроверенных сайтах опасна и как помогают временные адреса.',
        content: [
          'Использование временного e-mail надежно защищает ваш основной почтовый ящик от спама и мошенников.',
        ],
      },
      {
        id: 'zero-log-architecture',
        category: 'Архитектура и Шифрование',
        readTime: '5 мин чтения',
        title: 'Архитектура Zero-Log: как работает физическое самоуничтожение данных',
        excerpt: 'Принципы полного удаления данных из оперативной памяти без сохранения журналов.',
        content: [
          'После истечения таймера все письма и адреса безвозвратно уничтожаются с использованием шифрования TLS 1.3.',
        ],
      },
      {
        id: 'qa-developers-testing',
        category: 'Руководство для QA и Разработчиков',
        readTime: '4 мин чтения',
        title: 'Для разработчиков: тестирование регистрации и мгновенный перехват OTP',
        excerpt: 'Ускоряйте процесс проверки систем авторизации и получайте коды в один клик.',
        content: [
          'Создавайте неограниченное количество тестовых ящиков для автоматизированных сценариев тестирования.',
        ],
      },
      {
        id: 'phishing-data-breach-defense',
        category: 'Кибербезопасность',
        readTime: '6 мин чтения',
        title: 'Защита от фишинга и утечек баз данных: временная почта как щит',
        excerpt: 'Разделение цифрового следа для предотвращения компрометации основных аккаунтов.',
        content: [
          'Утечка базы данных стороннего сервиса не нанесет вам вреда, так как временный адрес уже уничтожен.',
        ],
      },
    ],
  },
  pt: {
    badge: 'Centro de Conhecimento e Segurança',
    heading: 'Guias aprofundados sobre proteção da privacidade digital',
    subheading: 'Aprenda a proteger o seu e-mail principal e domine a arquitetura de e-mails descartáveis.',
    readArticle: 'Ler artigo completo',
    closeArticle: 'Fechar artigo',
    shareArticle: 'Compartilhar',
    copiedLink: 'Link copiado!',
    articles: [
      {
        id: 'spam-protection-guide',
        category: 'Privacidade & Anti-Rastreamento',
        readTime: '4 min de leitura',
        title: 'O guia definitivo para eliminar spam e proteger a sua identidade',
        excerpt: 'Por que fornecer o seu e-mail principal em qualquer site é perigoso e como evitar rastreamento.',
        content: [
          'Mantenha o seu e-mail pessoal protegido contra vazamentos gerando endereços descartáveis no FadeInbox.',
        ],
      },
      {
        id: 'zero-log-architecture',
        category: 'Engenharia & Criptografia',
        readTime: '5 min de leitura',
        title: 'Arquitetura Sem Registros (Zero-Log): Como funciona a autodestruição',
        excerpt: 'Entenda como os e-mails são permanentemente purgados da memória sem deixar registros.',
        content: [
          'Com criptografia TLS 1.3 de ponta a ponta, todos os dados são fisicamente destruídos ao expirar o tempo.',
        ],
      },
      {
        id: 'qa-developers-testing',
        category: 'Guia para Desenvolvedores e QA',
        readTime: '4 min de leitura',
        title: 'Manual para Desenvolvedores: Testes de registo e extração de códigos OTP',
        excerpt: 'Otimize pipelines de testes e copie códigos de verificação com apenas um clique.',
        content: [
          'Gere contas temporárias infinitas para testes de integração sem poluir o seu correio pessoal.',
        ],
      },
      {
        id: 'phishing-data-breach-defense',
        category: 'Cibersegurança & Defesa',
        readTime: '6 min de leitura',
        title: 'Defesa contra Phishing e vazamentos de dados na internet',
        excerpt: 'Compartimente a sua pegada digital para neutralizar ataques cibernéticos.',
        content: [
          'Vazamentos em terceiros tornam-se inofensivos porque o endereço temporário utilizado já foi destruído.',
        ],
      },
    ],
  },
  hi: {
    badge: 'ज्ञान केंद्र और सुरक्षा अंतर्दृष्टि',
    heading: 'डिजिटल गोपनीयता और इनबॉक्स सुरक्षा पर व्यापक गाइड',
    subheading: 'अपने मुख्य ईमेल को सुरक्षित रखने और डिस्पोजेबल ईमेल तकनीक को समझने के सर्वोत्तम उपाय।',
    readArticle: 'पूरा लेख पढ़ें',
    closeArticle: 'लेख बंद करें',
    shareArticle: 'शेयर करें',
    copiedLink: 'लिंक कॉपी हो गया!',
    articles: [
      {
        id: 'spam-protection-guide',
        category: 'गोपनीयता और स्पैम सुरक्षा',
        readTime: '4 मिनट का पाठ',
        title: 'स्पैम से पूरी तरह छुटकारा पाने और डिजिटल पहचान सुरक्षित रखने की संपूर्ण गाइड',
        excerpt: 'हर वेबसाइट पर व्यक्तिगत ईमेल साझा करना क्यों खतरनाक है और अस्थायी ईमेल कैसे मदद करता है।',
        content: [
          'FadeInbox के साथ तुरंत नष्ट होने वाले ईमेल पते बनाकर अपने व्यक्तिगत इनबॉक्स को स्पैम से बचाएं।',
        ],
      },
      {
        id: 'zero-log-architecture',
        category: 'तकनीकी वास्तुकला',
        readTime: '5 मिनट का पाठ',
        title: 'नो-लॉग आर्किटेक्चर: स्वचालित डेटा विनाश प्रणाली कैसे काम करती है?',
        excerpt: 'टाइमर समाप्त होने पर बिना कोई निशान छोड़े मेमोरी से डेटा हटाने की संपूर्ण प्रक्रिया।',
        content: [
          'TLS 1.3 एन्क्रिप्शन के साथ सभी डेटा सुरक्षित रहता है और समय समाप्त होने पर स्थायी रूप से नष्ट हो जाता है।',
        ],
      },
      {
        id: 'qa-developers-testing',
        category: 'डेवलपर्स और QA गाइड',
        readTime: '4 मिनट का पाठ',
        title: 'डेवलपर्स गाइड: स्वचालित पंजीकरण और OTP सत्यापन परीक्षण',
        excerpt: 'सॉफ्टवेयर परीक्षण वर्कफ़्लो को तेज़ बनाएं और एक क्लिक में सत्यापन कोड प्राप्त करें।',
        content: [
          'असीमित अस्थायी ईमेल उत्पन्न करके आसानी से सॉफ़्टवेयर परीक्षण और सत्यापन प्रक्रिया पूरी करें।',
        ],
      },
      {
        id: 'phishing-data-breach-defense',
        category: 'साइबर सुरक्षा',
        readTime: '6 मिनट का पाठ',
        title: 'फ़िशिंग हमलों और डेटा लीक से सुरक्षा का अचूक उपाय',
        excerpt: 'अपने डिजिटल फ़ुटप्रिंट को अलग रखकर मुख्य खातों को सुरक्षित रखें।',
        content: [
          'अस्थायी ईमेल का उपयोग करने से डेटा उल्लंघन होने पर भी आपका मुख्य ईमेल पूरी तरह सुरक्षित रहता है।',
        ],
      },
    ],
  },
  tr: {
    badge: 'Bilgi Merkezi ve Güvenlik',
    heading: 'Dijital Gizlilik Koruması Üzerine Kapsamlı Rehberler',
    subheading: 'Ana gelen kutunuzu spamden koruma ve kullan-at e-posta mimarisini anlama kılavuzları.',
    readArticle: 'Makalenin Tamamını Oku',
    closeArticle: 'Makaleyi Kapat',
    shareArticle: 'Paylaş',
    copiedLink: 'Bağlantı Kopyalandı!',
    articles: [
      {
        id: 'spam-protection-guide',
        category: 'Gizlilik ve Anti-Takip',
        readTime: '4 dk okuma',
        title: 'Spam Postaları Tamamen Engelleme ve Kimliği Koruma Rehberi',
        excerpt: 'Kişisel e-postanızı her sitede paylaşmanın tehlikeleri ve geçici e-postanın sunduğu koruma.',
        content: [
          'FadeInbox ile anında imha olan geçici e-postalar oluşturarak ana kutunuzu tertemiz tutun.',
        ],
      },
      {
        id: 'zero-log-architecture',
        category: 'Mühendislik ve Şifreleme',
        readTime: '5 dk okuma',
        title: 'Kayıtsızlık Mimarisi (Zero-Log): Bellekten Kendini Yok Etme Sistemi',
        excerpt: 'Süre bittiğinde verilerin kalıcı olarak fiziksel olarak nasıl silindiğini öğrenin.',
        content: [
          'TLS 1.3 şifreleme ve uçucu bellek mimarisi sayesinde süre dolduğunda tüm veriler kalıcı olarak yok edilir.',
        ],
      },
      {
        id: 'qa-developers-testing',
        category: 'Geliştirici ve QA Rehberi',
        readTime: '4 dk okuma',
        title: 'Geliştiriciler İçin: Kayıt Süreçleri ve OTP Doğrulama Testleri',
        excerpt: 'Test süreçlerini otomatikleştirin ve doğrulama kodlarını tek tıkla kopyalayın.',
        content: [
          'Sınırsız sayıda geçici adres üreterek kullanıcı kayıt senaryolarını saniyeler içinde test edin.',
        ],
      },
      {
        id: 'phishing-data-breach-defense',
        category: 'Siber Güvenlik',
        readTime: '6 dk okuma',
        title: 'Oltalama (Phishing) ve Veri Sızıntılarına Karşı Güçlü Kalkan',
        excerpt: 'Dijital ayak izinizi ayırarak ana hesaplarınızın ele geçirilmesini önleyin.',
        content: [
          'Geçici e-posta kullanımı sayesinde üçüncü taraf veri sızıntıları ana hesaplarınıza hiçbir zarar veremez.',
        ],
      },
    ],
  },
};

export default function ArticlesSection() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const data = ARTICLES_DICTIONARY[currentLang] || ARTICLES_DICTIONARY.en;
  const isRtl = currentLang === 'ar';

  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="w-full space-y-6 pt-8">
      {/* Section Header */}
      <div className="text-center space-y-2.5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-purple-500" />
          <span>{data.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {data.heading}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {data.subheading}
        </p>
      </div>

      {/* Articles Grid (4 In-Depth Guides) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.articles.map((art, idx) => (
          <SpotlightCard
            key={art.id}
            className="p-6 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                  {art.category}
                </span>
                <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{art.readTime}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {art.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {art.excerpt}
              </p>
            </div>

            <button
              onClick={() => setSelectedArticle(art)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 pt-2 cursor-pointer group"
            >
              <span>{data.readArticle}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </button>
          </SpotlightCard>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div
          onClick={() => setSelectedArticle(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-md flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {selectedArticle.readTime}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                  {selectedArticle.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Article Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed custom-scrollbar">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-1.5 mt-6">
                <div className="flex items-center gap-2 font-bold text-xs text-indigo-900 dark:text-indigo-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>FadeInbox Security Promise</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  {isRtl
                    ? 'كافة الرسائل والعناوين مشفرة بنقل TLS 1.3 وتخضع للإتلاف الذاتي القطعي فور انتهاء المؤقت.'
                    : 'All messages and mailboxes are encrypted via TLS 1.3 and physically wiped upon timer expiration.'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? data.copiedLink : data.shareArticle}</span>
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {data.closeArticle}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
