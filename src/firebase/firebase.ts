import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-librariesl
const firebaseConfig = {
  apiKey: "AIzaSyBFwRGfzx9HEfkHgsPWMfheXhI4ATtj-jI",
  authDomain: "liontech-ecommerce.firebaseapp.com",
  projectId: "liontech-ecommerce",
  storageBucket: "liontech-ecommerce.appspot.com",
  messagingSenderId: "870173951970",
  appId: "1:870173951970:web:4dce1300c8917c124cdbbb",
  measurementId: "G-JRTVH0XQWF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
