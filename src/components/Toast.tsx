import React, { useEffect } from 'react';
import { Info, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 right-4 z-50 bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200 border border-slate-800 dark:border-slate-200">
      <Info className="w-4 h-4 text-blue-400 dark:text-blue-600 shrink-0" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 p-0.5 hover:opacity-75 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
