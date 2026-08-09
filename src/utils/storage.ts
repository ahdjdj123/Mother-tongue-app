import { UserProfile, LanguageScript } from '../types';

export interface AppSettingsState {
  // General & Learning
  learningLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  dailyGoalMinutes: number;
  startupTab: 'bosh_sahifa' | 'kurslar' | 'yangi' | 'profil' | 'sozlamalar';
  exerciseDifficulty: 'oson' | 'orta' | 'qiyin';
  exercisesPerSession: number;
  showExplanations: boolean;
  repeatIncorrect: boolean;

  // Notifications
  darsEslatmalari: boolean;
  dailyReminder: boolean;
  yangiMateriallar: boolean;
  progressResults: boolean;
  appUpdates: boolean;

  // Appearance
  themeMode: 'light' | 'dark' | 'system';
  uiScale: 'normal' | 'compact' | 'large';
  reducedAnimations: boolean;

  // Language
  language: LanguageScript;
}

export const defaultSettings: AppSettingsState = {
  learningLevel: 'B1',
  dailyGoalMinutes: 15,
  startupTab: 'bosh_sahifa',
  exerciseDifficulty: 'orta',
  exercisesPerSession: 10,
  showExplanations: true,
  repeatIncorrect: true,

  darsEslatmalari: true,
  dailyReminder: true,
  yangiMateriallar: true,
  progressResults: true,
  appUpdates: false,

  themeMode: 'light',
  uiScale: 'normal',
  reducedAnimations: false,

  language: 'latin',
};

export const defaultUserProfile: UserProfile = {
  id: 'usr-101',
  name: 'Abdushukur',
  initials: 'AB',
  level: 'B1 • O‘rta',
  grammarProgress: 0,
  writingProgress: 0,
  spellingProgress: 0,
  completedLessons: 0,
  totalLessons: 0,
  streakDays: 0,
  dailyGoalProgress: 0,
};

const STORAGE_KEYS = {
  PROFILE: 'ozbek_tili_profile_v2',
  SETTINGS: 'ozbek_tili_settings_v2',
  ACTIVITY: 'ozbek_tili_activity_v2',
  ACHIEVEMENTS: 'ozbek_tili_achievements_v2',
};

// LocalStorage Helpers
export function loadUserProfile(): UserProfile {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load user profile:', e);
  }
  return defaultUserProfile;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile:', e);
  }
}

export function loadAppSettings(): AppSettingsState {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (data) return { ...defaultSettings, ...JSON.parse(data) };
  } catch (e) {
    console.error('Failed to load app settings:', e);
  }
  return defaultSettings;
}

export function saveAppSettings(settings: AppSettingsState): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save app settings:', e);
  }
}

export function clearAllLocalData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITY);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
  } catch (e) {
    console.error('Failed to clear local data:', e);
  }
}
