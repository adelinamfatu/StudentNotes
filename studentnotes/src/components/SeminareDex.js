import React from "react";
import { listOfCourses } from "./CoursesList";

class SeminareDex extends React.Component {
    render() {
        return (
            <div className='SeminareDex'>
            <div className="cursuri">     
                <div className='listofCourses'>
                <h1 id="cursurilemele">Seminarele mele</h1> 
                <button onclick="adaugaCurs()" id="addCurs">+</button>
                <button onclick="stergeCurs()" id="removeCurs">-</button>
                <button onclick="showAlphabetically()" id="namealph">Nume</button>
                <button onclick="showByDate()" id="date">Data</button>
            
                <div>
                    {listOfCourses.filter(course => course.type == "SEMINAR").map(seminarListofCourses => (
                        <a className="courseName">{seminarListofCourses.title}</a>
                    ))}
                </div> 

                </div>
            </div>  
            </div> 
        )
    }
}
export default SeminareDex




//LISTA DE SEMINARE
