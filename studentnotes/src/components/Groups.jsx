import React from "react";
import '../style/Groups.css';
import NavigationAboutMe from "./NavigationAboutMe";
import NavigationBar from "./NavigationBar";

function Group({items}) {
    return (
        <>
            {
                items.map(item => (
                    <a className="functGroup">
                        {item.name} 
                    </a>
                ))
            }
        </>
    )
}

const Groups = () => {

    const addGroup = () => {

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
                    <h1 id="myGroups">Grupurile mele</h1>
                    <button onClick={addGroup} id="addGroup">+</button>
                </div>

                <div className='listOfGroups'>
                    {<Group items={arr_groups}/>}
                </div>
            </div>  
        )      
    }

export default Groups;