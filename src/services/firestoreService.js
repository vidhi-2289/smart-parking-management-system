import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';
import { initialParkingSlots } from '../data/parkingData';
import { processSensorReading } from './parkingService';

/**
 * Seeds initial 20 parking slots to Firestore if the collection is empty.
 */
export async function seedParkingSlotsIfEmpty() {
  try {
    const slotsRef = collection(db, 'parkingSlots');
    const snapshot = await getDocs(slotsRef);

    if (snapshot.empty) {
      console.log('Seeding initial 20 parking slots to Firestore...');
      const batch = writeBatch(db);

      initialParkingSlots.forEach((slot) => {
        const slotDocRef = doc(db, 'parkingSlots', slot.id);
        batch.set(slotDocRef, {
          id: slot.id,
          zone: slot.zone,
          occupied: slot.occupied,
          sensorStatus: slot.sensorStatus,
          sensorDistance: slot.sensorReadingCm,
          sensorReadingCm: slot.sensorReadingCm,
          distanceFromEntrance: slot.distanceFromEntrance,
          lastUpdated: 'Initial Seed'
        });
      });

      await batch.commit();
      console.log('Successfully seeded 20 parking slots to Firestore.');
    }
  } catch (error) {
    console.error('Error seeding parking slots to Firestore:', error);
    throw error;
  }
}

/**
 * Subscribes to real-time updates for parkingSlots.
 */
export function subscribeToParkingSlots(onUpdate, onError) {
  const slotsRef = collection(db, 'parkingSlots');
  return onSnapshot(
    slotsRef,
    (snapshot) => {
      const slotsList = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          zone: data.zone || (docSnap.id.startsWith('A') ? 'Zone A' : 'Zone B'),
          occupied: Boolean(data.occupied),
          sensorStatus: data.sensorStatus || 'active',
          sensorReadingCm: data.sensorReadingCm ?? data.sensorDistance ?? 45,
          sensorDistance: data.sensorDistance ?? data.sensorReadingCm ?? 45,
          distanceFromEntrance: data.distanceFromEntrance || 15,
          lastUpdated: data.lastUpdated || 'Just now'
        };
      });

      // Custom natural sort by ID (A1..A10, B1..B10)
      slotsList.sort((a, b) => {
        const zoneA = a.id[0];
        const zoneB = b.id[0];
        if (zoneA !== zoneB) return zoneA.localeCompare(zoneB);
        const numA = parseInt(a.id.slice(1), 10);
        const numB = parseInt(b.id.slice(1), 10);
        return numA - numB;
      });

      onUpdate(slotsList);
    },
    (err) => {
      console.error('Firestore parkingSlots listener error:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Subscribes to real-time updates for parkingEvents.
 */
export function subscribeToParkingEvents(onUpdate, onError) {
  const eventsQuery = query(
    collection(db, 'parkingEvents'),
    orderBy('timestamp', 'desc'),
    limit(20)
  );

  return onSnapshot(
    eventsQuery,
    (snapshot) => {
      const eventsList = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const isEntered = data.eventType === 'vehicle_entered';
        return {
          id: docSnap.id,
          slotId: data.slotId,
          event: isEntered ? 'Vehicle detected' : 'Vehicle left',
          type: isEntered ? 'detected' : 'left',
          eventType: data.eventType,
          sensorDistance: data.sensorDistance,
          time: formatTimestamp(data.timestamp),
          timestamp: data.timestamp
        };
      });

      onUpdate(eventsList);
    },
    (err) => {
      console.error('Firestore parkingEvents listener error:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Subscribes to real-time updates for raw sensorReadings.
 */
export function subscribeToSensorReadings(onUpdate, onError) {
  const readingsQuery = query(
    collection(db, 'sensorReadings'),
    orderBy('timestamp', 'desc'),
    limit(20)
  );

  return onSnapshot(
    readingsQuery,
    (snapshot) => {
      const readingsList = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const distance = Number(data.distanceCm);
        return {
          id: docSnap.id,
          sensorId: data.sensorId || `US-${data.slotId}`,
          slotId: data.slotId,
          sensorType: data.sensorType || 'Ultrasonic',
          distanceCm: distance,
          status: distance < 20 ? 'Vehicle Detected (<20cm)' : 'No Vehicle (>=20cm)',
          time: formatTimestamp(data.timestamp),
          timestamp: data.timestamp
        };
      });

      onUpdate(readingsList);
    },
    (err) => {
      console.error('Firestore sensorReadings listener error:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Cloud write pipeline:
 * 1. Evaluate distance threshold via processSensorReading
 * 2. Add raw payload to sensorReadings collection
 * 3. Update doc in parkingSlots collection
 * 4. Add transition event to parkingEvents collection IF state changed
 */
export async function writeSensorReadingPipeline(slotId, distanceCm, currentSlots) {
  const numericDistance = Number(distanceCm);
  const targetSlot = currentSlots.find((s) => s.id === slotId) || {
    id: slotId,
    zone: slotId.startsWith('A') ? 'Zone A' : 'Zone B',
    occupied: false,
    distanceFromEntrance: 15
  };

  const { updatedSlot, newActivityEvent } = processSensorReading(
    targetSlot,
    numericDistance
  );

  try {
    // 1. Write raw reading to sensorReadings collection
    await addDoc(collection(db, 'sensorReadings'), {
      sensorId: `US-${slotId}`,
      slotId: slotId,
      sensorType: 'Ultrasonic',
      distanceCm: numericDistance,
      detected: numericDistance < 20,
      timestamp: serverTimestamp()
    });

    // 2. Update parkingSlots/{slotId} doc
    const timeString = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    await setDoc(
      doc(db, 'parkingSlots', slotId),
      {
        id: slotId,
        zone: targetSlot.zone,
        occupied: updatedSlot.occupied,
        sensorStatus: 'active',
        sensorDistance: numericDistance,
        sensorReadingCm: numericDistance,
        distanceFromEntrance: targetSlot.distanceFromEntrance,
        lastUpdated: timeString
      },
      { merge: true }
    );

    // 3. Write transition event to parkingEvents collection if occupancy changed
    if (newActivityEvent) {
      await addDoc(collection(db, 'parkingEvents'), {
        slotId: slotId,
        eventType: newActivityEvent.eventType,
        sensorDistance: numericDistance,
        timestamp: serverTimestamp()
      });
    }
  } catch (err) {
    console.error('Error executing Cloud Firestore write pipeline:', err);
    throw err;
  }
}

/**
 * Helper to format Firestore timestamp or fallback.
 */
function formatTimestamp(timestamp) {
  if (!timestamp) return 'Just now';
  if (timestamp.toDate) {
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  return 'Just now';
}
