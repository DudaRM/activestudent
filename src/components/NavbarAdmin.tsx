import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarDataAdmin } from './SidebarData';
import '../styles/navbar.scss';
import { IconContext } from 'react-icons';
import { Button } from './Button';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';



export function NavbarAdmin(){
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const navigate = useNavigate();

    function logOut(){
        return(
            signOut(auth).then(()=>{
                navigate('/');
            }) 
      )}      
    
    return(
        <>
        <IconContext.Provider value={{color:'#fff'}}>
            <div className="navbar">
                <div className="bars">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                </div>
                <div className="logout-container">
                    <Button  onClick={logOut} type="submit">
                        Sair
                    </Button>
                </div>
                
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>
                    {SidebarDataAdmin.map((item,index) => {  
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}