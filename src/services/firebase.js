// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase';

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAFoFb7AxQCAaxOgiojyUn-8dTUDNHEykw",
    authDomain: "rekall-f9d61.firebaseapp.com",
    databaseURL: "https://rekall-f9d61.firebaseio.com",
    projectId: "rekall-f9d61",
    storageBucket: "rekall-f9d61.appspot.com",
    messagingSenderId: "1036820424967",
    appId: "1:1036820424967:web:b55cbe25f7c6a6815f3da2",
    measurementId: "G-BR29ENHG9L"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default firebase;