import {Bar} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export function BarChart({chartData}){
    return(
        <Bar data={chartData}/>
    )
}