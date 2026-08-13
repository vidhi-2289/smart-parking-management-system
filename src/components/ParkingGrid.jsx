import React from 'react';
import ParkingSlot from './ParkingSlot';
import { ArrowDown, ArrowUp } from 'lucide-react';

export default function ParkingGrid({
  slots = [],
  highlightedSlotId = null,
  selectedSlotId = null,
  onSelectSlot
}) {
  const zoneASlots = slots.filter((slot) => slot.zone === 'Zone A');
  const zoneBSlots = slots.filter((slot) => slot.zone === 'Zone B');

  const availableCount = slots.filter((s) => !s.occupied).length;
  const occupiedCount = slots.filter((s) => s.occupied).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Live Parking Overview
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            20 real-time simulated proximity sensor nodes (Zone A & Zone B)
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Available ({availableCount})</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>Occupied ({occupiedCount})</span>
          </div>
        </div>
      </div>

      {/* Facility Grid Layout */}
      <div className="space-y-6">
        {/* Zone A */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Zone A (Slots A1 – A10)
            </span>
            <span className="text-[11px] font-medium text-slate-500">
              North Wing
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {zoneASlots.map((slot) => (
              <ParkingSlot
                key={slot.id}
                slot={slot}
                isRecommended={highlightedSlotId === slot.id}
                isSelected={selectedSlotId === slot.id}
                onSelectSlot={onSelectSlot}
              />
            ))}
          </div>
        </div>

        {/* Drive Lane / Roadway Visual Separator */}
        <div className="relative my-6 py-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center justify-between px-6 text-slate-600 select-none overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest">
            <ArrowDown className="w-4 h-4 text-indigo-500/70 animate-bounce" />
            <span>MAIN DRIVE LANE ──── ENTRANCE / EXIT</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[10px] font-mono text-slate-600">
            <span>MAX SPEED 10 KM/H</span>
            <span>SENSOR FIELD ACTIVE</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest">
            <span>ONE WAY</span>
            <ArrowUp className="w-4 h-4 text-indigo-500/70 animate-bounce" />
          </div>
        </div>

        {/* Zone B */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Zone B (Slots B1 – B10)
            </span>
            <span className="text-[11px] font-medium text-slate-500">
              South Wing
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {zoneBSlots.map((slot) => (
              <ParkingSlot
                key={slot.id}
                slot={slot}
                isRecommended={highlightedSlotId === slot.id}
                isSelected={selectedSlotId === slot.id}
                onSelectSlot={onSelectSlot}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
