import { curriculumData, LessonComponent } from '../data/curriculumDatabase';
import { UserProfile } from '../types';

export type LessonStatus = 'not_started' | 'in_progress' | 'completed';

export interface LessonProgress {
  lessonId: string;
  grade: number;
  status: LessonStatus;
  progressPercent: number; // 0 - 100
  completedAt?: string;
  exerciseScore?: number;
  lastAccessedAt?: string;
}

export type LessonProgressMap = Record<string, LessonProgress>;

const PROGRESS_STORAGE_KEY = 'ozbek_tili_lesson_progress_v2';

// In-memory cache to reduce localStorage reads
let progressCache: LessonProgressMap | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5000; // 5 seconds cache validity

function getFreshProgressMap(): LessonProgressMap {
  const now = Date.now();
  if (progressCache && (now - cacheTimestamp) < CACHE_TTL) {
    return progressCache;
  }
  
  try {
    const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (data) {
      progressCache = JSON.parse(data);
      cacheTimestamp = now;
      return progressCache;
    }
  } catch (e) {
    console.error('Failed to load lesson progress map:', e);
  }
  progressCache = {};
  cacheTimestamp = Date.now();
  return progressCache;
}

function invalidateCache(): void {
  progressCache = null;
  cacheTimestamp = 0;
}

export function loadLessonProgressMap(): LessonProgressMap {
  return getFreshProgressMap();
}

export function saveLessonProgressMap(map: LessonProgressMap): void {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(map));
    progressCache = map;
    cacheTimestamp = Date.now();
  } catch (e) {
    console.error('Failed to save lesson progress map:', e);
  }
}

export function getLessonProgress(lessonId: string): LessonProgress {
  const map = loadLessonProgressMap();
  if (map[lessonId]) {
    return map[lessonId];
  }
  return {
    lessonId,
    grade: 5,
    status: 'not_started',
    progressPercent: 0,
  };
}

export function startLesson(lessonId: string, grade: number): LessonProgressMap {
  const map = loadLessonProgressMap();
  const existing = map[lessonId];
  if (!existing || existing.status === 'not_started') {
    map[lessonId] = {
      lessonId,
      grade,
      status: 'in_progress',
      progressPercent: existing?.progressPercent || 30,
      lastAccessedAt: new Date().toISOString(),
    };
  } else {
    map[lessonId].lastAccessedAt = new Date().toISOString();
  }
  saveLessonProgressMap(map);
  return map;
}

export function markLessonCompleted(
  lessonId: string,
  grade: number,
  score?: number
): LessonProgressMap {
  const map = loadLessonProgressMap();
  map[lessonId] = {
    lessonId,
    grade,
    status: 'completed',
    progressPercent: 100,
    completedAt: new Date().toISOString(),
    lastAccessedAt: new Date().toISOString(),
    exerciseScore: score !== undefined ? score : map[lessonId]?.exerciseScore || 100,
  };
  saveLessonProgressMap(map);
  return map;
}

export function updateLessonExerciseScore(
  lessonId: string,
  grade: number,
  scorePercent: number
): LessonProgressMap {
  const map = loadLessonProgressMap();
  const existing = map[lessonId];
  map[lessonId] = {
    lessonId,
    grade,
    status: existing?.status === 'completed' ? 'completed' : 'in_progress',
    progressPercent: existing?.status === 'completed' ? 100 : Math.max(existing?.progressPercent || 0, 60),
    exerciseScore: scorePercent,
    lastAccessedAt: new Date().toISOString(),
    completedAt: existing?.completedAt,
  };
  saveLessonProgressMap(map);
  return map;
}

export function getAllLessonsFlat(): LessonComponent[] {
  const result: LessonComponent[] = [];
  Object.values(curriculumData.grades).forEach((list) => {
    result.push(...list);
  });
  return result;
}

export function getGradeProgress(gradeNumber: number): {
  completed: number;
  total: number;
  percentage: number;
} {
  const lessons = curriculumData.grades[gradeNumber] || [];
  const map = getFreshProgressMap();
  const total = lessons.length;
  if (total === 0) return { completed: 0, total: 0, percentage: 0 };

  let completed = 0;
  for (let i = 0; i < lessons.length; i++) {
    const l = lessons[i];
    const prog = map[l.id];
    if (prog && prog.status === 'completed') {
      completed++;
    }
  }

  const percentage = Math.round((completed / total) * 100);
  return { completed, total, percentage };
}

export function getTotalProgress(): {
  completed: number;
  inProgress: number;
  total: number;
  percentage: number;
} {
  const allLessons = getAllLessonsFlat();
  const map = getFreshProgressMap();
  const total = allLessons.length;
  if (total === 0) return { completed: 0, inProgress: 0, total: 0, percentage: 0 };

  let completed = 0;
  let inProgress = 0;

  for (let i = 0; i < allLessons.length; i++) {
    const l = allLessons[i];
    const prog = map[l.id];
    if (prog?.status === 'completed') {
      completed++;
    } else if (prog?.status === 'in_progress') {
      inProgress++;
    }
  }

  const percentage = Math.round((completed / total) * 100);
  return { completed, inProgress, total, percentage };
}

export function getRecentActiveLesson(): LessonComponent | null {
  const map = getFreshProgressMap();
  const allLessons = getAllLessonsFlat();

  const activeEntries = Object.values(map)
    .filter((p) => p.lastAccessedAt)
    .sort(
      (a, b) =>
        new Date(b.lastAccessedAt!).getTime() - new Date(a.lastAccessedAt!).getTime()
    );

  if (activeEntries.length > 0) {
    const found = allLessons.find((l) => l.id === activeEntries[0].lessonId);
    if (found) return found;
  }

  // Fallback to first lesson
  return allLessons[0] || null;
}

export function getNextUnfinishedLesson(): LessonComponent | null {
  const map = getFreshProgressMap();
  const allLessons = getAllLessonsFlat();

  for (let i = 0; i < allLessons.length; i++) {
    const l = allLessons[i];
    const prog = map[l.id];
    if (!prog || prog.status !== 'completed') {
      return l;
    }
  }

  return allLessons[0] || null;
}

export function syncUserProfileWithProgress(profile: UserProfile): UserProfile {
  const { completed, total, percentage } = getTotalProgress();
  return {
    ...profile,
    completedLessons: completed,
    totalLessons: total,
    grammarProgress: percentage,
    writingProgress: Math.min(100, Math.round(percentage * 0.9)),
    spellingProgress: Math.min(100, Math.round(percentage * 0.95)),
  };
}


