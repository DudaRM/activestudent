import 'survey-core/defaultV2.min.css';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import '../styles/adminsurvey.scss';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Button } from '../components/Button';
import actions from '../assets/images/actionsadmin.svg';
import { useState } from 'react';

StylesManager.applyTheme("defaultV2");

type CloseSurvey = {
  authorId: string;
  openedAt: string;
  surveyData: string;
  endedAt?: string;
}


const surveyJson = {
  locale: "pt-br",
  title: {
   default: "Questionário 1",
   "pt-br": "Questionário"
  },
  description: {
   default: "Com a pandemia, professores e alunos tiveram que se adaptar a nova realidade, onde a sala de aula e o modelo presencial foram trocados por salas e reuniões virtuais. As residências de estudantes e professores se tornaram, então, seus ambientes de trabalho e estudo, e o tempo que era dedicado a essas atividades parece ter aumentado, já que a falta de compromisso de precisar se deslocar, nos faz perder um pouco o senso de tempo. Como se não bastasse, há também o serviço doméstico e os familiares na mesma casa, agravando a situação com todo o barulho e distrações que não costumamos ter em uma sala de aula.",
   "pt-br": "Ajude sua universidade a descobrir as dificuldades e planejar melhor a próxima semana. É rapidinho, apenas 5 minutos!"
  },
  logoFit: "none",
  logoPosition: "right",
  completedHtmlOnCondition: [
   {}
  ],
  pages: [
   {
    name: "page 1",
    elements: [
     {
      type: "rating",
      name: "question1",
      useDisplayValuesInTitle: false,
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: "Como você se sente em uma escala de 1 a 5?",
      hideNumber: true,
      isRequired: true,
      validators: [
       {
        type: "expression"
       }
      ],
      hasComment: true,
      commentText: "Por que se sente dessa forma?",
      rateValues: [
       1,
       {
        value: 2,
        text: {
         "pt-br": "2"
        }
       },
       3,
       4,
       5
      ],
      minRateDescription: {
       "pt-br": "Muito mal"
      },
      maxRateDescription: {
       "pt-br": "Muito bem"
      }
     }
    ],
    title: {
     "pt-br": "Bem-estar"
    },
    description: {
     "pt-br": "Aqui estão algumas perguntas relacionadas ao seu bem-estar. Responda em uma escala de 1 a 5."
    }
   },
   {
    name: "page 2",
    elements: [
     {
      type: "rating",
      name: "question2",
      useDisplayValuesInTitle: false,
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: "Você sente que está conseguindo se concentrar?",
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: "Por que se sente dessa forma?",
      minRateDescription: {
       "pt-br": "Muito mal"
      },
      maxRateDescription: {
       "pt-br": "Muito bem"
      },
      useDropdown: "never"
     }
    ],
    title: {
     "pt-br": "Satisfação com o ambiente de estudos."
    },
    description: {
     "pt-br": "Aqui estão algumas perguntas em relação ao seu ambiente de estudos. Responda em uma escala de 1 a 5."
    }
   },
   {
    name: "page 3",
    elements: [
     {
      type: "rating",
      name: "question4",
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: {
       "pt-br": "Sinto que o conteúdo está sendo apresentado de forma clara"
      },
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: {
       "pt-br": "Por que se sente dessa forma?"
      },
      minRateDescription: {
       "pt-br": "De forma alguma"
      },
      maxRateDescription: {
       "pt-br": "Com certeza"
      },
      useDropdown: "never"
     },
     {
      type: "rating",
      name: "question5",
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: {
       "pt-br": "Sinto muitas dúvidas após uma aula online e consigo facilmente saná-las."
      },
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: {
       "pt-br": "Por que se sente dessa forma?"
      },
      minRateDescription: {
       "pt-br": "De forma alguma"
      },
      maxRateDescription: {
       "pt-br": "Com certeza"
      },
      useDropdown: "never"
     },
     {
      type: "rating",
      name: "question6",
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: {
       "pt-br": "Sinto que a quantidade de atividades é adequada"
      },
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: {
       "pt-br": "Por que se sente dessa forma?"
      },
      minRateDescription: {
       "pt-br": "De forma alguma"
      },
      maxRateDescription: {
       "pt-br": "Com certeza"
      },
      useDropdown: "never"
     },
     {
      type: "rating",
      name: "question3",
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: {
       "pt-br": "Me sinto satisfeito com o ambiente de estudos e consigo encontrar tudo que preciso na plataforma."
      },
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: {
       "pt-br": "Por que se sente dessa forma?"
      },
      minRateDescription: {
       "pt-br": "De forma alguma"
      },
      maxRateDescription: {
       "pt-br": "Com certeza"
      },
      useDropdown: "never"
     }
    ],
    title: {
     "pt-br": "Satisfação com a universidade"
    },
    description: {
     "pt-br": "Aqui estão algumas perguntas relacionadas a satisfação com sua universidade e o conteúdo, no geral. Responde em uma escala de 1 a 5."
    }
   }
  ],
  sendResultOnPageNext: true,
  navigateToUrlOnCondition: [
   {}
  ],
  showQuestionNumbers: "onPage",
  showProgressBar: "bottom",
  progressBarType: "questions",
  autoGrowComment: true,
  startSurveyText: {
   "pt-br": "Começar"
  },
  pagePrevText: {
   "pt-br": "Anterior"
  },
  pageNextText: {
   "pt-br": "Próximo"
  },
  completeText: {
   "pt-br": "Enviar questionário"
  },
  previewText: {
   "pt-br": "Prévia"
  },
  editText: {
   "pt-br": "Editar"
  },
  questionsOnPageMode: "questionPerPage",
  showPreviewBeforeComplete: "showAllQuestions",
  widthMode: "responsive"
 }
