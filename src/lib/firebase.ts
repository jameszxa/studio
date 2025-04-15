// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";

// Check if all required environment variables are present
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

let app: any;
let analytics: any;
let authInstance: Auth | null = null;

if (apiKey && authDomain && projectId && storageBucket && messagingSenderId && appId && measurementId) {
    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://firebase.google.com/docs/web/setup#config-object
    const firebaseConfig = {
        apiKey: apiKey,
        authDomain: authDomain,
        projectId: projectId,
        storageBucket: storageBucket,
        messagingSenderId: messagingSenderId,
        appId: appId,
        measurementId: measurementId,
    };

    // Initialize Firebase
    try {
        app = initializeApp(firebaseConfig);
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
    } catch (e) {
        console.error("Firebase initialization error:", e);
    }
} else {
    console.warn("Missing Firebase configuration values. Firebase might not be fully initialized.");
}

export const auth: Auth | null = authInstance;
