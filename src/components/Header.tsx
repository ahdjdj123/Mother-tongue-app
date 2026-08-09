import React, { useState } from 'react';
import { Search, Bell, Settings, ChevronDown, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { UserProfile, NavigationTab } from '../types';
import { TranslationDictionary } from '../data/translations';

interface HeaderProps {
  user: UserProfile;
  t: TranslationDictionary;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  t,
  setActiveTab,
  onOpenSearch,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="h-16 border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-20 px-4 md:px-8 flex items-center justify-between transition-colors duration-200">
      {/* Mobile Header Logo & Title */}
      <div className="flex md:hidden items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs shrink-0">
          <BookOpen className="w-4.5 h-4.5" />
        </div>
        <h1 className="font-bold text-slate-900 dark:text-slate-100 text-base tracking-tight">
          Ona tili
        </h1>
      </div>

      {/* Desktop Search Input trigger */}
      <div className="hidden md:block flex-1 max-w-md mr-4">
        <button
          id="header-search-input"
          onClick={onOpenSearch}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-600 transition-all text-sm cursor-pointer"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 text-sm">{t.common.search}</span>
          <kbd className="ml-auto hidden sm:inline-block text-[10px] font-medium bg-white dark:bg-slate-700 text-slate-400 border border-slate-200 dark:border-slate-600 rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            id="notifications-button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={t.settings.tabNotifications}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-3 z-50">
              <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                  {t.settings.tabNotifications}
                </h3>
              </div>
              <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                Hozircha yangi bildirishnomalar yo‘q.
              </div>
            </div>
          )}
        </div>

        {/* Quick Settings Shortcut Button */}
        <button
          id="header-settings-button"
          onClick={() => setActiveTab('sozlamalar')}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title={t.settings.title}
        >
          <Settings className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

        {/* User Profile Pill */}
        <div className="relative">
          <button
            id="user-profile-pill"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 p-1.5 pl-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 font-bold text-xs flex items-center justify-center border border-blue-200 dark:border-blue-800">
              {user.initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {user.name}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {user.level}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* User Menu Dropdown */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1.5 z-50 text-xs">
              <button
                onClick={() => {
                  setActiveTab('profil');
                  setUserMenuOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium flex items-center gap-2"
              >
                <span>{t.nav.profil}</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('sozlamalar');
                  setUserMenuOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium flex items-center gap-2"
              >
                <span>{t.nav.sozlamalar}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
