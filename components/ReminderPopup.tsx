
import React, { useEffect } from 'react';

interface ReminderPopupProps {
  message: string;
  onClose: () => void;
}

const ReminderPopup: React.FC<ReminderPopupProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-right-16 fade-in duration-700 max-w-sm w-full px-4 sm:px-0">
      <div className="bg-white border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-[32px] p-7 relative overflow-hidden group">
        {/* Colorful flare */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-50 group-hover:bg-indigo-200 transition-all duration-700"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-10 rounded-[14px] bg-primary-gradient flex items-center justify-center shadow-lg shadow-indigo-100 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] block">Urgent Sync</span>
              <span className="text-xs font-bold text-slate-300">FocusFlow Assist</span>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-300 hover:text-slate-500 transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <p className="text-slate-800 text-xl font-extrabold leading-tight tracking-tight">
            {message}
          </p>
          
          <div className="mt-8 flex items-center justify-between">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black rounded-[14px] hover:bg-slate-800 transition-all uppercase tracking-widest shadow-lg shadow-slate-200"
            >
              Execute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderPopup;
