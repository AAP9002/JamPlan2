import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {

  apiKey: "AIzaSyBHmvZUL0xQhKr7FuE3tD0n34B4wtQ9osY",

  authDomain: "jamplan2-e1267.firebaseapp.com",

  projectId: "jamplan2-e1267",

  storageBucket: "jamplan2-e1267.firebasestorage.app",

  messagingSenderId: "959457327089",

  appId: "1:959457327089:web:42cd0735d908fcc70bb650",

  measurementId: "G-HPQY28L8K1"

};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);