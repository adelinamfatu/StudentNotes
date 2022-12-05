import React from "react";
import CourseItem from "./CourseItem";
import { listOfCourses } from "./CoursesList";

class CourseDex extends React.Component {
    render() {
        return (
            <div className='CourseDex'>         
                <div className='listofCourses'>
                <h1 id="cursurilemele">Cursurile mele</h1> 
                <button onclick="adaugaCurs()" id="addCurs">+</button>
                <button onclick="stergeCurs()" id="removeCurs">-</button>
                <button onclick="showAlphabetically()" id="namealph">Nume</button>
                <button onclick="showByDate()" id="date">Data</button>

                <ul id="lista">
                    {listOfCourses.map((item, index) => {
                        return(
                            <div>
                            <li key={index}>
                              <a className="courseNme">{item.title}</a>
                            </li>
                            </div>
                        )
                    })}
                </ul>

                </div>
            </div>
        )
    }
}
export default CourseDex


//LISTA DE CURSURI