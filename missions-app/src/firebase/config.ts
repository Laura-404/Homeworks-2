import { initializeApp } from "firebase/app";

import {
  getAuth,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBT1m7wDnEHHIzZCciCCNg1BiujrSvAdRo",
  authDomain: "missions-app-20922.firebaseapp.com",
  projectId: "missions-app-20922",
  storageBucket: "missions-app-20922.firebasestorage.app",
  messagingSenderId: "335055535726",
  appId: "1:335055535726:web:313fe39e428034c748307f"
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const firestoreDb =
  getFirestore(app);