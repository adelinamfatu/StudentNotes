import { React, useState, useRef, useEffect } from 'react';
import '../style/CreateNote.css';
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

const CreateNote = () => { 
  const [content, setContent] = useState('');
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  var titleRef = useRef(null);
  var contentRef = useRef(null);
  const [subjects, setSubjects] = useState();
  const [subjectId, setSubjectId] = useState('');

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
        '"content":' + content + ',' + 
        '"subjectId":' + '"' + subjectId + '"}'; 
    sendNote(userJSON, json);
  }

  function sendNote(userJSON, json) {
    var url = "http://localhost:8000/notes/add";
    var request = new XMLHttpRequest();
    request.open("POST", url, true); 
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("x-access-token", userJSON["user"].token);
    request.onreadystatechange = () => 
    { 
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            //toast de succes
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
            <form onSubmit={submit}>
              <button onClick={discardNote} id="renunta">Renunță</button>
              <button onClick={saveNote} id="salveaza">Salvează</button>

              <select
                className="subjectsSelect"
                defaultValue={'default'}
                onChange={handleSubjectChange}
              >
                <option value="default" disabled>
                  -- Select subject --
                  </option>
                  {subjects && getSubject()}
              </select>
              
              <label id="titlu"> Titlu
                <input type="text" name="title" id="titleinput" placeholder="Titlu..."
                ref={titleRef}/>
              </label>
              <textarea
                placeholder="Editeaza paragraf..."
                id="content"
                name="content"
                value={content}
                onChange={handleContentChange}
                ref={contentRef}
              />
            </form>
            <ReactMarkdown
                children={note}
              />
          </div>
            <br></br>
        </div>
      )
}

export default CreateNote;
