import { getAnalytics } from "firebase/analytics";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyDQRGCV7RaqPh8XFWjWNw0pQ9IJ-tSY12A",
    authDomain: "fir-hosting-test-344dc.firebaseapp.com",
    databaseURL: "https://fir-hosting-test-344dc-default-rtdb.firebaseio.com",
    projectId: "fir-hosting-test-344dc",
    storageBucket: "fir-hosting-test-344dc.appspot.com",
    messagingSenderId: "638225860488",
    appId: "1:638225860488:web:62aea86947920672c51c3d",
    measurementId: "G-9VCYC4GH5K"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app, "gs://fir-hosting-test-344dc.appspot.com");
export const firestore = getFirestore(app)
