import React from "react";
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
                        {item.name} 
                    </a>
                ))
            }
        </>
    )
}

//grupul sa fie apasabil - sa apara mouse-ul cu manuta pe deasupra

const Groups = () => {
    const navigate = useNavigate();

    const addGroup = () => {
        navigate('/addgroup');
    }

    const arr_groups = 
    [ 
        {
            "name":"grup_1"
        }, 
        {
            "name":"grup_2"
        },
        {
            "name":"grup_3"
        }, 
        {
            "name":"grup_4"
        },
        {
            "name":"grup_5"
        }, 
        {
            "name":"grup_6"
        }
    ]

        return (
            <div className='Groups'>
                <NavigationBar />
                <NavigationAboutMe />

                <div className="studentGroups"> 
                    <h1 className="myGroups">Grupurile mele</h1>
                    <button onClick={addGroup} id="addGroup">+</button>
                </div>

                <div className='listOfGroups'>
                    {<Group items={arr_groups}/>}
                </div>
            </div>  
        )      
    }

export default Groups;