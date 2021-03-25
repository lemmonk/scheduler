import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";


export default function DayListItem(props) {

 
  const interviewerClass = classnames("interviewers", {
  
  "interviewers__item--selected": props.selected,
  });

  return (

  <li className={interviewerClass} onClick={props.setInterviewer}>
    <div className='imjo'>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
   
   </div>
      {props.selected && props.name}
  </li>
);
}
