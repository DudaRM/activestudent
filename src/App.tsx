import {Home} from "./pages/Home";
import { UserPage } from "./pages/UserPage";
import { SignUp } from "./pages/SignUp";
import { Verify } from "./pages/Verify";

//</PrivateRoute><Route path="/userPage" element=}/>

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthContextProvider} from './contexts/AuthContext';
import { AuthProvider } from "./contexts/FirebaseContext";
import { Dashboard } from "./pages/Dashboard";
import {UserSurvey} from "./pages/UserSurvey";
import WithoutNav from "./WithoutNav";
import WithNav from "./WithNav";
import { useState } from "react";
import PrivateRoute from "./pages/PrivateRoute";


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
              <Route path="/verify-email" element={<Verify/>}/>
              <Route path="/signUp" element={<SignUp/>}/>
              <Route path="/" element={<Home/>}/>
            </Route>
          <Route element={<WithNav/>}>
            <Route path="/userPage" element={<PrivateRoute><UserPage/></PrivateRoute>}/>
            <Route path="/userDashboard" element={<Dashboard/>}/>
            <Route path="/userSurvey" element={<UserSurvey/>}/>
          </Route>
          </Routes>
      </AuthContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

//This way, the currentUser value supplied to AuthProvider will be available for use by all the components in our app except the App component.