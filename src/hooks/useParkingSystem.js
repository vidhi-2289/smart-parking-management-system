import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  initialParkingSlots,
  initialActivities
} from '../data/parkingData';
import {
  calculateParkingStats,
  findBestAvailableSlot
} from '../services/parkingService';
import {
  seedParkingSlotsIfEmpty,
  subscribeToParkingSlots,
  subscribeToParkingEvents,
  subscribeToSensorReadings,
  writeSensorReadingPipeline
} from '../services/firestoreService';

export function useParkingSystem() {
  const [slots, setSlots] = useState(initialParkingSlots);
  const [activities, setActivities] = useState(initialActivities);
  const [rawSensorInputs, setRawSensorInputs] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState('A3');
  const [highlightedSlotId, setHighlightedSlotId] = useState(null);
  const [isAutoSimulating, setIsAutoSimulating] = useState(false);

  // Cloud Firestore Connection State
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [cloudError, setCloudError] = useState(null);

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
   * Initialize Firestore seeding and real-time listeners
   */
  useEffect(() => {
    let unsubSlots = null;
    let unsubEvents = null;
    let unsubReadings = null;

    const initCloudSync = async () => {
      try {
        // 1. Seed initial 20 slots if Firestore collection is empty
        await seedParkingSlotsIfEmpty();

        // 2. Subscribe to parkingSlots real-time updates
        unsubSlots = subscribeToParkingSlots(
          (updatedSlots) => {
            if (updatedSlots && updatedSlots.length > 0) {
              setSlots(updatedSlots);
              setIsCloudConnected(true);
              setCloudError(null);
            }
          },
          (err) => {
            console.error('parkingSlots subscription error:', err);
            setIsCloudConnected(false);
            setCloudError(err.message);
          }
        );

        // 3. Subscribe to real-time parkingEvents (Activity Feed)
        unsubEvents = subscribeToParkingEvents(
          (eventsList) => {
            if (eventsList && eventsList.length > 0) {
              setActivities(eventsList);
            }
          },
          (err) => console.error('parkingEvents subscription error:', err)
        );

        // 4. Subscribe to real-time sensorReadings (Raw Sensor Inputs)
        unsubReadings = subscribeToSensorReadings(
          (readingsList) => {
            if (readingsList && readingsList.length > 0) {
              setRawSensorInputs(readingsList);
            }
          },
          (err) => console.error('sensorReadings subscription error:', err)
        );
      } catch (err) {
        console.error('Failed to initialize Cloud Firestore:', err);
        setIsCloudConnected(false);
        setCloudError(err.message);
      }
    };

    initCloudSync();

    return () => {
      if (unsubSlots) unsubSlots();
      if (unsubEvents) unsubEvents();
      if (unsubReadings) unsubReadings();
    };
  }, []);

  /**
   * Main pipeline entry point: Send a sensor reading to Firestore.
   */
  const sendSensorReading = useCallback(async (slotId, distanceCm) => {
    try {
      await writeSensorReadingPipeline(slotId, distanceCm, slots);
    } catch (err) {
      console.error('Error writing sensor reading to Firestore:', err);
    }
  }, [slots]);

  /**
   * Automatic simulation mode timer effect
   */
  useEffect(() => {
    let timerId = null;

    if (isAutoSimulating) {
      timerId = setInterval(() => {
        if (slots.length === 0) return;
        const randomIndex = Math.floor(Math.random() * slots.length);
        const randomSlot = slots[randomIndex];

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
    status: {
      cloudConnection: isCloudConnected ? 'Online' : 'Connecting...',
      sensorNetwork: 'Active',
      database: isCloudConnected ? 'Connected' : 'Connecting...'
    },
    stats,
    selectedSlot,
    selectedSlotId,
    setSelectedSlotId,
    highlightedSlotId,
    recommendedSlot,
    isAutoSimulating,
    toggleAutoSimulation,
    sendSensorReading,
    handleFindBestSlot,
    isCloudConnected,
    cloudError
  };
}
