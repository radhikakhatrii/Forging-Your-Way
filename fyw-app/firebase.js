// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy2Q1Jt69j3LzNTycSpIC6KtFQ3Sun_GQ",
  authDomain: "forging-your-way.firebaseapp.com",
  projectId: "forging-your-way",
  storageBucket: "forging-your-way.appspot.com",
  messagingSenderId: "265204664413",
  appId: "1:265204664413:web:42e09eac29910e4d1ee5b4",
  measurementId: "G-JL532R8LJH"
};

// Initialize Firebase
let app;
if (firebase.apps.length===0){
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app()
}
const auth = firebase.auth()
export {auth};

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);