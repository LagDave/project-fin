import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVOffB4QpFVAik4-x413SLGUSCrv8KfyI",
  authDomain: "stashify-6c431.firebaseapp.com",
  projectId: "stashify-6c431",
  storageBucket: "stashify-6c431.appspot.com",
  messagingSenderId: "675426579340",
  appId: "1:675426579340:web:26c6f1add1a22f69bb9ca9",
  measurementId: "G-GHQ41GLKTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth();

// Initialize Firebase Firestore
const db = getFirestore(app);

export {app, auth, db}