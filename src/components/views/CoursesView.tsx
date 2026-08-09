import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  Search,
  ChevronRight,
  Bookmark,
  FileText,
  HelpCircle,
  Lightbulb,
  CheckSquare,
  Sparkles,
  ArrowLeft,
  BookMarked,
  ShieldCheck,
  Clock,
  CircleDashed,
} from 'lucide-react';
import { TranslationDictionary } from '../../data/translations';
import { curriculumData, LessonComponent } from '../../data/curriculumDatabase';
import {
  loadLessonProgressMap,
  startLesson,
  markLessonCompleted,
  getGradeProgress,
  LessonProgressMap,
} from '../../utils/userProgressStore';
import { AIExerciseSection } from '../AIExerciseSection';
import { RequiemModal } from '../RequiemModal';

interface CoursesViewProps {
  t: TranslationDictionary;
  onActionClick?: (title: string) => void;
  onProgressUpdate?: () => void;
  targetLesson?: { grade: number; lessonId: string } | null;
  onClearTargetLesson?: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  t,
  onActionClick,
  onProgressUpdate,
  targetLesson,
  onClearTargetLesson,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLesson, setActiveLesson] = useState<LessonComponent | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'not_started' | 'in_progress' | 'completed'>('all');

  // Persistent Progress State
  const [progressMap, setProgressMap] = useState<LessonProgressMap>(loadLessonProgressMap);
  const [isRequiemModalOpen, setIsRequiemModalOpen] = useState(false);

  // Auto-open target lesson when navigating from Global Search or Today Discovery
  useEffect(() => {
    if (targetLesson) {
      const gradeLessons = curriculumData.grades[targetLesson.grade] || [];
      const found = gradeLessons.find((l) => l.id === targetLesson.lessonId);
      if (found) {
        setSelectedGrade(targetLesson.grade);
        const updatedMap = startLesson(found.id, found.grade);
        setProgressMap(updatedMap);
        setActiveLesson(found);
      }
      if (onClearTargetLesson) onClearTargetLesson();
    }
  }, [targetLesson]);

  // Re-sync progress map from localStorage on mount or active lesson changes
  useEffect(() => {
    setProgressMap(loadLessonProgressMap());
  }, [activeLesson]);

  const currentGradeLessons = curriculumData.grades[selectedGrade] || [];
  const gradeStats = getGradeProgress(selectedGrade);

  const handleOpenLesson = (lesson: LessonComponent) => {
    // Mark as in_progress if not completed
    const updatedMap = startLesson(lesson.id, lesson.grade);
    setProgressMap(updatedMap);
    setActiveLesson(lesson);
    if (onProgressUpdate) onProgressUpdate();
  };

  const handleConfirmRequiem = () => {
    if (!activeLesson) return;
    const updatedMap = markLessonCompleted(activeLesson.id, activeLesson.grade);
    setProgressMap(updatedMap);
    setIsRequiemModalOpen(false);

    if (onActionClick) {
      onActionClick(`"${activeLesson.title}" darsi muvaffaqiyatli yakunlandi! (REQUİEM) 🌟`);
    }
    if (onProgressUpdate) onProgressUpdate();
  };

  const filteredLessons = currentGradeLessons.filter((lesson) => {
    const p = progressMap[lesson.id];
    const status = p ? p.status : 'not_started';

    if (statusFilter !== 'all' && status !== statusFilter) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      lesson.title.toLowerCase().includes(q) ||
      (lesson.topic && lesson.topic.toLowerCase().includes(q)) ||
      (lesson.coreConcept && lesson.coreConcept.toLowerCase().includes(q)) ||
      (lesson.explanation && lesson.explanation.toLowerCase().includes(q))
    );
  });

  const totalCurriculumLessons = Object.values(curriculumData.grades).reduce(
    (acc, list) => acc + list.length,
    0
  );

  return (
    <div className="space-y-6 pb-12 max-w-6xl">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span>Oʻquv Dasturi (5-11 Sinf Darsliklari)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Akademik ta'lim dasturi va 5–11 soʻz turkumlari, grammatika va yozuv koʻnikmalari bazasi ({totalCurriculumLessons} ta dars).
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Rasmiy 2026 Dastur Kardi</span>
          </span>
        </div>
      </div>

      {/* Grade Selector & Grade Overall Progress Header */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {[5, 6, 7, 8, 9, 10, 11].map((gradeNum) => {
            const count = (curriculumData.grades[gradeNum] || []).length;
            const isSelected = selectedGrade === gradeNum;
            const gStat = getGradeProgress(gradeNum);

            return (
              <button
                key={gradeNum}
                type="button"
                onClick={() => {
                  setSelectedGrade(gradeNum);
                  setActiveLesson(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800'
                }`}
              >
                <span>{gradeNum}-Sinf</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {gStat.completed}/{count} ({gStat.percentage}%)
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Grade Progress Bar */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
            <span>{selectedGrade}-Sinf Oʻzlashtirish Rivoji:</span>
            <span className="text-blue-600 dark:text-blue-400 font-black">
              {gradeStats.completed} / {gradeStats.total} dars ({gradeStats.percentage}%)
            </span>
          </div>

          <div className="w-full sm:w-48 bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 transition-all duration-300"
              style={{ width: `${gradeStats.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeLesson ? (
        /* Detailed Lesson Reader View */
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4">
            <button
              type="button"
              onClick={() => setActiveLesson(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{selectedGrade}-sinf darslar roʻyxatiga qaytish</span>
            </button>

            <div className="flex items-center gap-2">
              {/* Lesson Status Badge */}
              {progressMap[activeLesson.id]?.status === 'completed' ? (
                <span className="px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[11px] font-extrabold flex items-center gap-1.5 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tugallangan (100%)</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800 text-[11px] font-extrabold flex items-center gap-1.5 shadow-2xs">
                  <Clock className="w-4 h-4" />
                  <span>Jarayonda ({progressMap[activeLesson.id]?.progressPercent || 30}%)</span>
                </span>
              )}

              {activeLesson.verificationStatus === 'needs_verification' && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[11px] font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>[VERIFY]</span>
                </span>
              )}
            </div>
          </div>

          {/* Lesson Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-extrabold mb-2">
              <span>{selectedGrade}-SINF</span>
              {activeLesson.lessonNumber && <span>• DARS {activeLesson.lessonNumber}</span>}
              {activeLesson.topic && <span>• {activeLesson.topic}</span>}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {activeLesson.title}
            </h2>
          </div>

          {/* Learning Objective & Core Concept Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeLesson.learningObjective && (
              <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                  <BookMarked className="w-4 h-4 text-blue-600" />
                  <span>Dars maqsadi</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeLesson.learningObjective}
                </p>
              </div>
            )}

            {activeLesson.coreConcept && (
              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-indigo-600" />
                  <span>Asosiy tushuncha</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeLesson.coreConcept}
                </p>
              </div>
            )}
          </div>

          {/* Prerequisites */}
          {activeLesson.prerequisites && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-slate-100">Boshlangʻich bilimlar: </span>
              {activeLesson.prerequisites}
            </div>
          )}

          {/* Explanation */}
          {activeLesson.explanation && (
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Nazariy Tushuntirish:</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-slate-50/60 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
                {activeLesson.explanation}
              </p>
            </div>
          )}

          {/* Rules */}
          {activeLesson.rules && activeLesson.rules.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>Asosiy Qoidalar:</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {activeLesson.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-emerald-50/40 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Examples */}
          {activeLesson.examples && activeLesson.examples.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Misollar:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeLesson.examples.map((ex, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-slate-800 dark:text-slate-200 font-medium">
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          {activeLesson.commonMistakes && activeLesson.commonMistakes.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>Keng tarqalgan xatolar:</span>
              </h3>
              <ul className="space-y-2 text-xs text-rose-900 dark:text-rose-200">
                {activeLesson.commonMistakes.map((m, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practice Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeLesson.guidedPractice && activeLesson.guidedPractice.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100">
                  Yoʻnaltirilgan mashq:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                  {activeLesson.guidedPractice.map((gp, idx) => (
                    <li key={idx}>{gp}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeLesson.independentPractice && activeLesson.independentPractice.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-100">
                  Mustaqil topshiriq:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                  {activeLesson.independentPractice.map((ip, idx) => (
                    <li key={idx}>{ip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Answers & Explanations */}
          {activeLesson.answersExplanations && activeLesson.answersExplanations.length > 0 && (
            <div className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Javoblar va izohlar:
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200">
                {activeLesson.answersExplanations.map((ans, idx) => (
                  <li key={idx}>• {ans}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Lesson Recap */}
          {activeLesson.lessonRecap && (
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 font-medium">
              <span className="font-bold">Xulosa: </span>
              {activeLesson.lessonRecap}
            </div>
          )}

          {/* 1. AI EXERCISES SECTION */}
          <div className="pt-4">
            <AIExerciseSection
              lesson={activeLesson}
              onExercisesComplete={() => {
                setProgressMap(loadLessonProgressMap());
                if (onProgressUpdate) onProgressUpdate();
              }}
            />
          </div>

          {/* 3. LESSON COMPLETION — REQUIEM SECTION */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
                DARS NIKOHI / FINAL ACTION
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                Ushbu darsni toʻliq oʻzlashtirdingizmi?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Darsni rasman yakunlang. Progress 100% deb saqlanadi va hisobingizga qo'shiladi.
              </p>
            </div>

            <button
              type="button"
              id="requiem-complete-lesson-btn"
              onClick={() => setIsRequiemModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 active:to-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 group"
            >
              <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>REQUİEM — Darsni Yakunlash</span>
            </button>
          </div>
        </div>
      ) : (
        /* Lessons Grid / List */
        <div className="space-y-4">
          {/* Search bar & Filter Pills */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`${selectedGrade}-Sinf darslari orasida qidirish...`}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden"
              />
            </div>

            {/* Status Filter buttons */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl p-1 shrink-0 text-xs">
              {(
                [
                  { id: 'all', label: 'Barchasi' },
                  { id: 'not_started', label: 'Boshlanmagan' },
                  { id: 'in_progress', label: 'Jarayonda' },
                  { id: 'completed', label: 'Tugallangan' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    statusFilter === f.id
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lessons List */}
          {filteredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLessons.map((lesson) => {
                const isRevision = lesson.isRevisionModule;
                const progress = progressMap[lesson.id];
                const status = progress ? progress.status : 'not_started';

                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleOpenLesson(lesson)}
                    className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                            isRevision
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                              : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          }`}
                        >
                          {isRevision ? 'Takrorlash Moduli' : `Dars ${lesson.lessonNumber}`}
                        </span>

                        {/* Status Badge */}
                        {status === 'completed' ? (
                          <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Tugallangan (100%)</span>
                          </span>
                        ) : status === 'in_progress' ? (
                          <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            <span>Jarayonda ({progress.progressPercent}%)</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CircleDashed className="w-3 h-3 text-slate-400" />
                            <span>Boshlanmagan</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-blue-600 transition-colors">
                        {lesson.title}
                      </h3>

                      {lesson.topic && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {lesson.topic}
                        </p>
                      )}

                      {lesson.learningObjective && (
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {lesson.learningObjective}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <span>Darsni Oʻqish</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
              Ushbu filtr bo‘yicha darslar topilmadi.
            </div>
          )}
        </div>
      )}

      {/* REQUIEM Confirmation Modal */}
      {activeLesson && (
        <RequiemModal
          isOpen={isRequiemModalOpen}
          lesson={activeLesson}
          onClose={() => setIsRequiemModalOpen(false)}
          onConfirm={handleConfirmRequiem}
        />
      )}
    </div>
  );
};
