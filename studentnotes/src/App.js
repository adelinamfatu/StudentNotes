import React, { useState} from 'react';

import './App.css';
import './style/Login-Register.css';
import Login from './components/Login';
import Register from './components/Register';

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
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>       
    }

  </div>
  );
}

export default App;