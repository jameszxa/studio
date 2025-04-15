"use client";

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, FirebaseAnalytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app: FirebaseApp;
let analytics: FirebaseAnalytics;
let authInstance: Auth;

try {
  app = getApp();
} catch (e: any) {
  app = initializeApp(firebaseConfig);
}

try {
  analytics = getAnalytics(app);
} catch (e) {
  console.error("Error initializing analytics:", e);
}

try {
  authInstance = getAuth(app);
} catch (e) {
  console.error("Error initializing auth:", e);
}
export const auth = authInstance;
