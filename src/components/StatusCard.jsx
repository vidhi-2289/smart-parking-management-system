import React from 'react';
import { Server, Database, Radio, Wifi } from 'lucide-react';

export default function StatusCard({ status = {} }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">System Status</h3>
        </div>

        <div className="space-y-3">
          {/* Cloud Connection */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span className="font-medium">Cloud Connection</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {status.cloudConnection || 'Online'}
            </span>
          </div>

          {/* Sensor Network */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span className="font-medium">Sensor Network</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {status.sensorNetwork || 'Active'}
            </span>
          </div>

          {/* Database (Not Connected) */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <Database className="w-4 h-4 text-amber-400" />
              <span className="font-medium">Database (Firestore)</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {status.database || 'Not Connected'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
        Firebase Firestore cloud integration pending (Module 4)
      </div>
    </div>
  );
}
