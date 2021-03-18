import React from "react";
import { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';
import getAppointmentsForDay from 'helpers/selectors'
export default function Application(props) {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Friday",
    days: [],
    setDay: setDay,
   
    appointments: {},
    interviewers: {}
  });
  
 
  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2] }));
     
    })

  },[]);
 
  const daylist = <DayList days={state.days} day={state.day} setDay={setDay} />;


  // function getAppointmentsForDay(state, day) {
   
  //   let result = [];
  
  //   for (const d of state.days){
  //     if(d.name === day){
  //       d.appointments.forEach(app => {
  //         result.push(state.appointments[app]);
  //       });
  //     }
  //   }
  //   return result;
  // }


let apps = [];
apps.push(<Appointment key="last" time="5pm" />);
if(state.days.length > 0) {
 
  const dailyAppointments = getAppointmentsForDay(state,state.day);

   apps = dailyAppointments.map(appointment => 
    <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />
  );
  apps.push(<Appointment key="last" time="5pm" />);
}


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
        {apps}
      </section>
    </main>
  );
}
