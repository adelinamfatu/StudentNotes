import React from "react";
import './CourseItem.css';


class CourseItem extends React.Component {
    render() {
        return (
            <div className='CourseItem'> 
                <h1 className='courseItem'> {this.props.title } </h1>
            </div>
        )
    }
}

export default CourseItem


//UN CURS