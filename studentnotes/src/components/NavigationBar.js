import React from 'react';
import '../style/NavigationBar.css';
import logo from '../images/brain.png'
import logout from '../images/logout.png'


class NavigationBar extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    delogare() {
        localStorage.removeItem("user");
      }

    render() {
        
        return (
            <nav className='NavigationBar'>
                <img src={logo} id='imgLogo' />
                <div className='navigation-list'>
                    <p id='studentName'>Nume student</p>
                    <p id='studentFaculty'>Facultate</p>
                    <p id='studentField'>Specializare</p>
                </div>
                <a href='/login' onClick={this.delogare}><img src={logout} id='imgLogout' /></a>
                <a href='/login' className="btn_logout" onClick={this.delogare}>Delogare</a>
                
            </nav>
        )
    }
}




export default NavigationBar;