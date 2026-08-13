import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6WxI-B7J8UgXlolKKOx6J-4BAFLiSfoM",
  authDomain: "smartpark-management-system.firebaseapp.com",
  projectId: "smartpark-management-system",
  storageBucket: "smartpark-management-system.firebasestorage.app",
  messagingSenderId: "205208653982",
  appId: "1:205208653982:web:2d5393c0c35d5e1642ab8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize & Export Cloud Firestore
export const db = getFirestore(app);
