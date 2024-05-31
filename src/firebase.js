// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4i21Fse5JVqsjJFSiSMKA5HDrdNWlvtA",
  authDomain: "podcast-app-react-6af58.firebaseapp.com",
  projectId: "podcast-app-react-6af58",
  storageBucket: "podcast-app-react-6af58.appspot.com",
  messagingSenderId: "1068203442089",
  appId: "1:1068203442089:web:4362af8309456ed0978eb8",
  measurementId: "G-3EEG1XCH69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {auth, db, storage };