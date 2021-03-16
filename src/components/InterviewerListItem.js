import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";


export default function DayListItem(props) {

 
  const interviewerClass = classnames("interviewers", {
  
  "interviewers__item--selected": props.selected,
  });

  // const interviewerImgClass = classnames("interviewers__item-image", {
   
  //   "interviewers__item--selected": props.selected,
  //   "interviewers__item-image": props.selected,
  // });


  return (

  <li className={interviewerClass} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    
    />
      {props.selected && props.name}
  </li>
);
}