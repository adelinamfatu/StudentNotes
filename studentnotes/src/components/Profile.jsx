import React from "react";
import '../style/Profile.css';
import NavigationAboutMe from "./NavigationAboutMe";
import NavigationBar from "./NavigationBar";
import { useContext, useEffect } from "react";
import { AuthenticationContext, EmailContext } from "../App";

const Profile = () => {
    const [username, setUsername] = useContext(EmailContext);
    var fullName = null;
    var field = null;
    var faculty = null;

    useEffect(() => {
        var url = "http://localhost:8000/users/" + username;
        var request = new XMLHttpRequest();
        request.open("GET", url, false); 
        request.send(null);
        var json = JSON.parse(request.responseText);
        fullName = json["surname"] + " " + json["name"];
        faculty = json["faculty"];
        field = json["field"];
    })
        return (
            <div className='Profile'>
                <NavigationBar />
                <NavigationAboutMe />
                     
                <div className="studentProfile">      
                    <h1 id="myProfile">Profilul meu</h1>

                    <div id="student">
                        <div>
                            <label id="name">Nume complet: </label> 
                            <input type="text" value="Nume" readonly></input>    
                        </div>
                        <div>
                            <label id="mail">Email: </label>
                            <input type="text" value="Email" readonly></input> 
                        </div>
                        <div>
                            <label id="faculty">Facultate: </label>
                            <input type="text" value="Facultate" readonly></input> 
                        </div>
                        <div>
                            <label id="field">Specializare</label>
                            <input type="text" value="Specializare" readonly></input> 
                        </div>
                    </div>
                </div>
            </div>
        )      
    }

export default Profile;