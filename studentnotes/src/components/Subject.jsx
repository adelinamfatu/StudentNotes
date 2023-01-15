import { React, useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/Subject.css';
import { createSearchParams, useNavigate } from "react-router-dom";
import remove_icon from '../images/remove_icon.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//schimbare culoare butoane modal
//stilizare modal

function List({items}) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [userJSON, setUserJSON] = useState('');

    const toggleShowModal = () => {
      setShowModal(!showModal);
    };

    const Modal = ({ show, onCloseButtonClick }) => {
        if (!show) {
          return null;
        }
      
        return (
          <div className="modal-wrapper">
            <div className="modal">
              <div className="body">
                Stergerea materiei va rezulta in stergerea tuturor notitelor asociate. Doriti sa continuati?
              </div>
              <div className="footer">
                <button onClick={deleteNotes}>Da</button>
                <button onClick={onCloseButtonClick}>Nu</button> 
              </div>
            </div>
          </div>
        );
      };

    function deleteNotes() {
        var url = "http://localhost:8000/notes/remove/subject/" + id;
                            
        var request = new XMLHttpRequest();
        request.open("DELETE", url, false); 
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.onreadystatechange = () => 
        { 
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                deleteSubject();       
            }
        }
        request.send(null);
    }

    function deleteSubject() {
        var url = "http://localhost:8000/subjects/remove/" + id;
                            
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
                <div className="listItem" key={item.id}>
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
                    <Modal show={showModal} onCloseButtonClick={toggleShowModal} />
                        <div id="btn_delete" onClick=
                         {() => 
                            {
                                var user = localStorage.getItem('user');
                                setUserJSON(JSON.parse(user));
                                setShowModal(!showModal);
                                setId(item.id);
                            }} >
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
                <NavigationAboutMe />
                <NavigationBar />
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