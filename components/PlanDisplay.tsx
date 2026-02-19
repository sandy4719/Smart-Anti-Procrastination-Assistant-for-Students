
import React, { useState, useEffect } from 'react';
import { ProductivityPlan, MicroTask } from '../types';

interface PlanDisplayProps {
  plan: ProductivityPlan;
  onBack: () => void;
  onComplete?: () => void;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, onBack, onComplete }) => {
  const [localMicroTasks, setLocalMicroTasks] = useState<MicroTask[]>(plan.microTasks);
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [hasTriggeredComplete, setHasTriggeredComplete] = useState(false);

  const toggleTask = (id: string) => {
    setLocalMicroTasks(prev => prev.map(t => 
      t.id === id ? { ...t, checked: !t.checked } : t
    ));
  };

  const completedCount = localMicroTasks.filter(t => t.checked).length;
  const progressPercent = Math.round((completedCount / localMicroTasks.length) * 100);

  useEffect(() => {
    if (progressPercent === 100 && !hasTriggeredComplete && onComplete) {
      setHasTriggeredComplete(true);
      onComplete();
    }
  }, [progressPercent, hasTriggeredComplete, onComplete]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Sidebar: Dashboard */}
      <div className="lg:col-span-4 space-y-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          New Sprint
        </button>

        <div className="p-8 bg-primary-gradient rounded-[32px] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-3">Coach Advice</h3>
            <p className="text-xl font-bold leading-tight italic">
              "{plan.motivationTip}"
            </p>
          </div>
        </div>

        <div className="p-8 bg-white rounded-[32px] soft-shadow border border-slate-100">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Strategic Focus</h3>
          <div className="space-y-6">
            {plan.priorityOrder.map((p, idx) => (
              <div key={p.id} className="flex gap-5">
                <div className="flex-none w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-indigo-600 text-sm">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm leading-snug">{p.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">{p.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-white rounded-[32px] soft-shadow border border-slate-100">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Daily Rotation</h3>
          <div className="grid grid-cols-2 gap-3">
            {plan.multiDayPlan.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDayIdx(idx)}
                className={`px-4 py-4 rounded-2xl text-[10px] font-black transition-all border uppercase tracking-widest ${
                  activeDayIdx === idx 
                  ? 'bg-slate-900 text-white border-transparent shadow-lg' 
                  : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-slate-300'
                }`}
              >
                {day.dayLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Execution View */}
      <div className="lg:col-span-8 space-y-8">
        <div className="p-10 bg-white rounded-[40px] shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Sprint: {plan.multiDayPlan[activeDayIdx].dayLabel}
              </h2>
              <p className="text-slate-400 font-medium mt-1">Consistency wins the semester.</p>
            </div>
            <div className="md:text-right">
              <div className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2">Completion Rate: {progressPercent}%</div>
              <div className="w-48 h-3 bg-slate-100 rounded-full overflow-hidden ml-auto">
                <div 
                  className="h-full bg-primary-gradient transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(79,70,229,0.3)]" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Timeline */}
            <div className="space-y-6">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Timeline Audit</h3>
               <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {plan.multiDayPlan[activeDayIdx].slots.map((slot, idx) => (
                    <div key={idx} className="relative group">
                      <div className={`absolute -left-[1.65rem] top-1.5 w-4 h-4 rounded-full border-[3px] border-white shadow-md transition-transform group-hover:scale-125 ${
                        slot.type === 'Work' ? 'bg-indigo-500' : 'bg-orange-500'
                      }`} />
                      <div className="text-[10px] font-black text-slate-300 mb-1 tracking-widest uppercase">{slot.time}</div>
                      <div className="flex items-center justify-between gap-6 bg-slate-50/50 p-4 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-white transition-all">
                        <div className={`text-sm font-bold leading-tight ${slot.type === 'Work' ? 'text-slate-800' : 'text-slate-500 italic'}`}>
                          {slot.activity}
                        </div>
                        <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest flex-none ${
                          slot.type === 'Work' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                        }`}>
                          {slot.durationMinutes}m
                        </span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Micro Chunks */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Atomic Goals</h3>
              <div className="space-y-4">
                {localMicroTasks.map((mt) => (
                  <div 
                    key={mt.id}
                    onClick={() => toggleTask(mt.id)}
                    className={`group cursor-pointer flex items-center gap-5 p-5 rounded-[24px] border-2 transition-all ${
                      mt.checked 
                      ? 'bg-slate-50 border-transparent opacity-40' 
                      : 'bg-white border-slate-50 hover:border-indigo-500 hover:soft-shadow hover:-translate-y-1'
                    }`}
                  >
                    <div className={`flex-none w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                      mt.checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200 group-hover:border-indigo-500'
                    }`}>
                      {mt.checked && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                    </div>
                    <div className="flex-1">
                      <div className={`text-base font-extrabold leading-tight ${mt.checked ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {mt.title}
                      </div>
                      <div className={`text-[10px] font-black mt-1 uppercase tracking-[0.2em] ${mt.checked ? 'text-slate-300' : 'text-indigo-500'}`}>
                        {mt.duration} SPRINT
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {progressPercent === 100 && (
            <div className="mt-16 p-12 bg-primary-gradient rounded-[40px] text-white text-center shadow-2xl shadow-indigo-200 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-white/20 rounded-[24px] flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                <span className="text-4xl">💎</span>
              </div>
              <h3 className="text-3xl font-black mb-3">Diamond Performance!</h3>
              <p className="text-white/80 font-medium max-w-sm mx-auto">You've cleared your atomic goals for this sprint. Consistency level: Elite.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanDisplay;
