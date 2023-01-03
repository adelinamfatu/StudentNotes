import { React, useState } from "react";
import '../style/NavigationBar.css';
import logo from '../images/brain.png'
import logout from '../images/logout.png'
//import { useNavigate } from "react-router-dom";


const NavigationBar = () => {
    // constructor(props) {
    //     super(props);
    // }
    window.addEventListener('load', addData);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [faculty, setFaculty] = useState('');
    const [field, setField] = useState('');
    //const navigate = useNavigate();

    function addData() {
        var user = localStorage.getItem('user');
        // if(!user) {
        //     navigate('/login');
        // }

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
    }

    const delogare = () => {
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
                <a href='/login' onClick={delogare}><img src={logout} id='imgLogout' /></a>
                <a href='/login' className="btn_logout" onClick={delogare}>Delogare</a>
                
            </nav>
        )
}


export default NavigationBar;