// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0jjGAaJ867GAzM6dyog3DggN2vX6vYWg",
  authDomain: "calm-nation-392701.firebaseapp.com",
  databaseURL: "https://calm-nation-392701-default-rtdb.firebaseio.com",
  projectId: "calm-nation-392701",
  storageBucket: "calm-nation-392701.appspot.com",
  messagingSenderId: "50402490528",
  appId: "1:50402490528:web:76c3d9deb9fb93ae55f1c5",
  measurementId: "G-LPJXL7CSLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };