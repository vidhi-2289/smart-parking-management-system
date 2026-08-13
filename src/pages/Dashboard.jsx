import React, { useState } from 'react';
import Header from '../components/Header';
import StatCards from '../components/StatCard';
import ParkingGrid from '../components/ParkingGrid';
import RecommendationCard from '../components/RecommendationCard';
import ActivityFeed from '../components/ActivityFeed';
import StatusCard from '../components/StatusCard';

import {
  initialParkingSlots,
  initialActivities,
  systemStatusData
} from '../data/parkingData';

export default function Dashboard() {
  const [slots] = useState(initialParkingSlots);
  const [activities] = useState(initialActivities);
  const [status] = useState(systemStatusData);
  const [highlightedSlotId, setHighlightedSlotId] = useState(null);

  // Summary counts
  const totalSlots = slots.length;
  const availableCount = slots.filter((s) => !s.occupied).length;
  const occupiedCount = slots.filter((s) => s.occupied).length;

  // Best available slot (closest to entrance among available)
  const availableSlots = slots.filter((s) => !s.occupied);
  const recommendedSlot = availableSlots.length > 0
    ? [...availableSlots].sort((a, b) => a.distanceFromEntrance - b.distanceFromEntrance)[0]
    : null;

  const handleFindBestSlot = () => {
    if (recommendedSlot) {
      if (highlightedSlotId === recommendedSlot.id) {
        setHighlightedSlotId(null);
      } else {
        setHighlightedSlotId(recommendedSlot.id);
        // Scroll smoothly to parking grid if needed
        const gridElement = document.getElementById('live-parking-overview');
        if (gridElement) {
          gridElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <Header />

      {/* Summary Statistics */}
      <StatCards
        total={totalSlots}
        available={availableCount}
        occupied={occupiedCount}
      />

      {/* Live Parking Grid */}
      <div id="live-parking-overview">
        <ParkingGrid
          slots={slots}
          highlightedSlotId={highlightedSlotId}
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
