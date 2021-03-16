import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";


export default function DayListItem(props) {

  const interviewerClass = classnames("interviewers__item-image",{
    "interviewers__item-image": props.selected,
    "interviewers__item--selected": props.selected,
  });

  // const interviewerImageClass = classnames("interviewers__item-image",{
  //   "interviewers__item-image": props.selected,
  // });

  return (

    <li className={interviewerClass}>
  <img
    className={interviewerClass}
    src={props.avatar}
    alt={props.name}
  />
  {props.name}
</li>
  );
}


// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };