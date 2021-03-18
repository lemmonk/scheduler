import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";


export default function DayListItem(props) {

  function formatSpots(spots){
    let result = 'no spots remaining';
    if(spots === 1) {
      result = '1 spot remaining';
    } else{
      result = `${spots} spots remaining`;
    }

    return result;
  }

  const dayClass = classnames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.full
  });


  return (

    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}