import React from "react";
import '../style/Groups.css';
import NavigationAboutMe from "./NavigationAboutMe";
import NavigationBar from "./NavigationBar";

const Groups = () => {
        return (
            <div className='Groups'>
                <NavigationBar />
                <NavigationAboutMe />
            <div className="content"> 
            <p>grupuri</p>
            </div>
            </div>  
        )      
    }

export default Groups;