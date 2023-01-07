import { React, useState } from 'react';
import '../style/CreateNote.css';
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown'

const CreateNote = () => { 
  const [content, setContent] = useState('');
  const [note, setNote] = useState('');
  const navigate = useNavigate()

  const discardNote = () => {
    navigate('/notes');
  };

  const saveNote = () => {

  }

  const submit = (event) => {
    event.preventDefault();
  }

  const handleContentChange = event => {
    setContent(event.target.value);
    setNote((event.target.value));
  };

    return (
        <div className='CreateNote'>
          <div className='create'>
            <form onSubmit={submit}>
              <button onClick={discardNote} id="renunta">Renunță</button>
              <button onClick={saveNote} id="salveaza">Salvează</button>
              <label id="titlu"> Titlu
                <input type="text" name="title" id="titleinput" placeholder="Titlu.."/>
              </label>
              <textarea
                placeholder="Editeaza paragraf..."
                id="content"
                name="content"
                value={content}
                onChange={handleContentChange}
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
