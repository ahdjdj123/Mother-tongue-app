import React from 'react';
import { Home, BookOpen, Sparkles, User, Settings, Moon, Sun } from 'lucide-react';
import { NavigationTab } from '../types';
import { TranslationDictionary } from '../data/translations';

interface MobileNavProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  t: TranslationDictionary;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  t,
}) => {
  const navItems = [
    { id: 'bosh_sahifa' as NavigationTab, label: t.nav.bosh_sahifa, icon: Home },
    { id: 'kurslar' as NavigationTab, label: t.nav.kurslar, icon: BookOpen },
    { id: 'yangi' as NavigationTab, label: t.nav.yangi, icon: Sparkles },
    { id: 'profil' as NavigationTab, label: t.nav.profil, icon: User },
    { id: 'sozlamalar' as NavigationTab, label: t.nav.sozlamalar, icon: Settings },
  ];

  return (
    /* Mobile Bottom Fixed Navigation Bar */
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 z-40 px-2 py-1.5 flex items-center justify-around pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            id={`mobile-nav-${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Icon
              className={`w-5 h-5 mb-0.5 ${
                isActive ? 'scale-110 text-blue-600 dark:text-blue-400' : ''
              }`}
            />
            <span className="text-[10px] tracking-tight whitespace-nowrap">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
