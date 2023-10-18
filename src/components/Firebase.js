// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDoIrwqAhJdV5XS8sHXBaazD1u0lvkvMk",

  authDomain: "raftlabauth.firebaseapp.com",

  projectId: "raftlabauth",

  storageBucket: "raftlabauth.appspot.com",

  messagingSenderId: "58072604662",

  appId: "1:58072604662:web:ca92c23ad4acc3ee1cb1d7",

  measurementId: "G-MRSDLB12KG",
  databaseURL: "https://raftlabauth-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { app, auth, database };
