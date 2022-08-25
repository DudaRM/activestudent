import {createContext, useContext, useEffect, useState} from 'react';
import { auth } from '../services/firebase';

type FirebaseUser = {
    id:string;
    name:string;
    email:string;
    avatar?:string;
}


type AuthContextTypeFirebase = {
    currentUser: FirebaseUser | undefined;
    timeActive: boolean;
    setTimeActive: (boolean:boolean) => Promise<void>;
    signInWithEmailAndPassword: () => Promise<void>;
}


export const AuthContext = createContext({} as AuthContextTypeFirebase);

export function useAuthValue(){
    return useContext(AuthContext)
}

//The AuthProvider function allows us to share the value of the user’s state to all the children of AuthContext
export function AuthProvider({children, value}){
     const [ currentUser,setCurrentUser ] = useState<FirebaseUser>();
    
     useEffect(() => {
         const unsub = auth.onAuthStateChanged(currentUser => {
           if(currentUser){
            const {displayName,photoURL,uid,email} = currentUser

                if(displayName && photoURL && uid && email){  
                    setCurrentUser({
                        id: uid,
                        name: displayName,
                        avatar:photoURL,
                        email: email,
                   });
                }
                else{
                    throw new Error('Missing information from  account');
                }
        }
    });
        return() =>{
            unsub();
        }
       }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    )
}