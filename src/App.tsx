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


function App() {
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
