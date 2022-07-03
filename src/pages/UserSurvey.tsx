//https://developers.google.com/forms/api/guides
//https://surveyjs.io/Documentation/Library?id=handle-results-survey-states#storeresults-owndatabase

//import StudentSurvey from "../components/StudentSurvey";

import 'survey-core/defaultV2.min.css';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import '../styles/usersurvey.scss';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

StylesManager.applyTheme("defaultV2");

const surveyJson = {
  surveyId: 'ca18da9a-3ba6-4b81-baf4-6173bd60fb86',
  surveyPostId: '0c5f2889-5f18-4bd5-8523-9dea607a4020'
 };

//https://firebase.google.com/docs/database/rest/save-data

export function UserSurvey(){
  const {user} = useAuth();
  const survey = new Model(surveyJson);

  //Optionally, show saving progress and show an error and "Save Again" button if the results can't be stored.
  survey.surveyShowDataSaving = true;

survey.onComplete.add(function (sender) {
  const currentDate = new Date().toLocaleString();
  const results = JSON.stringify(sender.data, null,3);
  const surveyRef = database.ref('surveys');
  const firebaseSurvey = surveyRef.push({
    data: currentDate,
    authorId:user?.id,
    result: results
  })
});

return (
  <div>
    <Survey model={survey} />
  </div>
)
}

//https://www.javatpoint.com/react-lists#:~:text=Now%2C%20let%20us%20see%20how,render%20it%20to%20the%20DOM. ler sobre listas