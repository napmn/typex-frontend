import { useContext, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/app';
import { LoaderContext, TypingStatsContext } from '../../shared/contexts';

import { typingStatsInitialState } from '../const';
import { TypingResult, TypingResultAction } from '../types';
import { firebaseService } from '../services';

// Hook providing logged in user information
export const useLoggedInUser = () => {
  // Hold user info in state
  const [ user, setUser ] = useState<firebase.User | null>();

  // Setup onAuthStateChanged once when component is mounted
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(u => {
      setUser(u);
      if (u) {
        // refresh photo url if changed
        firebaseService.getUser(u.uid).then(data => {
          if(data) {
            if (data?.photoURL !== u.photoURL) {
              firebaseService.updateUser(u.uid, { photoURL: u.photoURL!});
            }
          } else {
            // user is not in database
            firebaseService.saveUser(
              u.uid,
              { displayName: u.displayName ?? u.email!.split('@')[0], photoURL: u.photoURL! }
            );
          }
        });
      }
    });

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
      cpm: Math.round((state.cpm + Number.EPSILON)),
      wpm: Math.round((state.cpm / 5 + Number.EPSILON)),
      accuracy: Math.round((state.accuracy + Number.EPSILON) * 100) / 100,
      finished: true
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
  return useContext(TypingStatsContext);
};

export const useLoaderContext = () => {
  return useContext(LoaderContext);
};
