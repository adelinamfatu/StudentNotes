import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/AddNote.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import img1 from '../images/img2.jpg';

//rezolvare bug titlu - nu se vede cercul din jurul lui

const AddSubject = () => {
    var titleRef = useRef(null);
    var tagRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        var user = localStorage.getItem('user');
        if(!user) {
            navigate('/login');
        }
    });

    const discardSubject = () => {
        navigate('/subjects');
    };

    const verifyTitleAndTag = (title, tag) => {
        if(/[A-Z]/.test(title[0]) &&
            /^[A-Z]+$/.test(tag)) {
                return true;
            }
        return false;
    }

    const saveSubject = () => {
        var user = localStorage.getItem('user');
        var title = titleRef.current.value;
        var tag = tagRef.current.value;
        var userJSON = JSON.parse(user);

        var tagAndTitleOK = verifyTitleAndTag(title, tag);
        if(tagAndTitleOK === true) {
            var json = '{' +
                    '"userEmail":' + '"' + userJSON["user"].email + '",' +
                    '"title":' + '"' + title + '",' +
                    '"tag":' + '"' + tag + '"}'; 
            sendSubject(userJSON, json);
        }
        else {
            //toast de eroare - datele nu sunt sub formatul corect
        }
    }

    function sendSubject(userJSON, json) {
        var url = "http://localhost:8000/subjects/add";
        var request = new XMLHttpRequest();
        request.open("POST", url, true); 
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.onreadystatechange = () => 
        { 
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                toast.success('Materie creata cu succes',
                    {position:toast.POSITION.TOP_RIGHT});
            }
            else if(request.readyState === XMLHttpRequest.DONE && request.status != 200) {
                toast.error('Materia exista deja',
                    {position:toast.POSITION.TOP_RIGHT});
                //golire input de tag
            }
        }
        request.send(json);
    }

    const submit = (event) => {
        event.preventDefault();
    }

    
        return (  
            <div className='AddNote'> 
                <NavigationBar />
                <NavigationAboutMe />
                <div className="newNote"> 
                    <h1 id="not_sub_new">Materie nouă</h1>
                    <form id="subject" onSubmit={submit}>
                        <div className="twoButtons">
                            <button onClick={discardSubject} id="renunta">Renunță</button>
                            <button onClick={saveSubject} id="salveaza" type="submit">Salvează</button>
                        </div>

                        <ToastContainer />

                        <div className="addSubject">
                            <label id="lSubject">Denumire materie: </label>  
                            <input id="iSubject" type="text" minLength={2}
                                pattern="[A-Z][a-zA-Z\s]*"
                                title="Trebuie să conțină minim 2 litere și să înceapă cu literă mare." 
                                ref={titleRef}
                                required>
                            </input> 
                               
                        </div>
                        <div>
                            <label id="lAbbr">Prescurtare denumire: </label>
                            <input id="iAbbr" type="text" minLength={2} maxLength={4}
                                pattern="[A-Z][A-Z]*"
                                title="Minim 2 litere. Doar litere mari."
                                ref={tagRef}
                                required>
                            </input> 
                            
                        </div>
                        <div>
                            <img src={img1} id="img_addSubject" />
                        </div>
                    </form>
                </div>
            </div>
        )                   
}
export default AddSubject;