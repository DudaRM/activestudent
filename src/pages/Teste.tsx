import { useState } from "react";
import { SurveyData} from './Data'
import { BarChart } from "../components/BarChart";
import '../styles/userpage.scss';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export function Teste(){

    const [chartData, setChartData] = useState({
        //columns
        labels: ['Bem estar', 'Satisfação ambiente','Satisfação Universidade'],
        //QuestionData.map((data) => data.questions.sat_uni.q5),
        datasets: [
          {
          //label: "Satisfação com o ambiente de estudo",
          //data: UserData.map((data) => ((data.q4 + data.q5)/2)),
          //label:"Resposta média",
          data: SurveyData.map((data) => data.q1 + data.q2 + data.q3),
          label: "Bem-estar",
          backgroundColor: ["#A9DED4","#E6866E","#38d39f"],
        }]
      });

    return(
        <div className="content-two" style={{ width: 700 }}>
            <h1>Seus resultados</h1>
            <BarChart chartData={SurveyData}/>
        </div>
        

    )
}