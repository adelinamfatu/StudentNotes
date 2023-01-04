import { React, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/Login-Register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState()
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    const navigate = useNavigate();

    const navigateToSubject = () => {
        setTimeout(() => {
            navigate('/subjects');
        }, 2000);
    };

    const persistToken = async (email, password) => {
        const user = { email : email, hashPassword : password };
        await axios.post(
          "http://localhost:8000/users/login",
          user
        )
        .then(function(response) {
            if(response.data) {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigateToSubject();
                toast.success('Logarea s-a realizat cu succes!',
                    {position:toast.POSITION.TOP_RIGHT});
            }
        })
        .catch(function(error) {
            var message = error.response.data;
            if(message === "Invalid Credentials") {
                toast.error('Datele introduse nu sunt corecte!',
                    {position:toast.POSITION.TOP_RIGHT});
            }
        });
      };

    const verifyLoginInformation = () => {
        var email = emailRef.current.value;
        if(email.includes("@stud.ase.ro")) 
        {
            var password = passRef.current.value;
            if(password.length >= 8 
                && specialChars.test(password)
                && /[A-Z]/.test(password)
                && /[a-z]/.test(password)
                && /[0-9]/.test(password))  
                {
                    persistToken(email, password);
                }
                else
                {   
                    toast.error('Datele introduse nu sunt corecte!',
                        {position:toast.POSITION.TOP_RIGHT})
                }
        }
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