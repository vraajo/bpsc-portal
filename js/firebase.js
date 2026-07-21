// Firebase Config

const firebaseConfig = {

apiKey: "AIzaSyCJ5o2ThN05UrTE3Uw-BM6ea03fH7OnCaE",

authDomain: "bpsc-portal-a9b2f.firebaseapp.com",

projectId: "bpsc-portal-a9b2f",

storageBucket: "bpsc-portal-a9b2f.firebasestorage.app",

messagingSenderId: "480197369468",

appId: "1:480197369468:web:f91a7200ccbed5ec2a33f9"

};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();
