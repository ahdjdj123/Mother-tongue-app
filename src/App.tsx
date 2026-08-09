import React, { useState, useEffect } from 'react';
import { NavigationTab, LanguageScript, UserProfile } from './types';
import {
  loadUserProfile,
  saveUserProfile,
  loadAppSettings,
  saveAppSettings,
  clearAllLocalData,
  defaultSettings,
  defaultUserProfile,
  AppSettingsState,
} from './utils/storage';
import { translations } from './data/translations';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { DashboardView } from './components/views/DashboardView';
import { CoursesView } from './components/views/CoursesView';
import { NewView } from './components/views/NewView';
import { ProfileView } from './components/views/ProfileView';
import { SettingsView } from './components/views/SettingsView';
import { EditProfileModal } from './components/EditProfileModal';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';

import {
  syncUserProfileWithProgress,
} from './utils/userProgressStore';

export default function App() {
  const [settings, setSettings] = useState<AppSettingsState>(loadAppSettings);
  const [user, setUser] = useState<UserProfile>(() =>
    syncUserProfileWithProgress(loadUserProfile())
  );
  const [activeTab, setActiveTab] = useState<NavigationTab>(settings.startupTab || 'bosh_sahifa');

  const handleProgressUpdate = () => {
    setUser((prevUser) => {
      const synced = syncUserProfileWithProgress(prevUser);
      saveUserProfile(synced);
      return synced;
    });
  };

  // Modals & UI Feedback
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [targetLesson, setTargetLesson] = useState<{ grade: number; lessonId: string } | null>(null);

  // Active translation dictionary
  const t = translations[settings.language] || translations.latin;

  // Sync settings with localStorage
  useEffect(() => {
    saveAppSettings(settings);
  }, [settings]);

  // Sync user profile with localStorage
  useEffect(() => {
    saveUserProfile(user);
  }, [user]);

  // System theme detection state
  const [isSystemDark, setIsSystemDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const effectiveDarkMode =
    settings.themeMode === 'dark'
      ? true
      : settings.themeMode === 'light'
      ? false
      : isSystemDark;

  // Sync Dark Mode class with HTML element
  useEffect(() => {
    if (effectiveDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [effectiveDarkMode]);

  // Sync UI Scale attribute with HTML element
  useEffect(() => {
    const scale = settings.uiScale || 'normal';
    document.documentElement.setAttribute('data-scale', scale);
  }, [settings.uiScale]);

  // Keyboard shortcut Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleUpdateSettings = (newSettings: Partial<AppSettingsState>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    triggerToast(t.common.success);
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...updated };
      if (updated.name) {
        const parts = updated.name.trim().split(' ');
        next.initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].slice(0, 2).toUpperCase();
      }
      return next;
    });
    triggerToast(t.common.success);
  };

  const handleResetPreferences = () => {
    setSettings(defaultSettings);
    triggerToast('Sozlamalar dastlabki holatga qaytarildi');
  };

  const handleClearLocalData = () => {
    clearAllLocalData();
    setUser(defaultUserProfile);
    setSettings(defaultSettings);
    triggerToast('Barcha mahalliy o‘quv ma’lumotlari tozalandi');
  };

  const handleDeleteAccount = () => {
    clearAllLocalData();
    setUser(defaultUserProfile);
    setSettings(defaultSettings);
    triggerToast('Hisobingiz va barcha ma’lumotlaringiz o‘chirildi');
  };

  const handleLogout = () => {
    triggerToast('Hisobdan chiqildi');
  };

  return (
    <div className={`min-h-screen bg-slate-50/70 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200`}>
      <div className="flex min-h-screen">
        {/* Desktop Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={effectiveDarkMode}
          setDarkMode={(val) => handleUpdateSettings({ themeMode: val ? 'dark' : 'light' })}
          languageScript={settings.language}
          setLanguageScript={(lang) => handleUpdateSettings({ language: lang })}
          t={t}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Navigation Header */}
          <MobileNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            darkMode={effectiveDarkMode}
            setDarkMode={(val) => handleUpdateSettings({ themeMode: val ? 'dark' : 'light' })}
            t={t}
          />

          {/* Desktop Top Header Bar */}
          <Header
            user={user}
            t={t}
            setActiveTab={setActiveTab}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Page View Container */}
          <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto pb-24 md:pb-12">
            {activeTab === 'bosh_sahifa' && (
              <DashboardView
                user={user}
                t={t}
                setActiveTab={setActiveTab}
                onActionClick={triggerToast}
                onOpenSearch={() => setIsSearchOpen(true)}
                onOpenLessonTarget={(target) => {
                  setTargetLesson(target);
                  setActiveTab('kurslar');
                }}
              />
            )}

            {activeTab === 'kurslar' && (
              <CoursesView
                t={t}
                onActionClick={triggerToast}
                onProgressUpdate={handleProgressUpdate}
                targetLesson={targetLesson}
                onClearTargetLesson={() => setTargetLesson(null)}
              />
            )}

            {activeTab === 'yangi' && (
              <NewView
                t={t}
                onActionClick={triggerToast}
                onOpenLessonTarget={(target) => {
                  setTargetLesson(target);
                  setActiveTab('kurslar');
                }}
              />
            )}

            {activeTab === 'profil' && (
              <ProfileView
                user={user}
                t={t}
                onEditProfileClick={() => setIsEditProfileOpen(true)}
                onActionClick={triggerToast}
                onClearHistoryClick={handleClearLocalData}
              />
            )}

            {activeTab === 'sozlamalar' && (
              <SettingsView
                user={user}
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                onUpdateUser={handleUpdateProfile}
                t={t}
                onResetPreferences={handleResetPreferences}
                onClearLocalData={handleClearLocalData}
                onDeleteAccount={handleDeleteAccount}
                onLogoutClick={handleLogout}
                onActionClick={triggerToast}
              />
            )}
          </main>
        </div>
      </div>

      {/* Modals & Overlay Components */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        user={user}
        onSave={handleUpdateProfile}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTargetLesson={(target) => {
          setTargetLesson({ grade: target.grade, lessonId: target.lessonId });
          setActiveTab('kurslar');
          triggerToast(`"${target.lessonTitle}" darsi ochildi`);
        }}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
