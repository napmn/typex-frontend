import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { GameVariations, Result, Text, User, Quote } from '../types';

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
const users = db.collection('users') as firebase.firestore.CollectionReference<User>;

class firebaseService {
  static getUser = async (userId: string) => {
    const snapshot = await users.doc(userId).get();
    return snapshot.data();
  };

  static saveUser = async (userId: string, data: User) => users.doc(userId).set(data);

  static updateUser = async (userId: string, data: Partial<User>) => users.doc(userId).update(data);

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
    const finalData = await Promise.all(snapshot.docs.map(async d => {
      const data = d.data();
      const userData = await firebaseService.getUser(data.userId);
      return { ...data, ...userData };
    }));
    return finalData;
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
