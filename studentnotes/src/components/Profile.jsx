import React from "react";
import '../style/Profile.css';
import NavigationAboutMe from "./NavigationAboutMe";
import NavigationBar from "./NavigationBar";

const Profile = () => {
        return (
            <div className='Profile'>
                <NavigationBar />
                <NavigationAboutMe />
            <div className="content"> 
            <p>profil</p>
            </div>
            </div>  
        )      
    }

export default Profile;