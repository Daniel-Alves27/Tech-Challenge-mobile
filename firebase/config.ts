// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
// @ts-ignore
import { Auth, getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDvtQmLuRYDhS0ASRhWYB7tfGAtdpMlT5I",
  authDomain: "nexpay-ad925.firebaseapp.com",
  projectId: "nexpay-ad925",
  storageBucket: "nexpay-ad925.firebasestorage.app",
  messagingSenderId: "615247664798",
  appId: "1:615247664798:web:f3e21f2902a13c3e1f8d8f",
  measurementId: "G-J2BPJ4QJVD"
};

let app: FirebaseApp
let auth: Auth

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  })

} else {
  app = getApp()
  auth = getAuth(app)
}

const db = getFirestore(app);

export { app, auth, db };
