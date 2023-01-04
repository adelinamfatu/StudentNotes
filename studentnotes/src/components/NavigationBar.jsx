import { React, useState, useEffect } from "react";
import '../style/NavigationBar.css';
import logo from '../images/brain.png'
import logout from '../images/logout.png'

const NavigationBar = () => {
    const [fullName, setFullName] = useState('');
    const [faculty, setFaculty] = useState('');
    const [field, setField] = useState('');

    useEffect(() => {
        var user = localStorage.getItem('user');
        var userJSON = JSON.parse(user)
        var url = "http://localhost:8000/users/" + userJSON["user"].email;
        
        var request = new XMLHttpRequest();
        request.open("GET", url, false); 
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.send(null);
        var json = JSON.parse(request.responseText);
        setFullName(json["surname"] + " " + json["name"]);
        setFaculty(json["faculty"]);
        setField(json["field"]);

        console.log();
    })

    const logoutUser = () => {
        localStorage.removeItem("user");
      }

    return (
            <nav className='NavigationBar'>
                <img src={logo} id='imgLogo' />
                <div className='navigation-list'>
                    <p id='studentName'>{fullName}</p>
                    <p id='studentFaculty'>{faculty}</p>
                    <p id='studentField'>{field}</p>
                </div>
                <a href='/login' onClick={logoutUser}><img src={logout} id='imgLogout' /></a>
                <a href='/login' className="btn_logout" onClick={logoutUser}>Delogare</a>
            </nav>
        )
}

export default NavigationBar;