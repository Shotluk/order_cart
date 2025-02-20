// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0UoJi5qOpkvg1BxRydVHChIHrb1kYGic",
  authDomain: "ordering-b72b2.firebaseapp.com",
  projectId: "ordering-b72b2",
  storageBucket: "ordering-b72b2.firebasestorage.app",
  messagingSenderId: "461804880971",
  appId: "1:461804880971:web:4b06a7d6934f6f54f879ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)