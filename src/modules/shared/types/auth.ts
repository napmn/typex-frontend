import firebase from 'firebase/app';

export type AuthProvider = {
  name: string;
  provider: firebase.auth.AuthProvider;
}
