import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/AddNote.css';
import { useNavigate } from "react-router-dom";
import CreateNote from "./CreateNote";

//1. reparare butoane de renunta si salvare
//2. testare daca restul paginilor arata cum trebuie
//3. stilizare pagina dupa template - 2 coloane, una cu textarea si una cu markdown

const AddNote = () => {
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
                    <h1 id="notitaNoua">Notiță nouă</h1>
                    
                        <div>
                            <br></br>
                            <div className="create">
                                <CreateNote/>
                            </div>
                        </div>
                </div>
            </div>
        )                   
}
export default AddNote;