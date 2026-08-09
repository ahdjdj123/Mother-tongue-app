import { curriculumData, LessonComponent } from '../data/curriculumDatabase';

export interface SearchResultItem {
  id: string;
  type: 'dars' | 'qoida' | 'mashq' | 'mavzu';
  typeLabel: string;
  grade: number;
  lessonId: string;
  lessonNumber: number | null;
  title: string;
  topic?: string;
  snippet: string;
  score: number;
}

/**
 * Normalizes Uzbek text by standardizing apostrophe variants
 * (e.g. o', o‘, o’, oʻ, g', g‘, g’, gʻ) and stripping diacritics.
 */
export function normalizeUzbekText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[‘'’ʻʼ`\\]/g, "'") // replace all apostrophe types with standard single quote
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Helper to remove apostrophes completely for fallback matching
 * (e.g. "urgu" matching "urg'u")
 */
export function stripApostrophes(text: string): string {
  return normalizeUzbekText(text).replace(/'/g, '');
}

/**
 * Extracts a relevant text snippet surrounding the matched query.
 */
function extractSnippet(fullText: string, query: string): string {
  if (!fullText) return '';
  const normText = normalizeUzbekText(fullText);
  const normQuery = normalizeUzbekText(query);

  const idx = normText.indexOf(normQuery);
  if (idx === -1) {
    return fullText.slice(0, 120) + (fullText.length > 120 ? '...' : '');
  }

  const start = Math.max(0, idx - 40);
  const end = Math.min(fullText.length, idx + query.length + 80);
  let snippet = fullText.slice(start, end);

  if (start > 0) snippet = '...' + snippet;
  if (end < fullText.length) snippet = snippet + '...';

  return snippet;
}

/**
 * Searches across ALL grades (5-11) and ALL lessons in curriculumData.
 * Returns ranked list of SearchResultItem.
 */
export function performGlobalSearch(rawQuery: string): SearchResultItem[] {
  const query = normalizeUzbekText(rawQuery);
  const strippedQuery = stripApostrophes(rawQuery);

  if (!query || query.length < 1) return [];

  const results: SearchResultItem[] = [];

  Object.entries(curriculumData.grades).forEach(([gradeStr, lessons]) => {
    const grade = Number(gradeStr);

    lessons.forEach((lesson) => {
      const normTitle = normalizeUzbekText(lesson.title);
      const strippedTitle = stripApostrophes(lesson.title);

      const normTopic = normalizeUzbekText(lesson.topic || '');
      const strippedTopic = stripApostrophes(lesson.topic || '');

      const normConcept = normalizeUzbekText(lesson.coreConcept || '');
      const normObjective = normalizeUzbekText(lesson.learningObjective || '');
      const normExplanation = normalizeUzbekText(lesson.explanation || '');

      const rulesCombined = (lesson.rules || []).join(' ');
      const normRules = normalizeUzbekText(rulesCombined);

      const practiceCombined = [
        ...(lesson.guidedPractice || []),
        ...(lesson.independentPractice || []),
      ].join(' ');
      const normPractice = normalizeUzbekText(practiceCombined);

      let maxScore = 0;
      let matchedType: 'dars' | 'qoida' | 'mashq' | 'mavzu' = 'dars';
      let matchedTypeLabel = 'Darslik';
      let snippet = lesson.coreConcept || lesson.explanation || lesson.learningObjective || '';

      // 1. Exact Title Match
      if (normTitle === query || strippedTitle === strippedQuery) {
        maxScore = 100;
        snippet = `Dars mavzusi: "${lesson.title}"`;
      }
      // 2. Title Starts With / Contains
      else if (normTitle.includes(query) || strippedTitle.includes(strippedQuery)) {
        maxScore = 85;
        snippet = `Mavzu: ${lesson.title}`;
      }
      // 3. Topic Match
      else if (normTopic && (normTopic.includes(query) || strippedTopic.includes(strippedQuery))) {
        maxScore = 75;
        matchedType = 'mavzu';
        matchedTypeLabel = 'Mavzu Bo‘limi';
        snippet = `Mavzu guruhi: ${lesson.topic}`;
      }
      // 4. Core Concept / Objective Match
      else if (normConcept.includes(query) || normObjective.includes(query)) {
        maxScore = 60;
        snippet = extractSnippet(lesson.coreConcept || lesson.learningObjective || '', rawQuery);
      }
      // 5. Rules Match
      else if (normRules.includes(query)) {
        maxScore = 50;
        matchedType = 'qoida';
        matchedTypeLabel = 'Qoida';
        snippet = extractSnippet(rulesCombined, rawQuery);
      }
      // 6. Explanation Match
      else if (normExplanation.includes(query)) {
        maxScore = 40;
        snippet = extractSnippet(lesson.explanation || '', rawQuery);
      }
      // 7. Practice / Exercises Match
      else if (normPractice.includes(query)) {
        maxScore = 30;
        matchedType = 'mashq';
        matchedTypeLabel = 'Mashq & Topshiriq';
        snippet = extractSnippet(practiceCombined, rawQuery);
      }

      if (maxScore > 0) {
        results.push({
          id: `${lesson.id}-${matchedType}`,
          type: matchedType,
          typeLabel: matchedTypeLabel,
          grade,
          lessonId: lesson.id,
          lessonNumber: lesson.lessonNumber,
          title: lesson.title,
          topic: lesson.topic,
          snippet,
          score: maxScore,
        });
      }
    });
  });

  // Sort by highest score first
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Suggested popular search terms from existing curriculum
 */
export const POPULAR_SEARCH_SUGGESTIONS = [
  { label: 'Oʻzbek alifbosi', grade: 5 },
  { label: 'Omonim va paronim', grade: 5 },
  { label: 'Bosh harflar imlosi', grade: 5 },
  { label: 'Sifat va Sifat darajalari', grade: 6 },
  { label: 'Ega va Kesim', grade: 8 },
  { label: 'Urgʻu va boʻgʻin', grade: 5 },
  { label: 'Insho va bayon', grade: 10 },
];
