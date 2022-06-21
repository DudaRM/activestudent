import * as GoIcons from "react-icons/go";
import * as AiIcons from "react-icons/ai";
//import * as IoIcons from "react-icons/io";


//https://www.treinaweb.com.br/blog/tipagem-no-typescript

export const SidebarData = [
    {
        title: 'Home',
        path: '/userPage',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'      
    },
    {
        title: 'Dashboard',
        path: '/userDashboard',
        icon: <AiIcons.AiFillDashboard/>,
        cName: 'nav-text'
    },      
    {
        title: 'Survey',
        path: '/userSurvey',
        icon: <GoIcons.GoRepo/>,
        cName: 'nav-text'
    },            
]