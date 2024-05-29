// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVlFoHoOcbBBQirUqTRw9frMiXKGYfLNo",
  authDomain: "react-noteapp-d11ca.firebaseapp.com",
  projectId: "react-noteapp-d11ca",
  storageBucket: "react-noteapp-d11ca.appspot.com",
  messagingSenderId: "176583587187",
  appId: "1:176583587187:web:984be34a5f3fadc3c98106"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);