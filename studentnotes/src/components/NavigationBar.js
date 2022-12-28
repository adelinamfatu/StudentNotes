import React from 'react';
import './NavigationBar.css';

class NavigationBar extends React.Component {
    render() {
        return (
            <nav className='NavigationBar'>
                <div className='navigation-list'>
                <a id='numeStudent'> NumeStudent</a>
                <a href='/cursuri' className='navigation-links'> Cursuri</a>
                <a href='/seminare' className='navigation-links'> Seminare</a>
                </div>
            </nav>
        )
    }
}

export default NavigationBar;
