import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/AddNote.css';
import { useNavigate } from "react-router-dom";

const AddSubject = () => {
    var fullName = null;
    var field = null;
    var faculty = null;
    const navigate = useNavigate();
    window.addEventListener('load', onLoad);

    function onLoad() {
        var user = localStorage.getItem('user');
        if(!user) {
            navigate('/login');
        }

        var userJSON = JSON.parse(user);
        var url = "http://localhost:8000/users/" + userJSON["user"].email;
        
        var request = new XMLHttpRequest();
        request.open("GET", url, false); 
        request.setRequestHeader("x-access-token", userJSON["user"].token);
        request.send(null);
        var json = JSON.parse(request.responseText);
        fullName = json["surname"] + " " + json["name"];
        faculty = json["faculty"];
        field = json["field"];
    }

    const discardNote = () => {
        navigate('/notes');
    };

    const saveNote = () => {

    }
        return (  
            <div className='AddNote'> 
                <NavigationBar />
                <NavigationAboutMe />
                <div className="newNote"> 
                    <h1>Materie nouă</h1>
                    {/* <div>
                    <button onClick={discardNote} id="renunta">Renunță</button>
                    <button onClick={saveNote} id="salveaza" type="submit">Salvează</button>
                    </div> */}

                    <form id="subject">
                        <button onClick={discardNote} id="renunta">Renunță</button>
                        <button onClick={saveNote} id="salveaza" type="submit">Salvează</button>

                        <div>
                            <label id="lSubject">Denumire materie:  
                                <input id="iSubject" type="text" 
                                    pattern="([A-Z][a-z]+$)"
                                    title="Trebuie să conțină minim 2 litere și să înceapă cu literă mare." 
                                    required>
                                </input> 
                            </label>   
                        </div>
                        <div>
                            <label id="lAbbr">Prescurtare denumire: 
                                <input id="iAbbr" type="text" 
                                    pattern="([A-Z][A-Z]+$)"
                                    title="Minim 2 litere. Doar litere mari."
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