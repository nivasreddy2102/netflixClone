// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWOVU7briP6WwOdTmQ20TcKVGzm6Z_5ug",
  authDomain: "netflix1-9fd4a.firebaseapp.com",
  projectId: "netflix1-9fd4a",
  storageBucket: "netflix1-9fd4a.firebasestorage.app",
  messagingSenderId: "643446671933",
  appId: "1:643446671933:web:c677bb92f97f1af0513854",
  measurementId: "G-F3KTE5CR93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();   