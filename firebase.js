// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo6Ijbw0U9fBJd2BkmkLD5UGpi93MxVFM",
  authDomain: "insta-2-raj.firebaseapp.com",
  projectId: "insta-2-raj",
  storageBucket: "insta-2-raj.appspot.com",
  messagingSenderId: "294513580655",
  appId: "1:294513580655:web:42accbcdd5cebf0c760b9a",
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()
export { app, db, storage }
