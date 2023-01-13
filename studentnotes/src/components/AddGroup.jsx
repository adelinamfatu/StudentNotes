import React, {useState} from "react";
import NavigationBar from "./NavigationBar";
import NavigationAboutMe from "./NavigationAboutMe";
import { useNavigate } from "react-router-dom";
import '../style/AddNote.css';
import Multiselect from "multiselect-react-dropdown";

// import Select from 'react-select'


const AddGroup = () => {
    const [food,setFood] = useState(["Burger", "Pizza", "Sandwich"])
    

    return (  
        <div className='AddNote'> 
            <NavigationBar />
            <NavigationAboutMe />
            <div className="newNote"> 
                    <h1 id="not_sub_new">Grup nou</h1>
                    <form id="subject">

                        <div className="twoButtons">
                            <button id="renunta">Renunță</button>
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
                                    options={food}
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