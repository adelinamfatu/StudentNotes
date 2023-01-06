import React from 'react';
import '../style/CreateNote.css';
import { useNavigate } from "react-router-dom";

const CreateNote = () => { 

  const navigate = useNavigate()

  const discardNote = () => {
    navigate('/notes');
};

const saveNote = () => {

}

    return (
        <div className='CreateNote'>
          <div className='create'>
            <form>
            <button onClick={discardNote} id="renunta">Renunță</button>
            <button onClick={saveNote} id="salveaza">Salvează</button>
            <label id="titlu">
             Titlu
            <input type="text" name="title" id="titleinput" placeholder="Titlu.."/>
            </label>
            
            </form>

            </div>
            <br></br>
            </div>
        )
}

export default CreateNote;
