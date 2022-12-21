import React from 'react';

class Register extends React.Component {
    render() {
        return (
            <div className="form">
                <h1>StudyTime</h1> 
                <label className="inregistrare">ÎNREGISTRARE</label>
                <form className="register">
                    <label for="nume">Nume:</label>
                    <input type="text" id="nume" name="nume" 
                    pattern="([A-Z][a-z]*).{2,}"
                    title="Trebuie să conțină minim 2 litere și să înceapă cu literă mare." required/>

                    <label>Prenume:</label>
                    <input type="text" id="prenume" name="prenume" 
                    pattern="([A-Z][a-z]*).{2,}"
                    title="Trebuie să conțină minim 2 litere și să înceapă cu literă mare." required/>

                    <label>Email:</label>
                    <input type="email" placeholder="email@stud.ase.ro" id="email" name="email" 
                    pattern="(?=.*[0-9]+@stud.ase.ro).{16,}"
                    title="Trebuie introdus mail-ul instituțional (cu terminația '@stud.ase.ro')." required/>

                    <label>Parolă:</label>
                    <input type="password" id="psw_1" name="psw_1" 
                    pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*]).{8,}" 
                    title="Trebuie să conțină cel puțin o cifră, o literă mare, o literă mică, un caracter special și  minim 8 caractere." required/>

                    <label>Confirmă parola:</label>
                    <input type="password" id="psw_2" name="psw_2" 
                    pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*]).{8,}"
                    title="Trebuie să corespundă cu câmpul precedent." required/>
                    
                    <button type="submit">Înregistrează-te</button>
                        
                </form>
                
                <button className="btn_link" onClick={() => this.props.onFormSwitch('login')}>Ai deja un cont? Autentifică-te aici!</button>
        
            </div>
            
        )}

        
}

export default Register;