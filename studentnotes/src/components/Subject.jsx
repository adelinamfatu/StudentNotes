import { React, useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/Subject.css';
import { useNavigate } from "react-router-dom";
import remove_icon from '../images/remove_icon.png'

function List({items}) {
    return (
        <>
            {items.map(item => (
                <a className="courseName" key={item.id}>
                    {item.title}
                    <a id="btn_delete" onClick=
                    {() => 
                        {
                            /*var user = localStorage.getItem('user');
                            var userJSON = JSON.parse(user);
                            var url = "http://localhost:8000/notes/subject/" + item.id;
                            
                            var request = new XMLHttpRequest();
                            request.open("DELETE", url, false); 
                            request.setRequestHeader("x-access-token", userJSON["user"].token);
                            request.send(null);*/

                            //https://mui.com/material-ui/react-dialog/
                        }}>
                        <img src={remove_icon}></img>
                    </a>
                </a>
                ))
            }
        </>
    )
    //adaugare metoda onclick pe buton + luare id buton si materie + stergere materie la id-ul respectiv + 
    //notitele materiei respective + mesaj de intrebare daca e sigur si de instiintare ca se sterg si notitele
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
    
        return (  
            <div className='CourseDex'> 
                <NavigationBar />
                <NavigationAboutMe />
                <div className="cursuri"> 
                    <h1 className="mySubjects">Materiile mele</h1>
                    <button onClick={addSubject} id="addCurs">+</button>
                
                    <div className='listOfSubjects'>
                        {subjects && <List items={subjects}/>}
                    </div>
                </div>
            </div>
        )                   
}
export default Subject;