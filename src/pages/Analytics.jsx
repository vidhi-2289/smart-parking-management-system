import React from 'react';
import {
  BarChart3,
  PieChart as PieChartIcon,
  LayoutGrid,
  CheckCircle2,
  Car,
  Database,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export default function Analytics({ system }) {
  const { stats, zoneAStats, zoneBStats, eventStats, isCloudConnected } = system;

  // Data for Chart 1: Zone Occupancy Comparison (BarChart)
  const zoneComparisonData = [
    { zone: 'Zone A', occupancy: zoneAStats.occupancyRate, occupied: zoneAStats.occupied, available: zoneAStats.available },
    { zone: 'Zone B', occupancy: zoneBStats.occupancyRate, occupied: zoneBStats.occupied, available: zoneBStats.available }
  ];

  // Data for Chart 2: Parking Status Distribution (PieChart)
  const statusDistributionData = [
    { name: 'Available Slots', value: stats.available, color: '#10b981' }, // Emerald
    { name: 'Occupied Slots', value: stats.occupied, color: '#f43f5e' }   // Rose
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <header className="mb-6 border-b border-slate-800 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Parking Analytics
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Real-time occupancy metrics and distribution
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
              <span>{isCloudConnected ? 'Firestore Connected' : 'Connecting...'}</span>
            </span>
          </div>
        </div>

        {/* Pipeline Output Visibility Banner */}
        <div className="mt-4 p-3.5 bg-indigo-950/40 border border-indigo-500/20 rounded-xl flex items-center gap-3 text-xs text-indigo-200">
          <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <p>
            Analytics generated from real-time Cloud Firestore parking and sensor data.
          </p>
        </div>
      </header>

      {/* Primary Cloud Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Occupancy Rate */}
        <div className="bg-slate-900 border border-amber-500/20 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Occupancy Rate
            </span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {stats.occupancyRate}%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {stats.occupied} of {stats.total} slots in use
          </p>
        </div>

        {/* Available Slots */}
        <div className="bg-slate-900 border border-emerald-500/20 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Available Slots
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">
            {stats.available}
          </div>
          <p className="text-xs text-slate-500 mt-1">Ready to park</p>
        </div>

        {/* Occupied Slots */}
        <div className="bg-slate-900 border border-rose-500/20 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Occupied Slots
            </span>
            <Car className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400">
            {stats.occupied}
          </div>
          <p className="text-xs text-slate-500 mt-1">Currently taken</p>
        </div>

        {/* Total Sensors */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Sensors
            </span>
            <LayoutGrid className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {stats.total}
          </div>
          <p className="text-xs text-slate-500 mt-1">Ultrasonic IoT nodes</p>
        </div>
      </div>

      {/* Secondary Cloud Event Metrics & Zone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Firestore Events Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            Cloud Event Metrics
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ArrowDownLeft className="w-3.5 h-3.5 text-rose-400" />
                Vehicle Entry Events
              </span>
              <span className="font-bold text-rose-400">{eventStats.entries || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                Vehicle Exit Events
              </span>
              <span className="font-bold text-emerald-400">{eventStats.exits || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400">Total Recorded Events</span>
              <span className="font-bold text-white">{eventStats.total || 0}</span>
            </div>
          </div>
        </div>

        {/* Zone A Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white text-base">Zone A Analytics</h3>
            <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
              North Wing
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white mb-2">
            {zoneAStats.occupancyRate}%
            <span className="text-xs font-medium text-slate-400 ml-2">Occupancy Rate</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 mb-4 border border-slate-800 overflow-hidden">
            <div
              className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${zoneAStats.occupancyRate}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>Occupied: <strong className="text-rose-400">{zoneAStats.occupied} / {zoneAStats.total}</strong></span>
            <span>Available: <strong className="text-emerald-400">{zoneAStats.available}</strong></span>
          </div>
        </div>

        {/* Zone B Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white text-base">Zone B Analytics</h3>
            <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
              South Wing
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white mb-2">
            {zoneBStats.occupancyRate}%
            <span className="text-xs font-medium text-slate-400 ml-2">Occupancy Rate</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 mb-4 border border-slate-800 overflow-hidden">
            <div
              className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${zoneBStats.occupancyRate}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>Occupied: <strong className="text-rose-400">{zoneBStats.occupied} / {zoneBStats.total}</strong></span>
            <span>Available: <strong className="text-emerald-400">{zoneBStats.available}</strong></span>
          </div>
        </div>
      </div>

      {/* Recharts Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Zone Occupancy Comparison (BarChart) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              Zone Occupancy Comparison (%)
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-800 px-2 py-0.5 rounded">
              Bar Chart
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneComparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="zone" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} unit="%" tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(value) => [`${value}%`, 'Occupancy Rate']}
                />
                <Bar dataKey="occupancy" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Parking Status Distribution (PieChart) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-emerald-400" />
              Facility Occupancy Distribution
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-800 px-2 py-0.5 rounded">
              Pie Chart
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(value) => [`${value} slots`, 'Count']}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-xs text-slate-300 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
