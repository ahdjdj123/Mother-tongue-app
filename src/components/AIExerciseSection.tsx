import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Award,
  ArrowRight,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { LessonComponent } from '../data/curriculumDatabase';
import {
  generateExercisesForLesson,
  GeneratedExerciseSet,
  ExerciseQuestion,
} from '../utils/aiExerciseGenerator';
import { updateLessonExerciseScore } from '../utils/userProgressStore';

interface AIExerciseSectionProps {
  lesson: LessonComponent;
  onExercisesComplete?: (scorePercent: number) => void;
}

export const AIExerciseSection: React.FC<AIExerciseSectionProps> = ({
  lesson,
  onExercisesComplete,
}) => {
  const [exerciseSet, setExerciseSet] = useState<GeneratedExerciseSet>(() =>
    generateExercisesForLesson(lesson, 5)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, { answer: string; isCorrect: boolean }>>({});
  const [isFinished, setIsFinished] = useState(false);

  // Reset exercise state when lesson changes
  useEffect(() => {
    setExerciseSet(generateExercisesForLesson(lesson, 5));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    setUserAnswers({});
    setIsFinished(false);
  }, [lesson.id]);

  const currentQuestion: ExerciseQuestion | undefined = exerciseSet.questions[currentIndex];

  const handleRegenerate = () => {
    setExerciseSet(generateExercisesForLesson(lesson, 5));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    setUserAnswers({});
    setIsFinished(false);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !currentQuestion) return;

    const isCorrect = selectedOption.trim() === currentQuestion.correctAnswer.trim();
    setIsSubmitted(true);

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        answer: selectedOption,
        isCorrect,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < exerciseSet.questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowHint(false);
    } else {
      // Finish exercises
      setIsFinished(true);

      // Calculate score
      const total = exerciseSet.questions.length;
      let correctCount = 0;
      exerciseSet.questions.forEach((q) => {
        if (userAnswers[q.id]?.isCorrect) correctCount++;
      });
      // Include current question if submitted
      if (currentQuestion && selectedOption) {
        if (selectedOption.trim() === currentQuestion.correctAnswer.trim()) {
          correctCount++;
        }
      }

      const scorePercent = Math.round((correctCount / total) * 100);
      updateLessonExerciseScore(lesson.id, lesson.grade, scorePercent);

      if (onExercisesComplete) {
        onExercisesComplete(scorePercent);
      }
    }
  };

  const correctCount = Object.values(userAnswers).filter(
    (a: { answer: string; isCorrect: boolean }) => a.isCorrect
  ).length;
  const scorePercent = exerciseSet.questions.length > 0
    ? Math.round((correctCount / exerciseSet.questions.length) * 100)
    : 0;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-800 space-y-6 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
              <span>AI Interaktiv Mashqlar va Test</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30">
                AI Powered
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Dars materialiga asoslangan savollar va amaliy mashqlar to‘plami
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRegenerate}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
          <span>Yangi AI Savollari Yaratish</span>
        </button>
      </div>

      {!isFinished && currentQuestion ? (
        <div className="space-y-6">
          {/* Question Progress Header */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>
              Savol {currentIndex + 1} / {exerciseSet.questions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="capitalize px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px]">
                {currentQuestion.difficulty} Daraja
              </span>
              <span className="uppercase text-[10px] px-2 py-0.5 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
                {currentQuestion.type.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-2 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / exerciseSet.questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-5 space-y-4">
            <h4 className="text-sm sm:text-base font-bold text-slate-100 whitespace-pre-line leading-relaxed">
              {currentQuestion.prompt}
            </h4>

            {/* Options List */}
            {currentQuestion.options && currentQuestion.options.length > 0 && (
              <div className="space-y-2.5 pt-2">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt.trim() === currentQuestion.correctAnswer.trim();

                  let btnStyle =
                    'bg-slate-800/90 hover:bg-slate-700/80 border-slate-700 text-slate-200';

                  if (isSubmitted) {
                    if (isCorrect) {
                      btnStyle =
                        'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected) {
                      btnStyle =
                        'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                    } else {
                      btnStyle = 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    btnStyle =
                      'bg-blue-600/30 border-blue-500 text-blue-200 font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => setSelectedOption(opt)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Hint & Actions Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-700/60">
              {currentQuestion.hint && (
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Maslahatni berkitish' : 'Maslahat / Hint'}</span>
                </button>
              )}

              <div className="ml-auto flex items-center gap-2">
                {!isSubmitted ? (
                  <button
                    type="button"
                    disabled={!selectedOption}
                    onClick={handleSubmitAnswer}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Tekshirish
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>
                      {currentIndex + 1 === exerciseSet.questions.length
                        ? 'Natijani Ko‘rish'
                        : 'Keyingi Savol'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Show Hint Box */}
            {showHint && currentQuestion.hint && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs">
                💡 <strong>Maslahat:</strong> {currentQuestion.hint}
              </div>
            )}

            {/* Explanation Feedback Box */}
            {isSubmitted && (
              <div
                className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 ${
                  selectedOption?.trim() === currentQuestion.correctAnswer.trim()
                    ? 'bg-emerald-950/50 border-emerald-800/80 text-emerald-200'
                    : 'bg-rose-950/50 border-rose-800/80 text-rose-200'
                }`}
              >
                <div className="font-extrabold flex items-center gap-1.5 text-sm">
                  {selectedOption?.trim() === currentQuestion.correctAnswer.trim() ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Barakalla! To‘g‘ri javob!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>Noto‘g‘ri. To‘g‘ri javob: "{currentQuestion.correctAnswer}"</span>
                    </>
                  )}
                </div>
                <p className="pt-1 opacity-90">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Exercises Complete Summary View */
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-xl font-extrabold text-white">
              AI Mashqlari Muvaffaqiyatli Bajarildi!
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Dars bo‘yicha bilimingiz baholandi va progress hisobingizga qo‘shildi.
            </p>
          </div>

          <div className="inline-flex items-center gap-4 bg-slate-900/90 border border-slate-700 px-6 py-3 rounded-2xl">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                To‘g‘ri Javoblar
              </span>
              <span className="text-lg font-black text-emerald-400">
                {correctCount} / {exerciseSet.questions.length}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Natija
              </span>
              <span className="text-lg font-black text-blue-400">{scorePercent}%</span>
            </div>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={handleRegenerate}
              className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Qaytadan Bajarish</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
