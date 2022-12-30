import React from "react";
import CourseItem from "./CourseItem";
import { listOfCourses } from "./CoursesList";
import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/Courses.css';

const Cursuri = () => {
        return (  
            <div className='CourseDex'> 
                <NavigationBar />
                <NavigationAboutMe />
            <div className="cursuri"> 
                <div className='listOfCourses'>
                <h1 id="cursurilemele">Cursurile mele</h1> 
                <button onclick="adaugaCurs()" id="addCurs">+</button>
                <button onclick="stergeCurs()" id="removeCurs">-</button>
                <button onclick="showAlphabetically()" id="namealph">Nume</button>
                <button onclick="showByDate()" id="date">Data</button>
               
                <div>
                    {listOfCourses.filter(course => course.type == "CURS").map(cursListofCourses => (
                        <a className="courseName">{cursListofCourses.title}</a>
                    ))}
                </div> 
            
            </div>
             </div>
            </div>  
        )                   
}
export default Cursuri;