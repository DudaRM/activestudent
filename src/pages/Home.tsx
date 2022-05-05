import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom'

import ideiasImg from '../assets/images/ideas.svg';
import avatarImg from '../assets/images/avatar.png';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';


export function Home(){
  const navigate = useNavigate();
  const {user,signInWithGoogle} = useAuth();

    async function handleCreateUser(){
      if(!user){
        await signInWithGoogle();
      }
      navigate('/users/new');
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
          <img src={googleIconImg} alt="Logo google"/>
            Entre com sua conta Google
          </button>
          <div className="separator">ou logue com sua conta</div>
          <form>
                    <h2>Email</h2>
                    <input
                      type="email"
                      placeholder="Digite seu email"
                    />
                    <h2>Senha</h2>
                    <input
                      type="password"
                      placeholder="Digite sua senha"
                    />
              <br />
              <Button type="submit">Entrar</Button>
          </form>
          <p>
            Ainda não tem cadastro? <Link to="./pages/SignUp">Realizar cadastro</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