const surveyJson2 = {
  locale: "pt-br",
  title: {
   default: "Questionário 1",
   "pt-br": "Questionário"
  },
  description: {
   default: "Com a pandemia, professores e alunos tiveram que se adaptar a nova realidade, onde a sala de aula e o modelo presencial foram trocados por salas e reuniões virtuais. As residências de estudantes e professores se tornaram, então, seus ambientes de trabalho e estudo, e o tempo que era dedicado a essas atividades parece ter aumentado, já que a falta de compromisso de precisar se deslocar, nos faz perder um pouco o senso de tempo. Como se não bastasse, há também o serviço doméstico e os familiares na mesma casa, agravando a situação com todo o barulho e distrações que não costumamos ter em uma sala de aula.",
   "pt-br": "Ajude sua universidade a descobrir as dificuldades e planejar melhor a próxima semana. É rapidinho, apenas 5 minutos!"
  },
  logoFit: "none",
  logoPosition: "right",
  completedHtmlOnCondition: [
   {}
  ],
  pages: [
   {
    name: "page 1",
    elements: [
     {
      type: "rating",
      name: "question1",
      useDisplayValuesInTitle: false,
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: "Modelo 2 - Como você se sente em uma escala de 1 a 5?",
      hideNumber: true,
      isRequired: true,
      validators: [
       {
        type: "expression"
       }
      ],
      hasComment: true,
      commentText: "Por que se sente dessa forma?",
      rateValues: [
       1,
       {
        value: 2,
        text: {
         "pt-br": "2"
        }
       },
       3,
       4,
       5
      ],
      minRateDescription: {
       "pt-br": "Muito mal"
      },
      maxRateDescription: {
       "pt-br": "Muito bem"
      }
     }
    ],
    title: {
     "pt-br": "Bem-estar"
    },
    description: {
     "pt-br": "Aqui estão algumas perguntas relacionadas ao seu bem-estar. Responda em uma escala de 1 a 5."
    }
   },
   {
    name: "page 2",
    elements: [
     {
      type: "rating",
      name: "question2",
      useDisplayValuesInTitle: false,
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: "Você sente que está conseguindo se concentrar?",
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: "Por que se sente dessa forma?",
      minRateDescription: {
       "pt-br": "Muito mal"
      },
      maxRateDescription: {
       "pt-br": "Muito bem"
      },
      useDropdown: "never"
     }
    ],
    title: {
     "pt-br": "Satisfação com o ambiente de estudos."
    },
    description: {
     "pt-br": "Aqui estão algumas perguntas em relação ao seu ambiente de estudos. Responda em uma escala de 1 a 5."
    }
   },
   {
    name: "page 3",
    elements: [
     {
      type: "rating",
      name: "question4",
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: {
       "pt-br": "Sinto que o conteúdo está sendo apresentado de forma clara"
      },
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: {
       "pt-br": "Por que se sente dessa forma?"
      },
      minRateDescription: {
       "pt-br": "De forma alguma"
      },
      maxRateDescription: {
       "pt-br": "Com certeza"
      },
      useDropdown: "never"
     },
     {
      type: "rating",
      name: "question5",
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: {
       "pt-br": "Sinto muitas dúvidas após uma aula online e consigo facilmente saná-las."
      },
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: {
       "pt-br": "Por que se sente dessa forma?"
      },
      minRateDescription: {
       "pt-br": "De forma alguma"
      },
      maxRateDescription: {
       "pt-br": "Com certeza"
      },
      useDropdown: "never"
     },
     {
      type: "rating",
      name: "question6",
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: {
       "pt-br": "Sinto que a quantidade de atividades é adequada"
      },
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: {
       "pt-br": "Por que se sente dessa forma?"
      },
      minRateDescription: {
       "pt-br": "De forma alguma"
      },
      maxRateDescription: {
       "pt-br": "Com certeza"
      },
      useDropdown: "never"
     },
     {
      type: "rating",
      name: "question3",
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: {
       "pt-br": "Me sinto satisfeito com o ambiente de estudos e consigo encontrar tudo que preciso na plataforma."
      },
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: {
       "pt-br": "Por que se sente dessa forma?"
      },
      minRateDescription: {
       "pt-br": "De forma alguma"
      },
      maxRateDescription: {
       "pt-br": "Com certeza"
      },
      useDropdown: "never"
     }
    ],
    title: {
     "pt-br": "Satisfação com a universidade"
    },
    description: {
     "pt-br": "Aqui estão algumas perguntas relacionadas a satisfação com sua universidade e o conteúdo, no geral. Responde em uma escala de 1 a 5."
    }
   }
  ],
  sendResultOnPageNext: true,
  navigateToUrlOnCondition: [
   {}
  ],
  showQuestionNumbers: "onPage",
  showProgressBar: "bottom",
  progressBarType: "questions",
  autoGrowComment: true,
  startSurveyText: {
   "pt-br": "Começar"
  },
  pagePrevText: {
   "pt-br": "Anterior"
  },
  pageNextText: {
   "pt-br": "Próximo"
  },
  completeText: {
   "pt-br": "Enviar questionário"
  },
  previewText: {
   "pt-br": "Prévia"
  },
  editText: {
   "pt-br": "Editar"
  },
  questionsOnPageMode: "questionPerPage",
  showPreviewBeforeComplete: "showAllQuestions",
  widthMode: "responsive"
 }
