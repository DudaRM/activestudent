import {Home} from "./pages/Home";
import { UserPage } from "./pages/UserPage";
import { SignUp } from "./pages/SignUp";
import { Verify } from "./pages/Verify";

//</PrivateRoute><Route path="/userPage" element=}/>

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthContextProvider} from './contexts/AuthContext';
import { AuthProvider } from "./contexts/FirebaseContext";
import { UserDashboard } from "./pages/UserDashboard";
import WithoutNav from "./pages/Nav/WithoutNav";
import WithNav from "./pages/Nav/WithNav";
import { useState } from "react";
import PrivateRoute from "./pages/PrivateRoute";
import { ResetPassword } from "./pages/ResetPassword";
import { AdminPage } from "./pages/AdminPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { UserSurvey } from "./pages/UserSurvey";
import WithNavAdmin from "./pages/Nav/WithNavAdmin";
import { AdminSurvey } from "./pages/AdminSurvey";
//import { Teste } from "./pages/Teste";


//alterar Home

function App() {
  //Now when we register a user the currentUser state will be set with an object containing the user’s info.
  const [ currentUser,setCurrentUser ] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
      <AuthContextProvider>
          <Routes>
            <Route element={<WithoutNav/>}>
              <Route path="/resetPassword" element={<ResetPassword/>}/>
              <Route path="/verify-email" element={<Verify/>}/>
              <Route path="/signUp" element={<SignUp/>}/>
              <Route path="/" element={<Home/>}/>
            </Route>
            <Route element={<WithNav/>}>
              <Route path="/userPage" element={<PrivateRoute><UserPage/></PrivateRoute>}/>
              <Route path="/userDashboard" element={<PrivateRoute><UserDashboard/></PrivateRoute>}/>
              <Route path="/userSurvey" element={<PrivateRoute><UserSurvey/></PrivateRoute>}/>
            </Route>
            <Route element={<WithNavAdmin/>}>
              <Route path="/adminDashboard" element={<PrivateRoute><AdminDashboard/></PrivateRoute>}/>
              <Route path="/adminHome" element={<PrivateRoute><AdminPage/></PrivateRoute>}/>
              <Route path="/adminSurvey" element={<PrivateRoute><AdminSurvey/></PrivateRoute>}/>
            </Route>
          </Routes>
      </AuthContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

//This way, the currentUser value supplied to AuthProvider will be available for use by all the components in our app except the App component.