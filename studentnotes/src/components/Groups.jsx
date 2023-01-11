import React from "react";
import '../style/Groups.css';
import NavigationAboutMe from "./NavigationAboutMe";
import NavigationBar from "./NavigationBar";

//adaugare pagina de adaugare grup - similar cu add subject:
//trebuie facut AddGroup.js
//trebuie adaugata ruta in App.js
//ca si content - Grup nou
//              Renunta Salveaza
//              Nume grup - input normal ca la materii
//              Utilizatorii grupului - select multiplu
//              Notitele partajate cu grupul - select multiplu
// pt select multiplu: https://react-select.com/home sau https://codesandbox.io/s/givp5
// alegi care ti se pare mai usor

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