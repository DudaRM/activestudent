import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id:string;
    name:string;
    email:string;
    avatar?:string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  }

type AuthContextProviderProps = {
    children:ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props:AuthContextProviderProps){
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user){
            const { displayName,photoURL,uid,email} = user
    
            if (!displayName || !photoURL){
                throw new Error('Missing information from Google Account')
              }
    
            setUser({
              id: uid,
              name: displayName,
              email: email,
              avatar: photoURL
            } as User)
          }
        })
    
        return() =>{
          unsubscribe();
        }
    
      },[])
    
      async function signInWithGoogle(){
    
        const provider = new firebase.auth.GoogleAuthProvider();
    
        const result = await auth.signInWithPopup(provider);
        
        if (result.user){
          const { displayName,photoURL,uid,email} = result.user
    
          if (!displayName || !photoURL){
              throw new Error('Missing information from Google Account.');
            }
    
          setUser({
            id: uid,
            name: displayName,
            email: email,
            avatar: photoURL
          } as User)
        }
      }

    return(
        <AuthContext.Provider value={{user,signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>

    );
}