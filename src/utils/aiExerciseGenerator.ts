import { LessonComponent } from '../data/curriculumDatabase';

export type ExerciseType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'error_correction'
  | 'short_answer'
  | 'matching';

export interface ExerciseQuestion {
  id: string;
  type: ExerciseType;
  prompt: string;
  options?: string[]; // for multiple choice
  correctAnswer: string;
  explanation: string;
  hint?: string;
  difficulty: 'oson' | 'orta' | 'qiyin';
}

export interface GeneratedExerciseSet {
  lessonId: string;
  lessonTitle: string;
  questions: ExerciseQuestion[];
}

/**
 * Generates an exercise set strictly grounded in the lesson's stored material.
 */
export function generateExercisesForLesson(
  lesson: LessonComponent,
  count: number = 5
): GeneratedExerciseSet {
  const questions: ExerciseQuestion[] = [];
  const rules = lesson.rules || [];
  const examples = lesson.examples || [];
  const mistakes = lesson.commonMistakes || [];
  const guided = lesson.guidedPractice || [];
  const independent = lesson.independentPractice || [];
  const answers = lesson.answersExplanations || [];

  let qId = 1;

  // 1. Multiple choice question on core rule or concept
  if (rules.length > 0) {
    const mainRule = rules[0];
    const otherRules = rules.slice(1);
    
    questions.push({
      id: `ex-${lesson.id}-${qId++}`,
      type: 'multiple_choice',
      prompt: `Mavzu bo‘yicha to‘g‘ri qoidani aniqlang: "${lesson.title}"`,
      options: shuffleOptions([
        mainRule,
        otherRules[0] ? `Xato: ${otherRules[0].replace('to‘g‘ri', 'xato')}` : 'Bu qoida faqat istisno hollarda amal qiladi.',
        'Qoida faqat so‘zlashuv uslubida ishlatiladi.',
        'Bunday grammatik hodisa o‘zbek tilida mavjud emas.'
      ]),
      correctAnswer: mainRule,
      explanation: `To'g'ri javob dars qoidasida keltirilgan: "${mainRule}".`,
      hint: lesson.coreConcept || 'Dars qoidalariga e\'tibor bering.',
      difficulty: lesson.grade > 8 ? 'qiyin' : lesson.grade > 6 ? 'orta' : 'oson'
    });
  }

  // 2. Fill-in-the-blank question from examples or practice
  if (examples.length > 0) {
    const exSample = examples[0];
    // Pick a word from example to blank out if possible
    const words = exSample.split(' ');
    if (words.length >= 3) {
      const targetWordIndex = Math.floor(words.length / 2);
      const targetWord = words[targetWordIndex].replace(/[.,!?-]/g, '');
      const blankSentence = words.map((w, idx) => idx === targetWordIndex ? '____' : w).join(' ');

      const distractor1 = targetWord.includes('a') ? targetWord.replace('a', 'o') : targetWord + 'da';
      const distractor2 = targetWord.includes('i') ? targetWord.replace('i', 'e') : targetWord + 'ni';
      const distractor3 = 'boshqa';

      questions.push({
        id: `ex-${lesson.id}-${qId++}`,
        type: 'fill_blank',
        prompt: `Bo‘sh o‘rinni dars qoidasiga ko‘ra to‘ldiring:\n\n"${blankSentence}"`,
        options: shuffleOptions([targetWord, distractor1, distractor2, distractor3]),
        correctAnswer: targetWord,
        explanation: `To'g'ri variant: "${targetWord}". Darsdagi misol: "${exSample}".`,
        hint: `Dars misollari bo'limida ko'rsatilgan.`,
        difficulty: lesson.grade > 8 ? 'qiyin' : 'orta'
      });
    }
  }

  // 3. Error correction question from common mistakes
  if (mistakes.length > 0) {
    const mistakeText = mistakes[0];
    const matchedAnswer = answers[0] || 'To‘g‘ri shakli dars izohlarida keltirilgan.';

    questions.push({
      id: `ex-${lesson.id}-${qId++}`,
      type: 'error_correction',
      prompt: `Keng tarqalgan xatoni aniqlang va to‘g‘rilang:\n\n"${mistakeText}"`,
      options: shuffleOptions([
        `Tuzatish: ${matchedAnswer}`,
        `Hamma shakli to'g'ri yozilgan.`,
        `Faqat vergul belgisi tushirib qoldirilgan.`,
        `Imlo xatosi yo'q.`
      ]),
      correctAnswer: `Tuzatish: ${matchedAnswer}`,
      explanation: `Ushbu xatoning to'g'rilangan shakli va izohi: ${matchedAnswer}.`,
      hint: `Ko'p uchraydigan xatolar va izohlar bo'limiga qarang.`,
      difficulty: 'orta'
    });
  }

  // 4. Guided practice question
  if (guided.length > 0) {
    const gItem = guided[0];
    const gAns = answers[1] || answers[0] || 'Mashq bajarish qoidalari.';

    questions.push({
      id: `ex-${lesson.id}-${qId++}`,
      type: 'short_answer',
      prompt: `Tahlil qiling yoki javob bering: "${gItem}"`,
      options: shuffleOptions([
        gAns,
        'Bu gapda sintaktik xatolik bor.',
        'Berilgan shakl grammatik jihatdan nooʻrnatilgan.',
        'Variantlar mos kelmaydi.'
      ]),
      correctAnswer: gAns,
      explanation: `Dars mashqlari izohi: ${gAns}`,
      hint: lesson.explanation || 'Dars matniga tayaning.',
      difficulty: 'orta'
    });
  }

  // 5. Independent practice question
  if (independent.length > 0) {
    const indItem = independent[0];
    const indAns = answers[answers.length - 1] || 'Mustaqil topshiriq mezonlari.';

    questions.push({
      id: `ex-${lesson.id}-${qId++}`,
      type: 'multiple_choice',
      prompt: `Mustaqil topshiriq tahlili: "${indItem}"`,
      options: shuffleOptions([
        indAns,
        'Qoida bo‘yicha qo‘llanmagan.',
        'Uslubiy xato mavjud.',
        'Mantiqiy ziddiyat bor.'
      ]),
      correctAnswer: indAns,
      explanation: `Xulosa va izoh: ${indAns}`,
      hint: lesson.lessonRecap || 'Dars xulosasini ko‘ring.',
      difficulty: lesson.grade > 8 ? 'qiyin' : 'orta'
    });
  }

  // 6. Objective & Recap question if questions < count
  if (questions.length < count && lesson.learningObjective) {
    questions.push({
      id: `ex-${lesson.id}-${qId++}`,
      type: 'multiple_choice',
      prompt: `Ushbu darsning asosiy maqsadi nimadan iborat?`,
      options: shuffleOptions([
        lesson.learningObjective,
        'Faqat husnixat qoidalarini mashq qilish',
        'Cyrillic va Latin shriftlarini taqqoslash',
        'Boshqa adabiyot fanidan test topshirish'
      ]),
      correctAnswer: lesson.learningObjective,
      explanation: `Darsning rasmiy o‘quv maqsadi: ${lesson.learningObjective}`,
      hint: 'Darsning kirish qismida berilgan.',
      difficulty: 'oson'
    });
  }

  // If still less than count, add rule-based questions
  if (rules.length > 1 && questions.length < count) {
    rules.slice(1).forEach((r, idx) => {
      if (questions.length >= count) return;
      questions.push({
        id: `ex-${lesson.id}-${qId++}`,
        type: 'multiple_choice',
        prompt: `${idx + 2}-Qoida bo‘yicha to‘g‘ri tasdiqni tanlang:`,
        options: shuffleOptions([
          r,
          'Ushbu qoida faqat qadimgi turkiy tilda bor edi.',
          'Har doim istisnosiz qo‘llanmaydi.',
          'Ushbu qoidani o‘rganish majburiy emas.'
        ]),
        correctAnswer: r,
        explanation: `Qoida: "${r}"`,
        difficulty: 'orta'
      });
    });
  }

  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    questions: questions.slice(0, Math.max(3, count)),
  };
}

function shuffleOptions(array: string[]): string[] {
  const unique = Array.from(new Set(array));
  return [...unique].sort(() => Math.random() - 0.5);
}
