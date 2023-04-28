import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase_init";

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