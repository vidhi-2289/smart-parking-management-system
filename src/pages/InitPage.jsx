import React from 'react';
import { Car, CheckCircle2 } from 'lucide-react';

export default function InitPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100 font-sans">
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm text-center">
        {/* Brand Icon Header */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 mb-6">
          <Car className="w-8 h-8" />
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          SmartPark
        </h1>
        <p className="text-sm font-medium text-slate-400 mb-8 uppercase tracking-wider">
          Smart Parking Management System
        </p>

        {/* Status Confirmation Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>System initialization successful.</span>
        </div>
      </div>
    </div>
  );
}
