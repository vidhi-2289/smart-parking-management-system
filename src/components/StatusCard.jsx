import React from 'react';
import { Server, Database, Radio, Wifi, AlertTriangle } from 'lucide-react';

export default function StatusCard({ status = {} }) {
  const isConnected = status.database === 'Connected';
  const isOffline = status.database?.includes('Offline') || status.database?.includes('Error');

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
              <Wifi className={`w-4 h-4 ${isOffline ? 'text-rose-400' : 'text-emerald-400'}`} />
              <span className="font-medium">Cloud Connection</span>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-semibold border ${
                isOffline
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isOffline ? 'bg-rose-400' : 'bg-emerald-400 animate-pulse'
                }`}
              />
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

          {/* Database (Firestore) */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              {isOffline ? (
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              ) : (
                <Database className={`w-4 h-4 ${isConnected ? 'text-emerald-400' : 'text-amber-400'}`} />
              )}
              <span className="font-medium">Database (Firestore)</span>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-semibold border ${
                isConnected
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : isOffline
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isConnected ? 'bg-emerald-400 animate-pulse' : isOffline ? 'bg-rose-400' : 'bg-amber-400'
                }`}
              />
              {status.database || 'Not Connected'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
        {isConnected
          ? 'Cloud Firestore real-time synchronization active'
          : isOffline
          ? 'Unable to connect to Firestore (Check Network)'
          : 'Connecting to Cloud Firestore...'}
      </div>
    </div>
  );
}
