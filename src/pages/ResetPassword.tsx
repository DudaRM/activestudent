import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import signupImg from '../assets/images/signup.svg';
import avatarImg from '../assets/images/avatar.png';
import { Button } from "../components/Button";
import '../styles/reset.scss';

export function ResetPassword(){
    const [email, setEmail] = useState('');

    function forgotPassword(email) {
        return sendPasswordResetEmail(auth, email, {
          url: `http://localhost:3000/`,
        })
      }

    return(
        <div id="page-reset">
        <Toaster/>
        <aside>
          <img src={signupImg} alt="Imagem simbolizando cadastro"/>
          <strong>Seja produtivo e fique próximo da sua universidade!</strong>
          <p>Organize seu dia-a-dia, suas metas, entre em contato com seus professores e muito mais...</p>
        </aside>
        <main> 
          <div className="main-content">
            <img src={avatarImg} alt="Imagem avatar"/>
            <form onSubmit={async e =>{
                e.preventDefault(); 
                forgotPassword(email)
                    .then(response => {
                        console.log(response)
                        //add toast
                })
                .catch(e => console.log(e.message))
                }} name="registration-form">
                      <h2>Digite seu email</h2>
                      <input
                        type="email"
                        value={email}
                        placeholder="Digite seu email"
                        required
                        onChange={e => setEmail(e.target.value)}
                      />
                <br />
                <Button type="submit">
                  Enviar
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