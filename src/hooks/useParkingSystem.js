import { useState, useMemo } from 'react';
import {
  initialParkingSlots,
  initialActivities,
  systemStatusData
} from '../data/parkingData';
import {
  processSensorReading,
  calculateParkingStats,
  findBestAvailableSlot
} from '../services/parkingService';

export function useParkingSystem() {
  const [slots, setSlots] = useState(initialParkingSlots);
  const [activities, setActivities] = useState(initialActivities);
  const [status] = useState(systemStatusData);
  const [selectedSlotId, setSelectedSlotId] = useState('A3');
  const [highlightedSlotId, setHighlightedSlotId] = useState(null);

  // Derived statistics (recalculated automatically whenever `slots` changes)
  const stats = useMemo(() => calculateParkingStats(slots), [slots]);

  // Derived best slot
  const recommendedSlot = useMemo(() => findBestAvailableSlot(slots), [slots]);

  // Selected slot object
  const selectedSlot = useMemo(
    () => slots.find((s) => s.id === selectedSlotId) || slots[0],
    [slots, selectedSlotId]
  );

  /**
   * Main pipeline function: process a new sensor reading for a slot.
   */
  const updateSlotSensorReading = (slotId, distanceCm) => {
    setSlots((prevSlots) => {
      const targetSlot = prevSlots.find((s) => s.id === slotId);
      if (!targetSlot) return prevSlots;

      const { updatedSlot, newActivityEvent } = processSensorReading(
        targetSlot,
        distanceCm
      );

      // If an activity event was generated (state changed), prepend it to activities list
      if (newActivityEvent) {
        setActivities((prev) => [newActivityEvent, ...prev]);
      }

      return prevSlots.map((s) => (s.id === slotId ? updatedSlot : s));
    });
  };

  /**
   * Trigger recommendation search
   */
  const handleFindBestSlot = () => {
    const bestSlot = findBestAvailableSlot(slots);
    if (bestSlot) {
      if (highlightedSlotId === bestSlot.id) {
        setHighlightedSlotId(null);
      } else {
        setHighlightedSlotId(bestSlot.id);
        const gridElement = document.getElementById('live-parking-overview');
        if (gridElement) {
          gridElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      setHighlightedSlotId(null);
    }
  };

  return {
    slots,
    activities,
    status,
    stats,
    selectedSlot,
    selectedSlotId,
    setSelectedSlotId,
    highlightedSlotId,
    recommendedSlot,
    updateSlotSensorReading,
    handleFindBestSlot
  };
}
