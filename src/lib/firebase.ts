/// <reference types="vite/client" />
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';

// Build Firebase configuration from JSON config or environment variables
const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey || import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: firebaseConfigData.authDomain || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: firebaseConfigData.projectId || import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: firebaseConfigData.storageBucket || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: firebaseConfigData.messagingSenderId || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: firebaseConfigData.appId || import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
const databaseId = firebaseConfigData.firestoreDatabaseId && firebaseConfigData.firestoreDatabaseId !== '(default)' 
  ? firebaseConfigData.firestoreDatabaseId 
  : undefined;
export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

export default app;
