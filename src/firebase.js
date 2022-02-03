import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDLhWKogQ5dqRaj6dFbwmLoq4fgndbJ2qs",
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL: 'https://my-react-app-2021-default-rtdb.firebaseio.com/',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

let instance


export default function getFirebase() {
    if (typeof window !== "undefined") {
        if (instance) return instance
        instance = firebase.initializeApp(firebaseConfig);
        return instance
    }
    return null
}

