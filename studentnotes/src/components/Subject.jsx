import { React, useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/Subject.css';
import { createSearchParams, useNavigate } from "react-router-dom";
import remove_icon from '../images/remove_icon.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function List({items}) {
    const navigate = useNavigate();

    function deleteNotes(subjectId, userJSON) {
        var url = "http://localhost:8000/notes/remove/subject/" + subjectId;
                            
        var request = new XMLHttpRequest();
        request.open("DELETE", url, false); 
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.onreadystatechange = () => 
        { 
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                deleteSubject(subjectId, userJSON);       
            }
        }
        request.send(null);
    }

    function deleteSubject(subjectId, userJSON) {
        var url = "http://localhost:8000/subjects/remove/" + subjectId;
                            
        var request = new XMLHttpRequest();
        request.open("DELETE", url, false); 
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.onreadystatechange = () => 
        { 
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                toast.success('Materia a fost ștearsă cu succes!',
                    {position:toast.POSITION.TOP_RIGHT})
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);       
            }
        }
        request.send(null);
        
    }

    return (
        <>
            {items.map(item => (
                <div className="listItem">
                <div className="courseName" key={item.id} onClick=
                {() => {
                    navigate({
                        pathname: "/notes",
                        search: createSearchParams({
                            subjectId: item.id
                        }).toString()
                    });
                }}>
                    {item.title}
                </div>
                <div id="btn_delete" onClick=
                    {() => 
                        {
                            var user = localStorage.getItem('user');
                            var userJSON = JSON.parse(user);
                            deleteNotes(item.id, userJSON);
                            //https://mui.com/material-ui/react-dialog/
                            //dialog de intrebare daca e sigur ca vrea sa stearga materia si notitele asociate
                            //daca da, se fac operatiile de mai jos
                            //daca nu, nu se intampla nimic
                        }}>
                        <img src={remove_icon}></img>
                    </div>
                </div>
                ))
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
    
        return (  
            <div className='CourseDex'> 
                <NavigationBar />
                <NavigationAboutMe />
                <div className="cursuri"> 
                    <h1 className="mySubjects">Materiile mele</h1>
                    <button onClick={addSubject} id="addCurs">+</button>
                
                    <div className='listOfSubjects'>
                        {subjects && <List items={subjects}/> }
                    </div>
                </div>
                <ToastContainer />
            </div>
        )                   
}
export default Subject;