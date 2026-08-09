import React, { useState } from 'react';
import { Lightbulb, RefreshCw, ChevronRight, BookOpen, Sparkles, HelpCircle } from 'lucide-react';
import { getRandomDiscoveryItem, DiscoveryItem } from '../utils/todayDiscoveryStore';

interface TodayDiscoveryCardProps {
  onOpenLesson: (grade: number, lessonId: string) => void;
}

export const TodayDiscoveryCard: React.FC<TodayDiscoveryCardProps> = ({
  onOpenLesson,
}) => {
  const [item, setItem] = useState<DiscoveryItem>(() => getRandomDiscoveryItem(false));

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    setItem(getRandomDiscoveryItem(true));
  };

  const isRule = item.type === 'rule';
  const isExercise = item.type === 'exercise';

  return (
    <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between relative overflow-hidden group">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs tracking-wider uppercase">
                BUGUNGI QOIDA
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold block">
                Tasodifiy O'rganish
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            title="Boshqa qoida ko'rsatish"
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Item Metadata & Headline */}
        <div className="space-y-2 mt-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold uppercase">
              {item.grade}-SINF
            </span>
            {item.topic && (
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate max-w-[150px]">
                • {item.topic}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[10px] font-bold">
              {item.typeLabel}
            </span>
          </div>

          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm line-clamp-1">
            {item.headline}
          </h4>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800 line-clamp-3">
            "{item.excerpt}"
          </p>
        </div>
      </div>

      {/* Footer Action Button */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60">
        <button
          type="button"
          onClick={() => onOpenLesson(item.grade, item.lessonId)}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>O'rganish</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
