import { React, useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import { useNavigate } from "react-router-dom";
import '../style/AddNote.css';
import { Multiselect } from "multiselect-react-dropdown";
import { createRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//rotunjire colturi select-uri
//daca se poate schimba optiunile sa scriem in romana in loc de "No options available" cand sunt toate optiunile alese

const AddGroup = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState();
    const [notes, setNotes] = useState();
    var usersRef = createRef('');
    var notesRef = createRef('');
    var nameRef = createRef('');

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
        var usersJson = (JSON.parse(request.responseText)).filter(u => u.email != userJSON["user"].email);
        setUsers(usersJson.map(u => u.email));
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

    const saveGroup = () => {
        //verificare ca nu sunt goale campurile si afisare toast de eroare
        var user = localStorage.getItem('user');
        var userJSON = JSON.parse(user);
        toast.success('Grupul a fost creat cu succes!',
        {position:toast.POSITION.TOP_RIGHT}); 
        sendGroup(userJSON);
        setTimeout(() => {
            navigate('/groups');
           }, 2000);
    }

    function sendGroup(userJSON) {
        var name = nameRef.current.value;
        var json = '{' + '"name":' + '"' + name + '"}'; 
        var url = "http://localhost:8000/groups/add";
        var request = new XMLHttpRequest();
        var groupId;
        request.open("POST", url, true); 
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.onreadystatechange = () => 
        { 
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                groupId = JSON.parse(request.responseText).id;
                sendGroupUser(userJSON, groupId);
                sendGroupNote(userJSON, groupId);
                
            }
        }
        request.send(json);
    }

    function sendGroupUser(userJSON, groupId) {
        var users = usersRef.current.getSelectedItems();
        
        var json = '{' +
            '"userEmail":' + '"' + userJSON["user"].email + '",' +
            '"groupId":' + '"' + groupId + '"}'; 
        sendUser(json, userJSON);

        for(var i = 0; i < users.length; i++) {
            json = '{' +
                '"userEmail":' + '"' + users[i] + '",' +
                '"groupId":' + '"' + groupId + '"}'; 
            sendUser(json, userJSON);
        }
    }

    function sendUser(json, userJSON) {
        var url = "http://localhost:8000/groups/add/user";
        var request = new XMLHttpRequest();
        request.open("POST", url, true); 
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.send(json);
    }

    function sendGroupNote(userJSON, groupId) {
        var notes = notesRef.current.getSelectedItems();
        
        for(var i = 0; i < notes.length; i++) {
            var json = '{' +
                '"noteId":' + '"' + notes[i].id + '",' +
                '"groupId":' + '"' + groupId + '"}'; 
            sendNote(json, userJSON);
        }
    }

    function sendNote(json, userJSON) {
        var url = "http://localhost:8000/groups/add/note";
        var request = new XMLHttpRequest();
        request.open("POST", url, true); 
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.onreadystatechange = () => 
        { 
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                
            }
        }
        request.send(json);
    }

    return (  
        <div className='AddNote'> 
            <NavigationBar />
            <NavigationAboutMe />
            <div className="newNote"> 
                    <h1 id="group_new">Grup nou</h1>
                    <form id="subject" onSubmit={submit}>

                        <div className="twoButtons">
                            <button id="renunta" onClick={discardGroup}>Renunță</button>
                            <button id="salveaza" type="submit" onClick={saveGroup}>Salvează</button>
                        </div>

                        <div className="addGroup">
                            <label id="lGroup">Nume grup: </label>  
                            <input id="iGroup" type="text" minLength={2}
                                title="Trebuie să conțină minim 2 litere și să înceapă cu literă mare."
                                required
                                ref={nameRef}
                                >
                            </input> 

                            <label id="lGroup">Utilizatorii grupului: </label>
                            <div className="mselect">
                                <Multiselect id="multi_select"
                                    isObject={false}
                                    options={users}
                                    ref={usersRef}
                                    placeholder="Selecteaza utilizatorii"

                                    style={{
                                        chips: {
                                          backgroundColor: '#24A19C'
                                        },
                                        searchBox: {
                                            backgroundColor:'#ddf3e6'
                                        },
                                        option: {
                                            backgroundColor: '#24A19C'
                                        }
                                    
                                      }}
                                />
                            </div>

                            <label id="lGroup">Notițele partajate cu grupul: </label>
                            <div className="mselect">
                                <Multiselect id="multi_select"
                                    isObject={true}
                                    options={notes}
                                    displayValue="title"
                                    ref={notesRef}
                                    placeholder="Selecteaza notitele"

                                    style={{
                                        chips: {
                                            backgroundColor: '#24A19C'
                                          },
                                          searchBox: {
                                              backgroundColor:'#ddf3e6'
                                          },
                                          option: {
                                              backgroundColor: '#24A19C'
                                          }
                                    
                                      }}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <ToastContainer/>
        </div>
    )                   
}

export default AddGroup;