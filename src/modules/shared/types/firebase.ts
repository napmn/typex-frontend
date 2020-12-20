import firebase from 'firebase/app';
export interface Text {
  content: string;
  author: string;
  submittedBy: string;
}

export interface Quote extends Text {}

export type Result = {
  accuracy: number;
  cpm: number;
  wpm: number;
  textId: string;
  userId: string;
  timestamp: firebase.firestore.Timestamp;
}

export type User = {
  displayName: string;
  photoURL: string;
}
