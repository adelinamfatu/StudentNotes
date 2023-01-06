import { React, useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/Subject.css';
import { useNavigate } from "react-router-dom";

function List({items}) {
    return (
        <>
            {items.map(item => (
                <a className="courseName" key={item.id}>{item.title}</a>))
            }
        </>
    )
}

const Subject = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState();

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
            setSubjects(JSON.parse(request.responseText));
        }
    }, [])

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
                
                    <div className='listOfSubjects'>
                        {subjects && <List items={subjects}/>}
                    </div>
                </div>
            </div>
        )                   
}
export default Subject;