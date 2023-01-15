import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/Notes.css';
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import remove_icon from '../images/remove_icon.png'

//adaugare modal pt utilizator - e sigur daca vrea sa stearga notita?

function Note({items, mode}) {
    const navigate = useNavigate();

    function deleteGroupNotes(noteId, userJSON) {
        var url = "http://localhost:8000/groups/remove/note/" + noteId;
                            
        var request = new XMLHttpRequest();
        request.open("DELETE", url, false); 
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.onreadystatechange = () => 
        { 
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                deleteNote(noteId, userJSON);
            }
        }
        request.send(null);
    }

    function deleteNote(noteId, userJSON) {
        var url = "http://localhost:8000/notes/remove/" + noteId;
                            
        var request = new XMLHttpRequest();
        request.open("DELETE", url, false); 
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.onreadystatechange = () => 
        { 
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                //toast de stergere cu succes
                //refresh la pagina    
            }
        }
        request.send(null);
    }

    return (
        <>
            {
                items.map(item => (
                    <div className="noteItem">
                        <div className="functNote" key={item.id} onClick={() => {
                                if(mode === 'g') {
                                    navigate({
                                        pathname: "/viewnote",
                                        search: createSearchParams({
                                            id: item.id
                                        }).toString()
                                    });
                                }
                                else {
                                    navigate({
                                        pathname: "/editnote",
                                        search: createSearchParams({
                                            id: item.id
                                        }).toString()
                                    });
                                }
                            }}>
                                {item.title} 
                                <br></br>
                                {item.subject.title}
                                <br></br>
                                
                                <div id="paragraph">
                                    <ReactMarkdown id="mark" children={item.content}/>
                                </div>
                        </div>

                        <div id="btn_delete" onClick=
                        {() => 
                            {
                                var user = localStorage.getItem('user');
                                var userJSON = JSON.parse(user);
                                deleteGroupNotes(item.id, userJSON);
                            }}>
                            <img src={remove_icon}></img>
                        </div>
                    </div>
                ))
            }
        </>
    )
}


const Notes = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState();
    const [searchParams] = useSearchParams();
    const [mode, setMode] = useState();

    useEffect(() => {
        var user = localStorage.getItem('user');
        if(!user) {
            navigate('/login');
        }
        else {
            if(!searchParams.get("groupId") && !searchParams.get("subjectId")) {
                var userJSON = JSON.parse(user);
                var url = "http://localhost:8000/notes/" + userJSON["user"].email;
                
                var request = new XMLHttpRequest();
                request.open("GET", url, false); 
                request.setRequestHeader("x-access-token", userJSON["user"].token);
                request.send(null);
                setNotes(JSON.parse(request.responseText));
            }
            else {
                if(searchParams.get("subjectId")) {
                    var userJSON = JSON.parse(user);
                    var url = "http://localhost:8000/notes/subjects/" + searchParams.get("subjectId");
                    
                    var request = new XMLHttpRequest();
                    request.open("GET", url, false); 
                    request.setRequestHeader("x-access-token", userJSON["user"].token);
                    request.send(null);
                    setMode('s');
                    setNotes(JSON.parse(request.responseText));
                }
                else {
                    var userJSON = JSON.parse(user);
                    var url = "http://localhost:8000/notes/groups/" + searchParams.get("groupId");
                    
                    var request = new XMLHttpRequest();
                    request.open("GET", url, false); 
                    request.setRequestHeader("x-access-token", userJSON["user"].token);
                    request.send(null);
                    setMode('g');
                    setNotes(JSON.parse(request.responseText).map(g => g.note));
                }
            }
        }
    }, []);

    const addNote = () => {
        navigate('/addnote');
    };

    const showAlphabetically = () => {

    }

    const showByDate = () => {

    }

        return (  
            <div className='Notes'> 
                <NavigationAboutMe />
                <NavigationBar />
                <div className="allNotes"> 
                    <h1 className="myNotes">Notițele mele</h1>
                    <button onClick={addNote} id="addCurs">+</button>
                    <div id='namedatabtn'>
                    <text>Filtrare după: </text>
                        <button onClick={showAlphabetically} id="namealph">Nume</button>
                        <button onClick={showByDate} id="date">Dată</button>
                    </div>
 
                </div>

                <div className="listOfNotes">
                    {notes && <Note items={notes} mode={mode}/>}
                </div>
                
            </div>
        )                   
}
export default Notes;