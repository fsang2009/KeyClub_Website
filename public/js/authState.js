import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export function getCurrentUser(){
    return new Promise((resolve)=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            unsubscribe();
            resolve(user);
        })
    })
}