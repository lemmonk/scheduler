import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";


export default function DayListItem(props) {

  // const buttonClass = classnames("button", {
  //   "button--confirm": props.confirm,
  //   "button--danger": props.danger
  // });

  const dayClass = classnames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full":props.full
  });


  return (

    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}