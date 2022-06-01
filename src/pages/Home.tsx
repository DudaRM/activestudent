import {useNavigate, Link} from 'react-router-dom';
//import toast, { Toaster } from 'react-hot-toast';
//https://stackoverflow.com/questions/50911678/react-native-how-to-store-pic-and-username-when-using-firebase-to-create-a-user
//https://stackoverflow.com/questions/37370599/firebase-auth-delayed-on-refresh

import ideiasImg from '../assets/images/ideas.svg';
import avatarImg from '../assets/images/avatar.png';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { useRef, useState } from 'react';
import { logIn } from '../services/firebase';

export function Home(){
  const navigate = useNavigate();
  const {user,signInWithGoogle} = useAuth();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false); 
  const currentUser = useAuth();


  async function handleLogIn(){
    setLoading(true);
    if(!currentUser){
        await logIn(emailRef.current!.value,passwordRef.current!.value);
    }
      setLoading(false);
      navigate('/userHome'); 
   }

    

  async function handleCreateUser(){

    if(!user){
      await signInWithGoogle();
    }

    navigate('/userHome');
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
          <form>
                    <h2>Email</h2>
                    <input ref={emailRef}
                      type="email"
                      placeholder="Digite seu email"
                    />
                    <h2>Senha</h2>
                    <input ref={passwordRef}
                      type="password"
                      placeholder="Digite sua senha"
                    />
              <br />
              <Button onClick={handleLogIn} type="submit">
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
