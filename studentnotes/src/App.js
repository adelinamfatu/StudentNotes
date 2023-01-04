import Profile from './components/Profile';
import Groups from './components/Groups';
import Subject from './components/Subject';
import Login from './components/Login';
import Register from './components/Register';
import Notes from './components/Notes';
import AddNote from './components/AddNote';

import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
 } from "react-router-dom";

function App() {

  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="login" />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/subjects" element={<Subject/>} />
            <Route path="/notes" element={<Notes/>} />
            <Route path="/addnote" element={<AddNote/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/groups" element={<Groups/>} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;