import React from 'react';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/Login-Register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const faculties = [
        {
            faculty: "Facultatea de Cibernetică, Statistică și Informatică Economică",
            field: "Cibernetică Economică"
        },
        {
            faculty: "Facultatea de Cibernetică, Statistică și Informatică Economică",
            field: "Statistică și Previziune Economică"
        },
        {
            faculty: "Facultatea de Cibernetică, Statistică și Informatică Economică",
            field: "Informatică Economică - lb. engleză"
        },
        {
            faculty: "Facultatea de Cibernetică, Statistică și Informatică Economică",
            field: "Informatică Economică"
        },
        {
            faculty: "Facultatea de Finanțe, Asigurări, Bănci și Burse de Valori",
            field: "Finanţe şi bănci"
        },
        {
            faculty: "Facultatea de Finanțe, Asigurări, Bănci și Burse de Valori",
            field: "Finanţe şi bănci - lb. engleză"
        },
        {
            faculty: "Facultatea de Contabilitate și Informatică de Gestiune",
            field: "Contabilitate şi informatică de gestiune - lb. engleză"
        },
        {
            faculty: "Facultatea de Contabilitate și Informatică de Gestiune",
            field: "Contabilitate şi informatică de gestiune"
        },
    ]

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
      };

    const emailRef = useRef(null);
    const passRef = useRef(null);
    const confPassRef = useRef(null);
    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const fieldRef = useRef(null);
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    const verifyRegisterInformation = () => {
        var email = emailRef.current.value;
        var name = nameRef.current.value;
        var surname = surnameRef.current.value;
        var password = passRef.current.value;
        var confPass = confPassRef.current.value;
        var field = fieldRef.current.value;
        var faculty = faculties.filter(fac => fac["field"] === field)[0].faculty;
        
        if(password === confPass) 
        {
            if(verifyNames(name, surname)) 
            {
                if(verifyPassword(password)) 
                {
                    var json = '{' +
                        '"email":' + '"' + email + '",' +
                        '"hashPassword":' + '"' + password + '",' +
                        '"name":' + '"' + name + '",' +
                        '"surname":' + '"' + surname + '",' + 
                        '"field":' + '"' + field + '",' +
                        '"faculty":' + '"' + faculty + 
                        '"}'; 
                    sendRequest(json);
                    navigateToLogin();
                }
            }
        }
        else
        {
            toast.error('Parolele nu corespund!',
                {position:toast.POSITION.TOP_RIGHT})
        }
    }

    function verifyNames(name, surname) 
    {
        if(/[0-9]/.test(name) || /[0-9]/.test(surname))
        {
            toast.error('Numele și prenumele nu pot conține cifre!',
                {position:toast.POSITION.TOP_RIGHT})
            return false;
        }
        else
        {
            if(/[a-z]/.test(name[0]) || /[a-z]/.test(surname[0]))
            {
                toast.error('Numele și prenumele nu pot începe cu literă mică!',
                    {position:toast.POSITION.TOP_RIGHT})
                return false;
            }
        }
        
        return true;
    }

    function verifyPassword(password)
    {
        if(password.length >= 8 
            && specialChars.test(password)
            && /[A-Z]/.test(password)
            && /[a-z]/.test(password)
            && /[0-9]/.test(password)) 
        { 
            return true;
        }
        return false;
    }

    function makeRequest(email) {
        var url = "http://localhost:8000/users/" + email;
        var request = new XMLHttpRequest();
        request.open("GET", url, false); 
        request.send(null);
        return request.responseText;
    }
    
    function sendRequest(json) {
        var url = "http://localhost:8000/users/add";
        var request = new XMLHttpRequest();
        request.open("POST", url, true); 
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(json);
    }

    const preventDefault = (event) => {
        event.preventDefault();
    }

        return (
            <div className="Register">
                <div className='RegisterContent'>
                <h1>StudyTime</h1> 
                <label className="inregistrare">ÎNREGISTRARE</label>
                <form className="register" onSubmit={preventDefault}>
                    <label htmlFor="nume">Nume:</label>
                    <input type="text" id="nume" name="nume" 
                    pattern="([A-Z][a-z]).{0,}"
                    title="Trebuie să conțină minim 2 litere și să înceapă cu literă mare." required
                    ref={surnameRef}
                    />

                    <label>Prenume:</label>
                    <input type="text" id="prenume" name="prenume" 
                    pattern="([A-Z][a-z]).{0,}"
                    title="Trebuie să conțină minim 2 litere și să înceapă cu literă mare." required
                    ref={nameRef}
                    />

                    <label>Email:</label>
                    <input type="email" placeholder="email@stud.ase.ro" id="email" name="email" 
                    pattern="(?=.*[0-9]+@stud.ase.ro).{18,}"
                    title="Trebuie introdus mail-ul instituțional (cu terminația '@stud.ase.ro')." required
                    ref={emailRef}
                    />

                    <label>Facultate și specializare:</label>
                    <select name="uni" id="uni" ref={fieldRef}>
                        <optgroup label="Facultatea de Cibernetică, Statistică și Informatică Economică">
                            <option>Cibernetică Economică</option>
                            <option>Statistică și Previziune Economică</option>
                            <option>Informatică Economică</option>
                            <option>Informatică Economică - lb. engleză</option>
                        </optgroup>

                        <optgroup label="Facultatea de Finanțe, Asigurări, Bănci și Burse de Valori">
                            <option>Finanţe şi bănci</option>
                            <option>Finanţe şi bănci - lb. engleză</option>
                        </optgroup>

                        <optgroup label="Facultatea de Contabilitate și Informatică de Gestiune">
                            <option>Contabilitate şi informatică de gestiune</option>
                            <option>Contabilitate şi informatică de gestiune - lb. engleză</option>
                        </optgroup>
                        
                    </select>
        

                    <label>Parolă:</label>
                    <input type="password" id="psw_1" name="psw_1" 
                    pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*]).{8,}" 
                    title="Trebuie să conțină cel puțin o cifră, o literă mare, o literă mică, un caracter special și minim 8 caractere." required
                    ref={passRef}
                    />

                    <label>Confirmă parola:</label>
                    <input type="password" id="psw_2" name="psw_2" 
                    pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*]).{8,}"
                    title="Trebuie să corespundă cu câmpul precedent." required
                    ref={confPassRef}
                    />
                    
                    <button type="submit" className='btn' onClick={verifyRegisterInformation}>Înregistrează-te</button>
                     <ToastContainer />

                </form>
                <a href='/' className="btn_link">Ai deja un cont? Autentifică-te aici!</a>
                </div>
            </div>
            
        )}

export default Register;