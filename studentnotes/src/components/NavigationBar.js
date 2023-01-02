import React from 'react';
import '../style/NavigationBar.css';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className='NavigationBar'>
                <div className='navigation-list'>
                    <p id='studentName'>Nume student</p>
                    <p id='studentFaculty'>Facultate</p>
                    <p id='studentField'>Specializare</p>
                </div>
            </nav>
        )
    }
}

export default NavigationBar;