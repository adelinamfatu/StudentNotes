import { React, useState, useRef, useEffect } from 'react';
import '../style/ViewNote.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import NavigationAboutMe from './NavigationAboutMe';
import NavigationBar from './NavigationBar';

const ViewNote = () => { 
  const navigate = useNavigate();
  var titleRef = useRef(null);
  var subjectRef = useRef(null);
  const [note, setNote] = useState();
  const [searchParams] = useSearchParams();

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
            populateData(user);
        }
    }, [])

  function populateData(user) {
    var userJSON = JSON.parse(user);
    var url = "http://localhost:8000/notes/id/" + searchParams.get("id");
            
    var request = new XMLHttpRequest();
    request.open("GET", url, false); 
    request.setRequestHeader("x-access-token", userJSON["user"].token);
    request.send(null);
    titleRef.current.value = JSON.parse(request.responseText).title;
    setNote(JSON.parse(request.responseText).content);
    subjectRef.current.value = JSON.parse(request.responseText).subject.title;
  }

    return (    
        <div className='view'>
          <NavigationAboutMe/>
          <NavigationBar/>
          <div className='CreateView'>
            <div className='create'>
              <div id="all">
                <h1 id="view_note">Vizualizare notiță</h1>
                
                <div>
                  <input type="text" name="title" id="titleinput1" 
                    readOnly={true}
                    ref={titleRef}/>
                </div>

                <div>
                  <input type="text" name="title" id="titleinput2" 
                    readOnly={true}
                    ref={subjectRef}/>
                </div>

                <div id="mark_down">
                  <ReactMarkdown children={note} />
                </div>
              </div>
              
            </div>
              <br></br>
              <ToastContainer />
            </div>
        </div>
      )
}

export default ViewNote;