import React, { useState } from 'react';
import {
  LayoutDashboard,
  Car,
  Cpu,
  History,
  BarChart3,
  Menu,
  X,
  Wifi
} from 'lucide-react';

export default function Sidebar({ activeTab = 'dashboard', onTabChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, enabled: true },
    { id: 'live', label: 'Live Parking', icon: Car, enabled: true },
    { id: 'simulator', label: 'Sensor Simulator', icon: Cpu, enabled: false },
    { id: 'activity', label: 'Activity', icon: History, enabled: false },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, enabled: false }
  ];

  return (
    <>
      {/* Mobile Bar Toggle */}
      <div className="lg:hidden flex items-center justify-between bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-white leading-none text-base">SmartPark</h1>
            <p className="text-[10px] text-slate-400 font-medium">Smart Parking System</p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Overlay backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/80">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30 shadow-sm">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-white text-lg tracking-tight leading-none">
                SmartPark
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Smart Parking System
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.enabled && onTabChange) {
                      onTabChange(item.id);
                    }
                    setMobileOpen(false);
                  }}
                  disabled={!item.enabled}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                      : item.enabled
                      ? 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      : 'text-slate-600 cursor-not-allowed opacity-70'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.enabled ? 'text-slate-400' : 'text-slate-600'}`} />
                  <span>{item.label}</span>
                  {!item.enabled && (
                    <span className="ml-auto text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700/50">
                      Module {item.id === 'simulator' ? '3' : item.id === 'activity' ? '5' : '5'}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* System Status Section at Bottom */}
        <div className="p-4 m-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Cloud Status
            </span>
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-400">System Online</span>
          </div>
        </div>
      </aside>
    </>
  );
}
