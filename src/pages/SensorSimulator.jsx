import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Radio,
  Play,
  Square,
  Send,
  Car,
  CheckCircle2,
  Info,
  Database
} from 'lucide-react';

export default function SensorSimulator({ system }) {
  const {
    slots,
    selectedSlot,
    selectedSlotId,
    setSelectedSlotId,
    rawSensorInputs,
    isAutoSimulating,
    toggleAutoSimulation,
    sendSensorReading,
    isCloudConnected
  } = system;

  const [distanceInput, setDistanceInput] = useState(
    selectedSlot ? selectedSlot.sensorReadingCm : 45
  );

  useEffect(() => {
    if (selectedSlot) {
      setDistanceInput(selectedSlot.sensorReadingCm);
    }
  }, [selectedSlot]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (selectedSlot) {
      sendSensorReading(selectedSlot.id, distanceInput);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-6 border-b border-slate-800 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Sensor Simulator
                </h1>
                <p className="text-sm text-slate-400 mt-0.5">
                  Simulated ultrasonic parking sensor input layer
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                isAutoSimulating
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isAutoSimulating ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'
                }`}
              />
              {isAutoSimulating ? 'Auto Simulation Active (3.5s)' : 'Manual Mode'}
            </span>
          </div>
        </div>

        {/* Prototype Info Callout */}
        <div className="mt-4 p-3.5 bg-indigo-950/40 border border-indigo-500/20 rounded-xl flex items-start gap-3 text-xs text-indigo-200">
          <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p>
            Physical IoT sensors are represented using simulated ultrasonic readings in this prototype. Readings fed through this simulator write to Cloud Firestore and sync across all connected clients in real time.
          </p>
        </div>
      </header>

      {/* Visual End-to-End Pipeline Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm mb-8">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-3 block">
          End-to-End Data Pipeline Architecture
        </span>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-xs font-semibold">
          {/* Step 1: Input */}
          <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-300 flex flex-col items-center justify-center">
            <Radio className="w-4 h-4 mb-1 text-indigo-400" />
            <span>1. Sensor Input</span>
            <span className="text-[10px] text-slate-400 font-normal">Ultrasonic Payload</span>
          </div>

          {/* Step 2: Processing */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 flex flex-col items-center justify-center">
            <Cpu className="w-4 h-4 mb-1 text-slate-400" />
            <span>2. Processing Engine</span>
            <span className="text-[10px] text-slate-500 font-normal">Threshold (&lt;20cm)</span>
          </div>

          {/* Step 3: State */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 flex flex-col items-center justify-center">
            <Car className="w-4 h-4 mb-1 text-slate-400" />
            <span>3. Parking State</span>
            <span className="text-[10px] text-slate-500 font-normal">State Processor</span>
          </div>

          {/* Step 4: Cloud Sync */}
          <div
            className={`p-3 rounded-xl flex flex-col items-center justify-center border ${
              isCloudConnected
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
            }`}
          >
            <Database className="w-4 h-4 mb-1" />
            <span>4. Cloud Firestore</span>
            <span className="text-[10px] font-bold">
              {isCloudConnected ? 'Connected / Real-Time Sync' : 'Connecting...'}
            </span>
          </div>

          {/* Step 5: Dashboard */}
          <div className="col-span-2 md:col-span-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 flex flex-col items-center justify-center">
            <CheckCircle2 className="w-4 h-4 mb-1 text-slate-400" />
            <span>5. Dashboard UI</span>
            <span className="text-[10px] text-slate-500 font-normal">Live Metrics & Map</span>
          </div>
        </div>
      </div>

      {/* Main Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sensor Network Overview */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Sensor Network Overview</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Total Sensors</span>
                <span className="font-bold text-white">20 Nodes</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Active Network</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  20 / 20 Online
                </span>
              </div>
              <div className="flex justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Sensor Hardware Type</span>
                <span className="font-mono font-bold text-indigo-400">Ultrasonic (HC-SR04)</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Occupancy Threshold</span>
                <span className="font-mono font-bold text-amber-400">&lt; 20 cm</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
            Node ID Format: <code className="text-indigo-300">US-[SlotID]</code> (e.g. US-A3)
          </div>
        </div>

        {/* Automatic Simulation Control Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                  <Play className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Auto Sensor Simulator</h3>
              </div>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  isAutoSimulating
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {isAutoSimulating ? 'Running' : 'Stopped'}
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Periodically selects random parking slots every 3.5s and sends realistic ultrasonic distance payloads (5–15cm for vehicle arrival, 40–100cm for departure).
            </p>

            <button
              onClick={toggleAutoSimulation}
              aria-label={isAutoSimulating ? 'Stop Auto Simulation' : 'Start Auto Simulation'}
              className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                isAutoSimulating
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
              }`}
            >
              {isAutoSimulating ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>Stop Auto Simulation</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Auto Simulation</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
            Interval: 3500ms • Direct Cloud Firestore Write Pipeline
          </div>
        </div>

        {/* Manual Sensor Injection Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <form onSubmit={handleManualSubmit}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                  <Send className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">Manual Sensor Input</h3>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                US-{selectedSlot?.id || 'A1'}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label
                  htmlFor="manual-target-slot"
                  className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider"
                >
                  Target Parking Slot
                </label>
                <select
                  id="manual-target-slot"
                  value={selectedSlotId}
                  onChange={(e) => setSelectedSlotId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-indigo-500"
                >
                  {slots.map((s) => (
                    <option key={s.id} value={s.id}>
                      Slot {s.id} ({s.occupied ? 'Occupied' : 'Available'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="manual-distance-cm"
                  className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider"
                >
                  Distance (cm)
                </label>
                <input
                  id="manual-distance-cm"
                  type="number"
                  min="0"
                  max="500"
                  value={distanceInput}
                  onChange={(e) => setDistanceInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDistanceInput(10)}
                  className="py-2 px-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                >
                  <Car className="w-3.5 h-3.5" />
                  10cm (Vehicle)
                </button>
                <button
                  type="button"
                  onClick={() => setDistanceInput(60)}
                  className="py-2 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  60cm (No Vehicle)
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <Send className="w-4 h-4" />
              <span>Send Sensor Reading</span>
            </button>
          </form>
        </div>
      </div>

      {/* Raw Sensor Input History Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Raw Sensor Inputs History
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live stream of raw incoming IoT ultrasonic sensor distance payloads synced from Firestore <code className="text-indigo-300 font-mono">sensorReadings</code> collection
            </p>
          </div>

          <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
            Firestore Readings ({rawSensorInputs.length})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs" aria-label="Raw Sensor Inputs Table">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Sensor ID</th>
                <th className="py-3 px-4">Slot ID</th>
                <th className="py-3 px-4">Sensor Type</th>
                <th className="py-3 px-4">Distance (cm)</th>
                <th className="py-3 px-4">Payload Status</th>
                <th className="py-3 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {rawSensorInputs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500 italic">
                    No sensor readings received yet.
                  </td>
                </tr>
              ) : (
                rawSensorInputs.map((input) => (
                  <tr key={input.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-400">
                      {input.sensorId}
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      {input.slotId}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {input.sensorType}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-200">
                      {input.distanceCm} cm
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-bold text-[11px] ${
                          input.distanceCm < 20
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            input.distanceCm < 20 ? 'bg-rose-400' : 'bg-emerald-400'
                          }`}
                        />
                        {input.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500 text-[11px]">
                      {input.time}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
