
import React, { useState } from 'react';

interface OnboardingProps {
  onFinish: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Break the Giant",
      description: "Stop staring at the mountain. FocusFlow turns your giant assignments into tiny, achievable goals.",
      icon: "🏔️",
      color: "bg-indigo-600"
    },
    {
      title: "AI Precision",
      description: "Sync your energy and schedule. Our AI finds the perfect windows for your deep work sessions.",
      icon: "⚡",
      color: "bg-purple-600"
    },
    {
      title: "Flow State",
      description: "Build streaks, earn badges, and watch your productivity vector soar. Consistency is your superpower.",
      icon: "🔥",
      color: "bg-orange-500"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="fixed inset-0 z-[300] bg-white flex flex-col p-8 transition-all duration-700">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className={`w-32 h-32 ${steps[step].color} rounded-[40px] flex items-center justify-center text-6xl shadow-2xl shadow-indigo-200 animate-bounce`}>
          {steps[step].icon}
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
            {steps[step].title}
          </h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xs mx-auto">
            {steps[step].description}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`} 
            />
          ))}
        </div>
        <button 
          onClick={handleNext}
          className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-lg hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
        >
          {step === steps.length - 1 ? "Let's Lock In" : "Next Step"}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
