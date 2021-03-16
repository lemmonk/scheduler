import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";


export default function DayListItem(props) {

  console.log('here',props)
  const interviewerClass = classnames("interviewers", {
  
  "interviewers__item--selected": props.selected,
  });

  const interviewerImgClass = classnames("interviewers__item-image", {
   
    "interviewers__item--selected": props.selected,
    "interviewers__item-image": props.selected,
  });


  return (

  <li className={interviewerClass} onClick={() => props.setInterviewer(props.name)}>
    <img
      className={interviewerImgClass}
      src={props.avatar}
      alt={props.name}
    
    />
  <label>{props.name}</label>
  </li>
);
}
