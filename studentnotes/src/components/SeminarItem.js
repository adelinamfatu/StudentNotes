import React from "react";

class SeminarItem extends React.Component {
    render() {
        return (
            <div className='SeminarItem'> 
                <h1> {this.props.title } </h1>
            </div>
        )
    }
}

export default SeminarItem


//UN SEMINAR