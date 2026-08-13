import { evaluateSensorDistance } from '../utils/sensorUtils';

/**
 * Service function to process a sensor reading for a specific slot.
 *
 * @param {Object} currentSlot - Current slot state object
 * @param {number} distanceCm - New sensor distance reading in centimeters
 * @returns {Object} { updatedSlot, newActivityEvent }
 */
export function processSensorReading(currentSlot, distanceCm) {
  const numericDistance = Number(distanceCm);
  const evaluation = evaluateSensorDistance(numericDistance);
  const wasOccupied = currentSlot.occupied;
  const isNowOccupied = evaluation.occupied;

  const updatedSlot = {
    ...currentSlot,
    occupied: isNowOccupied,
    sensorReadingCm: numericDistance,
    sensorStatus: evaluation.sensorStatus,
    lastUpdated: 'Just now'
  };

  let newActivityEvent = null;

  // Generate event ONLY if occupancy state changes
  if (wasOccupied !== isNowOccupied) {
    newActivityEvent = {
      id: Date.now() + Math.random(),
      slotId: currentSlot.id,
      event: isNowOccupied ? 'Vehicle detected' : 'Vehicle left',
      type: isNowOccupied ? 'detected' : 'left',
      eventType: isNowOccupied ? 'vehicle_entered' : 'vehicle_left',
      sensorDistance: numericDistance,
      time: 'Just now',
      timestamp: new Date().toISOString()
    };
  }

  return {
    updatedSlot,
    newActivityEvent
  };
}

/**
 * Calculates derived statistics from current slots list.
 */
export function calculateParkingStats(slots = []) {
  const total = slots.length;
  const occupied = slots.filter((s) => s.occupied).length;
  const available = total - occupied;
  const occupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0;

  return {
    total,
    available,
    occupied,
    occupancyRate
  };
}

/**
 * Deterministically finds the best available parking slot (closest to entrance).
 */
export function findBestAvailableSlot(slots = []) {
  const availableSlots = slots.filter((s) => !s.occupied);
  if (availableSlots.length === 0) return null;

  return [...availableSlots].sort(
    (a, b) => a.distanceFromEntrance - b.distanceFromEntrance
  )[0];
}
