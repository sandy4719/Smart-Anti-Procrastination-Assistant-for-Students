
import React from 'react';

interface DashboardProps {
  energyLevel: number;
  setEnergyLevel: (val: number) => void;
  availableHours: number;
  setAvailableHours: (val: number) => void;
  daysToPlan: number;
  setDaysToPlan: (val: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  energyLevel, 
  setEnergyLevel, 
  availableHours, 
  setAvailableHours,
  daysToPlan,
  setDaysToPlan
}) => {
  return (
    <div className="p-7 bg-white rounded-3xl soft-shadow border border-slate-100 space-y-8">
      <div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Energy Sync</h3>
            <p className="text-xs text-slate-400 font-medium">Calibrate your focus</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <span className="text-lg font-bold text-indigo-600">{energyLevel}</span>
          </div>
        </div>
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={energyLevel} 
          onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
          className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between mt-3 text-[10px] text-slate-400 uppercase font-black tracking-widest">
          <span className="text-rose-400">Low Battery</span>
          <span className="text-emerald-500">Super-Sonic</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Daily Window</h3>
            <p className="text-xs text-slate-400 font-medium">Target hours per day</p>
          </div>
          <div className="px-3 py-1 bg-violet-50 rounded-xl">
            <span className="text-sm font-bold text-violet-600">{availableHours}h</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[2, 4, 6, 8].map((h) => (
            <button
              key={h}
              onClick={() => setAvailableHours(h)}
              className={`py-3 rounded-2xl text-xs font-black transition-all border ${
                availableHours === h 
                ? 'bg-primary-gradient text-white border-transparent shadow-md' 
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-100'
              }`}
            >
              {h}h
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Sprint Length</h3>
            <p className="text-xs text-slate-400 font-medium">Plan duration</p>
          </div>
          <div className="px-3 py-1 bg-emerald-50 rounded-xl">
             <span className="text-sm font-bold text-emerald-600">{daysToPlan}d</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 3, 5, 7].map((d) => (
            <button
              key={d}
              onClick={() => setDaysToPlan(d)}
              className={`py-3 rounded-2xl text-xs font-black transition-all border ${
                daysToPlan === d 
                ? 'bg-slate-900 text-white border-transparent shadow-md' 
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-100'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
