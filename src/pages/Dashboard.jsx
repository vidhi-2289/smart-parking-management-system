import React from 'react';
import Header from '../components/Header';
import StatCards from '../components/StatCard';
import ParkingGrid from '../components/ParkingGrid';
import RecommendationCard from '../components/RecommendationCard';
import ActivityFeed from '../components/ActivityFeed';
import StatusCard from '../components/StatusCard';
import TestSensorPanel from '../components/TestSensorPanel';

export default function Dashboard({ system, onNavigateToSimulator }) {
  const {
    slots,
    activities,
    status,
    stats,
    selectedSlot,
    selectedSlotId,
    setSelectedSlotId,
    highlightedSlotId,
    recommendedSlot,
    sendSensorReading,
    handleFindBestSlot,
    isCloudConnected
  } = system;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <Header isCloudConnected={isCloudConnected} />

      {/* Summary Statistics */}
      <StatCards
        total={stats.total}
        available={stats.available}
        occupied={stats.occupied}
      />

      {/* IoT Quick Sensor Trigger Control */}
      <TestSensorPanel
        slots={slots}
        selectedSlot={selectedSlot}
        onSelectSlot={setSelectedSlotId}
        onSimulateReading={sendSensorReading}
        onNavigateToSimulator={onNavigateToSimulator}
      />

      {/* Live Parking Grid */}
      <div id="live-parking-overview">
        <ParkingGrid
          slots={slots}
          highlightedSlotId={highlightedSlotId}
          selectedSlotId={selectedSlotId}
          onSelectSlot={setSelectedSlotId}
        />
      </div>

      {/* Bottom Grid: Smart Recommendation, Activity Feed, System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecommendationCard
          recommendedSlot={recommendedSlot}
          onFindBestSlot={handleFindBestSlot}
          isHighlighted={highlightedSlotId === recommendedSlot?.id}
        />
        <ActivityFeed activities={activities} />
        <StatusCard status={status} />
      </div>
    </div>
  );
}
