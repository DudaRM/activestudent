import {auth} from '../services/firebase';
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthValue } from '../contexts/FirebaseContext';
import signupImg from '../assets/images/signup.svg';
import avatarImg from '../assets/images/avatar.png';

import '../styles/auth.scss';



export function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {setTimeActive} = useAuthValue();

    const validatePassword = () => {
        let isValid = true;
        if (password !== '' && confirmPassword !== '') {
            if (password !== confirmPassword) {
                isValid = false;
                setError('Password does not match')
            }
        }
        return isValid;
    }

    const register = async e => {
        e.preventDefault();
        setError('')
        if (validatePassword()){
          try{
            await createUserWithEmailAndPassword(auth, email, password)
            .catch(err => {setError(err.message);toast.error(err.message) });

            await updateProfile(auth.currentUser as any, { displayName: name , photoURL: avatar});

            await sendEmailVerification(auth.currentUser as any)
            .catch(err => {setError(err.message);toast.error(err.message) });  

            toast.success('User registration successful registered');
            setTimeActive(true);
            navigate('/verify-email')

          } catch (err){
            console.log(err);
          }
    }
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setAvatar('')
  }
    
    return(
        <div id="page-auth">
          <Toaster/>
          <aside>
            <img src={signupImg} alt="Imagem simbolizando cadastro"/>
            <strong>Seja produtivo e fique próximo da sua universidade!</strong>
            <p>Organize seu dia-a-dia, suas metas, entre em contato com seus professores e muito mais...</p>
          </aside>
          <main> 
            <div className="main-content">
              <img src={avatarImg} alt="Imagem avatar"/>
              <h2>Faça seu cadastro</h2>
              <form onSubmit={register} name="registration-form">
                        <h2>Nome</h2>
                        <input
                          type="name"
                          value={name}
                          placeholder="Digite seu nome"
                          required
                          onChange={e => setName(e.target.value)}
                        />
                        <h2>Avatar</h2>
                        <input
                          type="url"
                          value={avatar}
                          placeholder="Digite a url do seu avatar"
                          required
                          onChange={e => setAvatar(e.target.value)}
                        />
                        <h2>Email</h2>
                        <input
                          type="email"
                          value={email}
                          placeholder="Digite seu email"
                          required
                          onChange={e => setEmail(e.target.value)}
                        />
                        <h2>Senha</h2>
                        <input
                          type="password"
                          value={password}
                          placeholder="Digite sua senha"
                          required
                          onChange={e => setPassword(e.target.value)}
                        />
                        <h2>Confirme sua senha</h2>
                        <input
                          type="password"
                          value={confirmPassword}
                          placeholder="Digite sua senha"
                          required
                          onChange={e => setConfirmPassword(e.target.value)}
                        />
                  <br />
                  <Button type="submit">
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