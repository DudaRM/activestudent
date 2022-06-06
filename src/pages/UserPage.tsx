import Card from 'react-bootstrap/Card'
import { Link} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import '../styles/userpage.scss';

export function UserPage(){
   const {user} = useAuth();
    return(
      <div id="user-page">
       { user ? (
         <><aside>
            <img src={user.avatar} alt={user.name} />
            <strong>{user.name}</strong>
            <div className="separator">Estudante -período-</div>
            <p>Id:{user.id}</p>
            <p>Última visita: 3 minutos atrás</p>
          </aside><main>
              <div className="main-content">
                <Card border="light" style={{ width: '800px', height: '500px' }}>
                  <Card.Body>
                    <h1>Conteúdo</h1>
                  </Card.Body>
                </Card>
              </div>
            </main></>
       ) : (
        <Link to="/">Faça seu login</Link>
       )}    
      </div>
    )
}