"use client";

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, FirebaseAnalytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";

// Your web app's Firebase configuration
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

let app: FirebaseApp;
let analytics: FirebaseAnalytics | undefined;
let authInstance: Auth;

if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId || !measurementId) {
  console.error("Missing Firebase configuration values. Firebase will not be initialized.");
} else {
  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
  };

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
}
