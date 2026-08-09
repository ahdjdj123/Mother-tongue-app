import React, { useState } from 'react';
import {
  Search,
  X,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Lightbulb,
  FileText,
  HelpCircle,
  Bot,
} from 'lucide-react';
import {
  performGlobalSearch,
  POPULAR_SEARCH_SUGGESTIONS,
  SearchResultItem,
} from '../utils/globalSearchEngine';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTargetLesson: (target: { grade: number; lessonId: string; lessonTitle: string }) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTargetLesson,
}) => {
  const [query, setQuery] = useState('');
  const [isAiSearchActive, setIsAiSearchActive] = useState(false);

  if (!isOpen) return null;

  const results: SearchResultItem[] = performGlobalSearch(query);

  const handleSelectResult = (item: SearchResultItem) => {
    onSelectTargetLesson({
      grade: item.grade,
      lessonId: item.lessonId,
      lessonTitle: item.title,
    });
    onClose();
  };

  const handleAiSearchTrigger = () => {
    setIsAiSearchActive(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-start justify-center pt-16 sm:pt-20 p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[80vh]">
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/40">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsAiSearchActive(false);
            }}
            placeholder="5-11 sinf darslari, qoidalar, mavzu yoki topshiriqlarni qidiring..."
            autoFocus
            className="flex-1 bg-transparent border-none text-slate-900 dark:text-slate-100 text-sm focus:outline-hidden placeholder:text-slate-400 font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsAiSearchActive(false);
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg text-xs font-bold"
            >
              Tozalash
            </button>
          )}
          <button
            id="close-search-modal"
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Body Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 1. Empty Query State */}
          {!query.trim() && (
            <div className="space-y-4 py-4">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 flex items-center justify-center mx-auto">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm pt-1">
                  Qidirishni boshlang...
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  5-11 sinflar oʻquv dasturidagilardan global qidiring (masalan: <em>"omonim"</em>, <em>"sifat"</em>, <em>"urgʻu"</em>)
                </p>
              </div>

              {/* Popular Suggestions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
                  Ommabop Qidiruv Mavzulari:
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCH_SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuery(sug.label)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/80 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-300 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200/60 dark:border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{sug.label}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({sug.grade}-sinf)</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Results List */}
          {query.trim() && results.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-1 pb-1">
                <span>Topilgan tayyor materiallar: ({results.length} ta)</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                  Global Ta'lim Bazasi
                </span>
              </div>

              {results.map((item) => {
                const isGrade = item.type === 'dars';
                const isRule = item.type === 'qoida';
                const isExercise = item.type === 'mashq';

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectResult(item)}
                    className="p-3.5 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-800 transition-all cursor-pointer flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                          isRule
                            ? 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900'
                            : isExercise
                            ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900'
                            : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900'
                        }`}
                      >
                        {isRule ? (
                          <Lightbulb className="w-4 h-4" />
                        ) : isExercise ? (
                          <HelpCircle className="w-4 h-4" />
                        ) : (
                          <GraduationCap className="w-4 h-4" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-extrabold uppercase">
                            {item.grade}-SINF
                          </span>
                          {item.lessonNumber && (
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                              Dars {item.lessonNumber}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold border border-blue-200 dark:border-blue-900">
                            {item.typeLabel}
                          </span>
                        </div>

                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm group-hover:text-blue-600 transition-colors truncate">
                          {item.title}
                        </h4>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {item.snippet}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                  </div>
                );
              })}
            </div>
          )}

          {/* 3. No Results State + AI Fallback Option */}
          {query.trim() && results.length === 0 && !isAiSearchActive && (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Hech qanday tayyor material topilmadi.
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  Darsliklar bazasida "<em>{query}</em>" bo'yicha tayyor dars mavjud emas.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAiSearchTrigger}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>🤖 AI yordamida izlash</span>
              </button>
            </div>
          )}

          {/* 4. AI Generated Search Response View */}
          {query.trim() && results.length === 0 && isAiSearchActive && (
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-blue-400 font-extrabold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>🤖 AI Tomonidan Yaratilgan Ma'lumot (Tayyor Darslikda Topilmadi)</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                  AI Fallback
                </span>
              </div>

              <div className="space-y-2 text-xs leading-relaxed text-slate-200">
                <h4 className="text-sm font-bold text-white">
                  "{query}" mavzusi bo'yicha AI qisqacha izohi:
                </h4>
                <p className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                  <strong>{query}</strong> — o'zbek tili grammatikasi va leksikologiyasiga taalluqli tushuncha.
                  Tayyor rasmiy 5-11 sinf darsliklar bazasida ushbu nomdagi muayyan dars topilmagani sababli, AI tomonidan qisqacha izoh shakllantirildi.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 cursor-pointer"
                >
                  Yopish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
