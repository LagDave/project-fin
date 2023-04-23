import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

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


/** authentication scripts */ 
  const auth = getAuth();

  // auth listener
  const onAuthStateChangedListener = (callback: any) => {
    return onAuthStateChanged(auth, callback); // consumer has access to "user"
  }

  // sign in with google
  const googleProvider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
    .catch(error => {
      const errorCode = error.code;
      throw errorCode;
    })
  } // consumer should have .then -> returns result object

  // sign out
  const signOutFromApp = () => {
    localStorage.removeItem('isLoggedIn');
    return signOut(auth);
  }

export {loginWithGoogle, onAuthStateChangedListener, signOutFromApp}