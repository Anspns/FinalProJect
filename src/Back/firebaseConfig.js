// Back/firebaseConfig.js
import { initializeApp } from 'firebase/app';

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

// ส่งออกแอพ Firebase ที่ initialize แล้ว
export default app;
