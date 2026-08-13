import React, { useState } from 'react';
import {
  History,
  Car,
  ArrowRightLeft,
  Filter,
  Clock,
  Database,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';

export default function Activity({ system }) {
  const { activities = [], eventStats = {}, isCloudConnected } = system;
  const [filterType, setFilterType] = useState('all'); // 'all' | 'entered' | 'left' | 'zoneA' | 'zoneB'

  // Apply filtering
  const filteredActivities = activities.filter((act) => {
    const isEntered = act.eventType === 'vehicle_entered' || act.type === 'detected';
    const isLeft = act.eventType === 'vehicle_left' || act.type === 'left';
    const isZoneA = act.slotId.startsWith('A');
    const isZoneB = act.slotId.startsWith('B');

    if (filterType === 'entered') return isEntered;
    if (filterType === 'left') return isLeft;
    if (filterType === 'zoneA') return isZoneA;
    if (filterType === 'zoneB') return isZoneB;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <header className="mb-6 border-b border-slate-800 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Activity Logs
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Real-time cloud sensor state transition events history
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                isCloudConnected
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>{isCloudConnected ? 'Synced with Firestore' : 'Connecting to Cloud...'}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Events */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Events
            </span>
            <div className="text-2xl font-extrabold text-white mt-1">
              {eventStats.total || 0}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Cloud event records</p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <History className="w-5 h-5" />
          </div>
        </div>

        {/* Vehicle Entries */}
        <div className="bg-slate-900 border border-rose-500/20 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Vehicle Entries
            </span>
            <div className="text-2xl font-extrabold text-rose-400 mt-1">
              {eventStats.entries || 0}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Vehicle detected (&lt;20cm)</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <ArrowDownLeft className="w-5 h-5" />
          </div>
        </div>

        {/* Vehicle Exits */}
        <div className="bg-slate-900 border border-emerald-500/20 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Vehicle Exits
            </span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">
              {eventStats.exits || 0}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Vehicle left (&ge;20cm)</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Latest Event */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Latest Event
            </span>
            <div className="text-lg font-extrabold text-white mt-1 truncate max-w-[120px]">
              {eventStats.latestEvent ? `Slot ${eventStats.latestEvent.slotId}` : 'None'}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {eventStats.latestEvent ? eventStats.latestEvent.time : 'No activity yet'}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-800 text-slate-400 border border-slate-700">
            <Clock className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
      </div>

      {/* Filter Controls & List Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Filter Event Logs</h3>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Events' },
              { id: 'entered', label: 'Vehicle Entered' },
              { id: 'left', label: 'Vehicle Left' },
              { id: 'zoneA', label: 'Zone A' },
              { id: 'zoneB', label: 'Zone B' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterType === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Slot ID</th>
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Sensor Reading</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((act) => {
                  const isEntered =
                    act.eventType === 'vehicle_entered' || act.type === 'detected';
                  return (
                    <tr key={act.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white text-sm">
                        Slot {act.slotId}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-extrabold text-xs ${
                            isEntered
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {isEntered ? (
                            <ArrowDownLeft className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          )}
                          {isEntered ? 'Vehicle Entered' : 'Vehicle Left'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300 text-xs">
                        {act.sensorDistance !== undefined
                          ? `${act.sensorDistance} cm`
                          : 'Proximity Triggered'}
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-500 font-mono">
                        {act.time || 'Just now'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-500 italic">
                    No activity logs match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
