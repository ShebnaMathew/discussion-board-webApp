import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCtD0j_TgV_eCP5tZ0endA9mbqRn1n8I7M",
    authDomain: "assignment5-4aee9.firebaseapp.com",
    projectId: "assignment5-4aee9",
    storageBucket: "assignment5-4aee9.appspot.com",
    messagingSenderId: "966965517465",
    appId: "1:966965517465:web:cb6b9a4a56d016f8346c08"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;