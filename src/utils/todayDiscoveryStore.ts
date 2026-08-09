import { curriculumData, LessonComponent } from '../data/curriculumDatabase';

export interface DiscoveryItem {
  id: string;
  type: 'lesson' | 'rule' | 'exercise';
  lessonId: string;
  grade: number;
  lessonTitle: string;
  topic?: string;
  typeLabel: string;
  headline: string;
  excerpt: string;
}

const RECENT_ITEMS_KEY = 'bugungi_qoida_recent_ids_v1';
const MAX_RECENT_ITEMS = 15;

function loadRecentIds(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_ITEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecentIds(ids: string[]): void {
  try {
    localStorage.setItem(RECENT_ITEMS_KEY, JSON.stringify(ids.slice(-MAX_RECENT_ITEMS)));
  } catch {
    // ignore
  }
}

export function getAllDiscoveryItems(): DiscoveryItem[] {
  const items: DiscoveryItem[] = [];

  Object.entries(curriculumData.grades).forEach(([gradeStr, lessons]) => {
    const grade = Number(gradeStr);
    lessons.forEach((lesson) => {
      // 1. Whole Lesson
      const lessonExcerpt =
        lesson.coreConcept ||
        lesson.explanation ||
        lesson.learningObjective ||
        lesson.title;

      items.push({
        id: `${lesson.id}-lesson`,
        type: 'lesson',
        lessonId: lesson.id,
        grade,
        lessonTitle: lesson.title,
        topic: lesson.topic,
        typeLabel: 'Darslik',
        headline: lesson.title,
        excerpt: lessonExcerpt,
      });

      // 2. Rules
      if (lesson.rules && lesson.rules.length > 0) {
        lesson.rules.forEach((rule, idx) => {
          items.push({
            id: `${lesson.id}-rule-${idx}`,
            type: 'rule',
            lessonId: lesson.id,
            grade,
            lessonTitle: lesson.title,
            topic: lesson.topic,
            typeLabel: 'Grammatik Qoida',
            headline: lesson.title,
            excerpt: rule,
          });
        });
      }

      // 3. Exercises
      const practices = [
        ...(lesson.guidedPractice || []),
        ...(lesson.independentPractice || []),
      ];
      practices.forEach((practice, idx) => {
        items.push({
          id: `${lesson.id}-ex-${idx}`,
          type: 'exercise',
          lessonId: lesson.id,
          grade,
          lessonTitle: lesson.title,
          topic: lesson.topic,
          typeLabel: 'Amaliy Mashq',
          headline: lesson.title,
          excerpt: practice,
        });
      });
    });
  });

  return items;
}

/**
 * Selects a discovery item using probabilities:
 * 50% lesson, 30% rule, 20% exercise
 * Excludes recently shown IDs to prevent immediate repetition.
 */
export function getRandomDiscoveryItem(forceNew: boolean = false): DiscoveryItem {
  const allItems = getAllDiscoveryItems();
  if (allItems.length === 0) {
    // Fallback stub if empty database
    return {
      id: 'fallback',
      type: 'lesson',
      lessonId: 'G5-L01',
      grade: 5,
      lessonTitle: 'Oʻzbek alifbosi',
      topic: 'Alifbo',
      typeLabel: 'Darslik',
      headline: 'Oʻzbek alifbosi',
      excerpt: 'Oʻzbek alifbosi lotin yozuviga asoslangan boʻlib, 29 ta harfdan iborat.',
    };
  }

  let recentIds = loadRecentIds();

  // Determine target type by probability:
  // 0.0 - 0.50 -> 'lesson'
  // 0.50 - 0.80 -> 'rule'
  // 0.80 - 1.00 -> 'exercise'
  const randVal = Math.random();
  const targetType: 'lesson' | 'rule' | 'exercise' =
    randVal < 0.5
      ? 'lesson'
      : randVal < 0.8
      ? 'rule'
      : 'exercise';

  // Filter items by type and exclude recent IDs
  let candidates = allItems.filter(
    (item) => item.type === targetType && !recentIds.includes(item.id)
  );

  // Fallback 1: Any item non-recent
  if (candidates.length === 0) {
    candidates = allItems.filter((item) => !recentIds.includes(item.id));
  }

  // Fallback 2: If all items were shown recently, reset history
  if (candidates.length === 0) {
    recentIds = [];
    candidates = allItems.filter((item) => item.type === targetType);
    if (candidates.length === 0) candidates = allItems;
  }

  // Pick random candidate
  const chosen = candidates[Math.floor(Math.random() * candidates.length)];

  // Save to recent list
  if (forceNew || !recentIds.includes(chosen.id)) {
    recentIds.push(chosen.id);
    saveRecentIds(recentIds);
  }

  return chosen;
}
