import {
  UserProfile,
  CourseTrack,
  LevelItem,
  NewLessonItem,
  AchievementItem,
  ActivityItem,
  RecommendedLesson,
} from '../types';

export const initialProfile: UserProfile = {
  id: 'user-1',
  name: 'Abdushukur',
  initials: 'AB',
  level: 'B1 • Intermediate',
  grammarProgress: 64,
  writingProgress: 41,
  completedLessons: 85,
  totalLessons: 205,
  streakDays: 7,
  dailyGoalProgress: 0,
};

export const courseTracks: CourseTrack[] = [
  {
    id: 'track-grammar',
    title: 'Grammatika',
    category: 'Grammatika',
    description: "Tilning qoidalari, tuzilmasi va so'zlarning to'g'ri ishlatilishini o'rganing.",
    progress: 64,
    iconType: 'grammar',
  },
  {
    id: 'track-writing',
    title: 'Yozuv',
    category: 'Yozuv',
    description: "Fikrlaringizni aniq va to'g'ri yozish ko'nikmalarini rivojlantiring.",
    progress: 41,
    iconType: 'writing',
  },
];

export const courseLevels: LevelItem[] = [
  {
    code: 'A1',
    title: "Boshlang'ich",
    subtitle: 'Asosiy bilimlar',
    lessonsCount: 12,
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
  },
  {
    code: 'A2',
    title: 'Elementar',
    subtitle: 'Oddiy gaplar va matnlar',
    lessonsCount: 18,
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
  },
  {
    code: 'B1',
    title: "O'rta",
    subtitle: 'Murakkabroq tuzilmalar',
    lessonsCount: 24,
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
  },
  {
    code: 'B2',
    title: "O'rta yuqori",
    subtitle: 'Erkin ifoda va tahlil',
    lessonsCount: 20,
    badgeColor: 'text-purple-700 bg-purple-50 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
  },
  {
    code: 'C1',
    title: 'Yuqori',
    subtitle: 'Mukammal daraja',
    lessonsCount: 18,
    badgeColor: 'text-teal-700 bg-teal-50 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800',
  },
];

export const newLessonsList: NewLessonItem[] = [
  {
    id: 'nl-1',
    title: "Qo'shma gaplar",
    category: 'Grammatika',
    level: 'B1 daraja',
    description: "Qo'shma gaplarning turlari va ularni tuzish qoidalari.",
    durationMinutes: 15,
    badgeText: 'Yangi',
    isNew: true,
  },
  {
    id: 'nl-2',
    title: 'Rasm asosida matn yozish',
    category: 'Yozuv',
    level: 'B1 daraja',
    description: 'Berilgan rasm asosida mavzuga mos matn yozish.',
    durationMinutes: 20,
    badgeText: 'Yangi',
    isNew: true,
  },
  {
    id: 'nl-3',
    title: 'Shaxs va mayl mayli',
    category: 'Grammatika',
    level: 'A2 daraja',
    description: "Shaxs va mayl maylining yasash va qo'llanishi.",
    durationMinutes: 12,
    badgeText: 'Yangi',
    isNew: true,
  },
  {
    id: 'nl-4',
    title: 'Imlo qoidalari: Tutuq belgisi',
    category: 'Spelling',
    level: 'A1 daraja',
    description: "Tutuq belgisining o'zbek tilida to'g'ri ishlatilishi.",
    durationMinutes: 10,
    badgeText: 'Yangi',
    isNew: true,
  },
];

export const achievementsList: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Boshlovchi',
    description: '10 ta darsni tugatdingiz',
    progressText: '10/10',
    icon: 'badge',
    color: 'emerald',
  },
  {
    id: 'ach-2',
    title: "Izchil o'quvchi",
    description: "7 kun ketma-ket o'qidingiz",
    progressText: '7/7',
    icon: 'zap',
    color: 'purple',
  },
  {
    id: 'ach-3',
    title: 'Grammatika bilimdoni',
    description: "5 bo'limni yakunladingiz",
    progressText: '5/5',
    icon: 'book',
    color: 'blue',
  },
  {
    id: 'ach-4',
    title: 'Yozuv ustasi',
    description: '20 ta mashqni bajardingiz',
    progressText: '20/20',
    icon: 'pencil',
    color: 'amber',
  },
];

export const recentActivities: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Murakkab gaplar',
    category: 'Grammatika',
    level: 'B1',
    score: 80,
    timeAgo: 'Bugun',
    iconType: 'grammar',
  },
  {
    id: 'act-2',
    title: 'Rasm asosida matn yozish',
    category: 'Yozuv',
    level: 'B1',
    score: 100,
    timeAgo: 'Kecha',
    iconType: 'writing',
  },
  {
    id: 'act-3',
    title: 'Shaxs va mayl mayli',
    category: 'Grammatika',
    level: 'A2',
    score: 60,
    timeAgo: '2 kun oldin',
    iconType: 'grammar',
  },
];

export const recommendedLessons: RecommendedLesson[] = [
  {
    id: 'rec-1',
    title: "Kelasi zamon",
    category: 'Grammatika',
    level: "3-bo'lim",
    durationMinutes: 15,
    iconType: 'list',
  },
  {
    id: 'rec-2',
    title: 'Rasmiy xat yozish',
    category: 'Yozuv',
    level: 'Amaliy yozuv',
    durationMinutes: 20,
    iconType: 'writing',
  },
  {
    id: 'rec-3',
    title: "Fe'llar zamoni",
    category: 'Grammatika',
    level: 'A2',
    durationMinutes: 10,
    iconType: 'grammar',
  },
  {
    id: 'rec-4',
    title: 'Xat yozish qoidalari',
    category: 'Yozuv',
    level: 'A2',
    durationMinutes: 15,
    iconType: 'writing',
  },
  {
    id: 'rec-5',
    title: 'Nuqta/vergul',
    category: 'Grammatika',
    level: 'A1',
    durationMinutes: 8,
    iconType: 'list',
  },
];
