import React, { useState } from 'react';
import {
  Sliders,
  BookOpen,
  Bell,
  Eye,
  Globe,
  ShieldCheck,
  HelpCircle,
  Info,
  LogOut,
  Moon,
  Sun,
  Laptop,
  Download,
  Upload,
  Trash2,
  Lock,
  MessageSquare,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Check,
  RotateCcw,
} from 'lucide-react';
import { LanguageScript, UserProfile } from '../../types';
import { AppSettingsState } from '../../utils/storage';
import { TranslationDictionary } from '../../data/translations';

interface SettingsViewProps {
  user: UserProfile;
  settings: AppSettingsState;
  onUpdateSettings: (newSettings: Partial<AppSettingsState>) => void;
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
  t: TranslationDictionary;
  onResetPreferences: () => void;
  onClearLocalData: () => void;
  onDeleteAccount: () => void;
  onLogoutClick: () => void;
  onActionClick: (title: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  settings,
  onUpdateSettings,
  onUpdateUser,
  t,
  onResetPreferences,
  onClearLocalData,
  onDeleteAccount,
  onLogoutClick,
  onActionClick,
}) => {
  const [activeTab, setActiveTab] = useState<string>('umumiy');

  // Modals for Security, Help, About
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isLicensesModalOpen, setIsLicensesModalOpen] = useState(false);

  // Confirmation Modals
  const [isConfirmClearDataOpen, setIsConfirmClearDataOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  // FAQ Accordion Toggle State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Form input states
  const [contactMessage, setContactMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const tabs = [
    { id: 'umumiy', label: t.settings.tabGeneral, icon: Sliders },
    { id: 'organish', label: t.settings.tabLearning, icon: BookOpen },
    { id: 'bildirishnomalar', label: t.settings.tabNotifications, icon: Bell },
    { id: 'korinish', label: t.settings.tabAppearance, icon: Eye },
    { id: 'til', label: t.settings.tabLanguage, icon: Globe },
    { id: 'xavfsizlik', label: t.settings.tabSecurity, icon: ShieldCheck },
    { id: 'yordam', label: t.settings.tabHelp, icon: HelpCircle },
    { id: 'haqida', label: t.settings.tabAbout, icon: Info },
  ];

  // Data Export Handler
  const handleExportData = () => {
    const exportObject = {
      profile: user,
      settings: settings,
      exportedAt: new Date().toISOString(),
    };
    const jsonStr = JSON.stringify(exportObject, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ozbek_tili_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onActionClick('Ma’lumotlar faylga yuklab olindi (JSON)');
  };

  // Data Import Handler
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile) onUpdateUser(parsed.profile);
        if (parsed.settings) onUpdateSettings(parsed.settings);
        onActionClick('Ma’lumotlar muvaffaqiyatli tiklandi (Import)');
      } catch (err) {
        onActionClick('Xatolik: Noto‘g‘ri JSON fayl formati');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {t.settings.title}
        </h1>
      </div>

      {/* Main Settings Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        {/* Left Submenu Sidebar (4 cols on desktop, horizontal scroll on mobile) */}
        <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-700/60 pb-3 md:pb-0 md:pr-4 flex md:flex-col overflow-x-auto scrollbar-none gap-1.5 md:gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`setting-tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  onActionClick(`${tab.label} bo‘limi tanlandi`);
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 md:shrink md:w-full whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Tab Content Panel (8 cols) */}
        <div className="md:col-span-8 md:pl-2 space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700/60 pb-3">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>

          {/* TAB 1: UMUMIY */}
          {activeTab === 'umumiy' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.settings.userName}
                </label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => onUpdateUser({ name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.settings.defaultLevel}
                </label>
                <select
                  value={settings.learningLevel}
                  onChange={(e) => {
                    const val = e.target.value as any;
                    onUpdateSettings({ learningLevel: val });
                    onUpdateUser({ level: `${val} • Daraja` });
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium focus:outline-hidden"
                >
                  <option value="A1">A1 • Boshlang‘ich</option>
                  <option value="A2">A2 • Elementar</option>
                  <option value="B1">B1 • O‘rta</option>
                  <option value="B2">B2 • O‘rta yuqori</option>
                  <option value="C1">C1 • Yuqori</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.settings.dailyGoal}
                </label>
                <select
                  value={settings.dailyGoalMinutes}
                  onChange={(e) => onUpdateSettings({ dailyGoalMinutes: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium focus:outline-hidden"
                >
                  <option value={5}>5 daqiqa / kun</option>
                  <option value={10}>10 daqiqa / kun</option>
                  <option value={15}>15 daqiqa / kun</option>
                  <option value={20}>20 daqiqa / kun</option>
                  <option value={30}>30 daqiqa / kun</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.settings.startupTab}
                </label>
                <select
                  value={settings.startupTab}
                  onChange={(e) => onUpdateSettings({ startupTab: e.target.value as any })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium focus:outline-hidden"
                >
                  <option value="bosh_sahifa">{t.nav.bosh_sahifa}</option>
                  <option value="kurslar">{t.nav.kurslar}</option>
                  <option value="yangi">{t.nav.yangi}</option>
                  <option value="profil">{t.nav.profil}</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  id="reset-preferences-button"
                  onClick={onResetPreferences}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.settings.resetPreferences}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: O‘RGANISH SOZLAMALARI */}
          {activeTab === 'organish' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.settings.exerciseDifficulty}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['oson', 'orta', 'qiyin'] as const).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => onUpdateSettings({ exerciseDifficulty: diff })}
                      className={`py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        settings.exerciseDifficulty === diff
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900'
                      }`}
                    >
                      {diff === 'oson' && t.settings.easy}
                      {diff === 'orta' && t.settings.medium}
                      {diff === 'qiyin' && t.settings.hard}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.settings.exercisesPerSession}
                </label>
                <select
                  value={settings.exercisesPerSession}
                  onChange={(e) => onUpdateSettings({ exercisesPerSession: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium focus:outline-hidden"
                >
                  <option value={5}>5 ta mashq</option>
                  <option value={10}>10 ta mashq</option>
                  <option value={15}>15 ta mashq</option>
                  <option value={20}>20 ta mashq</option>
                </select>
              </div>

              {/* Toggle: Explanations */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/40">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {t.settings.showExplanations}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ showExplanations: !settings.showExplanations })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    settings.showExplanations ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                      settings.showExplanations ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle: Repeat Incorrect */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/40">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {t.settings.repeatIncorrect}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ repeatIncorrect: !settings.repeatIncorrect })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    settings.repeatIncorrect ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                      settings.repeatIncorrect ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: BILDIRISHNOMALAR */}
          {activeTab === 'bildirishnomalar' && (
            <div className="space-y-4">
              {/* Dars eslatmalari */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/40">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {t.settings.lessonReminders}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Rejalashtirilgan o‘quv darslari vaqti kelganda bildirishnoma.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ darsEslatmalari: !settings.darsEslatmalari })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    settings.darsEslatmalari ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                      settings.darsEslatmalari ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Kunlik eslatma */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/40">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {t.settings.dailyReminder}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Har kunlik o‘rganish maqsadini bajarish uchun eslatma.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ dailyReminder: !settings.dailyReminder })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    settings.dailyReminder ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                      settings.dailyReminder ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Yangi materiallar */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/40">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {t.settings.newMaterialsNotification}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Yangi dars va topshiriqlar qo‘shilganda bildirishnoma.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ yangiMateriallar: !settings.yangiMateriallar })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    settings.yangiMateriallar ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                      settings.yangiMateriallar ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Progress/Results */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/40">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {t.settings.progressResultsNotification}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ progressResults: !settings.progressResults })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    settings.progressResults ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                      settings.progressResults ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* App updates */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/40">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {t.settings.appUpdatesNotification}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ appUpdates: !settings.appUpdates })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    settings.appUpdates ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                      settings.appUpdates ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: KO‘RINISH */}
          {activeTab === 'korinish' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.settings.themeMode}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ themeMode: 'light' })}
                    className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      settings.themeMode === 'light'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span>{t.settings.lightMode}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ themeMode: 'dark' })}
                    className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      settings.themeMode === 'dark'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    <span>{t.settings.darkMode}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ themeMode: 'system' })}
                    className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      settings.themeMode === 'system'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Laptop className="w-4 h-4" />
                    <span>{t.settings.systemMode}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.settings.uiScale}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ uiScale: 'compact' })}
                    className={`p-3.5 rounded-xl border text-xs font-bold cursor-pointer transition-all text-center ${
                      settings.uiScale === 'compact'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>{t.settings.compactScale}</div>
                    <div className="text-[10px] font-normal opacity-80 mt-0.5">Kichikroq matn va qisqa masofalar</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ uiScale: 'normal' })}
                    className={`p-3.5 rounded-xl border text-xs font-bold cursor-pointer transition-all text-center ${
                      settings.uiScale === 'normal' || !settings.uiScale
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>{t.settings.normalScale}</div>
                    <div className="text-[10px] font-normal opacity-80 mt-0.5">Standart o‘lchamlar</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ uiScale: 'large' })}
                    className={`p-3.5 rounded-xl border text-xs font-bold cursor-pointer transition-all text-center ${
                      settings.uiScale === 'large'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>{t.settings.largeScale}</div>
                    <div className="text-[10px] font-normal opacity-80 mt-0.5">Kattaroq matn va keng masofalar</div>
                  </button>
                </div>
              </div>

              {/* Reduced Animations Toggle */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/40">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {t.settings.reducedAnimations}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ reducedAnimations: !settings.reducedAnimations })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    settings.reducedAnimations ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                      settings.reducedAnimations ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: TIL */}
          {activeTab === 'til' && (
            <div className="space-y-3">
              {[
                { code: 'latin', label: "O‘zbekcha (Lotin)" },
                { code: 'cyrillic', label: "Ўзбекча (Кирилл)" },
                { code: 'english', label: "English" },
              ].map((lang) => {
                const isSelected = settings.language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onUpdateSettings({ language: lang.code as LanguageScript });
                      onActionClick(`Til tanlandi: ${lang.label}`);
                    }}
                    className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40 text-slate-700 dark:text-slate-300 font-medium'
                    }`}
                  >
                    <span className="text-sm">{lang.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 6: MA’LUMOT VA XAVFSIZLIK */}
          {activeTab === 'xavfsizlik' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                    {t.settings.changePassword}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Hisob xavfsizligini ta’minlash uchun parolni yangilang.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(true)}
                  className="px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  O‘zgartirish
                </button>
              </div>

              {/* Export Data */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                    {t.settings.exportData}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Sozlamalar va saqlangan profil ma’lumotlarini faylga yuklang.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleExportData}
                  className="px-3.5 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-bold text-xs hover:bg-blue-100 cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>

              {/* Import Data */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                    {t.settings.importData}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Ilgari saqlangan JSON zaxira faylidan ma’lumotlarni tiklang.
                  </p>
                </div>
                <label className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 cursor-pointer flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import</span>
                  <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                </label>
              </div>

              {/* Clear Local Data */}
              <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-amber-950 dark:text-amber-200 text-xs">
                    {t.settings.clearData}
                  </h3>
                  <p className="text-[11px] text-amber-800 dark:text-amber-400 mt-0.5">
                    Mahalliy brauzerda saqlangan barcha o‘quv statistikalarini o‘chirish.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsConfirmClearDataOpen(true)}
                  className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Tozalash
                </button>
              </div>

              {/* Delete Account */}
              <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-rose-950 dark:text-rose-200 text-xs">
                    {t.settings.deleteAccount}
                  </h3>
                  <p className="text-[11px] text-rose-800 dark:text-rose-400 mt-0.5">
                    Hisobni va barcha shaxsiy sozlamalarni butunlay o‘chirish.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsConfirmDeleteOpen(true)}
                  className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  O‘chirish
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: YORDAM VA QO‘LLAB-QUVVATLASH */}
          {activeTab === 'yordam' && (
            <div className="space-y-6">
              {/* FAQ Accordion */}
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-3">
                  {t.settings.faq}
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      q: "O'quv darslari qachon yuklanadi?",
                      a: "O'quv kursi va grammatika darslari alohida bosqichda to'liq taqdim etiladi.",
                    },
                    {
                      q: "Parolni qanday o'zgartirish mumkin?",
                      a: "Ma'lumot va xavfsizlik bo'limidan parolni o'zgartirish opsiyasini tanlang.",
                    },
                    {
                      q: "Sozlamalarni qanday tiklasa bo'ladi?",
                      a: "Umumiy sozlamalar bo'limidan 'Sozlamalarni dastlabki holatga qaytarish' tugmasini bosing.",
                    },
                  ].map((faq, idx) => {
                    const isExpanded = expandedFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-slate-200/80 dark:border-slate-700 rounded-xl overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                          className="w-full px-4 py-3 text-left font-bold text-xs text-slate-800 dark:text-slate-200 bg-slate-50/80 dark:bg-slate-900/40 flex items-center justify-between cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        {isExpanded && (
                          <div className="px-4 py-3 bg-white dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/60">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.settings.contactSupport}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: ILOVA HAQIDA */}
          {activeTab === 'haqida' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 space-y-2">
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                  {t.settings.appName}
                </h3>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {t.settings.version}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.settings.description}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  {t.settings.developer}
                </p>
              </div>

              {/* Version 1.1 Update Changelog */}
              <div className="p-5 rounded-2xl border border-blue-200/80 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider">
                    Yangilanishlar (v1.1)
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/80 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                    Tuzatishlar va O‘zgarishlar
                  </span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
                  <li>
                    <strong>Kunduzi / Tungi / Tizim rejimi:</strong> Tizim (System preference) bo‘yicha avtomatik va dinamik mavzu tanlash funksiyasi to‘liq ishga tushirildi.
                  </li>
                  <li>
                    <strong>Interfeys o‘lchami (UI Scaling):</strong> Ixcham (compact), Standart (normal) va Katta (large) o‘lchamlarda butun ilovaning matnlari, tugmalari va masofalarini global miqyosda moslashtiruvchi token tizimi yaratildi.
                  </li>
                  <li>
                    <strong>Doimiy xotira (Persistence):</strong> Sozlamalar va tanlangan rejimlar brauzer xotirasida (localStorage) saqlanadi hamda ilova qayta ochilganda avtomatik tiklanadi.
                  </li>
                  <li>
                    <strong>Barqarorlik:</strong> Dastur versiyasi 1.1 ga yangilandi hamda barcha sozlamalar boshqaruvi optimallashtirildi.
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs cursor-pointer"
                >
                  {t.settings.terms}
                </button>
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs cursor-pointer"
                >
                  {t.settings.privacy}
                </button>
                <button
                  type="button"
                  onClick={() => setIsLicensesModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs cursor-pointer"
                >
                  {t.settings.licenses}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CONFIRMATION MODAL 1: Clear Data */}
      {isConfirmClearDataOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                {t.settings.confirmClearDataTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {t.settings.confirmClearDataMessage}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmClearDataOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs cursor-pointer"
              >
                {t.common.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearLocalData();
                  setIsConfirmClearDataOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer"
              >
                {t.common.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL 2: Delete Account */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                {t.settings.confirmDeleteAccountTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {t.settings.confirmDeleteAccountMessage}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs cursor-pointer"
              >
                {t.common.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteAccount();
                  setIsConfirmDeleteOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer"
              >
                {t.common.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Change Password Modal */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              {t.settings.changePassword}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Hozirgi parol</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Yangi parol</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsChangePasswordOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs"
              >
                {t.common.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onActionClick('Parol muvaffaqiyatli yangilandi');
                  setIsChangePasswordOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                {t.common.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Contact / Support Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              {t.settings.contactSupport}
            </h3>
            <textarea
              rows={4}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Xabar yoki taklifingizni yozing..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs"
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs"
              >
                {t.common.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onActionClick('Murojaat muvaffaqiyatli yuborildi');
                  setContactMessage('');
                  setIsContactModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Yuborish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Terms Modal */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              {t.settings.terms}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-60 overflow-y-auto">
              Ushbu platforma O'zbek tili va grammatikasini o'rganish uchun akademik vosita sifatida taqdim etiladi. Barcha kontent va tizim imkoniyatlaridan ta'lim maqsadida foydalanishingiz mumkin.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsTermsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: Privacy Modal */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              {t.settings.privacy}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-60 overflow-y-auto">
              Sizning shaxsiy ma'lumotlaringiz va sozlamalaringiz brauzerning mahalliy xotirasida saqlanadi. Uchinchi shaxslarga taqdim etilmaydi.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 7: Open Source Licenses Modal */}
      {isLicensesModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              {t.settings.licenses}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-60 overflow-y-auto font-mono">
              - React (MIT License)<br />
              - Tailwind CSS (MIT License)<br />
              - Lucide Icons (ISC License)<br />
              - Vite (MIT License)
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsLicensesModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
