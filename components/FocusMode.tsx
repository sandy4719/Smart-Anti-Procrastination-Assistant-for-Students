
import React, { useState, useEffect } from 'react';

const FocusMode: React.FC = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => { setIsActive(false); setSeconds(25 * 60); };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = (seconds / (25 * 60)) * 100;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-12 py-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Deep Focus</h2>
        <p className="text-slate-400 font-medium">Distractions are temporary. Goals are forever.</p>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Glowing backdrop */}
        <div className={`absolute w-72 h-72 rounded-full blur-3xl transition-opacity duration-1000 ${isActive ? 'bg-indigo-500/10' : 'bg-transparent'}`}></div>
        
        <svg className="w-80 h-80">
          <circle cx="160" cy="160" r={radius} fill="transparent" stroke="#E2E8F0" strokeWidth="6" />
          <circle 
            cx="160" cy="160" r={radius} 
            fill="transparent" 
            stroke="url(#gradient)" 
            strokeWidth="12" 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round"
            className="progress-ring-circle"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#9333EA" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-6xl font-black text-slate-900 tracking-tighter tabular-nums">{formatTime(seconds)}</span>
          <span className="text-xs font-black text-indigo-500 uppercase tracking-widest mt-2">Pomodoro</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={reset}
          className="w-16 h-16 rounded-3xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 soft-shadow"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m0 0H15"/></svg>
        </button>
        <button 
          onClick={toggle}
          className={`w-24 h-24 rounded-[36px] flex items-center justify-center text-white shadow-2xl transition-all active:scale-95 ${
            isActive ? 'bg-slate-900 shadow-slate-200' : 'bg-primary-gradient shadow-indigo-100'
          }`}
        >
          {isActive ? (
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
          ) : (
            <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
        <div className="w-16 h-16"></div> {/* Spacer for symmetry */}
      </div>

      <div className="glass p-6 rounded-[32px] max-w-xs text-center">
        <p className="text-slate-600 font-bold italic text-sm">"The secret of getting ahead is getting started."</p>
      </div>
    </div>
  );
};

export default FocusMode;
