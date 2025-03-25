// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Firebase configuration (Replace with your actual Firebase config)
const firebaseConfig = {
    apiKey: "replace with your API Key",
  authDomain: "catering-system-68fde.firebaseapp.com",
  projectId: "catering-system-68fde",
  storageBucket: "catering-system-68fde.firebasestorage.app",
  messagingSenderId: "130103535519",
  appId: "1:130103535519:web:feec966c346713d2ccffaa",
  measurementId: "G-DTHMBZECR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
