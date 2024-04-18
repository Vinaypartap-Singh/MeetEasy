import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDAuKIeiqmqOWFLTF7HqMVFhTpfwgo-5gg",
    authDomain: "meeting-app-f5993.firebaseapp.com",
    projectId: "meeting-app-f5993",
    storageBucket: "meeting-app-f5993.appspot.com",
    messagingSenderId: "947141449984",
    appId: "1:947141449984:web:fce4b466a7c14b7c3f7be5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)