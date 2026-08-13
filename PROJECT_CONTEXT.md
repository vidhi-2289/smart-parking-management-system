# PROJECT CONTEXT: Smart Parking Management System

## Project Title
**Smart Parking Management System (SmartPark)**

## Problem Being Solved
Urban parking is inefficient, leading to wasted time, traffic congestion, and increased carbon emissions as drivers search for available parking slots. This project provides a real-time smart parking management platform that visualizes parking slot availability, simulates physical proximity/ultrasonic sensors, recommends optimal parking spots, and syncs data to the cloud for live updates and basic analytics.

## Cloud Concepts
* **Cloud Applications**: Centralized, cloud-accessible dashboard and state management providing real-time UI updates to users across devices.
* **Sensors**: Internet of Things (IoT) ultrasonic / proximity sensor simulation that detects vehicle occupancy based on distance measurements.

## Technology Stack
* **Frontend Framework**: React (Functional components, JavaScript ES6+)
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Analytics**: Recharts
* **Database (Planned - Module 4)**: Firebase Firestore
* **Deployment (Planned - Module 7)**: Firebase Hosting
* **Version Control**: Git & GitHub

## Planned Architecture
```
[ Simulated Sensors (Distance cm) ]
                │
                ▼
[ Sensor Simulator & Logic Engine ] (Distance < 20cm = OCCUPIED, >= 20cm = AVAILABLE)
                │
                ▼
[ React State / Custom Hooks ] ◄────► [ Firebase Firestore (Real-time Cloud Sync) ]
                │
                ▼
[ SmartPark Dashboard & UI Components ]
 ├── Slot Visualizer (Grid & Status Indicators)
 ├── Smart Nearest-Slot Recommendation System
 ├── Sensor Activity History Log
 └── Analytics & Metrics Charts
```

## Planned Modules
1. **Module 1**: Frontend layout and dashboard using local dummy data.
2. **Module 2**: Parking-slot state and parking management logic.
3. **Module 3**: Sensor simulator (distance generator & toggle triggers).
4. **Module 4**: Firebase Firestore cloud integration (real-time sync).
5. **Module 5**: Activity logs and basic analytics (Recharts integration).
6. **Module 6**: Smart parking recommendation (nearest spot algorithm) & optional auth.
7. **Module 7**: Testing, polishing, deployment (Firebase Hosting), README, and final cleanup.

## Core Features
1. Dashboard with high-level parking metrics (total, occupied, available).
2. Live parking-slot visualizer with status indicators.
3. Real-time Available vs. Occupied status toggle and distance display.
4. Ultrasonic/proximity sensor simulator producing realistic distance readings.
5. Cloud Firestore database sync for persistent real-time states.
6. Sensor activity history log tracking events.
7. Basic parking occupancy analytics and charts.
8. Smart nearest-slot recommendation algorithm based on entrance proximity.
9. Authentication (optional if time permits).

## Sensor Simulation Concept
* **Sensor Type**: Ultrasonic / Proximity Sensor.
* **Threshold Rule**:
  * Distance **< 20 cm** ➔ **OCCUPIED**
  * Distance **≥ 20 cm** ➔ **AVAILABLE**
* **Simulation Mechanics**: Generates periodic or manual distance readings (in cm) per slot to reflect incoming/outgoing vehicles dynamically without hardware dependency.

## Coding Rules & Guidelines
* **Functional React Components**: Clean, modern hooks (`useState`, `useEffect`, `useMemo`).
* **JavaScript Only**: No TypeScript.
* **Component Modularity**: Keep components focused, atomic, and readable.
* **No Unnecessary Dependencies**: Install packages only when required by modules.
* **No Backend Server**: Serverless architecture using Firebase Firestore.
* **No Hardcoded Secrets**: Use standard environment variables when credentials are added.
* **Beginner-Friendly & Maintainable**: Readable logic for clear presentation and evaluation.
* **Responsive Design**: Mobile and desktop friendly using Tailwind CSS.

## Development Constraints
* Build strictly module-by-module.
* Do not implement future modules until explicitly requested.
* Do not rewrite or refactor working code unnecessarily.
* Run the application and fix any console errors after each module.
