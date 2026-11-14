import { getApp, getApps, initializeApp } from "firebase/app";

// Firebase web configuration is public and identifies the client app.
const firebaseConfig = {
  apiKey: "AIzaSyCJlrLLXPlF6Nlw654ekhxkruu81pKmFKk",
  authDomain: "mylink-94c8e.firebaseapp.com",
  projectId: "mylink-94c8e",
  storageBucket: "mylink-94c8e.firebasestorage.app",
  messagingSenderId: "765093458527",
  appId: "1:765093458527:web:b43691b50174a2297b21ea",
  measurementId: "G-DE4QCXZ5DJ",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
