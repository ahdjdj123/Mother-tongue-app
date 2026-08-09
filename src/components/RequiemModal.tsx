import React from 'react';
import { CheckCircle2, ShieldCheck, X, Sparkles } from 'lucide-react';
import { LessonComponent } from '../data/curriculumDatabase';

interface RequiemModalProps {
  isOpen: boolean;
  lesson: LessonComponent;
  onClose: () => void;
  onConfirm: () => void;
}

export const RequiemModal: React.FC<RequiemModalProps> = ({
  isOpen,
  lesson,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden space-y-5">
        {/* Decorative Top Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 absolute top-0 left-0" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center mx-auto shadow-md">
          <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
            REQUİEM — Darsni Yakunlash
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight pt-1">
            Darsni yakunlashni tasdiqlaysizmi?
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs mx-auto">
            <strong>"{lesson.title}"</strong> darsini o‘zlashtirdingiz deb hisoblasangiz, darsni rasman yakunlang. Progress 100% ga yetkaziladi.
          </p>
        </div>

        {/* Benefits list */}
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Dars progressi 100% ga yangilanadi</span>
          </div>
          <div className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Sinf va umumiy kurs rivoji oshadi</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 active:to-teal-700 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Darsni Yakunlash</span>
          </button>
        </div>
      </div>
    </div>
  );
};
