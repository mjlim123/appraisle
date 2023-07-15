import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
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

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



export default app;
