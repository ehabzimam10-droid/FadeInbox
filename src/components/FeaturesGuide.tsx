import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  Lock,
  Mail,
  RefreshCw,
  Trash2,
  Layers,
  Sparkles,
  CheckCircle2,
  Laptop,
  Flame,
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';

interface FeaturesGuideData {
  badge: string;
  heading: string;
  subheading: string;
  stepBadge: string;
  steps: Array<{
    num: string;
    title: string;
    desc: string;
  }>;
  pillarsTitle: string;
  pillarsSub: string;
  pillars: Array<{
    title: string;
    desc: string;
  }>;
}

const GUIDE_DICTIONARY: Record<string, FeaturesGuideData> = {
  ar: {
    badge: 'كيف يعمل FadeInbox؟',
    heading: 'حماية متكاملة لبريدك الأساسي في 3 خطوات بسيطة',
    subheading: 'تخلص من الرسائل الترويجية المزعجة ومخاطر تسريب البيانات الشخصية باستخدام بريد مؤقت آمن وسريع.',
    stepBadge: 'تلقائي وآمن بالكامل',
    steps: [
      {
        num: '01',
        title: 'توليد فوري أو مخصص',
        desc: 'احصل على عنوان بريد إلكتروني مؤقت بضغطة زر واحدة أو اختر اسماً مخصصاً ونطاقاً مفضلاً من بين نطاقات متعددة.',
      },
      {
        num: '02',
        title: 'استقبال البريد في الوقت الفعلي',
        desc: 'استقبل الرسائل النصية، ورسائل الـ HTML المنسقة، والمرفقات بسرعة فائقة وبدون أي تأخير أو حاجة لإعادة تحميل الصفحة.',
      },
      {
        num: '03',
        title: 'إتلاف ذاتي وتشفير',
        desc: 'يتلف العنوان ورسائله تلقائياً بمجرد انتهاء المؤقت المحدد (من 10 دقائق حتى 7 أيام) دون ترك أي سجلات رقمية.',
      },
    ],
    pillarsTitle: 'لماذا يفضل المستخدمون FadeInbox؟',
    pillarsSub: 'معايير تقنية وهندسية متقدمة تضمن لك أعلى مستويات الخصوصية والاستقرار.',
    pillars: [
      {
        title: 'سياسة الخصوصية الصارمة (Zero-Log)',
        desc: 'لا نطلب أي بيانات شخصية، أو أرقام هواتف، أو بطاقات ائتمانية. جلستك كزائر مجهولة الهوية بنسبة 100% ومحمية من التتبع.',
      },
      {
        title: 'معمارية 5 محركات بريد احتياطية',
        desc: 'نظام ذكي يربط بين 5 مزودي بريد عالميين (Mail.tm, Mail.gw, 1SecMail, GuerrillaMail, DropMail) لضمان استقرار الخدمة دائماً.',
      },
      {
        title: 'تشفير شامل TLS 1.3',
        desc: 'كافة الرسائل والاتصالات بين جهازك والخوادم مشفرة بأحدث بروتوكولات الأمان لمنع أي اعتراض أو تنصت خارجي.',
      },
      {
        title: 'بيئة مثالية للمطورين والاختبار',
        desc: 'أداة مثالية لمهندسي البرمجيات وفرق الجودة لاختبار تدفقات التسجيل، ورسائل التحقق، وأنظمة إرسال البريد.',
      },
    ],
  },
  en: {
    badge: 'How FadeInbox Works',
    heading: 'Complete Inbox Protection in 3 Easy Steps',
    subheading: 'Shield your personal inbox from spam, trackers, and data breaches using our instant self-destructing disposable email engine.',
    stepBadge: '100% Automated & Secure',
    steps: [
      {
        num: '01',
        title: 'Instant or Custom Alias',
        desc: 'Generate a burner email with a single click or create a custom username across multiple resilient domains.',
      },
      {
        num: '02',
        title: 'Real-Time Live Inbox',
        desc: 'Receive rich HTML messages, confirmation links, and file attachments in real time with automated inbox polling.',
      },
      {
        num: '03',
        title: 'Auto Self-Destruction',
        desc: 'Addresses and incoming emails are purged permanently upon timer expiry, leaving zero tracking footprint.',
      },
    ],
    pillarsTitle: 'Why Choose FadeInbox?',
    pillarsSub: 'Engineered with cutting-edge standards for uncompromising privacy and reliability.',
    pillars: [
      {
        title: 'Zero-Log Privacy Architecture',
        desc: 'No personal data, phone numbers, or passwords required. Guest sessions operate completely anonymously.',
      },
      {
        title: '5-Engine Redundant Infrastructure',
        desc: 'Multi-adapter backend aggregates top global temp mail providers, ensuring continuous 99.9% uptime.',
      },
      {
        title: 'End-to-End TLS 1.3 Encryption',
        desc: 'Bank-grade HTTPS and TLS 1.3 cryptography guard all network payloads against interception.',
      },
      {
        title: 'Developer Sandbox & QA Testing',
        desc: 'Streamline automated QA pipelines, signup verification workflows, and transactional email testing.',
      },
    ],
  },
  zh: {
    badge: 'FadeInbox 如何运作？',
    heading: '仅需 3 步，全方位保护您的主收件箱',
    subheading: '使用我们的自毁式一次性临时邮箱，让您的个人邮箱远离垃圾邮件、追踪器和数据泄露。',
    stepBadge: '100% 自动且安全',
    steps: [
      {
        num: '01',
        title: '即时生成或自定义前缀',
        desc: '一键生成即用即弃邮箱，或在多个稳定域名中自定义您的个性化邮箱前缀。',
      },
      {
        num: '02',
        title: '毫秒级实时接收邮件',
        desc: '实时自动拉取图文富文本邮件、验证链接及各类附件，无需手动频繁刷新网页。',
      },
      {
        num: '03',
        title: '到期自动彻底销毁',
        desc: '设定倒计时（10分钟至7天）结束后，邮箱与全部信件即刻永久物理清除，不留任何数字痕迹。',
      },
    ],
    pillarsTitle: '为什么全球用户信赖 FadeInbox？',
    pillarsSub: '前沿的工程架构设计，为您提供极致的隐私防护与高可用保障。',
    pillars: [
      {
        title: '严格的零日志隐私架构 (Zero-Log)',
        desc: '无需提供任何个人身份信息、手机号或密码，访客模式下完全匿名运作，拒绝追踪。',
      },
      {
        title: '五大邮件引擎多核冗余灾备',
        desc: '智能集成全球 5 大临时邮件网络，毫秒级故障自动转移，确保服务永不掉线。',
      },
      {
        title: '全程 TLS 1.3 银行级安全加密',
        desc: '所有网络通信均受顶尖 TLS 1.3 和 HTTPS 加密保护，彻底杜绝中间人窃听与窥探。',
      },
      {
        title: '开发者沙盒与自动化测试利器',
        desc: '专为工程师和 QA 团队打造，轻松验证自动化注册流程、验证码接收与事务邮件分发。',
      },
    ],
  },
  es: {
    badge: '¿Cómo funciona FadeInbox?',
    heading: 'Protección completa de su correo en 3 simples pasos',
    subheading: 'Proteja su bandeja de entrada personal contra spam y filtraciones con nuestro motor de correo temporal autodestructible.',
    stepBadge: '100% Automatizado y Seguro',
    steps: [
      {
        num: '01',
        title: 'Alias instantáneo o personalizado',
        desc: 'Genere un correo desechable con un solo clic o elija un usuario y dominio personalizado.',
      },
      {
        num: '02',
        title: 'Bandeja de entrada en tiempo real',
        desc: 'Reciba mensajes HTML con formato, enlaces de verificación y archivos adjuntos al instante.',
      },
      {
        num: '03',
        title: 'Autodestrucción garantizada',
        desc: 'La dirección y los mensajes se eliminan permanentemente al expirar el temporizador.',
      },
    ],
    pillarsTitle: '¿Por qué elegir FadeInbox?',
    pillarsSub: 'Diseñado con los más altos estándares para una privacidad y estabilidad inigualables.',
    pillars: [
      {
        title: 'Arquitectura de Privacidad Cero Registros',
        desc: 'No se requieren datos personales ni números de teléfono. Uso 100% anónimo y seguro.',
      },
      {
        title: 'Infraestructura Redundante de 5 Motores',
        desc: 'Conexión inteligente con 5 redes globales de correo temporal para garantizar máxima disponibilidad.',
      },
      {
        title: 'Cifrado de Extremo a Extremo TLS 1.3',
        desc: 'Comunicaciones totalmente cifradas bajo estándares HTTPS y TLS 1.3 contra cualquier intercepción.',
      },
      {
        title: 'Ideal para Desarrolladores y Pruebas QA',
        desc: 'Herramienta perfecta para probar flujos de registro, verificación de usuarios y correos transaccionales.',
      },
    ],
  },
  fr: {
    badge: 'Comment fonctionne FadeInbox ?',
    heading: 'Protection complète de votre boîte mail en 3 étapes',
    subheading: 'Protégez votre boîte de réception personnelle contre le spam et les fuites de données grâce à nos adresses jetables auto-destructibles.',
    stepBadge: '100% Automatisé & Sécurisé',
    steps: [
      {
        num: '01',
        title: 'Alias Instantané ou Personnalisé',
        desc: 'Générez une adresse temporaire en un clic ou choisissez un nom d’utilisateur personnalisé sur plusieurs domaines fiables.',
      },
      {
        num: '02',
        title: 'Boîte de Réception en Temps Réel',
        desc: 'Recevez instantanément des e-mails HTML enrichis, des liens d’activation et des pièces jointes sans recharger la page.',
      },
      {
        num: '03',
        title: 'Auto-Destruction Définitive',
        desc: 'Les adresses et messages sont définitivement purgés à l’expiration du compte à rebours, sans aucune trace conservée.',
      },
    ],
    pillarsTitle: 'Pourquoi choisir FadeInbox ?',
    pillarsSub: 'Conçu selon les normes technologiques les plus strictes pour une confidentialité absolue.',
    pillars: [
      {
        title: 'Politique Zéro Journalisation (Zero-Log)',
        desc: 'Aucune donnée personnelle ni numéro requis. Vos sessions invités sont entièrement anonymes.',
      },
      {
        title: 'Infrastructure Multi-Moteurs Résiliente',
        desc: 'Intègre 5 réseaux mondiaux d’e-mails temporaires avec basculement automatique sans interruption.',
      },
      {
        title: 'Chiffrement de Bout en Bout TLS 1.3',
        desc: 'Toutes les communications réseau sont protégées par les protocoles HTTPS et TLS 1.3 les plus récents.',
      },
      {
        title: 'Environnement Idéal pour Développeurs & QA',
        desc: 'Parfait pour automatiser les tests d’inscription, la validation de comptes et les e-mails transactionnels.',
      },
    ],
  },
  de: {
    badge: 'Wie funktioniert FadeInbox?',
    heading: 'Vollständiger Postfachschutz in 3 einfachen Schritten',
    subheading: 'Schützen Sie Ihr Hauptpostfach vor Spam und Datenlecks mit unserer sich selbst zerstörenden Einweg-E-Mail-Engine.',
    stepBadge: '100% Automatisiert & Sicher',
    steps: [
      {
        num: '01',
        title: 'Sofortige oder Eigene Adresse',
        desc: 'Generieren Sie eine temporäre E-Mail mit einem Klick oder erstellen Sie einen benutzerdefinierten Namen.',
      },
      {
        num: '02',
        title: 'Live-Posteingang in Echtzeit',
        desc: 'Empfangen Sie formatierte HTML-Nachrichten, Bestätigungslinks und Anhänge ohne Verzögerung.',
      },
      {
        num: '03',
        title: 'Automatische Selbstzerstörung',
        desc: 'Adressen und Nachrichten werden nach Ablauf des Timers dauerhaft und unwiderruflich gelöscht.',
      },
    ],
    pillarsTitle: 'Warum FadeInbox wählen?',
    pillarsSub: 'Entwickelt mit modernsten Standards für kompromisslose Privatsphäre und Zuverlässigkeit.',
    pillars: [
      {
        title: 'Strikte Zero-Log-Datenschutzrichtlinie',
        desc: 'Keine persönlichen Daten oder Passwörter erforderlich. Gast-Sitzungen laufen völlig anonym ab.',
      },
      {
        title: 'Ausfallsichere 5-Engine-Architektur',
        desc: 'Bündelt 5 globale Temp-Mail-Anbieter für maximale Verfügbarkeit und automatische Redundanz.',
      },
      {
        title: 'Ende-zu-Ende TLS 1.3 Verschlüsselung',
        desc: 'Bankübliche HTTPS- und TLS 1.3-Verschlüsselung schützt alle Übertragungen vor Abhören.',
      },
      {
        title: 'Sandbox für Entwickler & QA-Tests',
        desc: 'Optimieren Sie Registrierungstests, Verifizierungsabläufe und Software-Freigabeprozesse.',
      },
    ],
  },
  ru: {
    badge: 'Как работает FadeInbox?',
    heading: 'Полная защита вашей почты за 3 простых шага',
    subheading: 'Защитите личный ящик от спама и утечек данных с помощью нашего сервиса самоликвидирующихся временных адресов.',
    stepBadge: '100% Автоматизировано и Безопасно',
    steps: [
      {
        num: '01',
        title: 'Мгновенный или Свой Адрес',
        desc: 'Создайте одноразовый e-mail в один клик или настройте персональное имя на надежных доменах.',
      },
      {
        num: '02',
        title: 'Входящие в Реальном Времени',
        desc: 'Получайте письма с HTML-версткой, ссылки для подтверждения и вложения без перезагрузки страницы.',
      },
      {
        num: '03',
        title: 'Полное Самоуничтожение',
        desc: 'Адрес и полученные письма безвозвратно удаляются по истечении таймера, не оставляя следов.',
      },
    ],
    pillarsTitle: 'Почему выбирают FadeInbox?',
    pillarsSub: 'Передовые инженерные стандарты для абсолютной конфиденциальности и надежности.',
    pillars: [
      {
        title: 'Политика Без Логов (Zero-Log)',
        desc: 'Никаких персональных данных, телефонов или паролей. Гостевые сессии полностью анонимны.',
      },
      {
        title: 'Отказоустойчивая архитектура из 5 движков',
        desc: 'Интеграция 5 мировых сетей временной почты с автоматическим переключением при сбоях.',
      },
      {
        title: 'Сквозное шифрование TLS 1.3',
        desc: 'Все сетевые соединения защищены современными протоколами HTTPS и TLS 1.3.',
      },
      {
        title: 'Идеальная среда для разработчиков и QA',
        desc: 'Ускоряйте тестирование процессов регистрации, проверочных кодов и систем отправки почты.',
      },
    ],
  },
  pt: {
    badge: 'Como funciona o FadeInbox?',
    heading: 'Proteção completa da sua caixa de entrada em 3 passos',
    subheading: 'Proteja o seu e-mail pessoal contra spam e vazamentos com o nosso gerador de e-mails descartáveis autodestrutivos.',
    stepBadge: '100% Automatizado e Seguro',
    steps: [
      {
        num: '01',
        title: 'Alias Instantâneo ou Personalizado',
        desc: 'Gere um e-mail temporário com um clique ou crie um nome de utilizador personalizado em vários domínios.',
      },
      {
        num: '02',
        title: 'Caixa de Entrada em Tempo Real',
        desc: 'Receba e-mails HTML formatados, links de confirmação e anexos instantaneamente sem recarregar a página.',
      },
      {
        num: '03',
        title: 'Autodestruição Permanente',
        desc: 'Os endereços e mensagens são eliminados para sempre após o término do temporizador.',
      },
    ],
    pillarsTitle: 'Por que escolher o FadeInbox?',
    pillarsSub: 'Construído com os mais elevados padrões para privacidade absoluta e alta disponibilidade.',
    pillars: [
      {
        title: 'Arquitetura de Privacidade Sem Registos (Zero-Log)',
        desc: 'Sem dados pessoais ou números de telefone. As sessões de visitante são 100% anónimas.',
      },
      {
        title: 'Infraestrutura Redundante de 5 Motores',
        desc: 'Agregação inteligente de 5 provedores globais de e-mail temporário com failover automático.',
      },
      {
        title: 'Criptografia de Ponta a Ponta TLS 1.3',
        desc: 'Todas as comunicações são protegidas com criptografia de nível bancário HTTPS e TLS 1.3.',
      },
      {
        title: 'Ambiente Ideal para Desenvolvedores & QA',
        desc: 'Otimize pipelines de testes automatizados, verificação de registos e e-mails transacionais.',
      },
    ],
  },
  hi: {
    badge: 'FadeInbox कैसे काम करता है?',
    heading: 'केवल 3 आसान चरणों में पूर्ण इनबॉक्स सुरक्षा',
    subheading: 'स्वचालित रूप से नष्ट होने वाले डिस्पोजेबल ईमेल पते के साथ अपने मुख्य ईमेल को स्पैम और लीक से सुरक्षित रखें।',
    stepBadge: '100% स्वचालित और सुरक्षित',
    steps: [
      {
        num: '01',
        title: 'त्वरित या कस्टम पता',
        desc: 'एक क्लिक में अस्थायी ईमेल बनाएं या कई सुरक्षित डोमेन पर अपना पसंदीदा नाम चुनें।',
      },
      {
        num: '02',
        title: 'रीयल-टाइम लाइव इनबॉक्स',
        desc: 'बिना पेज रीफ्रेश किए तुरंत रिच HTML संदेश, सत्यापन लिंक और फ़ाइल अटैचमेंट प्राप्त करें।',
      },
      {
        num: '03',
        title: 'ऑटो सेल्फ-डिस्ट्रक्ट',
        desc: 'टाइमर समाप्त होने पर पता और सभी संदेश हमेशा के लिए नष्ट हो जाते हैं, बिना कोई निशान छोड़े।',
      },
    ],
    pillarsTitle: 'FadeInbox क्यों चुनें?',
    pillarsSub: 'पूर्ण गोपनीयता और विश्वसनीयता के लिए अत्याधुनिक मानकों के साथ निर्मित।',
    pillars: [
      {
        title: 'नो-लॉग गोपनीयता वास्तुकला',
        desc: 'किसी व्यक्तिगत डेटा या फ़ोन नंबर की आवश्यकता नहीं। गेस्ट सत्र पूरी तरह से अनाम रहते हैं।',
      },
      {
        title: '5-इंजन बैकअप इन्फ्रास्ट्रक्चर',
        desc: 'शीर्ष 5 वैश्विक प्रदाताओं का एकीकरण, जिससे 99.9% निरंतर सेवा सुनिश्चित होती है।',
      },
      {
        title: 'एंड-टू-एंड TLS 1.3 एन्क्रिप्शन',
        desc: 'बैंक-स्तरीय HTTPS और TLS 1.3 सुरक्षा सभी नेटवर्क डेटा को सुरक्षित रखती है।',
      },
      {
        title: 'डेवलपर्स और QA परीक्षण के लिए उपयुक्त',
        desc: 'स्वचालित पंजीकरण, सत्यापन ईमेल और सॉफ्टवेयर परीक्षण वर्कफ़्लो को तेज़ बनाएं।',
      },
    ],
  },
  tr: {
    badge: 'FadeInbox Nasıl Çalışır?',
    heading: '3 Kolay Adımda Eksiksiz Gelen Kutusu Koruması',
    subheading: 'Kendi kendini yok eden kullan-at e-posta adresleriyle ana gelen kutunuzu spamlardan ve veri sızıntılarından koruyun.',
    stepBadge: '100% Otomatik ve Güvenli',
    steps: [
      {
        num: '01',
        title: 'Anında veya Özel E-posta',
        desc: 'Tek bir tıklamayla geçici e-posta oluşturun veya birden çok alan adında özel kullanıcı adı belirleyin.',
      },
      {
        num: '02',
        title: 'Gerçek Zamanlı Canlı Gelen Kutusu',
        desc: 'Sayfayı yenilemeden zengin HTML iletilerini, onay bağlantılarını ve dosya eklerini anında alın.',
      },
      {
        num: '03',
        title: 'Otomatik Kendi Kendini Yok Etme',
        desc: 'Süre bitiminde adresler ve gelen iletiler kalıcı olarak silinir, geride sıfır iz kalır.',
      },
    ],
    pillarsTitle: 'Neden FadeInbox Tercih Edilmeli?',
    pillarsSub: 'Kusursuz gizlilik ve kesintisiz kararlılık için en son teknolojiyle geliştirildi.',
    pillars: [
      {
        title: 'Kayıtsızlık Politikası (Zero-Log)',
        desc: 'Kişisel bilgi veya telefon numarası gerekmez. Misafir oturumları tamamen anonimdir.',
      },
      {
        title: '5 Motorlu Yedekli Altyapı',
        desc: '5 küresel geçici e-posta sağlayıcısını birleştirerek kesintisiz %99,9 çalışma süresi sunar.',
      },
      {
        title: 'Uçtan Uca TLS 1.3 Şifreleme',
        desc: 'Banka düzeyinde HTTPS ve TLS 1.3 kriptografisi tüm veri akışını dinlemelere karşı korur.',
      },
      {
        title: 'Geliştiriciler ve QA Testleri İçin İdeal',
        desc: 'Otomatik kayıt süreçlerini, doğrulama e-postalarını ve işlem bildirimlerini kolayca test edin.',
      },
    ],
  },
};

