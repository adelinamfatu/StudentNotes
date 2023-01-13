import { React, useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import { useNavigate } from "react-router-dom";
import '../style/AddNote.css';
import { Multiselect } from "multiselect-react-dropdown";
import { createRef } from "react";

//fixare bug titlu
//variante facute verde
//placeholder pt select-uri: "Utilizatori" si "Notite"
//rotunjire colturi select-uri

const AddGroup = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState();
    const [notes, setNotes] = useState();
    const [food, setFood] = useState(["Burger", "Pizza", "Sandwich"]);
    var usersRef = createRef('');

    useEffect(() => {
        var user = localStorage.getItem('user');
        if(!user) {
            navigate('/login');
        }
        else {
            makeUsersRequest(user);
            makeNotesRequest(user);
        }
    }, []);

    function makeUsersRequest(user) {
        var userJSON = JSON.parse(user);
        var url = "http://localhost:8000/users";
        
        var request = new XMLHttpRequest();
        request.open("GET", url, false); 
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.send(null);
        setUsers((JSON.parse(request.responseText)).map(u => u.email));
    }

    function makeNotesRequest(user) {
        var userJSON = JSON.parse(user);
        var url = "http://localhost:8000/notes/" + userJSON["user"].email;
        
        var request = new XMLHttpRequest();
        request.open("GET", url, false); 
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.send(null);
        setNotes(JSON.parse(request.responseText));
    }

    const submit = (event) => {
        event.preventDefault();
      }

    const discardGroup = () => {
        navigate('/groups');
    }

    return (  
        <div className='AddNote'> 
            <NavigationBar />
            <NavigationAboutMe />
            <div className="newNote"> 
                    <h1 id="not_sub_new">Grup nou</h1>
                    <form id="subject" onSubmit={submit}>

                        <div className="twoButtons">
                            <button id="renunta" onClick={discardGroup}>Renunță</button>
                            <button id="salveaza" type="submit">Salvează</button>
                        </div>

                        <div className="addGroup">
                            <label id="lGroup">Nume grup: </label>  
                            <input id="iGroup" type="text" minLength={2}
                                pattern="[A-Z][a-zA-Z\s]*"
                                title="Trebuie să conțină minim 2 litere și să înceapă cu literă mare."
                                required>
                            </input> 

                            <label id="lGroup">Utilizatorii grupului: </label>
                            <div className="mselect">
                                <Multiselect id="multi_select"
                                    isObject={false}
                                    options={users}
                                    ref={usersRef}
                                />
                            </div>

                            <label id="lGroup">Notițele partajate cu grupul: </label>
                            <div className="mselect">
                                <Multiselect id="multi_select"
                                    isObject={false}
                                    options={food}
                                />
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    )                   
}

export default AddGroup;