import React from "react";
import '../style/Groups.css';
import NavigationAboutMe from "./NavigationAboutMe";
import NavigationBar from "./NavigationBar";

const Groups = () => {

    const addGroup = () => {

    }

        return (
            <div className='Groups'>
                <NavigationBar />
                <NavigationAboutMe />
            <div className="content"> 
                <h1 id="grupurile mele">Grupurile mele</h1>
                <button onClick={addGroup} id="addgroup">+</button>
            </div>
            </div>  
        )      
    }

export default Groups;