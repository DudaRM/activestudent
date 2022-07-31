import { useEffect, useState } from "react";
import 'survey-analytics/survey.analytics.min.css';
import '../styles/admindashboard.scss';
import { Model } from 'survey-core';
import { VisualizationPanel } from 'survey-analytics';
import { database } from "../services/firebase";

const vizPanelOptions = {
    allowHideQuestions: false,
    showPercentages: true
}

export function AdminDashboard(){
    const [survey, setSurvey] = useState(null);
    const [vizPanel, setVizPanel] = useState(null);
    const surveyId = localStorage.getItem('surveyId');
    const ref = database.ref(`results/${surveyId}`);
    const surveyJson = JSON.parse(localStorage.getItem('surveyJson') as string);
    const [result, setResult] = useState([null]);

    useEffect(() => {
      const listener = ref.on('value', function(snapshot){
        const results = [] as any;
        snapshot.forEach(function(child){
          const data = child.val().answers;
          results.push(data)
        })
        setResult(results);
        localStorage.setItem('results', JSON.stringify(results)); 
        console.log(results)
        console.log(localStorage.getItem('results'));
      });
  }, [database.ref]);

      //recuperando dados do BD

    if (!survey) {
        const survey = new Model(surveyJson);
        console.log(survey);
        setSurvey(survey as any);
    }

    if (!vizPanel && !!survey) {
        const surveyResults = JSON.parse(localStorage?.getItem('results') as string);
        const vizPanel = new VisualizationPanel(
        (survey as any).getAllQuestions(),
        surveyResults as any,
        vizPanelOptions
        );
        vizPanel.showHeader = false;
        setVizPanel(vizPanel as any);
  }

    useEffect(() => {
        const aux = document.getElementById("surveyVizPanel");
        (vizPanel as any).render("surveyVizPanel");
        return () => {
        if(aux?.innerHTML )
          aux.innerHTML = "";
        }
      }, [vizPanel]);


    return(
        <div id="surveyVizPanel">
            <h1>Seus resultados</h1>
        </div>
        

    )
}

