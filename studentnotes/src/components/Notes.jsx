import React from "react";
import { listOfCourses } from "./CoursesList";
import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/Notes.css';
import { useContext, useEffect } from "react";
import { AuthenticationContext, EmailContext } from "../App";

const Notes = () => {
    const [loggedIn, setLoggedIn] = useContext(AuthenticationContext);
    const [username, setUsername] = useContext(EmailContext);
    var fullName = null;
    var field = null;
    var faculty = null;

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

    const addNote = () => {
      
    };

    const deleteNote = () => {

    }

    const showAlphabetically = () => {

    }

    const showByDate = () => {

    }

        return (  
            <div className='CourseDex'> 
                <NavigationBar 
                    fullName = {fullName}
                    field = {field}
                    faculty = {faculty}
                />
                <NavigationAboutMe />
                <div className="cursuri"> 
                    <div className='listOfCourses'>
                        <h1 id="cursurilemele">Cursurile mele</h1> 
                        <button onClick={addNote} id="addCurs">+</button>
                        <button onClick={deleteNote} id="removeCurs">-</button>
                        <button onClick={showAlphabetically} id="namealph">Nume</button>
                        <button onClick={showByDate} id="date">Data</button>
                        <div>
                            {listOfCourses.map(item => (
                                <a className="courseName">{item.title}</a>
                            ))}
                        </div> 
                    </div>
                </div>
            </div>  
        )                   
}
export default Notes;