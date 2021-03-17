import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/header.js";
import Show from "components/Appointment/show.js";
import Empty from "components/Appointment/empty.js";
// import classnames from "classnames";


export default function Appointment(props) {
 
 const isEmpty = !props.interview ? <Empty/> : <Show 
                                                student={props.interview.student} 
                                                interviewers={props.interview.interviewer}/>;

  return (

    <article className="appointment">
    <Header
    key={props.id}
    time={props.time}
    />
    {isEmpty}
   
    
    
    </article>
);
}
