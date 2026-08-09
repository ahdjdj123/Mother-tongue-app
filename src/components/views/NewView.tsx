import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Inbox,
  Search,
  ChevronRight,
  ArrowRight,
  X,
  Award,
  Layers,
  History,
  Tag,
  Lightbulb,
  FileText,
} from 'lucide-react';
import { TranslationDictionary } from '../../data/translations';
import { curriculumData, LessonComponent } from '../../data/curriculumDatabase';
import {
  getAllLessonsFlat,
  getNextUnfinishedLesson,
  getRecentActiveLesson,
  loadLessonProgressMap,
} from '../../utils/userProgressStore';
import { AIExerciseSection } from '../AIExerciseSection';

interface NewViewProps {
  t: TranslationDictionary;
  onActionClick: (title: string) => void;
  onOpenLessonTarget?: (target: { grade: number; lessonId: string }) => void;
}

type NewCategoryTab = 'darslar' | 'mashqlar' | 'tavsiyalar' | 'yangilanishlar';

export const NewView: React.FC<NewViewProps> = ({
  t,
  onActionClick,
  onOpenLessonTarget,
}) => {
  const [activeTab, setActiveTab] = useState<NewCategoryTab>('darslar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExerciseLesson, setSelectedExerciseLesson] = useState<LessonComponent | null>(null);

  const allLessons = getAllLessonsFlat();
  const progressMap = loadLessonProgressMap();
  const nextLesson = getNextUnfinishedLesson();
  const recentLesson = getRecentActiveLesson();

  // Filter lessons for "Yangi darslar"
  const filteredLessons = allLessons.filter((lesson) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      lesson.title.toLowerCase().includes(query) ||
      (lesson.topic && lesson.topic.toLowerCase().includes(query)) ||
      (lesson.learningObjective && lesson.learningObjective.toLowerCase().includes(query)) ||
      `grade ${lesson.grade}`.includes(query) ||
      `${lesson.grade}-sinf`.includes(query)
    );
  });

  return (
    <div className="space-y-6 pb-12 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {t.newContent.title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.newContent.subtitle}
        </p>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto scrollbar-none">
        <button
          id="tab-yangi-darslar"
          onClick={() => {
            setActiveTab('darslar');
            onActionClick(t.newContent.tabLessons);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'darslar'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.newContent.tabLessons}</span>
        </button>

        <button
          id="tab-yangi-mashqlar"
          onClick={() => {
            setActiveTab('mashqlar');
            onActionClick(t.newContent.tabExercises);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'mashqlar'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.newContent.tabExercises}</span>
        </button>

        <button
          id="tab-tavsiyalar"
          onClick={() => {
            setActiveTab('tavsiyalar');
            onActionClick(t.newContent.tabRecommendations);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'tavsiyalar'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{t.newContent.tabRecommendations}</span>
        </button>

        <button
          id="tab-yangilanishlar"
          onClick={() => {
            setActiveTab('yangilanishlar');
            onActionClick(t.newContent.tabUpdates);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'yangilanishlar'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>{t.newContent.tabUpdates}</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: YANGI DARSLAR
          ========================================================================= */}
      {activeTab === 'darslar' && (
        <div className="space-y-4">
          {/* Search bar inside Yangi darslar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Yangi darslarni qidirish..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filteredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLessons.slice(0, 10).map((lesson) => {
                const prog = progressMap[lesson.id];
                const isCompleted = prog?.status === 'completed';

                return (
                  <div
                    key={lesson.id}
                    className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-800 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold uppercase tracking-wider border border-blue-200/60 dark:border-blue-900">
                          {lesson.grade}-SINF
                        </span>
                        {isCompleted && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Bajarilgan</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {lesson.title}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {lesson.topic || lesson.learningObjective || lesson.coreConcept}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">
                        Dars kodi: {lesson.id}
                      </span>

                      <button
                        onClick={() => {
                          if (onOpenLessonTarget) {
                            onOpenLessonTarget({ grade: lesson.grade, lessonId: lesson.id });
                          }
                          onActionClick(`"${lesson.title}" darsi ochildi`);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        <span>Darsni o‘qish</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-64 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-slate-400 mb-3">
                <Inbox className="w-7 h-7 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                Hozircha yangi darslar mavjud emas
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                Yangi o‘quv materiallari tayyorlanmoqda. Tez orada qo‘shiladi.
              </p>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: YANGI MASHQLAR
          ========================================================================= */}
      {activeTab === 'mashqlar' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Darslik va dastur mavzulariga asoslangan AI interaktiv amaliy mashqlari:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allLessons.slice(0, 8).map((lesson) => {
              const prog = progressMap[lesson.id];
              const score = prog?.exerciseScore;

              return (
                <div
                  key={lesson.id}
                  className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-800 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-900">
                        {lesson.grade}-SINF • MASHQ
                      </span>

                      {score !== undefined && (
                        <span className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
                          Natija: {score}%
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {lesson.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {lesson.topic || 'Ushbu dars mavzusi bo‘yicha interaktiv test va amaliy topsiriqlar.'}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      5 ta yangi mashq
                    </span>

                    <button
                      onClick={() => {
                        setSelectedExerciseLesson(lesson);
                        onActionClick(`"${lesson.title}" mashqlari boshlandi`);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <span>Boshlash</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: TAVSIYALAR
          ========================================================================= */}
      {activeTab === 'tavsiyalar' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sizning o‘zlashtirish va o‘rganish natijalaringizga asoslangan shaxsiy tavsiyalar:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recommendation 1: Next Unfinished Lesson */}
            {nextLesson && (
              <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-200/60 dark:border-emerald-900">
                      NAVBATDAGI DARS TAVSIYASI
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {nextLesson.grade}-sinf
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {nextLesson.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {nextLesson.learningObjective || nextLesson.topic || 'Navbatdagi darsni o‘qib, bilimlaringizni oshiring.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">
                    Ketma-ketlik bo‘yicha
                  </span>

                  <button
                    onClick={() => {
                      if (onOpenLessonTarget) {
                        onOpenLessonTarget({ grade: nextLesson.grade, lessonId: nextLesson.id });
                      }
                      onActionClick(`"${nextLesson.title}" darsi boshlandi`);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <span>Darsni boshlash</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Recommendation 2: Active Lesson Exercise Practice */}
            {recentLesson && (
              <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase tracking-wider border border-amber-200/60 dark:border-amber-900">
                      MASHQ QILISH VAQTI
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {recentLesson.grade}-sinf
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {recentLesson.title} bo‘yicha mashq
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    Oxirgi o‘qigan mavzungiz bo‘yicha 5 ta amaliy mashqni bajarib, bilimingizni sinab ko‘ring.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">
                    Amaliyot
                  </span>

                  <button
                    onClick={() => {
                      setSelectedExerciseLesson(recentLesson);
                      onActionClick(`"${recentLesson.title}" mashqlari boshlandi`);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <span>Mashqni boshlash</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Recommendation 3: Revision Module */}
            {curriculumData.grades[5]?.[0] && (
              <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 text-[10px] font-extrabold uppercase tracking-wider border border-purple-200/60 dark:border-purple-900">
                      TAKRORLASH MODULI
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      5-sinf
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Til va nutq, mustaqil so‘z turkumlari
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    O‘zbek tili grammatikasining asosiy tayanch tushunchalari va bo‘limlarini takrorlash.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">
                    Takrorlash
                  </span>

                  <button
                    onClick={() => {
                      const revLesson = curriculumData.grades[5][0];
                      if (onOpenLessonTarget) {
                        onOpenLessonTarget({ grade: revLesson.grade, lessonId: revLesson.id });
                      }
                      onActionClick('Takrorlash darsi ochildi');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <span>Darsni o‘qish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: YANGILANISHLAR (CHANGELOG)
          ========================================================================= */}
      {activeTab === 'yangilanishlar' && (
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
          {/* VERSION 1.2 — CURRENT VERSION */}
          <div className="relative pl-6 border-l-2 border-blue-600 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-xs font-black">
                  VERSION 1.2
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  HOTFIX & MOBILE
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                Joriy versiya
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ilovani mobil moslashuvchanlik va ma’lumotlar barqarorligi bo‘yicha takomillashtirish.
            </p>

            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <span><strong>Muhim xatoliklar tuzatildi:</strong> Asosiy dars oʻzlashtirish va yakunlash tizimidagi barqarorlik ta’minlandi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <span><strong>Oʻzlashtirish xotirasi (Progress persistence):</strong> Darslar bajarilishi va test natijalari brauzer xotirasida ishonchli saqlanadi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <span><strong>Mobil vertikal moslashuv (Mobile portrait experience):</strong> Mobil ekranlar uchun qulay vertikal interfeys, pastki navigatsiya paneli va ixcham kartalar yaratildi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <span><strong>Komp’yuter (PC/Desktop) versiyasi:</strong> Mavjud tasdiqlangan komp’yuter ko‘rinishi va o‘lchamlari o‘zgartirishsiz saqlandi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <span><strong>Global qidiruv va navigatsiya:</strong> Qidiruv oynasi hamda tezkor o‘tish tugmalari optimallashtirildi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <span><strong>"Yangi" bo‘limi joriy etildi:</strong> Yangi darslar, amaliy AI mashqlar, shaxsiy tavsiyalar va platforma yangilanishlari yagona habda jamlandi.</span>
              </li>
            </ul>
          </div>

          {/* VERSION 1.1 */}
          <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold">
                VERSION 1.1
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                ASOSIY YANGILANISH
              </h3>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tizim funksionalligi va o‘quv jarayonini yaxshilash.
            </p>

            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span><strong>Ilova tuzatishlari:</strong> Asosiy interfeys xatoliklari tuzatildi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span><strong>Dars materiallari bilan ishlash:</strong> Darsga kirish va uni yakunlash jarayonlari soddalashtirildi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span><strong>Natijalarni kuzatish:</strong> O‘quvchi ilgarilash jarayonini hisoblash tizimi takomillashtirildi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span><strong>Barqarorlik va foydalanish qulayligi:</strong> Navigatsiya va mavzular o‘rtasida o‘tish tezlashtirildi.</span>
              </li>
            </ul>
          </div>

          {/* VERSION 1.0 */}
          <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold">
                VERSION 1.0
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                ILK ISHGA TUSHIRISH
              </h3>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              "Ona tili" platformasining dastlabki rasmiy nashri.
            </p>

            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span><strong>Asosiy o‘quv platformasi:</strong> Interaktiv "Ona tili" ta’lim dasturi ishga tushirildi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span><strong>Kurslar bo‘limi:</strong> 5–11 sinflar bo‘yicha to‘liq o‘quv dasturi joylashtirildi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span><strong>Dars mutolaa rejimi:</strong> Grammatika, imlo va qoidalarni o‘qish interfeysi yaratildi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span><strong>Boshlang‘ich navigatsiya hamda dizayn:</strong> Yagona vizual uslub va foydalanuvchi profili joriy etildi.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Exercise Modal */}
      {selectedExerciseLesson && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto my-auto">
            <button
              onClick={() => setSelectedExerciseLesson(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 pr-8">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {selectedExerciseLesson.grade}-SINF MASHQLARI
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                {selectedExerciseLesson.title}
              </h2>
            </div>

            <AIExerciseSection
              lesson={selectedExerciseLesson}
              onExercisesComplete={(scorePercent) => {
                onActionClick(`Mashq bajarildi! Natija: ${scorePercent}%`);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
