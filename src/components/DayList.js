import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {

  const days = props.days;

  const items = days.map(d =>
    <DayListItem
      key={d.id}
      name={d.name}
      spots={d.spots}
      selected={d.name === props.day}
      setDay={props.setDay}
    />
  );

  return (

    <ul>
      {items}
    </ul>

  )
}


