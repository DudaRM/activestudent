import 'survey-core/defaultV2.min.css';
import '../styles/usersurvey.scss';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

StylesManager.applyTheme("defaultV2");

export function UserSurvey(){
  const {user} = useAuth();
  const surveyId = localStorage.getItem('surveyId');
  console.log(surveyId);
  const surveyJson = JSON.parse(localStorage.getItem('surveyJson') as string);
  const survey = new Model(surveyJson)


survey.surveyShowDataSaving = true;
survey.surveyPostId = "0c5f2889-5f18-4bd5-8523-9dea607a4020";

survey.onComplete.add(function (sender) {
  const currentDate = new Date()+"";
  const answers = sender.data;
  const surveyRef = database.ref(`results/${surveyId}`);
  const firebaseSurvey = surveyRef.push({
    answeredAt: currentDate,
    authorId:user?.id,
    answers
  })
})


return (
  <div>
    <Survey model={survey} />
  </div>
)
}
