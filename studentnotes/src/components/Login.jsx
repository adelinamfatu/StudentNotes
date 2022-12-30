import { React, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/Login-Register.css'

const Login = () => {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    const navigate = useNavigate();

    const navigateToCourses = () => {
        navigate('/cursuri');
      };

    const verifyLoginInformation = () => {
        var email = emailRef.current.value;
        if(email.includes("@stud.ase.ro")) {
            var password = passRef.current.value;
            if(password.length >= 8 
                || specialChars.test(password)
                || /[A-Z]/.test(password)
                || /[a-z]/.test(password)
                || /[0-9]/.test(password)) 
            {
                var response = makeRequest(email);
                var json = JSON.parse(response);
                if(password === json["hashPassword"]) 
                {
                    navigateToCourses();
                    //toast de succes
                }
                else
                {
                    //toast de eroare - a gresit parola
                    //golire input de parola, nu si de email
                }
            }
            else
            {
                //toast de eroare - nu a introdus datele corect
            }
        }
    }

    function makeRequest(email) {
        var url = "http://localhost:8000/users/" + email;
        var request = new XMLHttpRequest();
        request.open("GET", url, false); 
        request.send(null);
        return request.responseText;
    }

    const submit = (event) => {
        event.preventDefault();
    }

    return (
            <div className="Login">
                <div className="LoginContent">
                <h1>StudyTime</h1> 
                <label className="autentificare">AUTENTIFICARE</label>
                <form className="login" onSubmit={submit}>
                    <label>Email:</label>
                    <input type="email" placeholder="email@stud.ase.ro" id="email" name="email"
                    ref={emailRef}
                    />
                    
                    <label>Parolă:</label>
                    <input type="password" id="password" name="password" 
                    ref={passRef}
                    />   
                    
                    <button onClick={verifyLoginInformation} className="btn">Conectează-te</button>
                </form>
                <a href='/register' className="btn_link">Nu ai un cont? Înregistrează-te aici!</a>
        
            </div>
            </div>
        )}

export default Login;