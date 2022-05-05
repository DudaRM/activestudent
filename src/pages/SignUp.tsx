import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom'
import { database } from '../services/firebase';
import {FormEvent, useState} from 'react'

import signupImg from '../assets/images/signup.svg';
import avatarImg from '../assets/images/avatar.png';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

export function SignUp(){

  const {user} = useAuth();

  const [newUser,setNewUser] = useState('');

  async function handleCreateUser(event: FormEvent){
    event.preventDefault();

    if(newUser.trim() == ''){
      return;
    }
    const userRef = database.ref('users');
    const firebase = await userRef.push();
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
          <form onSubmit={handleCreateUser}>
                    <h2>Nome</h2>
                    <input
                      type="name"
                      placeholder="Digite seu nome"
                    />
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
              <Button type="submit">Cadastrar</Button>
          </form>
          <p>
            Já tem cadastro? <Link to="/">Faça seu login</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
