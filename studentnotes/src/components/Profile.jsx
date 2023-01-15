import { React, useState, useEffect } from "react";
import '../style/Profile.css';
import NavigationAboutMe from "./NavigationAboutMe";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [faculty, setFaculty] = useState('');
    const [field, setField] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        var user = localStorage.getItem('user');
        if(!user) {
            navigate('/login');
        }
        else {
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
    });

        return (
            <div className='Profile'>
                <NavigationAboutMe />
                <NavigationBar />
                     
                <div className="studentProfile">      
                    <h1 className="myProfile">Profilul meu</h1>

                    <div id="student">
                        <div>
                            <label id="lname">Nume complet: </label> 
                            <input id="iname" type="text" value={fullName} readOnly></input>    
                        </div>
                        <div>
                            <label id="lmail">Email: </label>
                            <input id="imail" type="text" value={email} readOnly></input> 
                        </div>
                        <div>
                            <label id="lfaculty">Facultate: </label>
                            <input id="ifaculty" type="text" value={faculty} readOnly></input> 
                        </div>
                        <div>
                            <label id="lfield">Specializare</label>
                            <input id="ifield" type="text" value={field} readOnly></input> 
                        </div>
                    </div>
                </div>
            </div>
        )      
    }

export default Profile;