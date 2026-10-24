import { initializeApp } from "firebase/app";

import {
  getAuth,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

import {
  getDatabase,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_eSOnucoUvTqTBvpRSSVAtf1nZCTygNo",
  authDomain: "challenge-6-e91cb.firebaseapp.com",
  projectId: "challenge-6-e91cb",
  storageBucket: "challenge-6-e91cb.firebasestorage.app",
  messagingSenderId: "912998710692",
  appId: "1:912998710692:web:604e1039aee0f7bbcf5531",
  databaseURL:
    "https://challenge-6-e91cb-default-rtdb.firebaseio.com/",
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const firestoreDb =
  getFirestore(app);

export const realtimeDb =
  getDatabase(app);