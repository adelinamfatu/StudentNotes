import { React, useState } from "react";
import '../style/Profile.css';
import NavigationAboutMe from "./NavigationAboutMe";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    window.addEventListener('load', addData);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [faculty, setFaculty] = useState('');
    const [field, setField] = useState('');
    const navigate = useNavigate();

    function addData() {
        var user = localStorage.getItem('user');
        if(!user) {
            navigate('/login');
        }

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
        setEmail(json["email"]);
    }

        return (
            <div className='Profile'>
                <NavigationBar />
                <NavigationAboutMe />
                     
                <div className="studentProfile">      
                    <h1 id="myProfile">Profilul meu</h1>

                    <div id="student">
                        <div>
                            <label id="name">Nume complet: </label> 
                            <input type="text" value={fullName} readOnly></input>    
                        </div>
                        <div>
                            <label id="mail">Email: </label>
                            <input type="text" value={email} readOnly></input> 
                        </div>
                        <div>
                            <label id="faculty">Facultate: </label>
                            <input type="text" value={faculty} readOnly></input> 
                        </div>
                        <div>
                            <label id="field">Specializare</label>
                            <input type="text" value={field} readOnly></input> 
                        </div>
                    </div>
                </div>
            </div>
        )      
    }

export default Profile;