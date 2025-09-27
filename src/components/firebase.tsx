// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3xDrfQLyjJcSwKlxWFt6W8H0pn1e4zJo",
  authDomain: "login@web-app-4c1a4.firebaseapp.com",
  projectId: "web-app-4c1a4",
  storageBucket: "web-app-4c1a4.appspot.com",
  messagingSenderId: "739947323363",
  appId: "1:739947323363:web:51c8b7509d93c1b20bcad6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);