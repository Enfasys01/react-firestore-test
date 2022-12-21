// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcIPAqYEY6uHBipEQbCn_dCcwk-2b2Dus",
  authDomain: "react-firestore-ab989.firebaseapp.com",
  projectId: "react-firestore-ab989",
  storageBucket: "react-firestore-ab989.appspot.com",
  messagingSenderId: "451214193892",
  appId: "1:451214193892:web:82d3de45ca5203a58ba8f1",
  measurementId: "G-4SBEGJWSH1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
