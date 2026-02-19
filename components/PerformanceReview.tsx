
import React from 'react';
import { AnalysisResult } from '../types';

interface PerformanceReviewProps {
  analysis: AnalysisResult | null;
  onAnalyze: () => void;
  isLoading: boolean;
}

const PerformanceReview: React.FC<PerformanceReviewProps> = ({ analysis, onAnalyze, isLoading }) => {
  if (!analysis && !isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-16 text-center bg-white rounded-[40px] soft-shadow border border-slate-100">
        <div className="w-24 h-24 bg-indigo-50 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Performance Deep Dive</h2>
        <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto">
          Sync with FocusFlow AI to decode your last 7 days of productivity.
        </p>
        <button 
          onClick={onAnalyze}
          className="bg-primary-gradient text-white px-12 py-5 rounded-[24px] font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-indigo-100 active:scale-95"
        >
          Decode My Patterns
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-24 text-center">
        <div className="relative w-16 h-16 mx-auto mb-10">
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-black text-slate-800">Analyzing Performance Vector...</h2>
        <p className="text-slate-400 mt-3 italic font-medium">Scanning completion history for optimization targets.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white p-12 rounded-[48px] soft-shadow border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Productivity Audit</h2>
              <p className="text-indigo-500 font-bold mt-2 text-sm uppercase tracking-[0.2em]">Optimization Mode: Active</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
              7-Day Insight Range
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-10">
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-5 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  Friction Patterns
                </h3>
                <div className="grid gap-3">
                  {analysis?.procrastinationPatterns.map((p, idx) => (
                    <div key={idx} className="bg-slate-50/80 p-5 rounded-[20px] text-sm font-bold text-slate-700 border border-slate-100 hover:bg-white hover:soft-shadow transition-all">
                      {p}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 mb-5 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                   Critical Windows
                </h3>
                <div className="flex flex-wrap gap-3">
                  {analysis?.weakTimeSlots.map((s, idx) => (
                    <span key={idx} className="px-5 py-2.5 bg-orange-50 text-orange-700 rounded-2xl text-xs font-black border border-orange-100 shadow-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-10">
              <section className="bg-primary-gradient p-8 rounded-[32px] text-white shadow-xl shadow-indigo-100">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-5">AI Behavioral Synthesis</h3>
                <p className="text-lg font-bold leading-relaxed italic">
                  "{analysis?.behavioralAdvice}"
                </p>
              </section>

              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-5 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  High-Impact Moves
                </h3>
                <ul className="space-y-4">
                  {analysis?.suggestedImprovements.map((imp, idx) => (
                    <li key={idx} className="flex gap-4 text-sm text-slate-700 font-bold bg-white p-4 rounded-2xl border border-slate-50 soft-shadow">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      {imp}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-10 rounded-[40px] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="max-w-xl text-center lg:text-left">
          <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Systemic Recalibration</h3>
          <p className="text-slate-400 font-medium leading-relaxed">
            {analysis?.scheduleAdjustments}
          </p>
        </div>
        <button 
          onClick={onAnalyze}
          className="bg-white text-slate-900 px-8 py-4 rounded-[20px] font-black text-sm hover:bg-slate-50 transition-all flex-none active:scale-95 shadow-lg"
        >
          Refresh Synthesis
        </button>
      </div>
    </div>
  );
};

export default PerformanceReview;
