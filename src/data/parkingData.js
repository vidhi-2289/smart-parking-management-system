// Initial mock parking slots data for Module 1
export const initialParkingSlots = [
  // Zone A
  { id: 'A1', zone: 'Zone A', occupied: false, sensorStatus: 'active', distanceFromEntrance: 12, lastUpdated: '12 min ago', sensorReadingCm: 45 },
  { id: 'A2', zone: 'Zone A', occupied: true,  sensorStatus: 'active', distanceFromEntrance: 14, lastUpdated: '2 min ago',  sensorReadingCm: 12 },
  { id: 'A3', zone: 'Zone A', occupied: false, sensorStatus: 'active', distanceFromEntrance: 8,  lastUpdated: '18 min ago', sensorReadingCm: 60 },
  { id: 'A4', zone: 'Zone A', occupied: false, sensorStatus: 'active', distanceFromEntrance: 16, lastUpdated: '25 min ago', sensorReadingCm: 50 },
  { id: 'A5', zone: 'Zone A', occupied: true,  sensorStatus: 'active', distanceFromEntrance: 18, lastUpdated: '15 min ago', sensorReadingCm: 8 },
  { id: 'A6', zone: 'Zone A', occupied: false, sensorStatus: 'active', distanceFromEntrance: 20, lastUpdated: '30 min ago', sensorReadingCm: 70 },
  { id: 'A7', zone: 'Zone A', occupied: false, sensorStatus: 'active', distanceFromEntrance: 22, lastUpdated: '7 min ago',  sensorReadingCm: 55 },
  { id: 'A8', zone: 'Zone A', occupied: true,  sensorStatus: 'active', distanceFromEntrance: 24, lastUpdated: '40 min ago', sensorReadingCm: 5 },
  { id: 'A9', zone: 'Zone A', occupied: false, sensorStatus: 'active', distanceFromEntrance: 26, lastUpdated: '50 min ago', sensorReadingCm: 80 },
  { id: 'A10', zone: 'Zone A', occupied: true, sensorStatus: 'active', distanceFromEntrance: 28, lastUpdated: '45 min ago', sensorReadingCm: 10 },

  // Zone B
  { id: 'B1', zone: 'Zone B', occupied: true,  sensorStatus: 'active', distanceFromEntrance: 15, lastUpdated: '10 min ago', sensorReadingCm: 14 },
  { id: 'B2', zone: 'Zone B', occupied: false, sensorStatus: 'active', distanceFromEntrance: 17, lastUpdated: '22 min ago', sensorReadingCm: 65 },
  { id: 'B3', zone: 'Zone B', occupied: false, sensorStatus: 'active', distanceFromEntrance: 19, lastUpdated: '35 min ago', sensorReadingCm: 52 },
  { id: 'B4', zone: 'Zone B', occupied: true,  sensorStatus: 'active', distanceFromEntrance: 21, lastUpdated: '4 min ago',  sensorReadingCm: 11 },
  { id: 'B5', zone: 'Zone B', occupied: false, sensorStatus: 'active', distanceFromEntrance: 23, lastUpdated: '48 min ago', sensorReadingCm: 75 },
  { id: 'B6', zone: 'Zone B', occupied: true,  sensorStatus: 'active', distanceFromEntrance: 25, lastUpdated: '1 hour ago', sensorReadingCm: 9 },
  { id: 'B7', zone: 'Zone B', occupied: false, sensorStatus: 'active', distanceFromEntrance: 27, lastUpdated: '5 min ago',   sensorReadingCm: 90 },
  { id: 'B8', zone: 'Zone B', occupied: false, sensorStatus: 'active', distanceFromEntrance: 29, lastUpdated: '14 min ago', sensorReadingCm: 40 },
  { id: 'B9', zone: 'Zone B', occupied: true,  sensorStatus: 'active', distanceFromEntrance: 31, lastUpdated: '30 min ago', sensorReadingCm: 6 },
  { id: 'B10', zone: 'Zone B', occupied: false, sensorStatus: 'active', distanceFromEntrance: 33, lastUpdated: '1 hour ago', sensorReadingCm: 85 }
];

export const initialActivities = [
  { id: 1, slotId: 'A2', event: 'Vehicle detected', type: 'detected', time: '2 min ago' },
  { id: 2, slotId: 'B4', event: 'Vehicle left',     type: 'left',     time: '4 min ago' },
  { id: 3, slotId: 'A7', event: 'Vehicle detected', type: 'detected', time: '7 min ago' },
  { id: 4, slotId: 'B1', event: 'Vehicle left',     type: 'left',     time: '10 min ago' }
];

export const systemStatusData = {
  cloudConnection: 'Online',
  sensorNetwork: 'Active',
  database: 'Not Connected'
};
