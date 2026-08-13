import React from 'react';
import { Clock } from 'lucide-react';

export default function Header() {
  return (
    <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Smart Parking Dashboard
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            System Online
          </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Real-time parking facility monitoring
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl self-start sm:self-auto">
        <Clock className="w-4 h-4 text-indigo-400" />
        <span>Last updated: <strong className="text-slate-200 font-semibold">Just now</strong></span>
      </div>
    </header>
  );
}
