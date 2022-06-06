import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState} from 'react';

import signupImg from '../assets/images/signup.svg';
import avatarImg from '../assets/images/avatar.png';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { signUp, useAuth } from '../services/firebase';


export function SignUp(){
  const [loading,setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const currentUser = useAuth();
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");


  async function handleSignUp() {
    setLoading(true);
    try {
      await signUp(emailRef.current!.value, passwordRef.current!.value);
    } catch {
      alert("Error!");
    }
    setLoading(false);
    navigate('/signUp');
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={signupImg} alt="Imagem simbolizando cadastro"/>
        <strong>Seja produtivo e fique próximo da sua universidade!</strong>
        <p>Organize seu dia-a-dia, suas metas, entre em contato com seus professores e muito mais...</p>
      </aside>
      <main> 
        <div className="main-content">
          <img src={avatarImg} alt="Imagem avatar"/>
          <h2>Faça seu cadastro</h2>
          <form>
                    <h2>Nome</h2>
                    <input ref={nameRef}
                      type="name"
                      placeholder="Digite seu nome"
                    />
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
              <Button onClick={handleSignUp} type="submit">
                Cadastrar
              </Button>
          </form>
          <p>
            Já tem cadastro? <Link to="/">Faça seu login</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
