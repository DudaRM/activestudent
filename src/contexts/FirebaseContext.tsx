//Contexto é usado quando você quer compartilhar algo com toda a aplicação.
//https://medium.com/geekculture/firebase-auth-with-react-and-typescript-abeebcd7940a
import React, {createContext, useContext, useEffect, useState} from 'react';
import { auth } from '../services/firebase';

type User = {
    id:string;
    name:string;
    email:string;
    avatar?:string;
    //reload?: () => Promise<void>;
}


type AuthContextType = {
    currentUser: User | undefined;
    timeActive: boolean;
    //resultado esperado:Tipo
    setTimeActive: (boolean:boolean) => Promise<void>;
    signInWithEmailAndPassword: () => Promise<void>;
}


export const AuthContext = createContext({} as AuthContextType);

export function useAuthValue(){
    return useContext(AuthContext)
}

//The AuthProvider function allows us to share the value of the user’s state to all the children of AuthContext
export function AuthProvider({children, value}){
     const [ currentUser,setCurrentUser ] = useState<User>();
    
     useEffect(() => {
         const unsub = auth.onAuthStateChanged(firebaseUser => {
           if(firebaseUser){
            const {displayName,photoURL,uid,email} = firebaseUser

                if(displayName && photoURL && uid && email){  
                    setCurrentUser({
                        id: uid,
                        name: displayName,
                        avatar:photoURL,
                        email: email,
                   });
                }
                else{
                    throw new Error('Missing information from  account')
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

        //Now when we register a user the currentUser state will be set with an object containing the user’s info.
    )
}
