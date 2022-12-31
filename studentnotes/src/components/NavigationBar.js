import React from 'react';
import '../style/NavigationBar.css';

class NavigationBar extends React.Component {
    render() {
        return (
            <nav className='NavigationBar'>
                <div className='navigation-list'>
                <a id='numeStudent'> NumeStudent</a>
                </div>
            </nav>
        )
    }
}

export default NavigationBar;
