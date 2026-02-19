
import React from 'react';
import { Task, ProductivityPlan } from '../types';

interface ProgressScreenProps {
  tasks: Task[];
  plan: ProductivityPlan | null;
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({ tasks, plan }) => {
  const weeklyStats = [
    { day: 'M', value: 45 },
    { day: 'T', value: 70 },
    { day: 'W', value: 30 },
    { day: 'T', value: 90 },
    { day: 'F', value: 60 },
    { day: 'S', value: 20 },
    { day: 'S', value: 10 },
  ];

  const badges = [
    { emoji: '🔥', label: '7-Day Streak', color: 'bg-orange-50 text-orange-600' },
    { emoji: '⚡', label: 'Fast Finisher', color: 'bg-indigo-50 text-indigo-600' },
    { emoji: '🎯', label: 'Zero Missed', color: 'bg-emerald-50 text-emerald-600' },
    { emoji: '💎', label: 'Elite Focus', color: 'bg-violet-50 text-violet-600' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">Analytics</h2>

      {/* Activity Chart Card */}
      <div className="bg-white p-8 rounded-[40px] soft-shadow border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Focus Activity</h3>
            <p className="text-2xl font-extrabold text-slate-800">18.5 hrs Total</p>
          </div>
          <select className="bg-slate-50 border-none rounded-xl px-3 py-1.5 text-xs font-bold text-slate-500 outline-none">
            <option>This Week</option>
          </select>
        </div>

        <div className="flex items-end justify-between h-40 gap-2">
          {weeklyStats.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-3">
              <div 
                className="w-full bg-indigo-100 rounded-t-xl transition-all duration-1000 relative group overflow-hidden" 
                style={{ height: `${s.value}%` }}
              >
                <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-[10px] font-black text-slate-400">{s.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[32px] soft-shadow border border-slate-100">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Completed</span>
          <p className="text-3xl font-black text-emerald-500">14</p>
          <p className="text-xs text-slate-400 font-medium">Atomic Goals</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] soft-shadow border border-slate-100">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Remaining</span>
          <p className="text-3xl font-black text-indigo-500">3</p>
          <p className="text-xs text-slate-400 font-medium">Pending Chunks</p>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] px-2">Unlocked Badges</h3>
        <div className="grid grid-cols-2 gap-4">
          {badges.map((b, i) => (
            <div key={i} className={`flex items-center gap-3 p-4 rounded-[24px] ${b.color} soft-shadow`}>
              <span className="text-2xl">{b.emoji}</span>
              <span className="text-xs font-black tracking-tight">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;