const surveyJson3 = {
  locale: "pt-br",
  title: {
   default: "Questionário 1",
   "pt-br": "Questionário"
  },
  description: {
   default: "Com a pandemia, professores e alunos tiveram que se adaptar a nova realidade, onde a sala de aula e o modelo presencial foram trocados por salas e reuniões virtuais. As residências de estudantes e professores se tornaram, então, seus ambientes de trabalho e estudo, e o tempo que era dedicado a essas atividades parece ter aumentado, já que a falta de compromisso de precisar se deslocar, nos faz perder um pouco o senso de tempo. Como se não bastasse, há também o serviço doméstico e os familiares na mesma casa, agravando a situação com todo o barulho e distrações que não costumamos ter em uma sala de aula.",
   "pt-br": "Ajude sua universidade a descobrir as dificuldades e planejar melhor a próxima semana. É rapidinho, apenas 5 minutos!"
  },
  logoFit: "none",
  logoPosition: "right",
  completedHtmlOnCondition: [
   {}
  ],
  pages: [
   {
    name: "page 1",
    elements: [
     {
      type: "rating",
      name: "question1",
      useDisplayValuesInTitle: false,
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: "Modelo 3 - Como você se sente em uma escala de 1 a 5?",
      hideNumber: true,
      isRequired: true,
      validators: [
       {
        type: "expression"
       }
      ],
      hasComment: true,
      commentText: "Por que se sente dessa forma?",
      rateValues: [
       1,
       {
        value: 2,
        text: {
         "pt-br": "2"
        }
       },
       3,
       4,
       5
      ],
      minRateDescription: {
       "pt-br": "Muito mal"
      },
      maxRateDescription: {
       "pt-br": "Muito bem"
      }
     }
    ],
    title: {
     "pt-br": "Bem-estar"
    },
    description: {
     "pt-br": "Aqui estão algumas perguntas relacionadas ao seu bem-estar. Responda em uma escala de 1 a 5."
    }
   },
   {
    name: "page 2",
    elements: [
     {
      type: "rating",
      name: "question2",
      useDisplayValuesInTitle: false,
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: "Você sente que está conseguindo se concentrar?",
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: "Por que se sente dessa forma?",
      minRateDescription: {
       "pt-br": "Muito mal"
      },
      maxRateDescription: {
       "pt-br": "Muito bem"
      },
      useDropdown: "never"
     }
    ],
    title: {
     "pt-br": "Satisfação com o ambiente de estudos."
    },
    description: {
     "pt-br": "Aqui estão algumas perguntas em relação ao seu ambiente de estudos. Responda em uma escala de 1 a 5."
    }
   },
   {
    name: "page 3",
    elements: [
     {
      type: "rating",
      name: "question4",
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: {
       "pt-br": "Sinto que o conteúdo está sendo apresentado de forma clara"
      },
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: {
       "pt-br": "Por que se sente dessa forma?"
      },
      minRateDescription: {
       "pt-br": "De forma alguma"
      },
      maxRateDescription: {
       "pt-br": "Com certeza"
      },
      useDropdown: "never"
     },
     {
      type: "rating",
      name: "question5",
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: {
       "pt-br": "Sinto muitas dúvidas após uma aula online e consigo facilmente saná-las."
      },
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: {
       "pt-br": "Por que se sente dessa forma?"
      },
      minRateDescription: {
       "pt-br": "De forma alguma"
      },
      maxRateDescription: {
       "pt-br": "Com certeza"
      },
      useDropdown: "never"
     },
     {
      type: "rating",
      name: "question6",
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: {
       "pt-br": "Sinto que a quantidade de atividades é adequada"
      },
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: {
       "pt-br": "Por que se sente dessa forma?"
      },
      minRateDescription: {
       "pt-br": "De forma alguma"
      },
      maxRateDescription: {
       "pt-br": "Com certeza"
      },
      useDropdown: "never"
     },
     {
      type: "rating",
      name: "question3",
      width: "750",
      minWidth: "750",
      maxWidth: "750",
      indent: 2,
      title: {
       "pt-br": "Me sinto satisfeito com o ambiente de estudos e consigo encontrar tudo que preciso na plataforma."
      },
      hideNumber: true,
      isRequired: true,
      hasComment: true,
      commentText: {
       "pt-br": "Por que se sente dessa forma?"
      },
      minRateDescription: {
       "pt-br": "De forma alguma"
      },
      maxRateDescription: {
       "pt-br": "Com certeza"
      },
      useDropdown: "never"
     }
    ],
    title: {
     "pt-br": "Satisfação com a universidade"
    },
    description: {
     "pt-br": "Aqui estão algumas perguntas relacionadas a satisfação com sua universidade e o conteúdo, no geral. Responde em uma escala de 1 a 5."
    }
   }
  ],
  sendResultOnPageNext: true,
  navigateToUrlOnCondition: [
   {}
  ],
  showQuestionNumbers: "onPage",
  showProgressBar: "bottom",
  progressBarType: "questions",
  autoGrowComment: true,
  startSurveyText: {
   "pt-br": "Começar"
  },
  pagePrevText: {
   "pt-br": "Anterior"
  },
  pageNextText: {
   "pt-br": "Próximo"
  },
  completeText: {
   "pt-br": "Enviar questionário"
  },
  previewText: {
   "pt-br": "Prévia"
  },
  editText: {
   "pt-br": "Editar"
  },
  questionsOnPageMode: "questionPerPage",
  showPreviewBeforeComplete: "showAllQuestions",
  widthMode: "responsive"
 }