export default function FeaturesGuide() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const guideData = GUIDE_DICTIONARY[currentLang] || GUIDE_DICTIONARY.en;

  const icons = [
    <Mail key="1" className="w-5 h-5 text-indigo-500" />,
    <RefreshCw key="2" className="w-5 h-5 text-purple-500" />,
    <Trash2 key="3" className="w-5 h-5 text-rose-500" />,
  ];

  const pillarIcons = [
    <ShieldCheck key="p1" className="w-6 h-6 text-emerald-500" />,
    <Layers key="p2" className="w-6 h-6 text-indigo-500" />,
    <Lock key="p3" className="w-6 h-6 text-purple-500" />,
    <Laptop key="p4" className="w-6 h-6 text-amber-500" />,
  ];

  return (
    <section className="w-full space-y-8 pt-6">
      {/* Section Header */}
      <div className="text-center space-y-2.5 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>{guideData.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {guideData.heading}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {guideData.subheading}
        </p>
      </div>

      {/* 3 Step Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {guideData.steps.map((step, idx) => (
          <SpotlightCard key={idx} className="p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
                  {icons[idx] || icons[0]}
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
              <span>{guideData.stepBadge}</span>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* 4 Pillars Bento Grid */}
      <div className="space-y-4 pt-4">
        <div className="text-center sm:text-start">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <Flame className="w-4 h-4 text-purple-500" />
            <span>{guideData.pillarsTitle}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {guideData.pillarsSub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guideData.pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow space-y-2.5"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {pillarIcons[idx] || pillarIcons[0]}
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
