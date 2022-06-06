import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { useEffect, useState } from 'react';
const firebaseConfig = {
    //apiKey: "AIzaSyD_8QTNbrqFaI68bnuIyiotAXaRGjT-xTE",
    //authDomain: "activestudent-4b42c.firebaseapp.com",
    //databaseURL: "https://activestudent-4b42c-default-rtdb.firebaseio.com",
    //projectId: "activestudent-4b42c",
    //storageBucket: "activestudent-4b42c.appspot.com",
    //messagingSenderId: "784474447767",
    //appId: "1:784474447767:web:b8cad81169b1f1d12c2ed2",
    //measurementId: "G-TFY2VKXZQB"
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID 
};

//Initialize firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();
const storage = getStorage();
  
export {firebase,auth,database};

export function signUp(email,password){
  return createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
    const user = userCredential.user;
  })
}

export function logIn(email,password){
  return signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
    const user = userCredential.user;
  })
}

export function logOut(){
  return signOut(auth).then(()=>{})
}

//Custom Hook
export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user as any));
    return unsub;
  }, [])

  return currentUser;
}

//Storage
export async function upload(file, currentUser,setLoading){
  const fileRef = ref(storage, currentUser.uid + '.png');
  setLoading(true);
  const snapshot = await uploadBytes(fileRef,file);

  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});

  setLoading(false);
  alert("Uploaded file!");
}
