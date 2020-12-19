import { useContext, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/app';
import { TypingStatsContext } from '../../shared/contexts';

import { typingStatsInitialState } from '../const';
import { TypingResult, TypingResultAction } from '../types';

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


const typingStatsReducer = (state: TypingResult, { type, payload }: TypingResultAction) => {
  switch(type) {
  case 'update':
    return {...state, ...payload };
  case 'finalize':
    return {
      ...state,
      cpm: Math.round((state.cpm + Number.EPSILON) * 100) / 100,
      wpm: Math.round((state.cpm / 5 + Number.EPSILON) * 100) / 100,
      accuracy: Math.round((state.accuracy + Number.EPSILON) * 100) / 100,
    };
  case 'reset':
    return typingStatsInitialState;
  default:
    return state;
  }
};

export const useTypingStatsReducer = () => {
  return useReducer(typingStatsReducer, typingStatsInitialState);
};

export const useTypingStatsContext = () => {
  return useContext(TypingStatsContext );
};
