import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyCx6vky8Qg6O2Rawv6vEEHxhQ7rNhFVJIk",
    authDomain: "mini-blog-ad211.firebaseapp.com",
    projectId: "mini-blog-ad211",
    storageBucket: "mini-blog-ad211.appspot.com",
    messagingSenderId: "277877073952",
    appId: "1:277877073952:web:03a642ced2a8b0d7f2f445"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }