import { getFirestore} from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCpei56oya7L0CfICnOTMA0u4VjRtR6KfU",
  authDomain: "southportkeyclubwebsite.firebaseapp.com",
  projectId: "southportkeyclubwebsite",
  storageBucket: "southportkeyclubwebsite.firebasestorage.app",
  messagingSenderId: "128387313566",
  appId: "1:128387313566:web:8af6fc61aef1d463b2b08f",
  measurementId: "G-LH06BZ5T6Z"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
export { auth, database };

