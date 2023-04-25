import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

let config = {  
  apiKey: "AIzaSyC8ato9Cyao10a5Q0TQJaU7JxC-to6OeV0",
  authDomain: "mycoachai-8b470.firebaseapp.com",
  projectId: "mycoachai-8b470",
  storageBucket: "mycoachai-8b470.appspot.com",
  messagingSenderId: "853485413033",
  appId: "1:853485413033:web:6feea49bd991697c7e7fb8"
};

firebase.initializeApp(config);

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const storage = firebase.storage();
export default firebase.firestore();
