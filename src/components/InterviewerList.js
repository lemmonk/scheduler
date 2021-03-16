import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js";
import "components/InterviewerList.scss";



export default function InterviewerList( {interviewers, interviewer, setInterviewer}) {
                      
  
const interviewerElm = interviewers.map(each => 
  <InterviewerListItem 
    key={interviewer}
    name={each.name} 
    avatar={each.avatar} 
    selected={each.id === interviewer}
    setInterviewer={(event) => setInterviewer(each.id)}  
  />
);

  return (

    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewerElm}</ul>
    </section>
  );
}
