import React, { useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  Flame,
  CheckCircle,
  Star,
  Sparkles,
  User as UserIcon,
  Inbox,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  Lightbulb,
  X,
  BarChart2,
} from 'lucide-react';
import { UserProfile, NavigationTab } from '../../types';
import { UzbekSkylineGraphic } from '../UzbekSkylineGraphic';
import { TranslationDictionary } from '../../data/translations';
import { TodayDiscoveryCard } from '../TodayDiscoveryCard';
import {
  getTotalProgress,
  getRecentActiveLesson,
  getNextUnfinishedLesson,
} from '../../utils/userProgressStore';

interface DashboardViewProps {
  user: UserProfile;
  t: TranslationDictionary;
  setActiveTab: (tab: NavigationTab) => void;
  onActionClick: (title: string) => void;
  onOpenLessonTarget?: (target: { grade: number; lessonId: string }) => void;
  onOpenSearch?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  t,
  setActiveTab,
  onActionClick,
  onOpenLessonTarget,
  onOpenSearch,
}) => {
  const [isDiscoveryModalOpen, setIsDiscoveryModalOpen] = useState(false);
  const totalStats = getTotalProgress();
  const recentLesson = getRecentActiveLesson();
  const nextLesson = getNextUnfinishedLesson();

  const strokeDashoffset = 100 - totalStats.percentage;

  return (
    <div className="pb-12">
      {/* =========================================================================
          1. MOBILE PORTRAIT LAYOUT (< md)
          ========================================================================= */}
      <div className="md:hidden space-y-5">
        {/* Mobile Greeting Card */}
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-xs">
          {/* Top Right Search Button */}
          {onOpenSearch && (
            <button
              id="mobile-greeting-search-btn"
              onClick={onOpenSearch}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer z-10"
              title={t.common.search}
            >
              <Search className="w-4.5 h-4.5" />
            </button>
          )}

          <div className="relative z-10 pr-12">
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {t.dashboard.greeting}
            </h2>
            <h1 className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight mt-0.5">
              {user.name}!
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[210px]">
              {t.dashboard.subtitle}
            </p>
          </div>

          {/* Scaled down Uzbek Skyline Graphic at bottom right */}
          <div className="absolute right-0 -bottom-1 opacity-80 dark:opacity-60 pointer-events-none">
            <UzbekSkylineGraphic className="w-44 h-24" />
          </div>
        </div>

        {/* Mobile Continue Lesson Card */}
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-extrabold tracking-wider text-blue-600 dark:text-blue-400 uppercase block">
                {recentLesson ? `${recentLesson.grade}-SINF DARSI` : t.dashboard.continueCardTitle}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5 leading-snug">
                {recentLesson ? recentLesson.title : nextLesson ? nextLesson.title : t.dashboard.continueCardEmpty}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {recentLesson ? (recentLesson.topic || 'Darsni davom ettirish uchun tugmani bosing.') : t.dashboard.continueCardDesc}
              </p>
            </div>
          </div>

          <button
            id="mobile-continue-lesson-btn"
            onClick={() => {
              if (recentLesson && onOpenLessonTarget) {
                onOpenLessonTarget({ grade: recentLesson.grade, lessonId: recentLesson.id });
              } else {
                setActiveTab('kurslar');
                onActionClick(recentLesson ? `"${recentLesson.title}" darsiga o'tildi` : t.dashboard.goToCourses);
              }
            }}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>{recentLesson ? 'Darsni oʻqish' : t.dashboard.goToCourses}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile "Bugun" Section */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            Bugun
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {/* 1. Yangi mashq Card */}
            <button
              id="mobile-bugun-yangi-mashq"
              onClick={() => setActiveTab('yangi')}
              className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/90 border border-indigo-100/80 dark:border-slate-800 text-left transition-all hover:border-indigo-300 dark:hover:border-indigo-700 group cursor-pointer flex flex-col justify-between min-h-[110px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <div className="mt-3">
                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  Yangi mashq
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  Mavzularga asoslangan AI mashqlari
                </p>
              </div>
            </button>

            {/* 2. Bugungi qoida Card */}
            <button
              id="mobile-bugun-qoida"
              onClick={() => setIsDiscoveryModalOpen(true)}
              className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/90 border border-emerald-100/80 dark:border-slate-800 text-left transition-all hover:border-emerald-300 dark:hover:border-emerald-700 group cursor-pointer flex flex-col justify-between min-h-[110px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
              <div className="mt-3">
                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  Bugungi qoida
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  Bugungi mavzu bo‘yicha muhim qoida
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Lightweight Progress Summary Card */}
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                O‘rganish jarayoni
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                <span className="font-extrabold text-blue-600 dark:text-blue-400">{totalStats.completed}</span> / {totalStats.total} dars tugallangan
              </p>
            </div>

            <button
              id="mobile-go-to-profile"
              onClick={() => setActiveTab('profil')}
              className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900 text-xs font-bold flex items-center gap-1 hover:bg-blue-100 transition-colors cursor-pointer shrink-0"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Profilga o‘tish</span>
            </button>
          </div>

          {/* Simple Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-700/80 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(5, totalStats.percentage)}%` }}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. DESKTOP LAYOUT (md+)
          ========================================================================= */}
      <div className="hidden md:block space-y-6">
        {/* Top Welcome Hero + Quick Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Hero Card (Left 8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
              <div className="max-w-md">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {t.dashboard.greeting}
                </h2>
                <h1 className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 tracking-tight mt-1 mb-2">
                  {user.name}!
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t.dashboard.subtitle}
                </p>
              </div>
              {/* Uzbek Skyline Vector Artwork */}
              <div className="shrink-0 flex justify-center sm:justify-end opacity-90 dark:opacity-75">
                <UzbekSkylineGraphic className="w-52 h-28 sm:w-60 sm:h-32" />
              </div>
            </div>

            {/* Continue Learning Card */}
            <div className="mt-6 sm:mt-8 pt-6 border-t border-slate-100 dark:border-slate-700/60">
              <div className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                      {recentLesson ? `${recentLesson.grade}-SINF DARSI` : t.dashboard.continueCardTitle}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {recentLesson ? recentLesson.title : nextLesson ? nextLesson.title : t.dashboard.continueCardEmpty}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {recentLesson ? (recentLesson.topic || 'Darsni davom ettirish uchun tugmani bosing.') : t.dashboard.continueCardDesc}
                    </p>
                  </div>
                </div>

                <button
                  id="dashboard-go-to-courses"
                  onClick={() => {
                    if (recentLesson && onOpenLessonTarget) {
                      onOpenLessonTarget({ grade: recentLesson.grade, lessonId: recentLesson.id });
                    } else {
                      setActiveTab('kurslar');
                      onActionClick(recentLesson ? `"${recentLesson.title}" darsiga o'tildi` : t.dashboard.goToCourses);
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>{recentLesson ? 'Darsni Oʻqish' : t.dashboard.goToCourses}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Real Overall Progress Card (Right 4 cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs tracking-wider uppercase">
                {t.dashboard.overallProgress}
              </h3>
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900">
                {totalStats.completed} / {totalStats.total} Dars
              </span>
            </div>

            {/* Clean Dynamic Donut Graphic */}
            <div className="my-6 flex items-center justify-center relative">
              <div className="w-32 h-32 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100 dark:text-slate-700 stroke-current"
                    strokeWidth="3.8"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-600 dark:text-blue-400 stroke-current transition-all duration-500"
                    strokeDasharray="100, 100"
                    strokeDashoffset={strokeDashoffset}
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
                    {totalStats.percentage}%
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                    Bajarildi
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-center">
              <div className="bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 block">
                  {totalStats.completed}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.dashboard.completedLessons}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-lg font-bold text-amber-600 dark:text-amber-400 block">
                  {totalStats.total - totalStats.completed}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Qolgan Darslar
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Grid: Bugungi Qoida Discovery + Quick Shortcuts + Recommended */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bugungi Qoida Content Discovery Card */}
          <TodayDiscoveryCard
            onOpenLesson={(grade, lessonId) => {
              if (onOpenLessonTarget) {
                onOpenLessonTarget({ grade, lessonId });
              } else {
                setActiveTab('kurslar');
              }
            }}
          />

          {/* Quick Access to Yangi & Profil */}
          <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs tracking-wider uppercase mb-4">
              {t.dashboard.quickAccess}
            </h3>

            <div className="space-y-3">
              <button
                onClick={() => setActiveTab('kurslar')}
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                    5-11
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600">
                      Barcha 5-11 Sinf Darslari
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Sintaksis, morfologiya va imlo
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => setActiveTab('profil')}
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600">
                      Shaxsiy Profil va Rivoj
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Yutuqlar va oʻzlashtirish
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          {/* Next Lesson Recommendation Card */}
          <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
                Tavsiya Etiladigan Dars
              </span>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                {nextLesson ? nextLesson.title : 'Barcha darslar yakunlandi!'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {nextLesson?.learningObjective || nextLesson?.topic || 'Siz barcha sinf darslarini muvaffaqiyatli tugatdingiz.'}
              </p>
            </div>

            <button
              onClick={() => {
                if (nextLesson && onOpenLessonTarget) {
                  onOpenLessonTarget({ grade: nextLesson.grade, lessonId: nextLesson.id });
                } else {
                  setActiveTab('kurslar');
                  onActionClick(`"${nextLesson?.title}" darsiga o'tildi`);
                }
              }}
              className="mt-4 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Darsni Boshlash</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Mobile "Bugungi Qoida" */}
      {isDiscoveryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-sm w-full p-4 relative shadow-2xl">
            <button
              onClick={() => setIsDiscoveryModalOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="pt-2">
              <TodayDiscoveryCard
                onOpenLesson={(grade, lessonId) => {
                  setIsDiscoveryModalOpen(false);
                  if (onOpenLessonTarget) {
                    onOpenLessonTarget({ grade, lessonId });
                  } else {
                    setActiveTab('kurslar');
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
