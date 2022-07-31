import { Link} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import login from '../assets/images/login.png';
import notebook from '../assets/images/notebook.png';
import checklist from '../assets/images/checklist.png';
import '../styles/userpage.scss';
import { useCount } from '../hooks/useCount';

export function AdminPage(){
    const {user} = useAuth();
    const admin = "duda.r.mach@gmail.com";
    const count = useCount();
    return(
      <div id="user-page">
       { user? (
         <><aside>
            {user.avatar && <img src={user.avatar} alt={user.name} />}
            <strong>{user.name}</strong>
            <div className="separator">Admin</div>
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
            </div>
          </main></>
       ) : (
        <Link to="/">Faça seu login</Link>
       )}    
      </div>
    )
}