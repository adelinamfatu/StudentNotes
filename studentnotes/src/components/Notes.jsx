import React from "react";
import { listOfCourses } from "./CoursesList";
import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/Notes.css';
import { useContext } from "react";
import { LoginContext } from "../App";

const Notes = () => {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

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
                <NavigationBar />
                <NavigationAboutMe />
                <div className="cursuri"> 
                    <div className='listOfCourses'>
                        <h1 id="cursurilemele">Cursurile mele</h1> 
                        <button onClick={addNote} id="addCurs">+</button>
                        <button onClick={deleteNote} id="removeCurs">-</button>
                        <button onClick={showAlphabetically} id="namealph">Nume</button>
                        <button onclick={showByDate} id="date">Data</button>
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