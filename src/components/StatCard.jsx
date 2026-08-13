import React from 'react';
import { LayoutGrid, CheckCircle2, Car, PieChart } from 'lucide-react';

export default function StatCards({ total = 20, available = 12, occupied = 8 }) {
  const occupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0;

  const stats = [
    {
      title: 'Total Slots',
      value: total,
      subtext: 'Facility capacity',
      icon: LayoutGrid,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20'
    },
    {
      title: 'Available',
      value: available,
      subtext: 'Ready to park',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      title: 'Occupied',
      value: occupied,
      subtext: 'In use',
      icon: Car,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20'
    },
    {
      title: 'Occupancy Rate',
      value: `${occupancyRate}%`,
      subtext: `${occupied} of ${total} occupied`,
      icon: PieChart,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`bg-slate-900 border ${stat.borderColor} p-5 rounded-2xl shadow-sm transition-all hover:border-slate-700 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.title}
              </span>
              <div className={`p-2.5 rounded-xl ${stat.bgColor} ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white tracking-tight mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {stat.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
