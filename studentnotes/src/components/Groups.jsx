import { React, useState, useEffect } from "react";
import '../style/Groups.css';
import NavigationAboutMe from "./NavigationAboutMe";
import NavigationBar from "./NavigationBar";
import { useNavigate, createSearchParams } from "react-router-dom";
import remove_icon from '../images/remove_icon.png'
import folder from '../images/folder1.png'


function Group({items}) {
    const navigate = useNavigate();

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

                        <div id="btn_delete" onClick=
                        {() => 
                            {
                            //delete note
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
            </div>  
        )      
    }

export default Groups;