import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB8J2oMRkkOPhAJJdkvSTV7_k2L8Noi46k",
    authDomain: "wtfproject-4a53a.firebaseapp.com",
    projectId: "wtfproject-4a53a",
    storageBucket: "wtfproject-4a53a.appspot.com",
    messagingSenderId: "558098589591",
    appId: "1:558098589591:web:987bfd537240746e7886d2",
    measurementId: "G-1CWBDLYLQX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);