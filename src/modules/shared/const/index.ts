import firebase from 'firebase/app';
import { AuthProvider, GameType, TypingResult } from '../types';

export const gameTypes: GameType[] = [
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

export const authProviders: AuthProvider[] = [
  {
    name: "Github",
    provider: githubProvider
  }
];

export const typingStatsInitialState: TypingResult = {
  textId: '',
  cpm: 0,
  wpm: 0,
  accuracy: 100
};
