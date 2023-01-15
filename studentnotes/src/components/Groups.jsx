import { React, useState, useEffect } from "react";
import '../style/Groups.css';
import NavigationAboutMe from "./NavigationAboutMe";
import NavigationBar from "./NavigationBar";
import { useNavigate, createSearchParams } from "react-router-dom";
import remove_icon from '../images/remove_icon.png';
import { ToastContainer, toast } from 'react-toastify';

function Group({items}) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [userJSON, setUserJSON] = useState('');

    const toggleShowModal = () => {
        setShowModal(!showModal);
      };
  
    const ModalGroups = ({ show, onCloseButtonClick }) => {
        if (!show) {
        return null;
        }
        
          return (
            <div className="modal-wrapper-groups">
              <div className="modal-groups">
              <div className="title-groups">Atenție!</div>
                <div className="body-groups">
                   Sunteți sigur că doriți să ieșiți din grup?
                </div>
                <div className="footer-groups">
                 <button onClick={onCloseButtonClick} id="modalNuBtn">Nu</button> 
                  <button id="modalDaBtn" onClick={removeUserFromGroup}>Da</button>
                </div>
              </div>
            </div>
          );
        };

        function removeUserFromGroup() {
            var url = "http://localhost:8000/groups/remove/" + userJSON["user"].email + "/" + id;
                                
            console.log(url);
            var request = new XMLHttpRequest();
            request.open("DELETE", url, false); 
            request.setRequestHeader("x-access-token", userJSON["user"].token);
            request.onreadystatechange = () => 
            { 
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    toast.success('Ați părăsit grupul cu succes!',
                        {position:toast.POSITION.TOP_RIGHT})
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 2000);
                }
            }
            request.send(null);
        }

    return (
        <>
            {
                items.map(item => (
                    <div className="groupsList">
                        <div className="functGroup" key={item.group.id} onClick=
                            {() => {
                                navigate({
                                    pathname: "/notes",
                                    search: createSearchParams({
                                        groupId: item.group.id
                                    }).toString()
                                });
                            }}>
                            {item.group.name} 
                        </div>
                        <ModalGroups show={showModal} onCloseButtonClick={toggleShowModal} />
                        <div id="btn_delete" onClick=
                        {() => 
                            {
                                var user = localStorage.getItem('user');
                                setUserJSON(JSON.parse(user));
                                setShowModal(!showModal);
                                setId(item.group.id);
                            }}>
                            <img src={remove_icon}></img>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

const Groups = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState();

    useEffect(() => {
        var user = localStorage.getItem('user');
        if(!user) {
            navigate('/login');
        }
        else {
            var userJSON = JSON.parse(user);
            var url = "http://localhost:8000/groups/" + userJSON["user"].email;
            
            var request = new XMLHttpRequest();
            request.open("GET", url, false); 
            request.setRequestHeader("x-access-token", userJSON["user"].token);
            request.send(null);
            setGroups(JSON.parse(request.responseText));
        }
    }, [])

    const addGroup = () => {
        navigate('/addgroup');
    }
    
        return (
            <div className='Groups'>
                <NavigationAboutMe />
                <NavigationBar />
                <div className="studentGroups"> 
                    <h1 className="myGroups">Grupurile mele</h1>
                    <button onClick={addGroup} id="addGroup">+</button>
                </div>
                <div className='listOfGroups'>
                    {groups && <Group items={groups}/>}
                </div>
                <ToastContainer />
            </div>  
        )      
    }

export default Groups;