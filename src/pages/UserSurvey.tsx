import 'survey-core/defaultV2.min.css';
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
  const survey = new Model(surveyJson);

survey.surveyShowDataSaving = true;

survey.onComplete.add(async function (sender) {
  const currentDate = new Date()+"";
  const answers = sender.data;
  const ref = await database.ref(`surveys/${surveyId}`).get();
    if(ref.val().endedAt){
      alert('Survey already closed.');
      return;
    }
    else{
      const surveyRef = database.ref(`results/${surveyId}`);
      const firebaseSurvey = surveyRef.push({
        answeredAt: currentDate,
        authorId:user?.id,
        answers
      })
    }
})


return (
  <div>
    <Survey model={survey} />
  </div>
)
}
