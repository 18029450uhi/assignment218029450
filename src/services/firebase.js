import firebase from "firebase/compat/app";

import "firebase/compat/auth";
//import "firebse/firestore";
import "firebase/compat/database";
//import "firebase/compat/auth"
import "firebase/compat/firestore";

var firebaseConfig = {

    apiKey: "AIzaSyCUSuc45Y3wsARDclwbx2A-2bNp7toas_o",
  
    authDomain: "assignment218029450.firebaseapp.com",
  
    databaseURL: "https://assignment218029450-default-rtdb.europe-west1.firebasedatabase.app",
  
    projectId: "assignment218029450",
  
    storageBucket: "assignment218029450.appspot.com",
  
    messagingSenderId: "841530498032",
  
    appId: "1:841530498032:web:c6c2cd4dc96c43be469b35",
  
    // measurementId: "G-EQH69QFRER"
    // apiKey: "AIzaSyD7TJWbSP3vqm90_Xan_Z11_-RSFFeSfms",
    // authDomain: "reactapp-e6f78.firebaseapp.com",
    // projectId: "reactapp-e6f78",
    // storageBucket: "reactapp-e6f78.appspot.com",
    // messagingSenderId: "877425234047",
    // appId: "1:877425234047:web:892afe298271e929c36f4a",
    // measurementId: "G-XFZ3VGM4T6"
  };
  
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export const auth= firebase.auth;
  export const firestore= firebase.firestore();
  export const db= firebase.database();

  