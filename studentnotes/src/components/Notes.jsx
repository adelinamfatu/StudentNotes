import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/Notes.css';
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import remove_icon from '../images/remove_icon.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Note({items, mode}) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [userJSON, setUserJSON] = useState('');


    const toggleShowModal = () => {
        setShowModal(!showModal);
      };
  
      const ModalNotes = ({ show, onCloseButtonClick }) => {
          if (!show) {
            return null;
          }
        
          return (
            <div className="modal-wrapper-notes">
              <div className="modal-notes">
              <div className="title-notes">Atenție!</div>
                <div className="body-notes">
                  Sunteți sigur că doriți să ștergeți notița?
                </div>
                <div className="footer-notes">
                 <button onClick={onCloseButtonClick} id="modalNuBtn">Nu</button> 
                  <button onClick={deleteGroupNotes} id="modalDaBtn">Da</button>
                </div>
              </div>
            </div>
          );
        };

    function deleteGroupNotes() {
        var url = "http://localhost:8000/groups/remove/note/" + id;
                            
        var request = new XMLHttpRequest();
        request.open("DELETE", url, false); 
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.onreadystatechange = () => 
        { 
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                deleteNote(id, userJSON);
            }
        }
        request.send(null);
    }

    function deleteNote() {
        var url = "http://localhost:8000/notes/remove/" + id;
                            
        var request = new XMLHttpRequest();
        request.open("DELETE", url, false); 
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.onreadystatechange = () => 
        { 
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                toast.success('Notița a fost ștearsă cu succes!',
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
                        <ModalNotes show={showModal} onCloseButtonClick={toggleShowModal} />
                        <div id="btn_delete" onClick=
                        {() => 
                            {
                                var user = localStorage.getItem('user');
                                setUserJSON(JSON.parse(user));
                                setShowModal(!showModal);
                                setId(item.id);
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
 
                </div>

                <div className="listOfNotes">
                    {notes && <Note items={notes} mode={mode}/>}
                </div>
                <ToastContainer/>
            </div>
        )                   
}
export default Notes;