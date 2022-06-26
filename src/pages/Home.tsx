import {useNavigate, Link} from 'react-router-dom';
//import toast, { Toaster } from 'react-hot-toast';
//https://stackoverflow.com/questions/50911678/react-native-how-to-store-pic-and-username-when-using-firebase-to-create-a-user
//https://stackoverflow.com/questions/37370599/firebase-auth-delayed-on-refresh
//onClick={handleLogIn}

import ideiasImg from '../assets/images/ideas.svg';
import avatarImg from '../assets/images/avatar.png';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { useState } from 'react';
import { useAuthValue } from '../contexts/FirebaseContext';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export function Home(){
  const navigate = useNavigate();
  const {user,signInWithGoogle} = useAuth();
  //const emailRef = useRef<HTMLInputElement | null>(null);
  //const passwordRef = useRef<HTMLInputElement | null>(null);
  //const [loading, setLoading] = useState(false); 
  //const currentUser = useAuth();
  const {setTimeActive} = useAuthValue()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')

  //Login with Google
  async function handleCreateUser(){

    if(!user){
      await signInWithGoogle();
    }

    navigate('/userPage');
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
        navigate('/UserPage');
      }
    })
    .catch(err => setError(err.message))

  }


  return(
    <div id="page-auth">
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
            Ainda não tem cadastro? <Link to="/signUp">Realizar cadastro</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
