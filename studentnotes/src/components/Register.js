import React from 'react';

class Register extends React.Component {
    render() {
        return (
            <div className="form">
                <h1>StudyTime</h1> 
                <label className="inregistrare">ÎNREGISTRARE</label>
                <form className="register">
                    <label>Nume:</label>
                    <input type="nume" id="nume" name="nume" />

                    <label>Prenume:</label>
                    <input type="prenume" id="prenume" name="prenume" />

                    <label>Email:</label>
                    <input type="email" placeholder="email@stud.ase.ro" id="email" name="email" />

                    <label>Parolă:</label>
                    <input type="parola_1" id="parola_1" name="parola_1" />

                    <label>Confirmă parola:</label>
                    <input type="parola_2" id="parola_2" name="parola_2" />
                        
                </form>
                <button>Înregistrează-te</button>
                <button className="btn_link" onClick={() => this.props.onFormSwitch('login')}>Ai deja un cont? Autentifică-te aici!</button>
        
            </div>
        )}
}

export default Register;