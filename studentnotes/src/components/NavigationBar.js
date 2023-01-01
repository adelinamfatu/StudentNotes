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
                    <p id='studentName'>{this.props.fullName}</p>
                    <p id='studentFaculty'>{this.props.faculty}</p>
                    <p id='studentField'>{this.props.field}</p>
                </div>
            </nav>
        )
    }
}

export default NavigationBar;