// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjM189ISoflInBfGZCQBrETxazQDFh8n4",
  authDomain: "react-cursos-4z4c.firebaseapp.com",
  projectId: "react-cursos-4z4c",
  storageBucket: "react-cursos-4z4c.firebasestorage.app",
  messagingSenderId: "1071511626236",
  appId: "1:1071511626236:web:45b89a77f3cc871f819279"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp ); 

export const FirebaseDB = getFirestore( FirebaseApp );