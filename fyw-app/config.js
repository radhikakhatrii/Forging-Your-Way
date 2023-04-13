import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDy2Q1Jt69j3LzNTycSpIC6KtFQ3Sun_GQ",
	authDomain: "forging-your-way.firebaseapp.com",
	projectId: "forging-your-way",
	storageBucket: "forging-your-way.appspot.com",
	messagingSenderId: "265204664413",
	appId: "1:265204664413:web:42e09eac29910e4d1ee5b4",
	measurementId: "G-JL532R8LJH"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}
export { firebase };
