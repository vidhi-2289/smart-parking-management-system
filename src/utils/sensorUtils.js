/**
 * Utility functions for ultrasonic/proximity sensor logic.
 * Threshold Rule:
 * - Distance < 20 cm  => OCCUPIED (vehicle detected)
 * - Distance >= 20 cm => AVAILABLE (no vehicle detected)
 */

export const SENSOR_THRESHOLD_CM = 20;

export function evaluateSensorDistance(distanceCm) {
  const numericDistance = Number(distanceCm);
  const isOccupied = numericDistance < SENSOR_THRESHOLD_CM;
  return {
    occupied: isOccupied,
    sensorStatus: 'active'
  };
}
