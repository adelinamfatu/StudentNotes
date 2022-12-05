import React from 'react';
import {AboutMeMenu} from './AboutMeMenu.js';
import './NavigationAboutMe.css';
class NavigationAboutMe extends React.Component {
    render() {
        return (
            <nav className='NavigationAboutMe'>
                <div className='aboutMe-list'>
                <a href='/profile' className='aboutMe-links'> Profil</a>
                <a href='/grupuri' className='aboutMe-links'> Grupuri</a>
                <a href='/mesaje' className='aboutMe-links'> Mesaje</a>
                </div>
            </nav>
        )
    }
}

export default NavigationAboutMe;