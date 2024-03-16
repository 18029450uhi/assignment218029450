import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/storage";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6CFbh2jCUz0QfLppD3ocKepsI30QWhk0",
  authDomain: "ques-assignment.firebaseapp.com",
  projectId: "ques-assignment",
  storageBucket: "ques-assignment.appspot.com",
  databaseUrl: "https://ques-assignment-default-rtdb.firebaseio.com",
  messagingSenderId: "490894151563",
  appId: "1:490894151563:web:17f511e61472d1f969698e",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const firestore = firebase.firestore();
export const db = firebase.database();

const textDb = getFirestore(app);
const storage = firebase.storage();

export { textDb, storage };
