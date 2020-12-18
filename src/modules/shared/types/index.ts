import firebase from 'firebase/app';

export type TGameVariations = "text" | "quote" | "dictionary";

export type TGameType = {
  name: TGameVariations;
  verboseName: string;
  path: string;
};

export type TAuthProvider = {
  name: string;
  provider: firebase.auth.AuthProvider;
}
