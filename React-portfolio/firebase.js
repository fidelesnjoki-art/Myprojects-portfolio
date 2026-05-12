import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5lIYGwEuy7YhISZjD9fKTeR7_Rluhuds",
  authDomain: "react-portfolio-3a55e.firebaseapp.com",
  projectId: "react-portfolio-3a55e",
  storageBucket: "react-portfolio-3a55e.firebasestorage.app",
  messagingSenderId: "442979127233",
  appId: "1:442979127233:web:fc8e551d0894a31656e940",
  measurementId: "G-F7MVGFV8VX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);