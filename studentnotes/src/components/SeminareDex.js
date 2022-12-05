import React from "react";
import { listOfSeminare } from "./SeminareList";
import SeminarItem from "./SeminarItem";

class SeminareDex extends React.Component {
    render() {
        return (
            <div className='SeminareDex'>
                <div className='listofSeminare'>
                <ul>
                    {listOfSeminare.map((item, index) => {
                        return(
                            <div>
                            <li key={index}>
                              <a>{item.title}</a>
                            </li>
                            </div>
                        )
                    })}
                </ul>
                </div>
            </div>
        )
    }
}
export default SeminareDex


//LISTA DE SEMINARE