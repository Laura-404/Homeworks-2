import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBh_K-oBAkzmnH4k6d9nZSjQrVyZ1JW8WQ",
  authDomain: "task-manager-e722c.firebaseapp.com",
  projectId: "task-manager-e722c",
  storageBucket: "task-manager-e722c.firebasestorage.app",
  messagingSenderId: "315041196336",
  appId: "1:315041196336:web:3b29b022e900f76e0f00f5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);