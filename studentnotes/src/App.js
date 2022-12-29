import React, { useState} from 'react';

import './App.css';
import './style/Login-Register.css';
import Login from './components/Login';
import Register from './components/Register';

import image from "./images/login-img.png"; 

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
  <div className="App">
    <img src={image}></img>
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
      
    }
  </div>

  );
}

export default App;