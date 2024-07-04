import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBFTryPsPPBOLnko1WKLd2kgSywWLVGAkY",
    authDomain: "thejournull-17f87.firebaseapp.com",
    projectId: "thejournull-17f87",
    storageBucket: "thejournull-17f87.appspot.com",
    messagingSenderId: "521556496124",
    appId: "1:521556496124:web:d734c31b25a68b5098d179",
    measurementId: "G-HQ51NSDJVS"
  };

const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);