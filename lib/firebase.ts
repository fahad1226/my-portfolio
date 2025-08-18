// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3K0Gth8iEIkYub3lCiDQAtmRf6pDuD8M",
    authDomain: "farads-article.firebaseapp.com",
    projectId: "farads-article",
    storageBucket: "farads-article.firebasestorage.app",
    messagingSenderId: "396189586155",
    appId: "1:396189586155:web:b531feeaaca85dd8a664ae",
    measurementId: "G-62S9TJT5KN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db, storage };
