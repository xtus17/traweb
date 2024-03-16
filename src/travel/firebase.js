import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0b3phgZNi-u_-4kzX9rPjCxVYA2F9REE",
  authDomain: "testign-a1816.firebaseapp.com",
  projectId: "testign-a1816",
  storageBucket: "testign-a1816.appspot.com",
  messagingSenderId: "950876137092",
  appId: "1:950876137092:web:0960aa0498519f349444d1"
};

export const Firebase = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
