// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9mmMeKfKXBLR7l8D66g9spX24e3xPNIo",
  authDomain: "testproject-473e3.firebaseapp.com",
  projectId: "testproject-473e3",
  storageBucket: "testproject-473e3.appspot.com",
  messagingSenderId: "484812714239",
  appId: "1:484812714239:web:0133199185f0b8bae91cca",
  measurementId: "G-6YS71C6P7M",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const auth = getAuth();

console.log("Fireabse.ts");
export { firebaseApp, firebaseAuth, db, auth };
