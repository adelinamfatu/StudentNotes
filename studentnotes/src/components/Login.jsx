import React from 'react';
import { useNavigate } from "react-router-dom";
import '../style/Login-Register.css'
const Login = () => {
    const navigate = useNavigate();
    const navigateToCourses = () => {
        navigate('/cursuri');
      };
    return (
            <div className="Login">
                <div className="LoginContent">
                <h1>StudyTime</h1> 
                <label className="autentificare">AUTENTIFICARE</label>
                <form className="login">
                    <label>Email:</label>
                    <input type="email" placeholder="email@stud.ase.ro" id="email" name="email"
                    pattern="([A-Z][a-z]*).{2,}"
                    title="Trebuie să conțină minim 2 litere și să înceapă cu literă mare." required/>
                    
                    <label>Parolă:</label>
                    <input type="password" id="password" name="password" 
                    pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*]).{8,}" 
                    title="Trebuie să conțină cel puțin o cifră, o literă mare, o literă mică, un caracter special și minim 8 caractere." required/>   
                    <button onClick={navigateToCourses} className="btn">Conectează-te</button>
                </form>
                <a href='/register' className="btn_link">Nu ai un cont? Înregistrează-te aici!</a>
        
            </div>
            </div>
        )}


export default Login;