import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; 
// import {} from "firebase/auth"
import {getAuth} from "firebase/auth";
import { getStorage } from 'firebase/storage';

  const firebaseConfig = {
    apiKey: "AIzaSyAhzAcsV3_4m4JVA2xb2B8wpM-oSEeiRLY",
    authDomain: "qlsv-8b593.firebaseapp.com",
    projectId: "qlsv-8b593",
    storageBucket: "qlsv-8b593.appspot.com",
    messagingSenderId: "549974937579",
    appId: "1:549974937579:web:9a3d02ba1b9da4ea9dd3ae",
    measurementId: "G-1GMK0L4YLH"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export default db;