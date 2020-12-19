import firebase from 'firebase/app';

export type TAuthProvider = {
  name: string;
  provider: firebase.auth.AuthProvider;
}
