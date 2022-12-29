import React from 'react';
import {Link} from 'react-router-dom';

class Register extends React.Component {
    render() {
        return (
            <div className="form">
                <h1>StudyTime</h1> 
                <label className="inregistrare">ÎNREGISTRARE</label>
                <form className="register">
                    <label for="nume">Nume:</label>
                    <input type="text" id="nume" name="nume" 
                    pattern="[A-Z][a-z]{2,}"
                    title="Trebuie să conțină minim 2 litere și să înceapă cu literă mare." required/>

                    <label>Prenume:</label>
                    <input type="text" id="prenume" name="prenume" 
                    pattern="[A-Z][a-z]{2,}"
                    title="Trebuie să conțină minim 2 litere și să înceapă cu literă mare." required/>

                    <label>Email:</label>
                    <input type="email" placeholder="email@stud.ase.ro" id="email" name="email" 
                    pattern="(?=.*[0-9]+@stud.ase.ro).{18,}"
                    title="Trebuie introdus mail-ul instituțional (cu terminația '@stud.ase.ro')." required/>

                    <label>Parolă:</label>
                    <input type="password" id="password" 
                    pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*]).{8,}" 
                    title="Trebuie să conțină cel puțin o cifră, o literă mare, o literă mică, un caracter special și minim 8 caractere." required/>

                    <label>Confirmă parola:</label>
                    <input type="password" id="confirmPassword"  
                    onChange={this.pwdConfirm}
                    pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*]).{8,}"
                    title="Trebuie să corespundă cu câmpul precedent." required/>
                    
                    <button type="submit">Înregistrează-te</button>
                      
                </form>
                
                <button className="btn_link" onClick={() => this.props.onFormSwitch('login')}>Ai deja un cont? Autentifică-te aici!</button>
                {/* <Link to="/" variant = "body1">Do you have an account ? click here</Link> */}
        
            </div>
            
        )}

        
}

export default Register;