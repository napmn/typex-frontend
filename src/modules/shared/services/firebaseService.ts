import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { GameVariations, Result, Text, Quote } from '../types';

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

const db = firebase.firestore();
const texts = db.collection('texts') as firebase.firestore.CollectionReference<Text>;
const quotes = db.collection('quotes') as firebase.firestore.CollectionReference<Quote>;
const results = db.collection('results') as firebase.firestore.CollectionReference<Result>;

class firebaseService {
  static getUsers = async () => db.collection('users').get();

  static saveUser = async (userId: string) => db.collection('users').doc(userId).set({});

  static getTextByGameVariation = async (gameVariation: GameVariations): Promise<Text & {id: string}> => {
    let collection;
    switch (gameVariation) {
    case 'text':
      collection = texts;
      break;
    case 'quote':
      collection = quotes;
      break;
    default:
      // TODO add support for dictionary later
      collection = texts;
    }
    const key = collection.doc().id;

    let snapshot = await collection.where(firebase.firestore.FieldPath.documentId(), '>=', key).limit(1).get();
    if (snapshot.size > 0) {
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    } else {
      snapshot = await collection.where(firebase.firestore.FieldPath.documentId(), '<', key).limit(1).get();
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
  }

  // TODO type this
  static getLeaderboardForText = async (textId: string) => {
    const snapshot = await results.where('textId', '==', textId).orderBy('cpm', 'desc').limit(10).get();
    return snapshot.docs.map(d => d.data());
  }

  static getResult = async (resultId: string) => {
    const snapshot = await results.where(firebase.firestore.FieldPath.documentId(), '==', resultId).get();
    if (snapshot.docs.length === 0) throw Error('Result does not exist');
    return snapshot.docs[0].data();
  }

  static saveResult = async (resultData: Result) => {
    const resultObj = await results.add(resultData);
    return resultObj.id;
  }
}

export default firebaseService;
