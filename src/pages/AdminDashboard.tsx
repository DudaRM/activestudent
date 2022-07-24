//https://www.youtube.com/watch?v=RF57yDglDfE
//https://www.chartjs.org/docs/latest/
import { useEffect, useState } from "react";
import 'survey-analytics/survey.analytics.min.css';
import '../styles/admindashboard.scss';
import { Model } from 'survey-core';
import { VisualizationPanel } from 'survey-analytics';
import { database } from "../services/firebase";
//https://softauthor.com/firebase-querying-sorting-filtering-database-with-nodejs-client/

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
        width: "750px",
        minWidth: "500px",
        maxWidth: "750px",
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
        width: "750px",
        minWidth: "750px",
        maxWidth: "750px",
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
        minWidth: "300",
        maxWidth: "initial",
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
    mode: "display",
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
};
  
const surveyResults = [{
    "question1":5,
    "question1-Comment":"Não me sinto bem essa semana.",
    "question2":3,
    "question2-Comment":"Não consigo me concentrar.",
    "question3":5,
    "question4":2,
    "question5":1,
    "question6":3,
  }, {
    "question1":1,
    "question2":2,
    "question3":5,
    "question4":2,
    "question5":1,
    "question6":3,
  }, {
    "question1":2,
    "question2":5,
    "question3":5,
    "question4":2,
    "question5":1,
    "question6":3,
  }, {
    "question1":3,
    "question2":3,
    "question3":1,
    "question4":2,
    "question5":1,
    "question6":3,
  }, {
    "question1":5,
    "question2":4,
    "question3":5,
    "question4":4,
    "question5":1,
    "question6":3,
}];
  
const vizPanelOptions = {
    allowHideQuestions: false,
    showPercentages: true
}

export function AdminDashboard(){
    const [survey, setSurvey] = useState(null);
    const [vizPanel, setVizPanel] = useState(null);
    const dbRef = database.ref(`surveys`);

    dbRef.on("value",snap => {
      console.log(snap);
    })

    if (!survey) {
        const survey = new Model(surveyJson);
        console.log(survey);
        setSurvey(survey as any);
    }

    if (!vizPanel && !!survey) {
        const vizPanel = new VisualizationPanel(
        (survey as any).getAllQuestions(),
        surveyResults,
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

