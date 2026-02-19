
import React from 'react';

interface HeaderProps {
  streakCount: number;
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ streakCount, activeTab }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="px-5 pt-8 pb-4 flex items-center justify-between">
      <div className="space-y-0.5">
        <h1 className="text-sm font-black text-slate-400 uppercase tracking-widest">{getGreeting()} 👋</h1>
        <p className="text-xl font-extrabold text-slate-900">Let's lock in.</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-2xl border border-orange-100 shadow-sm">
          <span className="text-lg">🔥</span>
          <span className="text-sm font-black text-orange-600 tracking-tighter">{streakCount}</span>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white soft-shadow">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
