import firebase from "firebase";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projFirestore = firebase.firestore();
const lastModified = firebase.firestore.FieldValue.serverTimestamp();
export { projFirestore, lastModified };
