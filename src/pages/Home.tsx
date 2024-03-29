import {useNavigate, Link} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import ideiasImg from '../assets/images/ideas.svg';
import avatarImg from '../assets/images/avatar.png';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { useEffect, useState } from 'react';
import { useAuthValue } from '../contexts/FirebaseContext';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export function Home(){
  const navigate = useNavigate();
  const {user,signInWithGoogle} = useAuth();
  const {setTimeActive} = useAuthValue()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')
  const admin = "duda.r.mach@gmail.com";

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function(user){
      if(user){
        console.log("Logged in. user: " + user.displayName);
        if(user.email === admin){
          navigate('/adminHome');
       }
       else{
         navigate('/UserPage');
       }
      }
      else{
        console.log("Not logged in")
      }
    });
    return() =>{
      unsubscribe();
    }
  
},[navigate])

  //Login with Google
  async function handleCreateUser(){
    if(!user){
      await signInWithGoogle()
      .then(() => { 
        if(auth.currentUser?.email === admin){
           navigate('/adminHome');
        }
        else{
          navigate('/UserPage');
        }
      });
    }
  }

  //Login with Email And Password
  const login = async e => {
    e.preventDefault();
     await signInWithEmailAndPassword(auth,email,password)
    .then(() => {
      if(!auth.currentUser?.emailVerified){
        sendEmailVerification(auth.currentUser as any)
        .then(() => {
          setTimeActive(true);
          navigate('/verify-email');
        })
        .catch(err => alert(err.message))
      }else{
        if(auth.currentUser?.email === admin){
          navigate('/adminHome');
        }
        navigate('/UserPage');
      }
    })
    .catch(err => {setError(err.message)});
  }


  return(
    <div id="page-auth">
      <Toaster/>
      <aside>
        <img src={ideiasImg} alt="Imagem simbolizando ideias"/>
        <strong>Seja produtivo e fique próximo da sua universidade!</strong>
        <p>Organize seu dia-a-dia, suas metas, entre em contato com seus professores e muito mais...</p>
      </aside>
      <main> 
        <div className="main-content">

          <img src={avatarImg} alt="Imagem avatar"/>
          <button onClick={handleCreateUser} className="create-user">
            <img src={googleIconImg} alt="Logo do google"/>
              Entre com sua conta Google
          </button>
          <div className="separator">ou logue com sua conta</div>
          <form onSubmit={login}> 
                    <h2>Email</h2>
                    <input
                      type="email"
                      value={email}
                      required
                      placeholder="Digite seu email"
                      onChange={e => setEmail(e.target.value)}
                    />
                    <h2>Senha</h2>
                    <input
                      type="password"
                      value={password}
                      required
                      placeholder="Digite sua senha"
                      onChange={e => setPassword(e.target.value)}
                    />
              <br />
              <Button  type="submit">
                Entrar
              </Button>
          </form>
          <p>
            <Link to="/resetPassword">Esqueci minha senha</Link>
          </p>
          <p>
            Ainda não tem cadastro? <Link to="/signUp">Realizar cadastro</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
