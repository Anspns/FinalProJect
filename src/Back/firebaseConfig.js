// firebase-config.js

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Authentication
import { getFirestore } from "firebase/firestore"; // Firestore สำหรับเก็บข้อมูล

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfQ9qexu9Tn5hlH2MF_POXOZuECT0nWqA",
  authDomain: "finalproject-6cbfb.firebaseapp.com",
  projectId: "finalproject-6cbfb",
  storageBucket: "finalproject-6cbfb.firebasestorage.app",
  messagingSenderId: "507794764850",
  appId: "1:507794764850:web:01f45eb0fb89cbe72c782b",
  measurementId: "G-TCY9BW74QD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore (ถ้าต้องการใช้เก็บข้อมูล)
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider };
