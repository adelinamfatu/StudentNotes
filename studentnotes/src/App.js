import Profile from './components/Profile';
import Groups from './components/Groups';
import Notes from './components/Notes';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
 } from "react-router-dom";

import { createContext, useState } from 'react';

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/notes" element={<Notes/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/groups" element={<Groups />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;