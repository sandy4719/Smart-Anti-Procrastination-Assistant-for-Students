
import React, { useState } from 'react';
import { ProductivityPlan, Task } from '../types';
import PlanDisplay from './PlanDisplay';

interface ScheduleScreenProps {
  plan: ProductivityPlan | null;
  isGenerating: boolean;
  onGenerate: () => void;
  onComplete: () => void;
  tasks: Task[];
}

const ScheduleScreen: React.FC<ScheduleScreenProps> = ({ plan, isGenerating, onGenerate, onComplete, tasks }) => {
  const [activeDate, setActiveDate] = useState(new Date().getDate());
  
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate() };
  });

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-6">
        <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center soft-shadow mb-4">
          <span className="text-4xl">🗓️</span>
        </div>
        <h2 className="text-2xl font-black text-slate-800">Your Future Self is Waiting</h2>
        <p className="text-slate-400 font-medium">Add some tasks in the Home tab and we'll craft your custom study blocks.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Timeline</h2>
        <button className="text-indigo-600 font-bold text-sm">This Week</button>
      </div>

      {/* Calendar Strip */}
      <div className="flex justify-between items-center bg-white p-2 rounded-[28px] soft-shadow border border-slate-50">
        {dates.map((d, i) => (
          <button
            key={i}
            onClick={() => setActiveDate(d.date)}
            className={`flex flex-col items-center justify-center w-12 h-16 rounded-2xl transition-all ${
              activeDate === d.date ? 'bg-primary-gradient text-white shadow-lg' : 'text-slate-400'
            }`}
          >
            <span className="text-[10px] font-black uppercase mb-1">{d.day}</span>
            <span className="text-lg font-bold">{d.date}</span>
          </button>
        ))}
      </div>

      <PlanDisplay plan={plan} onBack={() => {}} onComplete={onComplete} />
    </div>
  );
};

export default ScheduleScreen;
