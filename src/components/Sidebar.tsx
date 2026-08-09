import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Sparkles,
  User,
  Settings,
  Moon,
  Sun,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { NavigationTab, LanguageScript } from '../types';
import { TranslationDictionary } from '../data/translations';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  languageScript: LanguageScript;
  setLanguageScript: (script: LanguageScript) => void;
  t: TranslationDictionary;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  languageScript,
  setLanguageScript,
  t,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    {
      id: 'bosh_sahifa' as NavigationTab,
      label: t.nav.bosh_sahifa,
      icon: Home,
    },
    {
      id: 'kurslar' as NavigationTab,
      label: t.nav.kurslar,
      icon: BookOpen,
    },
    {
      id: 'yangi' as NavigationTab,
      label: t.nav.yangi,
      icon: Sparkles,
    },
    {
      id: 'profil' as NavigationTab,
      label: t.nav.profil,
      icon: User,
    },
    {
      id: 'sozlamalar' as NavigationTab,
      label: t.nav.sozlamalar,
      icon: Settings,
    },
  ];

  const getLangLabel = () => {
    switch (languageScript) {
      case 'latin':
        return "O'zbekcha";
      case 'cyrillic':
        return 'Ўзбекча';
      case 'english':
        return 'English';
      default:
        return "O'zbekcha";
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 h-screen sticky top-0 select-none z-30 transition-colors duration-200">
      {/* App Logo & Title Header */}
      <div className="p-6 pb-5 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/60">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-teal-500/20">
          <BookOpen className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <h1 className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-snug tracking-tight">
            Ona tili
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
            O'rganamiz, rivojlanamiz.
          </p>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-blue-50/90 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-150 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 scale-105'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Options: Dark Mode Toggle & Language Selector */}
      <div className="p-4 mx-3 mb-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40 space-y-3 text-xs">
        {/* Tungi rejim (Dark mode switch) */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
            {darkMode ? (
              <Moon className="w-4 h-4 text-indigo-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
            <span>{t.settings.darkMode}</span>
          </div>
          <button
            id="toggle-dark-mode-sidebar"
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              darkMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                darkMode ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Language selector */}
        <div className="relative pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
          <button
            id="language-dropdown-toggle"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="w-full flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-1 font-medium cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <span>{t.settings.tabLanguage}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-800 dark:text-slate-200">
              <span>{getLangLabel()}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Dropdown popup */}
          {langDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={() => {
                  setLanguageScript('latin');
                  setLangDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/80 ${
                  languageScript === 'latin' ? 'text-blue-600 font-semibold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                O'zbekcha (Lotin)
              </button>
              <button
                onClick={() => {
                  setLanguageScript('cyrillic');
                  setLangDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/80 ${
                  languageScript === 'cyrillic' ? 'text-blue-600 font-semibold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                Ўзбекча (Кирилл)
              </button>
              <button
                onClick={() => {
                  setLanguageScript('english');
                  setLangDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/80 ${
                  languageScript === 'english' ? 'text-blue-600 font-semibold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                English
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
