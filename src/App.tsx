import {Home} from "./pages/Home";
import { SignUp } from "./pages/SignUp";

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthContextProvider} from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/users/new" element={<SignUp/>}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
