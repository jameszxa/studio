"use client";

// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import { getAnalytics, FirebaseAnalytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";

// Check if all required environment variables are present
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

let app: FirebaseApp;
let analytics: FirebaseAnalytics;
let authInstance: Auth;

// Initialize Firebase only if all required environment variables are present
if (apiKey && authDomain && projectId && storageBucket && messagingSenderId && appId && measurementId) {
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
        // Check if Firebase is already initialized
        app = getApp();
    } catch (e: any) {
        if (e.code === 'app/no-app') {
            // Initialize Firebase if it hasn't been initialized yet
            app = initializeApp(firebaseConfig);
        } else {
            console.error("Error getting Firebase app:", e);
            throw e; // Re-throw the error to prevent further initialization
        }
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
} else {
    console.warn("Missing Firebase configuration values. Firebase will not be initialized.");
    // Export a placeholder for auth to prevent further errors
    authInstance = null;
}

export const auth = authInstance;
