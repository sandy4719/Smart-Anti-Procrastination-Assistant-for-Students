
import React, { useState } from 'react';
import { Task } from '../types';

interface TaskInputProps {
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onRemoveTask: (id: string) => void;
  onNudge: (task: Task) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ tasks, onAddTask, onRemoveTask, onNudge }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [isExam, setIsExam] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject) return;
    
    onAddTask({
      id: Math.random().toString(36).substr(2, 9),
      title,
      subject,
      deadline,
      difficulty,
      isExam,
      description: ''
    });
    
    setTitle('');
    setSubject('');
    setDeadline('');
    setDifficulty('Medium');
    setIsExam(false);
  };

  return (
    <div className="space-y-8">
      <div className="p-8 bg-white rounded-[32px] soft-shadow border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-50 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          </div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Load Your Goals</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject Area</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Physics, History..."
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Topic Focus</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Final Paper, Lab 03..."
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Date Goal</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none font-medium"
              />
            </div>
            <div className="flex items-center gap-3 h-full pt-6">
              <label className="flex items-center gap-3 cursor-pointer select-none px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors w-full">
                <input 
                  type="checkbox" 
                  checked={isExam} 
                  onChange={(e) => setIsExam(e.target.checked)}
                  className="w-6 h-6 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300" 
                />
                <span className="text-sm font-bold text-slate-600">Major Exam Target 🎯</span>
              </label>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-50">
            <div className="flex gap-2 w-full sm:w-auto p-1 bg-slate-50 rounded-2xl border border-slate-100">
              {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                    difficulty === level 
                    ? 'bg-white text-indigo-600 soft-shadow' 
                    : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={!title || !subject}
              className="w-full sm:w-auto px-10 py-4 bg-primary-gradient text-white rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-indigo-100 disabled:opacity-30 active:scale-95"
            >
              Add to Backlog
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Academic Roadmap</h3>
        {tasks.length === 0 ? (
          <div className="p-16 text-center border-2 border-dashed border-slate-200 rounded-[32px] bg-white/50">
             <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
             </div>
             <p className="text-slate-400 font-bold text-sm">Add your goals above to start planning.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="group flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:soft-shadow transition-all duration-300">
                <div className="flex items-center gap-6">
                  <div className={`w-3 h-12 rounded-full ${
                    task.isExam ? 'bg-primary-gradient shadow-lg animate-pulse' :
                    task.difficulty === 'Hard' ? 'bg-rose-500' : 
                    task.difficulty === 'Medium' ? 'bg-amber-400' : 'bg-emerald-500'
                  }`} />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-lg">{task.subject}</span>
                      {task.isExam && <span className="px-2 py-0.5 rounded-lg bg-slate-900 text-white text-[9px] font-black uppercase tracking-tighter">Exam Target</span>}
                    </div>
                    <h4 className="font-extrabold text-slate-800 text-lg leading-tight">{task.title}</h4>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      {task.deadline ? `Target: ${task.deadline}` : 'Open Deadline'} • <span className="text-slate-500">{task.difficulty} Effort</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNudge(task)}
                    className="p-3 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all group-hover:scale-110"
                    title="Quick Reminder"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </button>
                  <button 
                    onClick={() => onRemoveTask(task.id)}
                    className="p-3 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskInput;
