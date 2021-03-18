import React from "react";
import { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "12pm",
  },
  {
    id: 4,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
];

export default function Application(props) {

 
  const setDay = day => setState({ ...state, day });


  const [state, setState] = useState({
    day: "Friday",
    days: [],
    setDay: setDay,
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    // appointments: {}
  });
  
  
  const setDays = (days) => {
 
    setState(prev => ({ ...prev, days }));
}
  
  useEffect(() => {

    axios.get('/api/days')
    .then(res => {
      console.log('res:',res.data);
      setDays(res.data)
      
    }).catch(err =>{
      console.log(err);
    })


  },[state.day]);

  const daylist = <DayList days={state.days} day={state.day} setDay={setDay} />;

  const map = appointments.map(appointment => 
  <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />
  
);


  map.push(<Appointment key="last" time="5pm" />);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">{daylist}</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {map}
      </section>
    </main>
  );
}
