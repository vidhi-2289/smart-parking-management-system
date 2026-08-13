import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SensorSimulator from './pages/SensorSimulator';
import { useParkingSystem } from './hooks/useParkingSystem';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const system = useParkingSystem();

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'live') {
      setTimeout(() => {
        const gridElement = document.getElementById('live-parking-overview');
        if (gridElement) {
          gridElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content Area */}
      <main className="lg:pl-64 transition-all duration-300">
        {activeTab === 'simulator' ? (
          <SensorSimulator system={system} />
        ) : (
          <Dashboard
            system={system}
            onNavigateToSimulator={() => handleTabChange('simulator')}
          />
        )}
      </main>
    </div>
  );
}
