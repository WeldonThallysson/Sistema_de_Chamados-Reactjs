import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyB-XVjrJqqMfOMda919LCo8rkb-rYfJZTg",
    authDomain: "sistema-de-chamados-16554.firebaseapp.com",
    projectId: "sistema-de-chamados-16554",
    storageBucket: "sistema-de-chamados-16554.appspot.com",
    messagingSenderId: "888389964473",
    appId: "1:888389964473:web:d03edcd120b57f64e10168",
    measurementId: "G-SWDYVM6CMX"
  };
  


  const firebaseapp = initializeApp(firebaseConfig)

  const database = getFirestore(firebaseapp)
  const auth = getAuth(firebaseapp)
  const storage = getStorage(firebaseapp)
  
  export {database,auth,storage}

