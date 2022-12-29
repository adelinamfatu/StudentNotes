import React from 'react';
import {Link} from 'react-router-dom';

class Login extends React.Component {
    render() {
        return (
            <div className="form">
                <h1>StudyTime</h1> 
                <label className="autentificare">AUTENTIFICARE</label>
                <form className="login">
                    <label>Email:</label>
                    <input type="email" placeholder="email@stud.ase.ro" id="email" name="email"
                    pattern="(?=.*[0-9]+@stud.ase.ro).{18,}"
                    title="Trebuie introdus mail-ul instituțional (cu terminația '@stud.ase.ro')." required/>
                    
                    <label>Parolă:</label>
                    <input type="password" id="password" name="password" 
                    pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*]).{8,}" 
                    title="Trebuie să conțină cel puțin o cifră, o literă mare, o literă mică, un caracter special și minim 8 caractere." required/>   

                    <button>Conectează-te</button> 
                </form>
                
                <button className="btn_link" onClick={() => this.props.onFormSwitch('register')}>Nu ai un cont? Înregistrează-te aici!</button>
                {/* <Link to="/register" variant = "body2">Not have an account ? Sign up here</Link> */}
            </div>
        )}
}

export default Login;