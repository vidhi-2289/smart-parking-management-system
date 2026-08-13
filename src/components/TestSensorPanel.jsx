import React, { useState, useEffect } from 'react';
import { Cpu, Send, CheckCircle2, Car, Radio } from 'lucide-react';
import { SENSOR_THRESHOLD_CM } from '../utils/sensorUtils';

export default function TestSensorPanel({
  slots = [],
  selectedSlot,
  onSelectSlot,
  onSimulateReading,
  onNavigateToSimulator
}) {
  const [distanceInput, setDistanceInput] = useState(
    selectedSlot ? selectedSlot.sensorReadingCm : 45
  );

  useEffect(() => {
    if (selectedSlot) {
      setDistanceInput(selectedSlot.sensorReadingCm);
    }
  }, [selectedSlot]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSlot && onSimulateReading) {
      onSimulateReading(selectedSlot.id, distanceInput);
    }
  };

  const willBeOccupied = Number(distanceInput) < SENSOR_THRESHOLD_CM;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">
              IoT Sensor Quick Trigger
            </h3>
            <p className="text-xs text-slate-400">
              Inject live distance readings into ultrasonic sensor nodes (US-A1 .. US-B10)
            </p>
          </div>
        </div>

        {onNavigateToSimulator && (
          <button
            onClick={onNavigateToSimulator}
            aria-label="Open Dedicated Sensor Simulator Page"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl transition-all self-start sm:self-auto flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Open Dedicated Simulator Page &rarr;</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Slot Selector */}
        <div>
          <label
            htmlFor="quick-trigger-slot"
            className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider"
          >
            Target Slot
          </label>
          <select
            id="quick-trigger-slot"
            value={selectedSlot?.id || 'A3'}
            onChange={(e) => onSelectSlot(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-indigo-500"
          >
            {slots.map((s) => (
              <option key={s.id} value={s.id}>
                Slot {s.id} ({s.occupied ? 'Occupied' : 'Available'})
              </option>
            ))}
          </select>
        </div>

        {/* Distance Input */}
        <div>
          <label
            htmlFor="quick-trigger-distance"
            className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider"
          >
            Distance (cm)
          </label>
          <input
            id="quick-trigger-distance"
            type="number"
            min="0"
            max="500"
            value={distanceInput}
            onChange={(e) => setDistanceInput(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Presets */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
            Quick Presets
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDistanceInput(10)}
              className="flex-1 py-2 px-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
            >
              <Car className="w-3.5 h-3.5" />
              10cm (Vehicle)
            </button>
            <button
              type="button"
              onClick={() => setDistanceInput(60)}
              className="flex-1 py-2 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              60cm (No Vehicle)
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <Send className="w-4 h-4" />
            <span>Send Sensor Reading</span>
          </button>
        </div>
      </form>

      {/* Outcome Preview Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2 text-slate-400">
          <span>
            Proximity Threshold: Distance &lt; 20cm = <strong className="text-rose-400">OCCUPIED</strong>, &ge; 20cm = <strong className="text-emerald-400">AVAILABLE</strong>
          </span>
        </div>
        <div className="font-semibold">
          Sensor State: {' '}
          <span className={willBeOccupied ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
            {willBeOccupied ? 'OCCUPIED (<20cm)' : 'AVAILABLE (>=20cm)'}
          </span>
        </div>
      </div>
    </div>
  );
}
