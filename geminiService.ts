
import { GoogleGenAI, Type } from "@google/genai";
import { UserContext, ProductivityPlan, PerformanceData, AnalysisResult, StreakCelebration } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are an AI productivity assistant designed specifically for students.
Your role:
- Reduce procrastination by breaking large tasks into 30-60 min micro-goals.
- Create realistic multi-day study schedules.
- Prioritize urgent deadlines and exam dates.
- Avoid overwhelming the student; include breaks (5-15 mins).
- Be supportive, encouraging consistency over perfection.

Output MUST be valid JSON according to the schema.
The student will provide subjects, specific deadlines, difficulty, and exam markers.
Distribute the workload across the requested number of days.`;

const ANALYSIS_INSTRUCTION = `You are a performance coach for students. 
Analyze the provided 7-day completion data to:
1. Detect procrastination patterns.
2. Identify weak time slots based on task failures.
3. Suggest concrete improvements.
4. Provide behavioral advice.
5. Recommend specific schedule adjustments.

Your tone should be supportive, analytical, and practical. 
Return only a valid JSON object matching the provided schema.`;

const REMINDER_INSTRUCTION = `You are a motivational study coach. Generate a specific, action-oriented reminder under 25 words for the given task. 
Tone: Supportive, punchy, and urgent but not stressful. 
Focus on the first physical step the student should take.`;

const STREAK_INSTRUCTION = `You are a high-energy productivity coach celebrating a student's milestone.
The student has completed their goals for multiple days in a row.
Provide:
1. One high-energy, short encouraging message.
2. One specific, practical productivity tip.
3. One small, fun challenge for tomorrow to keep the momentum.
Keep it very energetic and structured in JSON.`;

export const generatePlan = async (context: UserContext): Promise<ProductivityPlan> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Generate a ${context.daysToPlan}-day productivity plan.
    Student Context:
    - Tasks & Subjects: ${JSON.stringify(context.tasks)}
    - Available Study Time: ${context.availableHoursPerDay} hours per day
    - Current Energy Level: ${context.energyLevel}/10
    
    Ensure you rank priorities by urgency (exams first). 
    Break tasks into micro-goals. 
    The multiDayPlan should have exactly ${context.daysToPlan} days.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          priorityOrder: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["id", "title", "reason"]
            }
          },
          multiDayPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dayLabel: { type: Type.STRING },
                slots: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      activity: { type: Type.STRING },
                      durationMinutes: { type: Type.NUMBER },
                      type: { type: Type.STRING, enum: ["Work", "Break", "Flex"] }
                    },
                    required: ["time", "activity", "durationMinutes", "type"]
                  }
                }
              },
              required: ["dayLabel", "slots"]
            }
          },
          microTasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                duration: { type: Type.STRING },
                checked: { type: Type.BOOLEAN }
              },
              required: ["id", "title", "duration", "checked"]
            }
          },
          motivationTip: { type: Type.STRING }
        },
        required: ["priorityOrder", "multiDayPlan", "microTasks", "motivationTip"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as ProductivityPlan;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw error;
  }
};

export const analyzePerformance = async (data: PerformanceData): Promise<AnalysisResult> => {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: `Analyze this student performance data: ${JSON.stringify(data)}`,
    config: {
      systemInstruction: ANALYSIS_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          procrastinationPatterns: { type: Type.ARRAY, items: { type: Type.STRING } },
          weakTimeSlots: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedImprovements: { type: Type.ARRAY, items: { type: Type.STRING } },
          behavioralAdvice: { type: Type.STRING },
          scheduleAdjustments: { type: Type.STRING }
        },
        required: ["procrastinationPatterns", "weakTimeSlots", "suggestedImprovements", "behavioralAdvice", "scheduleAdjustments"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Failed to parse analysis response:", error);
    throw error;
  }
};

export const generateQuickReminder = async (subject: string, deadline: string, task: string): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const response = await ai.models.generateContent({
    model,
    contents: `Upcoming task:\nSubject: ${subject}\nDeadline: ${deadline}\nPending Work: ${task}`,
    config: {
      systemInstruction: REMINDER_INSTRUCTION,
    },
  });
  return response.text || "Time to focus! You've got this.";
};

export const generateStreakCelebration = async (streak: number): Promise<StreakCelebration> => {
  const model = "gemini-3-flash-preview";
  const response = await ai.models.generateContent({
    model,
    contents: `Student completed their goals! Current streak: ${streak} days.`,
    config: {
      systemInstruction: STREAK_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          encouragement: { type: Type.STRING },
          productivityTip: { type: Type.STRING },
          tomorrowChallenge: { type: Type.STRING }
        },
        required: ["encouragement", "productivityTip", "tomorrowChallenge"]
      }
    }
  });

  try {
    return JSON.parse(response.text) as StreakCelebration;
  } catch {
    return {
      encouragement: "Amazing work! You're unstoppable.",
      productivityTip: "Try the 5-minute rule: start for just 5 minutes to beat procrastination.",
      tomorrowChallenge: "Complete your hardest task first thing tomorrow morning!"
    };
  }
};
