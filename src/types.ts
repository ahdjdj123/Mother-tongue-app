export type NavigationTab = 'bosh_sahifa' | 'kurslar' | 'yangi' | 'profil' | 'sozlamalar';

export type LanguageScript = 'latin' | 'cyrillic' | 'english';

export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  level: string;
  grammarProgress: number; // percentage
  writingProgress: number; // percentage
  spellingProgress?: number; // percentage
  completedLessons: number;
  totalLessons: number;
  streakDays: number;
  dailyGoalProgress: number; // e.g. 0/5
}

export interface CourseTrack {
  id: string;
  title: string;
  category: 'Grammatika' | 'Yozuv';
  description: string;
  progress: number;
  iconType: 'grammar' | 'writing';
}

export interface LevelItem {
  code: string;
  title: string;
  subtitle: string;
  lessonsCount: number;
  badgeColor: string;
}

export interface NewLessonItem {
  id: string;
  title: string;
  category: string;
  level: string;
  description: string;
  durationMinutes: number;
  badgeText: string;
  isNew: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  progressText: string;
  icon: 'badge' | 'star' | 'book' | 'pencil' | 'award' | 'zap';
  color: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  level: string;
  score: number;
  timeAgo: string;
  iconType: 'grammar' | 'writing';
}

export interface RecommendedLesson {
  id: string;
  title: string;
  category: string;
  level?: string;
  durationMinutes: number;
  iconType: 'grammar' | 'writing' | 'list';
}
