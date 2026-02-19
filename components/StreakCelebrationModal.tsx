
import React from 'react';
import { StreakCelebration } from '../types';

interface StreakCelebrationModalProps {
  celebration: StreakCelebration;
  streakCount: number;
  onClose: () => void;
}

const StreakCelebrationModal: React.FC<StreakCelebrationModalProps> = ({ celebration, streakCount, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 slide-in-from-bottom-10">
        <div className="bg-gradient-to-br from-orange-400 via-rose-500 to-indigo-600 p-8 text-center text-white relative">
          <div className="absolute top-4 right-4">
             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/30 animate-bounce">
            <span className="text-4xl">🔥</span>
          </div>
          
          <h2 className="text-4xl font-black mb-1">{streakCount} DAY STREAK!</h2>
          <p className="text-white/80 font-bold uppercase tracking-widest text-sm">Milestone Reached</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">FocusFlow Coach says:</h3>
            <p className="text-xl font-bold text-slate-800 leading-tight">
              "{celebration.encouragement}"
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💡</span>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">Productivity Tip</span>
              </div>
              <p className="text-sm text-slate-700 font-medium">
                {celebration.productivityTip}
              </p>
            </div>
            
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🎯</span>
                <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">Tomorrow's Challenge</span>
              </div>
              <p className="text-sm text-slate-700 font-medium">
                {celebration.tomorrowChallenge}
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-[0.98]"
          >
            Keep the Fire Burning
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreakCelebrationModal;
