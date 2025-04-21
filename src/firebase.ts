// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxj24wqM6mmUHgQlYdZwKwKz4o7WYWZoo",
  authDomain: "mazer-8a9c6.firebaseapp.com",
  projectId: "mazer-8a9c6",
  storageBucket: "mazer-8a9c6.firebasestorage.app",
  messagingSenderId: "234871479464",
  appId: "1:234871479464:web:111efee1e5eb817c18b69d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and export it
export const auth = getAuth(app);
