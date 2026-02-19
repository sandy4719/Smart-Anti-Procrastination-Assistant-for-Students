
import React from 'react';
import { Task, ProductivityPlan } from '../types';
import TaskInput from './TaskInput';

interface HomeDashboardProps {
  tasks: Task[];
  onAddTask: (t: Task) => void;
  onRemoveTask: (id: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onNudge: (t: Task) => void;
  plan: ProductivityPlan | null;
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ 
  tasks, onAddTask, onRemoveTask, onGenerate, isGenerating, onNudge, plan 
}) => {
  const completedTasksCount = plan ? plan.microTasks.filter(t => t.checked).length : 0;
  const totalTasksCount = plan ? plan.microTasks.length : 1;
  const progress = Math.round((completedTasksCount / totalTasksCount) * 100);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="space-y-8 pb-10">
      {/* Today's Focus Progress Card */}
      <div className="bg-primary-gradient rounded-[40px] p-8 text-white soft-shadow flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
           <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <div className="space-y-2 relative z-10">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-70">Current Velocity</h3>
          <p className="text-3xl font-extrabold leading-tight">
            {plan ? `${completedTasksCount}/${totalTasksCount} Goals` : 'Zero Plans'}
          </p>
          <p className="text-sm opacity-80 font-medium">
            {plan ? "Keep the momentum high!" : "Start by adding assignments below."}
          </p>
        </div>
        <div className="relative flex items-center justify-center z-10">
          <svg className="w-24 h-24">
            <circle cx="48" cy="48" r={radius} fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
            <circle 
              cx="48" cy="48" r={radius} 
              fill="transparent" 
              stroke="white" 
              strokeWidth="8" 
              strokeDasharray={circumference} 
              strokeDashoffset={offset} 
              strokeLinecap="round"
              className="progress-ring-circle" 
            />
          </svg>
          <span className="absolute text-sm font-black">{progress}%</span>
        </div>
      </div>

      <div className="glass rounded-[32px] p-6 border-indigo-100 flex items-center gap-4 hover:soft-shadow transition-all cursor-default">
        <div className="w-12 h-12 bg-primary-gradient rounded-2xl flex items-center justify-center flex-none shadow-lg shadow-indigo-100">
          <span className="text-xl">🤖</span>
        </div>
        <div>
          <h4 className="font-extrabold text-slate-800 text-sm">Flowy: Quick Advice</h4>
          <p className="text-xs text-slate-500 font-medium">Use the Focus tab for deep work. It silences distractions.</p>
        </div>
      </div>

      <TaskInput 
        tasks={tasks} 
        onAddTask={onAddTask} 
        onRemoveTask={onRemoveTask} 
        onNudge={onNudge} 
      />

      {tasks.length > 0 && !plan && (
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full bg-slate-900 py-6 rounded-[28px] text-white font-black shadow-2xl transition-all hover:bg-indigo-600 active:scale-95 animate-in slide-in-from-bottom-4 duration-500"
        >
          {isGenerating ? 'Mapping Intelligence...' : 'Construct Study Path'}
        </button>
      )}
    </div>
  );
};

export default HomeDashboard;
