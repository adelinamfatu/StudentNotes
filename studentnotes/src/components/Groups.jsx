import { React, useState, useEffect } from "react";
import '../style/Groups.css';
import NavigationAboutMe from "./NavigationAboutMe";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";

function Group({items}) {
    return (
        <>
            {
                items.map(item => (
                    <a className="functGroup" key={item.id}>
                        {item.group.name} 
                    </a>
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
                <NavigationBar />
                <NavigationAboutMe />

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