import firebase from 'firebase/app';
import { TAuthProvider, TGameType } from '../types';

const {
  REACT_APP_BASE_API_URL = ''
} = process.env;

export const BASE_API_URL = REACT_APP_BASE_API_URL;


export const gameTypes: TGameType[] = [
  {
    name: 'text',
    verboseName: 'Text',
    path: '/play/text'
  },
  {
    name: 'quote',
    verboseName: 'Quote',
    path: '/play/quote'
  },
  {
    name: 'dictionary',
    verboseName: 'Dictionary',
    path: '/play/dictionary'
  },
];


const githubProvider = new firebase.auth.GithubAuthProvider();

export const authProviders: TAuthProvider[] = [
  {
    name: "Github",
    provider: githubProvider
  }
];
