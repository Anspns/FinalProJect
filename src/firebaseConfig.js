// firebase-config.js

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Authentication
import { getFirestore } from "firebase/firestore"; // Firestore สำหรับเก็บข้อมูล

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAncco3_XyE4_5iTCeWrZiPrgbhPv17nZQ",
  authDomain: "project-3e034.firebaseapp.com",
  projectId: "project-3e034",
  storageBucket: "project-3e034.appspot.com",
  messagingSenderId: "208756652132",
  appId: "1:208756652132:web:d56f0cb60164de8ebf0771",
  measurementId: "G-H8NCDBCYE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore (ถ้าต้องการใช้เก็บข้อมูล)
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider };
