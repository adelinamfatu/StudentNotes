import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div className="form">
                <h1>StudyTime</h1> 
                <label className="autentificare">AUTENTIFICARE</label>
                <form className="login">
                    <label>Email:</label>
                    <input type="email" placeholder="email@stud.ase.ro" id="email" name="email" />
                    <label>Parolă:</label>
                    <input type="password" id="password" name="password" />   

                    <button>Conectează-te</button> 
                </form>
                
                <button className="btn_link" onClick={() => this.props.onFormSwitch('register')}>Nu ai un cont? Înregistrează-te aici!</button>
        
            </div>
        )}
}

export default Login;