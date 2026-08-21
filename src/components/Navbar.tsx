import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'firebase/auth';
import {
  ShieldCheck,
  Globe,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  Sparkles,
  Flame,
  Bookmark,
} from 'lucide-react';
import { LANGUAGES, changeLanguage } from '../lib/i18n';
import { LanguageCode } from '../types';
import MagneticButton from './MagneticButton';

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  activeTab: 'inbox' | 'vault';
  onChangeTab: (tab: 'inbox' | 'vault') => void;
}

export default function Navbar({
  user,
  onOpenAuth,
  onSignOut,
  isDark,
  onToggleTheme,
  activeTab,
  onChangeTab,
}: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangDropdownOpen(false);
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentLang =
    LANGUAGES.find((l) => l.code === (i18n.language as LanguageCode)) ||
    LANGUAGES[0];

  const handleSelectLang = (code: LanguageCode) => {
    changeLanguage(code);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-2 sm:px-4 py-2.5 sm:py-3 flex justify-center">
      <div className="w-fit max-w-[calc(100vw-1rem)] mx-auto flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 rounded-full bg-white/70 dark:bg-[#09090b]/80 backdrop-blur-2xl border border-slate-200/80 dark:border-white/5 px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-lg shadow-slate-900/5 dark:shadow-black/40 transition-all duration-300 shrink-0">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl overflow-hidden shadow-md shadow-purple-500/25 ring-1 ring-purple-500/30 bg-slate-900">
            <img
              src="/favicon.svg"
              alt="FadeInbox Logo"
              className="w-full h-full object-cover"
            />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 ring-2 ring-[#09090b]"></span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-sm md:text-base font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap hidden min-[400px]:inline">
              {t('appName')}
            </span>
          </div>
        </div>

        {/* Center Tabs: Inbox vs Vault */}
        <nav className="flex items-center p-0.5 rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 shrink-0">
          <button
            onClick={() => onChangeTab('inbox')}
            title={t('inboxTitle')}
            className={`px-2.5 xl:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'inbox'
                ? 'bg-white dark:bg-[#18181b] text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/50 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-purple-500 shrink-0" />
            <span className="hidden xl:inline whitespace-nowrap">{t('inboxTitle')}</span>
          </button>
          <button
            onClick={() => onChangeTab('vault')}
            title={t('savedMessages')}
            className={`px-2.5 xl:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'vault'
                ? 'bg-white dark:bg-[#18181b] text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/50 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="hidden xl:inline whitespace-nowrap">{t('savedMessages')}</span>
            {user && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
            )}
          </button>
        </nav>

        {/* Right Actions: Language, Theme, Auth */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Picker Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              title={t('language')}
              className="flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="hidden xl:inline whitespace-nowrap">{currentLang.flag}</span>
              <span className="hidden xl:inline whitespace-nowrap">{currentLang.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden xl:inline shrink-0" />
            </button>

            {langDropdownOpen && (
              <div className="absolute ltr:right-0 ltr:left-auto rtl:left-0 rtl:right-auto mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {t('language')}
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLang(lang.code)}
                    className={`w-full text-left ltr:text-left rtl:text-right px-3 py-2 text-xs flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer transition-colors ${
                      lang.code === currentLang.code
                        ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/50 dark:bg-indigo-950/20'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {lang.code.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 sm:p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
            title={isDark ? t('themeLight') : t('themeDark')}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Auth Button / User Avatar */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                title={user.displayName || user.email || 'User'}
                className="flex items-center gap-2 p-[5px] rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 max-w-[110px] truncate hidden xl:inline whitespace-nowrap">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-7 h-7 rounded-full ring-2 ring-indigo-500/50 shrink-0 object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
              </button>

              {userDropdownOpen && (
                <div className="absolute ltr:right-0 ltr:left-auto rtl:left-0 rtl:right-auto mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {user.displayName}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onChangeTab('vault');
                    }}
                    className="w-full text-left ltr:text-left rtl:text-right px-3 py-2 text-xs rounded-xl flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {t('premiumDashboard')}
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onSignOut();
                    }}
                    className="w-full text-left ltr:text-left rtl:text-right px-3 py-2 text-xs rounded-xl flex items-center gap-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 cursor-pointer mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <MagneticButton
              variant="primary"
              onClick={onOpenAuth}
              className="px-2.5 xl:px-4 py-1.5 sm:py-2 text-xs font-bold gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{t('loginGoogle')}</span>
            </MagneticButton>
          )}
        </div>
      </div>
    </header>
  );
}
