
import React, { useState, useEffect } from 'react';
import { Task, ProductivityPlan, AnalysisResult, PerformanceData, StreakCelebration } from './types';
import { generatePlan, analyzePerformance, generateQuickReminder, generateStreakCelebration } from './geminiService';

// Components
import Header from './components/Header';
import HomeDashboard from './components/HomeDashboard';
import ScheduleScreen from './components/ScheduleScreen';
import FocusMode from './components/FocusMode';
import ProgressScreen from './components/ProgressScreen';
import InsightsScreen from './components/InsightsScreen';
import BottomNav from './components/BottomNav';
import ReminderPopup from './components/ReminderPopup';
import StreakCelebrationModal from './components/StreakCelebrationModal';
import Onboarding from './components/Onboarding';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'schedule' | 'focus' | 'progress' | 'insights'>('home');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [plan, setPlan] = useState<ProductivityPlan | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [energyLevel, setEnergyLevel] = useState<number>(7);
  const [availableHours, setAvailableHours] = useState<number>(4);
  const [daysToPlan, setDaysToPlan] = useState<number>(3);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeReminder, setActiveReminder] = useState<string | null>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(() => {
    return localStorage.getItem('focusflow_onboarded') === 'true';
  });
  
  const [streakCount, setStreakCount] = useState<number>(() => {
    const saved = localStorage.getItem('focusflow_streak');
    return saved ? parseInt(saved) : 5;
  });
  const [streakCelebration, setStreakCelebration] = useState<StreakCelebration | null>(null);

  const handleAddTask = (task: Task) => setTasks([...tasks, task]);
  const handleRemoveTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));

  const handleGenerate = async () => {
    if (tasks.length === 0) return;
    setIsGenerating(true);
    try {
      const result = await generatePlan({ tasks, energyLevel, availableHoursPerDay: availableHours, daysToPlan });
      setPlan(result);
      setActiveTab('schedule');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCompletePlan = async () => {
    const newStreak = streakCount + 1;
    setStreakCount(newStreak);
    localStorage.setItem('focusflow_streak', newStreak.toString());
    try {
      const celebration = await generateStreakCelebration(newStreak);
      setStreakCelebration(celebration);
    } catch (err) { console.error(err); }
  };

  const handleAnalyze = async () => {
    setIsGenerating(true);
    try {
      const mockData: PerformanceData = {
        completedTasks: ["Math HW", "Reading", "Vocab"],
        missedTasks: ["Physics Lab", "Bio Quiz"],
        avgStudyTime: 2.8,
        mostSkippedSubject: "Physics"
      };
      const result = await analyzePerformance(mockData);
      setAnalysis(result);
    } catch (err) { console.error(err); }
    finally { setIsGenerating(false); }
  };

  const handleNudge = async (task: Task) => {
    try {
      const nudge = await generateQuickReminder(task.subject, task.deadline, task.title);
      setActiveReminder(nudge);
    } catch (err) { setActiveReminder("Time to lock in!"); }
  };

  const finishOnboarding = () => {
    localStorage.setItem('focusflow_onboarded', 'true');
    setHasSeenOnboarding(true);
  };

  if (!hasSeenOnboarding) {
    return <Onboarding onFinish={finishOnboarding} />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header streakCount={streakCount} activeTab={activeTab} />

      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 pt-4 px-5">
        {activeTab === 'home' && (
          <HomeDashboard 
            tasks={tasks} 
            onAddTask={handleAddTask} 
            onRemoveTask={handleRemoveTask} 
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            onNudge={handleNudge}
            plan={plan}
          />
        )}
        {activeTab === 'schedule' && (
          <ScheduleScreen 
            plan={plan} 
            isGenerating={isGenerating} 
            onGenerate={handleGenerate} 
            onComplete={handleCompletePlan}
            tasks={tasks}
          />
        )}
        {activeTab === 'focus' && <FocusMode />}
        {activeTab === 'progress' && <ProgressScreen tasks={tasks} plan={plan} />}
        {activeTab === 'insights' && (
          <InsightsScreen 
            analysis={analysis} 
            onAnalyze={handleAnalyze} 
            isLoading={isGenerating} 
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeReminder && (
        <ReminderPopup message={activeReminder} onClose={() => setActiveReminder(null)} />
      )}
      {streakCelebration && (
        <StreakCelebrationModal 
          celebration={streakCelebration} 
          streakCount={streakCount} 
          onClose={() => setStreakCelebration(null)} 
        />
      )}
    </div>
  );
};

export default App;
