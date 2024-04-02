import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/storage";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUSuc45Y3wsARDclwbx2A-2bNp7toas_o",

  authDomain: "assignment218029450.firebaseapp.com",

  databaseURL:
    "https://assignment218029450-default-rtdb.europe-west1.firebasedatabase.app/",

  projectId: "assignment218029450",

  storageBucket: "ques-assignment.appspot.com",

  messagingSenderId: "841530498032",
  appId: "1:841530498032:web:c6c2cd4dc96c43be469b35",
  measurementId: "G-EQH69QFRER",
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const firestore = firebase.firestore();
export const db = firebase.database();

const textDb = getFirestore(app);

let storage;
setTimeout(() => {
  storage = firebase.storage();
});

export { textDb, storage };
