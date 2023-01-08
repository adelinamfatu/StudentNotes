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

                <div className="studentGroups"> 
                    <h1 id="myGroups">Grupurile mele</h1>
                    <button onClick={addGroup} id="addGroup">+</button>
                </div>

                <div className='listOfGroups'>
                    
                </div>
            </div>  
        )      
    }

export default Groups;