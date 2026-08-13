import { useState, useMemo, useEffect, useCallback } from 'react';
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

  // Raw IoT Sensor Inputs History
  const [rawSensorInputs, setRawSensorInputs] = useState([
    {
      id: 1,
      sensorId: 'US-A2',
      slotId: 'A2',
      sensorType: 'Ultrasonic',
      distanceCm: 12,
      status: 'Vehicle Detected (<20cm)',
      time: '2 min ago',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      sensorId: 'US-B4',
      slotId: 'B4',
      sensorType: 'Ultrasonic',
      distanceCm: 65,
      status: 'No Vehicle (>=20cm)',
      time: '4 min ago',
      timestamp: new Date().toISOString()
    },
    {
      id: 3,
      sensorId: 'US-A7',
      slotId: 'A7',
      sensorType: 'Ultrasonic',
      distanceCm: 14,
      status: 'Vehicle Detected (<20cm)',
      time: '7 min ago',
      timestamp: new Date().toISOString()
    }
  ]);

  // Automatic Simulation State
  const [isAutoSimulating, setIsAutoSimulating] = useState(false);

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
   * Main pipeline entry point: Send a raw sensor reading from the input layer.
   * Records raw payload AND triggers Module 2 processing logic.
   */
  const sendSensorReading = useCallback((slotId, distanceCm) => {
    const numericDistance = Number(distanceCm);

    // 1. Record raw input payload
    const rawInputPayload = {
      id: Date.now() + Math.random(),
      sensorId: `US-${slotId}`,
      slotId: slotId,
      sensorType: 'Ultrasonic',
      distanceCm: numericDistance,
      status: numericDistance < 20 ? 'Vehicle Detected (<20cm)' : 'No Vehicle (>=20cm)',
      time: 'Just now',
      timestamp: new Date().toISOString()
    };

    setRawSensorInputs((prev) => [rawInputPayload, ...prev.slice(0, 19)]);

    // 2. Feed into Module 2 processing logic
    setSlots((prevSlots) => {
      const targetSlot = prevSlots.find((s) => s.id === slotId);
      if (!targetSlot) return prevSlots;

      const { updatedSlot, newActivityEvent } = processSensorReading(
        targetSlot,
        numericDistance
      );

      // Append transition event if state changed
      if (newActivityEvent) {
        setActivities((prev) => [newActivityEvent, ...prev.slice(0, 19)]);
      }

      return prevSlots.map((s) => (s.id === slotId ? updatedSlot : s));
    });
  }, []);

  /**
   * Automatic simulation mode timer effect
   */
  useEffect(() => {
    let timerId = null;

    if (isAutoSimulating) {
      timerId = setInterval(() => {
        // Pick a random slot from A1..A10, B1..B10
        const randomIndex = Math.floor(Math.random() * slots.length);
        const randomSlot = slots[randomIndex];

        // 40% chance occupied reading (5-15cm), 60% chance available reading (40-100cm)
        const isOccupiedReading = Math.random() < 0.4;
        const generatedDistance = isOccupiedReading
          ? Math.floor(Math.random() * 11) + 5    // 5 to 15 cm
          : Math.floor(Math.random() * 61) + 40;  // 40 to 100 cm

        sendSensorReading(randomSlot.id, generatedDistance);
      }, 3500);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isAutoSimulating, slots, sendSensorReading]);

  const toggleAutoSimulation = () => {
    setIsAutoSimulating((prev) => !prev);
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
    rawSensorInputs,
    status,
    stats,
    selectedSlot,
    selectedSlotId,
    setSelectedSlotId,
    highlightedSlotId,
    recommendedSlot,
    isAutoSimulating,
    toggleAutoSimulation,
    sendSensorReading,
    handleFindBestSlot
  };
}
