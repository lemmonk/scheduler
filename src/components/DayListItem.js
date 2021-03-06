import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {

  //formats the UI string for spots remaining text
  function formatSpots(spots) {
    let result = 'no spots remaining';

    if (spots === 0) {
      result = 'no spots remaining';
    } else if (spots === 1) {
      result = '1 spot remaining';
    } else {
      result = `${spots} spots remaining`;
    }
    return result;
  }

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.full
  });

  return (

    <li data-testid='day' className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}