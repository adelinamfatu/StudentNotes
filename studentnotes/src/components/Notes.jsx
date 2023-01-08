import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/Notes.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

function Note({items}) {
    return (
        <>
            {
                items.map(item => (
                    <a className="functNote" key={item.id}>
                        {item.title} 
                        <br></br>
                        {item.subject.title}
                        <br></br>
                        <textarea id="paragraph" readOnly>
                            <ReactMarkdown children={item.content}/>
                        </textarea>
                    </a>
                ))
            }
        </>
    )
}


const Notes = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState();

    useEffect(() => {
        var user = localStorage.getItem('user');
        if(!user) {
            navigate('/login');
        }
        else {
            var userJSON = JSON.parse(user);
            var url = "http://localhost:8000/notes/" + userJSON["user"].email;
            
            var request = new XMLHttpRequest();
            request.open("GET", url, false); 
            request.setRequestHeader("x-access-token", userJSON["user"].token);
            request.send(null);
            setNotes(JSON.parse(request.responseText));
        }
    }, []);

    const addNote = () => {
        navigate('/addnote');
    };

    const deleteNote = () => {

    }

    const showAlphabetically = () => {

    }

    const showByDate = () => {

    }

        return (  
            <div className='Notes'> 
                <NavigationBar />
                <NavigationAboutMe />
                <div className="allNotes"> 
                    <h1 id="notitelemele">Notițele mele</h1>
                    <button onClick={addNote} id="addCurs">+</button>
                    <button onClick={deleteNote} id="removeCurs">-</button>
                    <div id='namedatabtn'>
                    <text>Filtrare după: </text>
                        <button onClick={showAlphabetically} id="namealph">Nume</button>
                        <button onClick={showByDate} id="date">Dată</button>
                    </div>
 
                </div>

                <div className="listOfNotes">
                    {notes && <Note items={notes}/>}
                </div>
                
            </div>
        )                   
}
export default Notes;