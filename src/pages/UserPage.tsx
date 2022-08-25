import { Link} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import '../styles/userpage.scss';
import login from '../assets/images/login.png';
import useravatar from '../assets/images/useravatar.png';
import notebook from '../assets/images/notebook.png';
import checklist from '../assets/images/checklist.png';
import fine from '../assets/images/smile.png';
import emotions from '../assets/images/emotions.png';
import { useCount } from '../hooks/useCount';

export function UserPage(){
  const {user} = useAuth();
  const count = useCount();
  
    return(
      <div id="user-page">
       { user ? (
         <><aside>
            <img src={useravatar} alt={user.name} />
            <strong>{user.name}</strong>
            <div className="separator">Estudante 8° período</div>
            <p>Última visita: 3 minutos atrás</p>
          </aside>
          <main>
            <h2>Bem vindo(a), {user.name}. Suas métricas:</h2>
            <div className="main-content">
              <div className="content-one">
                <div className="card" style={{backgroundColor: "#E6866E"}}>
                  <h5>Dias consecutivos logados</h5>
                  <div className="container">
                    <img src={login} alt="Representação dos dias logados" />
                    <h1>25</h1>
                  </div>
                  <p>Último: 10</p>
                </div>

                <div className="card" style={{backgroundColor: "#FDD99F"}}>
                  <h5>Questionários respondidos</h5>
                  <div className="container">
                    <img src={notebook} alt="Representação dos questionários totais respondidos" />
                    <h1>5</h1>
                  </div>
                  <p>Último: 3</p>
                </div>

                <div className="card" style={{backgroundColor: "#C0D1B8"}}>
                  <h5>Questionários disponíveis</h5>
                  <div className="container">
                    <img src={checklist} alt="Representação dos surveys disponíveis"/>
                    <h1>{count}/1</h1>
                  </div>
                  <p>Último: Last week</p>
                </div>

              </div>

              <div className="content-two">
                <div className="card" style={{backgroundColor: "#A9DED4"}}>
                    <h5>Seu humor essa semana</h5>
                    <div className="container">
                      <img src={emotions} alt="Representação do humor semanal" />
                      <img src={fine} alt="Representação do humor semanal" />                  
                    </div>
                    <p>Último: <img src={fine} alt="Representação do humor semanal" /> </p>
                </div>
              </div>

            </div>
          </main></>
       ) : (
        <Link to="/">Faça seu login</Link>
       )}    
      </div>
    )
}