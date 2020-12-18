import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Firebase app config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Hook providing logged in user information
export const useLoggedInUser = () => {
  // Hold user info in state
  const [ user, setUser ] = useState<firebase.User | null>();

  // Setup onAuthStateChanged once when component is mounted
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(u => setUser(u));

    // Call unsubscribe in the cleanup of the hook
    return () => unsubscribe();
  }, []);

  const signOut = () => firebase.auth().signOut();

  const signIn = (provider: firebase.auth.AuthProvider) => firebase.auth().signInWithPopup(provider);


  return { user, signIn, signOut };

};

export const githubProvider = new firebase.auth.GithubAuthProvider();
