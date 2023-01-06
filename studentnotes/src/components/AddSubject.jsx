import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/AddNote.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        //title contine prima litera mare, numai litere si mari si mici - uita-te la register
        //tag contine numai litere mari - maxim 4 caractere in total
        //returneaza true daca ambele conditii se indeplinesc, false altfel
        return true;
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
                //request-urile merg corect dar toast-ul nu se afiseaza - cred ca nu stiu eu sa il folosesc bine
                toast.success('Materie creata cu succes',
                    {position:toast.POSITION.TOP_RIGHT});
                console.log("succes");
            }
            else if(request.readyState === XMLHttpRequest.DONE && request.status != 200) {
                toast.error('Materia exista deja',
                    {position:toast.POSITION.TOP_RIGHT});
                //golire tag
            }
        }
        request.send(json);
    }

    const submit = (event) => {
        event.preventDefault();
    }

    //scoate spatiul dintre butoane si materiile mele
    //inputurile pe randuri separate fata de label-uri
    //corectare erori
    //adauga o poza daca gasesti jos ca sa nu arate asa gol
        return (  
            <div className='AddNote'> 
                <NavigationBar />
                <NavigationAboutMe />
                <div className="newNote"> 
                    <h1>Materie nouă</h1>
                    <form id="subject" onSubmit={submit}>
                        <button onClick={discardSubject} id="renunta">Renunță</button>
                        <button onClick={saveSubject} id="salveaza" type="submit">Salvează</button>
                        <div>
                            <label id="lSubject">Denumire materie:  
                                <input id="iSubject" type="text" 
                                    pattern="([A-Z][a-z]+$)"
                                    title="Trebuie să conțină minim 2 litere și să înceapă cu literă mare." 
                                    ref={titleRef}
                                    required>
                                </input> 
                            </label>   
                        </div>
                        <div>
                            <label id="lAbbr">Prescurtare denumire: 
                                <input id="iAbbr" type="text" 
                                    pattern="([A-Z][A-Z]+$)"
                                    title="Minim 2 litere. Doar litere mari."
                                    ref={tagRef}
                                    required>
                                </input> 
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        )                   
}
export default AddSubject;