import { React, useState, useRef, useEffect } from 'react';
import '../style/ViewNote.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import NavigationAboutMe from './NavigationAboutMe';
import NavigationBar from './NavigationBar';

//sa nu se poata mari textarea-ul
//centrare pe mijloc tot dreptunghiul alb

const ViewNote = () => { 
  const [content, setContent] = useState('');
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  var titleRef = useRef(null);
  var contentRef = useRef(null);
  var selectRef = useRef(null);
  const [subjects, setSubjects] = useState();
  const [subjectId, setSubjectId] = useState('');
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
            setSubjects(JSON.parse(request.responseText));
            if(searchParams.get("id")) {
              populateData(user);
            }
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
    setContent(JSON.parse(request.responseText).content);
    selectRef.current.value = JSON.parse(request.responseText).subject.title
  }

 

  function sendNote(userJSON, json, method, url) {
    var request = new XMLHttpRequest();
    request.open(method, url, true); 
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("x-access-token", userJSON["user"].token);
    request.onreadystatechange = () => 
    { 
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          toast.success('Notița s-a salvat cu succes!',
            {position:toast.POSITION.TOP_RIGHT});        
        }
    }
    request.send(json);
}

  const submit = (event) => {
    event.preventDefault();
  }

  const handleContentChange = event => {
    setContent(event.target.value);
    setNote((event.target.value));
  };



    return (    
        <div className='view'>
        <NavigationAboutMe></NavigationAboutMe>
            <NavigationBar></NavigationBar>

        <div className='CreateNote'>


          <div className='create'>
            <form className='createForm' onSubmit={submit}>
              <div id="all">
                <input type="text" name="title" id="titleinput" 
                placeholder="-- Titlu --" 
                ref={titleRef}/>
              </div>
              <div id='textPar'>
                <textarea
                  placeholder="Editeaza paragraf..."
                  id="content"
                  name="content"
                  value={content}
                  onChange={handleContentChange}
                  ref={contentRef}
                />
              </div>
              <div id="markDown">
                <ReactMarkdown children={note} />
              </div>
            </form>
          </div>
          <br></br>
          <ToastContainer />
          </div>
           </div>
      )
}

export default ViewNote;
