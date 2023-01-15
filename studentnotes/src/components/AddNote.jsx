import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import '../style/AddNote.css';
import { useNavigate } from "react-router-dom";
import CreateNote from "./CreateNote";
import { useEffect } from "react";

const AddNote = () => {
    const navigate = useNavigate();

    useEffect(() => {
        var user = localStorage.getItem('user');
        if(!user) {
            navigate('/login');
        }
    });

        return (  
            <div className='AddNote'> 
                <NavigationAboutMe />
                <NavigationBar />
                <div className="newNote"> 
                    <h1 id="not_new">Notiță nouă</h1>
                    
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