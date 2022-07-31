//https://www.youtube.com/watch?v=RF57yDglDfE
//https://www.chartjs.org/docs/latest/
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import notebook from '../assets/images/notebook.png';
import checklist from '../assets/images/checklist.png';
import { useState } from "react";
import '../styles/userpage.scss';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export function UserDashboard(){
  const {user} = useAuth();

  return(
    <div id="user-page">
     { user ? (
       <><aside>
          <img src={user.avatar} alt={user.name} />
          <strong>{user.name}</strong>
          <div className="separator">Estudante 8° período</div>
          <p>Id:{user.id}</p>
          <p>Última visita: 3 minutos atrás</p>
        </aside>
        <main>
          <h2>{user.name}, seu DASHBOARD da semana:</h2>
          <div className="main-content">
            <div className="content-one">

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
                  <h1>0/1</h1>
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