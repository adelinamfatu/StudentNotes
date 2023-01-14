import { React, useState, useRef, useEffect } from 'react';
import '../style/CreateNote.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

//sa nu se poata mari textarea-ul
//centrare pe mijloc tot dreptunghiul alb

const CreateNote = () => { 
  const [content, setContent] = useState('');
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  var titleRef = useRef(null);
  var contentRef = useRef(null);
  const [selectedSubject, setSelectedSubject] = useState();
  const [subjects, setSubjects] = useState();
  const [subjectId, setSubjectId] = useState('');
  const [searchParams] = useSearchParams();

    useEffect(() => {
        var user = localStorage.getItem('user');
        setSelectedSubject('default');
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
    setNote(JSON.parse(request.responseText).content);
    setSelectedSubject(JSON.parse(request.responseText).subjectId);
  }

  const discardNote = () => {
    navigate('/notes');
  };

  const saveNote = () => {
    //verificare ca e selectat ceva
    var user = localStorage.getItem('user');
    var title = titleRef.current.value;
    var content = contentRef.current.value;
    var userJSON = JSON.parse(user);

    content = JSON.stringify(content);

    var json = '{' +
        '"userEmail":' + '"' + userJSON["user"].email + '",' +
        '"title":' + '"' + title + '",' + 
        '"content":' + content + ',' + 
        '"subjectId":' + '"' + subjectId + '"}'; 
    
    if(!searchParams.get("id")) {
      var url = "http://localhost:8000/notes/add";
      sendNote(userJSON, json, "POST", url);
      setTimeout(() => {
        navigate('/notes');
       }, 2000);
    }
    else {
      var url = "http://localhost:8000/notes/edit/" + searchParams.get("id");
      json = '{' +
        '"title":' + '"' + title + '",' + 
        '"content":' + content +'}'; 
      sendNote(userJSON, json, "PUT", url);
    }
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

  const handleSubjectChange = event => {
    setSubjectId(event.target.value);
  }

  function getSubject() {
    return subjects.map((subject) => {
      return <option key={subject.id} value={subject.id}>{subject.title} 
             </option>;
    });
  }

    return (
        <div className='CreateNote'>
          <div className='create'>
            <form className='createForm' onSubmit={submit}>
              <div id="all">
                <div id="two_buttons">
                  <button onClick={discardNote} id="renunta">Renunță</button>
                  <button onClick={saveNote} id="salveaza">Salvează</button>
                </div>
                <input type="text" name="title" id="titleinput" 
                  placeholder="-- Titlu --" 
                  ref={titleRef}/>
                <select className="subjectsSelect" 
                  value={selectedSubject} 
                  onChange={handleSubjectChange}
                  >
                  <option value="default" disabled>
                    -- Selectează materia --
                  </option>
                  {subjects && getSubject()}
                </select>
              </div>
              <div >
                <textarea id='textPar'
                  placeholder="Editeaza paragraf..."
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
      )
}

export default CreateNote;
