import {Home} from "./pages/Home";
import { UserPage } from "./pages/UserPage";
import { SignUp } from "./pages/SignUp";

import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
import {AuthContextProvider} from './contexts/AuthContext';
import { Dashboard } from "./pages/Dashboard";
import {UserSurvey} from "./pages/UserSurvey";
import WithoutNav from "./WithoutNav";
import WithNav from "./WithNav";


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route element={<WithoutNav/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
          </Route>
        <Route element={<WithNav/>}>
          <Route path="/userPage" element={<UserPage/>}/>
          <Route path="/userDashboard" element={<Dashboard/>}/>
          <Route path="/userSurvey" element={<UserSurvey/>}/>
        </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
