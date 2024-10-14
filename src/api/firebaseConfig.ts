import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqXhuCx3uBH9yqljRcuYBFvuZpfOC3f_o",
  authDomain: "commit-7c8b3.firebaseapp.com",
  projectId: "commit-7c8b3",
  storageBucket: "commit-7c8b3.appspot.com",
  messagingSenderId: "226299815055",
  appId: "1:226299815055:web:87b9a34472e23af56b7cfa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
