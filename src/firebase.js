import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC9onUDOWmxvHpcnJvXlo5j77E-gaWK7bk",
  authDomain: "bexdev-719b9.firebaseapp.com",
  projectId: "bexdev-719b9",
  storageBucket: "bexdev-719b9.firebasestorage.app",
  messagingSenderId: "174702454674",
  appId: "1:174702454674:web:18bf1b7b0a473e3a45034b",
  measurementId: "G-NR0TR3H94K",
  databaseURL: "https://bexdev-719b9-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