export function AdminSurvey(){
  const {user} = useAuth();
  const [survey, setSurvey] = useState('');
  const [model, setModel] = useState('');
  const [closeSurvey, setcloseSurvey] = useState<CloseSurvey>();
  const choosenSurvey = new Model(survey);

  const handleChooseJson = e => {
    e.preventDefault();
    const choosenModel = e.target.value;
    if(choosenModel === 'Modelo 2'){
      setSurvey(JSON.stringify(surveyJson2));
    }
    else if(choosenModel === 'Modelo 3'){
      setSurvey(JSON.stringify(surveyJson3));
    }
    else{
      setSurvey(JSON.stringify(surveyJson));
    }
  }

  const handleModel = e => {
    e.preventDefault();
    setModel(e.target.value) 
  }

 async function handleChooseSurvey(e){
    await handleChooseJson(e);
    await handleModel(e);
  }

  async function handleSubmitSurvey(){
    let surveyData;
    const currentDate = new Date()+"";
    if(model === 'Modelo 2'){
      surveyData = surveyJson2;
    }
    if(model === 'Modelo 3'){
      surveyData = surveyJson3;
    }
    else{
      surveyData = surveyJson;
    }
    const surveyRef = database.ref('surveys');
    const firebaseSurvey = await surveyRef.push({
      openedAt: currentDate,
      authorId:user?.id,
      surveyData
    }).key; 
    localStorage.setItem('surveyId', firebaseSurvey!); 
    localStorage.setItem('surveyJson', survey); 
    window.location.reload();       
}

  async function handleEndSurvey(){
    const currentDate = new Date()+"";
    const surveyId = localStorage.getItem('surveyId');
    const surveyRef = await database.ref(`surveys/${surveyId}`).get();
    setcloseSurvey(surveyRef.val())
    if(surveyRef.val().endedAt){
      alert('Survey already closed.');
      return;
    }
    await database.ref(`surveys/${surveyId}`).update({
        endedAt: currentDate,
    });
}

choosenSurvey.surveyShowDataSaving = true;

return (
  <div  id="admin-survey">
    <aside>
      <h1>Ações</h1>
      <div id="div-select">
        <select defaultValue="Select model" onChange={(e) => handleChooseSurvey(e)}>
          <option value="Modelo 1">Modelo 1</option>
          <option value="Modelo 2">Modelo 2</option>
          <option value="Modelo 3">Modelo 3</option>
        </select>
      </div>
      {closeSurvey?.endedAt &&<Button style={{marginTop: 10,marginBottom: 20}} onClick={()=>handleSubmitSurvey()}>Enviar questionário</Button>}
      <Button style={{marginTop: 10,marginBottom: 20}} onClick={handleEndSurvey}>Encerrar questionário</Button>
      <img src={actions} alt="Representação das ações que o Admin pode realizar" />
    </aside>
    <main>
    <h2>Questionário disponível dessa semana {localStorage.getItem('surveyId')} {model} </h2>
      <div className="main-content">
        <Survey model={choosenSurvey} />
      </div>
    </main> 
  </div>
)
}

