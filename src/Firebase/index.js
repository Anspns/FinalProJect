import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './FirebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth };
