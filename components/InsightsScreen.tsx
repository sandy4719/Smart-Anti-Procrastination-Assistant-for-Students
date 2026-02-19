
import React from 'react';
import { AnalysisResult } from '../types';
import PerformanceReview from './PerformanceReview';

interface InsightsScreenProps {
  analysis: AnalysisResult | null;
  onAnalyze: () => void;
  isLoading: boolean;
}

const InsightsScreen: React.FC<InsightsScreenProps> = ({ analysis, onAnalyze, isLoading }) => {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">AI Insights</h2>
        <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
      </div>

      <PerformanceReview analysis={analysis} onAnalyze={onAnalyze} isLoading={isLoading} />
    </div>
  );
};

export default InsightsScreen;
