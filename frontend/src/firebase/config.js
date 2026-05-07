import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyApxoYeZTelEFfFs8c1F0eePCEimOPRK9o",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "uniride-9be37.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "uniride-9be37",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "uniride-9be37.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "760677444428",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:760677444428:web:1a1d9c21165cf9c3bbfde9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
