import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAmvZzIWDb5_d52tM60XJ3BM5VKmRuqrlM",
  authDomain: "ocv-dashboard.firebaseapp.com",
  projectId: "ocv-dashboard",
  storageBucket: "ocv-dashboard.firebasestorage.app",
  messagingSenderId: "324853216563",
  appId: "1:324853216563:web:32c511f77001af3434ba46",
  measurementId: "G-P51CX2RHS5"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);