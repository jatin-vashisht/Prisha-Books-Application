// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwTgrLTuCZcPs-Q6Up5PcI2A7DLD0VJYQ",
  authDomain: "prisha-b.firebaseapp.com",
  projectId: "prisha-b",
  storageBucket: "prisha-b.appspot.com",
  messagingSenderId: "692426132283",
  appId: "1:692426132283:web:e789fdf1305134a662c51e",
  measurementId: "G-D718CLEXW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);