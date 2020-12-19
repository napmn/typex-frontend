import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

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
