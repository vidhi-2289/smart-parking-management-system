import React from 'react';
import { History, Car, ArrowRightLeft } from 'lucide-react';

export default function ActivityFeed({ activities = [] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <History className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Recent Sensor Activity</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            Display Only
          </span>
        </div>

        <div className="space-y-3">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    act.type === 'detected'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  {act.type === 'detected' ? (
                    <Car className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-white mr-1.5">{act.slotId}</span>
                  <span className="text-slate-300">{act.event}</span>
                </div>
              </div>

              <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <span>Sensor polling rate: 1000ms</span>
        <span>Module 5 Logging</span>
      </div>
    </div>
  );
}
