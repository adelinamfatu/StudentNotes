import { React, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/Login-Register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    const navigate = useNavigate();

    const navigateToCourses = () => {
        setTimeout(() => {
            navigate('/notes')
          }, 2000);
      };

    const verifyLoginInformation = () => {
        var email = emailRef.current.value;
        if(email.includes("@stud.ase.ro")) {
            var password = passRef.current.value;
            if(password.length >= 8 
                && specialChars.test(password)
                && /[A-Z]/.test(password)
                && /[a-z]/.test(password)
                && /[0-9]/.test(password))  {
                var response = makeRequest(email);
                var json = JSON.parse(response);
                if(json.hasOwnProperty("error"))
                {
                    toast.error('Nu există niciun utilizator cu adresa de email introdusă',
                    {position:toast.POSITION.TOP_RIGHT})
                }
                else
                {
                    if(password === json["hashPassword"]) 
                    {
                        navigateToCourses();
                        toast.success('Logarea s-a realizat cu succes!',
                        {position:toast.POSITION.TOP_RIGHT})
                    }
                    else
                    {
                        toast.error('Parola introdusă este greșită!',
                        {position:toast.POSITION.TOP_RIGHT})
                        //golire input de parola, nu si de email
                    }
                }
                
            }
            else
            {
                toast.error('Datele introduse nu sunt corecte!',
                    {position:toast.POSITION.TOP_RIGHT})
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
                    pattern="(?=.*[0-9]+@stud.ase.ro).{18,}"
                    title="Trebuie introdus mail-ul instituțional (cu terminația '@stud.ase.ro')." required
                    ref={emailRef}
                    />
                    
                    <label>Parolă:</label>
                    <input type="password" id="password" name="password" 
                    pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*]).{8,}"
                    title="Parolă incorectă" required
                    ref={passRef}
                    />   
                    
                    <button onClick={verifyLoginInformation} className="btn">Conectează-te</button>
                     <ToastContainer />
                </form>
                <a href='/register' className="btn_link">Nu ai un cont? Înregistrează-te aici!</a>
        
            </div>
            </div>
        )}

export default Login;