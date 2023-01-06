import { React, useEffect } from "react";
import { listOfCourses } from "./CoursesList";
import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/Subject.css';
import { useNavigate } from "react-router-dom";

const Subject = () => {
    const navigate = useNavigate();
    var subjects;

    useEffect(() => {
        var user = localStorage.getItem('user');
        if(!user) {
            navigate('/login');
        }
        else {
            var userJSON = JSON.parse(user);
            var url = "http://localhost:8000/subjects/" + userJSON["user"].email;
            
            var request = new XMLHttpRequest();
            request.open("GET", url, false); 
            request.setRequestHeader("x-access-token", userJSON["user"].token);
            request.send(null);
            subjects = JSON.parse(request.responseText);
        }
    })

    const addSubject = () => {
      navigate('/addsubject');
    };

    const deleteSubject = () => {

    }
        return (  
            <div className='CourseDex'> 
                <NavigationBar />
                <NavigationAboutMe />
                <div className="cursuri"> 
                    <h1 id="cursurilemele">Materiile mele</h1>
                    <button onClick={addSubject} id="addCurs">+</button>
                    <button onClick={deleteSubject} id="removeCurs">-</button>

                    <div className='listOfCourses'>
                        {listOfCourses.map(item => (
                            <a className="courseName">{item.title}</a>
                        ))}
                    </div> 
                </div>
            </div>
        )                   
}
export default Subject;