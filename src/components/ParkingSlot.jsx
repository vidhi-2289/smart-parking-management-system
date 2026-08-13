import React from 'react';
import { Car, CheckCircle2, Navigation } from 'lucide-react';

export default function ParkingSlot({ slot, isRecommended = false }) {
  const isOccupied = slot.occupied;

  return (
    <div
      className={`relative p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between h-32 ${
        isRecommended
          ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500'
          : isOccupied
          ? 'bg-slate-900/90 border-rose-500/30 hover:border-rose-500/50'
          : 'bg-slate-900/90 border-emerald-500/30 hover:border-emerald-500/50'
      }`}
    >
      {/* Recommended Tag Badge */}
      {isRecommended && (
        <span className="absolute -top-2.5 right-3 px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-extrabold uppercase rounded-full shadow-sm">
          Best Slot
        </span>
      )}

      {/* Top row: Slot ID & Status Icon */}
      <div className="flex items-center justify-between">
        <span className="font-extrabold text-lg tracking-tight text-white">
          {slot.id}
        </span>
        <div
          className={`p-1.5 rounded-lg ${
            isOccupied ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
          }`}
        >
          {isOccupied ? <Car className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
        </div>
      </div>

      {/* Center Distance / Reading detail */}
      <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
        <Navigation className="w-3 h-3 text-slate-500" />
        <span>{slot.distanceFromEntrance}m to entrance</span>
      </div>

      {/* Bottom row: Status badge */}
      <div className="flex items-center justify-between mt-1">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-md ${
            isOccupied
              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isOccupied ? 'bg-rose-400' : 'bg-emerald-400'
            }`}
          />
          {isOccupied ? 'OCCUPIED' : 'AVAILABLE'}
        </span>

        <span className="text-[10px] text-slate-500 font-mono">
          {slot.sensorReadingCm} cm
        </span>
      </div>
    </div>
  );
}
