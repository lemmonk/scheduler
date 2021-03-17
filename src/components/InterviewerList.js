import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js";
import "components/InterviewerList.scss";



export default function InterviewerList(props) {
   
  console.log('props',props)
  const interviewerElm = props.interviewers.map(each => 
  <InterviewerListItem 
    key={each.id}
    name={each.name} 
    avatar={each.avatar} 
    selected={each.id === props.value}
    setInterviewer={(event) => props.onChange(each.id)}  
  />
);

  return (

    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewerElm}</ul>
    </section>
  );
}
