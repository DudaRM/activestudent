// import 'survey-core/defaultV2.min.css';
//https://surveyjs.io/Examples/Library/?id=survey-afterrender&platform=Reactjs#content-js
import ReactDOM from 'react-dom';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import '../styles/usersurvey.scss';


StylesManager.applyTheme("modern");

const surveyJson = {
  "locale": "pt-br",
  "title": "Pesquisa teste",
  "description": "Teste teste teste",
  "logoFit": "fill",
  "logoPosition": "right",
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "rating",
      "name": "question1",
      "minWidth": "400px",
      "title": "Você se sente disposto essa semana?",
      "isRequired": true,
      "hasComment": true,
      "commentText": {
       "pt-br": "Por que se sente dessa forma?"
      },
      "rateMax": 10
     },
     {
      "type": "rating",
      "name": "question21",
      "minWidth": "400px",
      "title": "Você se sente satisfeito com as atividades propostas pelos professores?",
      "isRequired": true,
      "hasComment": true,
      "commentText": {
       "pt-br": "Por que se sente dessa forma?"
      },
      "rateMax": 10
     },
     {
      "type": "rating",
      "name": "question14",
      "title": "Você tem conseguido se concentrar?",
      "isRequired": true,
      "hasComment": true,
      "commentText": {
       "pt-br": "Por que se sente dessa forma?"
      },
      "rateMax": 10
     },
     {
      "type": "rating",
      "name": "question22",
      "title": "Você tem conseguido se comunicar com seus colegas e professores?",
      "isRequired": true,
      "hasComment": true,
      "commentText": {
       "pt-br": "Por que se sente dessa forma?"
      },
      "rateMax": 10
     },
     {
      "type": "rating",
      "name": "question15",
      "title": "Você teve muitas dúvidas essa semana?",
      "isRequired": true,
      "hasComment": true,
      "commentText": {
       "pt-br": "Por que se sente dessa forma?"
      },
      "rateMax": 10,
      "displayRateDescriptionsAsExtremeItems": true
     },
     {
      "type": "rating",
      "name": "question9",
      "title": "Você acha que a quantidade de atividades essa semana foi elevada?",
      "isRequired": true,
      "hasComment": true,
      "rateMax": 10
     },
     {
      "type": "rating",
      "name": "question25",
      "title": "Você sente que consegue dar conta de tudo?",
      "isRequired": true,
      "hasComment": true,
      "rateMax": 10
     },
     {
      "type": "rating",
      "name": "question23",
      "title": "Em uma escala de 1 a 10, como se sente?",
      "isRequired": true,
      "hasComment": true,
      "rateMax": 10
     },
     {
      "type": "rating",
      "name": "question16",
      "title": "Você sente que o ritmo de ensino está sendo o suficiente?",
      "isRequired": true,
      "hasComment": true,
      "rateMax": 10
     },
     {
      "type": "rating",
      "name": "question10",
      "title": "Você sente que está sendo atrapalhado pelo ambiente?",
      "isRequired": true,
      "hasComment": true,
      "rateMax": 10
     }
    ],
    "title": "Pesquisa teste"
   }
  ],
  "showProgressBar": "bottom",
  "autoGrowComment": true,
  "questionsOnPageMode": "questionPerPage",
  "widthMode": "responsive"
 }

export function UserSurvey(){
  const survey = new Model(surveyJson);

  return (<Survey model={survey} />)

}
