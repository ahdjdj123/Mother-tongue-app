import React, { useState } from 'react';
import {
  Edit3,
  BadgeCheck,
  Zap,
  BookOpen,
  Award,
  Flame,
  Clock,
  Inbox,
  Trash2,
  Calendar,
  Shield,
  Layers,
  BarChart2,
  CheckCircle2,
} from 'lucide-react';
import { UserProfile } from '../../types';
import { TranslationDictionary } from '../../data/translations';
import {
  loadLessonProgressMap,
  getAllLessonsFlat,
  getTotalProgress,
} from '../../utils/userProgressStore';

interface ProfileViewProps {
  user: UserProfile;
  t: TranslationDictionary;
  onEditProfileClick: () => void;
  onActionClick: (title: string) => void;
  onClearHistoryClick: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  t,
  onEditProfileClick,
  onActionClick,
  onClearHistoryClick,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'progress' | 'yutuqlar' | 'natijalar'>('progress');

  const progressMap = loadLessonProgressMap();
  const allLessons = getAllLessonsFlat();
  const totalStats = getTotalProgress();

  const completedEntries = Object.values(progressMap).filter((p) => p.status === 'completed');

  // Dynamically calculated achievements
  const achievements = [
    {
      id: 'ach-1',
      title: 'Boshlovchi O‘quvchi',
      desc: 'Kamida 1 ta darsni yakunlang',
      progress: `${completedEntries.length >= 1 ? 1 : completedEntries.length}/1`,
      unlocked: completedEntries.length >= 1,
    },
    {
      id: 'ach-2',
      title: 'Izchil Bilimdon',
      desc: 'Kamida 5 ta darsni yakunlang',
      progress: `${Math.min(5, completedEntries.length)}/5`,
      unlocked: completedEntries.length >= 5,
    },
    {
      id: 'ach-3',
      title: 'Grammatika Ustasi',
      desc: 'Kamida 10 ta darsni yakunlang',
      progress: `${Math.min(10, completedEntries.length)}/10`,
      unlocked: completedEntries.length >= 10,
    },
    {
      id: 'ach-4',
      title: 'Mukammal Natija',
      desc: 'AI mashqini 100% ball bilan yakunlang',
      progress: Object.values(progressMap).some((p) => (p.exerciseScore || 0) >= 100) ? '1/1' : '0/1',
      unlocked: Object.values(progressMap).some((p) => (p.exerciseScore || 0) >= 100),
    },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-5xl">
      {/* Top Header Profile Card */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 font-extrabold text-2xl flex items-center justify-center border-2 border-blue-200 dark:border-blue-800 shadow-xs">
              {user.initials}
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                {user.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1.5">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-semibold">
                  {user.level}
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium">
                  ID: {user.id}
                </span>
              </div>
            </div>
          </div>

          <button
            id="edit-profile-button"
            onClick={onEditProfileClick}
            className="px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/80 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-100 transition-colors cursor-pointer flex items-center gap-2"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t.profile.editProfile}</span>
          </button>
        </div>

        {/* 4 Stats Grid Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-2xl font-extrabold text-teal-600 dark:text-teal-400 block">
              {totalStats.percentage}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.profile.grammar}
            </span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 block">
              {totalStats.completed} / {totalStats.total}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.profile.completedLessons}
            </span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 block">
              {totalStats.inProgress}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Jarayondagi Darslar
            </span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-2xl font-extrabold text-amber-500 block flex items-center justify-center gap-1">
              {user.streakDays || 7} <span className="text-sm font-normal">kun</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.profile.streak}
            </span>
          </div>
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('progress')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'progress'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {t.profile.progressOverview}
        </button>

        <button
          onClick={() => setActiveSubTab('yutuqlar')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'yutuqlar'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {t.profile.achievements}
        </button>

        <button
          onClick={() => setActiveSubTab('natijalar')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'natijalar'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {t.profile.resultsHistory}
        </button>
      </div>

      {/* View Section 1: Progress */}
      {activeSubTab === 'progress' && (
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 text-base border-b border-slate-100 dark:border-slate-700/60 pb-3">
            {t.profile.progressOverview}
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-700 dark:text-slate-300">Umumiy Darslar O‘zlashtirilishi</span>
                <span className="text-teal-600 dark:text-teal-400">{totalStats.percentage}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full transition-all duration-300" style={{ width: `${totalStats.percentage}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-700 dark:text-slate-300">Tugallangan Darslar Nisfati</span>
                <span className="text-blue-600 dark:text-blue-400">{totalStats.completed} / {totalStats.total}</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((totalStats.completed / totalStats.total) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Section 2: Achievements Structure */}
      {activeSubTab === 'yutuqlar' && (
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-6">
            {t.profile.achievements}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-5 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                  ach.unlocked
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : 'border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/30'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-3 ${
                    ach.unlocked
                      ? 'bg-emerald-100 dark:bg-emerald-900/60 border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-400'
                  }`}
                >
                  <Award className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {ach.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {ach.desc}
                  </p>
                  <span
                    className={`inline-block mt-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      ach.unlocked
                        ? 'bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200'
                        : 'bg-slate-200/60 dark:bg-slate-700/60 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {ach.unlocked ? 'Ochildi 🌟' : ach.progress}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Section 3: Activity & Natijalar History */}
      {activeSubTab === 'natijalar' && (
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
            <h2 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              {t.profile.resultsHistory}
            </h2>
            <button
              onClick={onClearHistoryClick}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.profile.clearHistory}</span>
            </button>
          </div>

          {completedEntries.length > 0 ? (
            <div className="space-y-3">
              {completedEntries.map((p) => {
                const lessonItem = allLessons.find((l) => l.id === p.lessonId);
                return (
                  <div
                    key={p.lessonId}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">
                          {lessonItem ? lessonItem.title : p.lessonId}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {p.grade}-Sinf • Yakunlangan: {p.completedAt ? new Date(p.completedAt).toLocaleDateString() : 'Yaqinda'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-extrabold text-emerald-600 dark:text-emerald-400">
                      <span>100% Ball</span>
                      {p.exerciseScore !== undefined && (
                        <span className="block text-[10px] text-blue-500">
                          AI Mashq: {p.exerciseScore}%
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-slate-400 mb-3">
                <Inbox className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.profile.noHistory}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
