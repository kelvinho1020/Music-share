import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY || "api-key-not-set",
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN || "env-not-set",
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID || "env-not-set",
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET || "env-not-set",
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || "env-not-set",
	appId: process.env.VUE_APP_FIREBASE_APP_ID || "env-not-set",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export { auth, db, usersCollection, songsCollection, commentsCollection, storage };
