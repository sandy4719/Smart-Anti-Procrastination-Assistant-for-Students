
export interface Task {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isExam: boolean;
  description: string;
}

export interface TimeSlot {
  time: string;
  activity: string;
  durationMinutes: number;
  type: 'Work' | 'Break' | 'Flex';
}

export interface DayPlan {
  dayLabel: string; // e.g., "Day 1", "Monday"
  slots: TimeSlot[];
}

export interface MicroTask {
  id: string;
  title: string;
  duration: string;
  checked: boolean;
}

export interface ProductivityPlan {
  priorityOrder: { id: string; title: string; reason: string }[];
  multiDayPlan: DayPlan[];
  microTasks: MicroTask[];
  motivationTip: string;
}

export interface PerformanceData {
  completedTasks: string[];
  missedTasks: string[];
  avgStudyTime: number;
  mostSkippedSubject: string;
}

export interface AnalysisResult {
  procrastinationPatterns: string[];
  weakTimeSlots: string[];
  suggestedImprovements: string[];
  behavioralAdvice: string;
  scheduleAdjustments: string;
}

export interface StreakCelebration {
  encouragement: string;
  productivityTip: string;
  tomorrowChallenge: string;
}

export interface UserContext {
  tasks: Task[];
  energyLevel: number; // 1-10
  availableHoursPerDay: number;
  daysToPlan: number;
}
