import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Friday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  //book interview
  function bookInterview(id, interview) {
   
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //update spots
    const spots = updateSpots(state.day, state.days, appointments);
    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState({
        ...state,
        appointments,
        spots,
      });
    });
  }


  //cancel apps
  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };


    //update spots
    const spots = updateSpots(state.day, state.days, appointments);

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments,
        spots,
      });
    });
  };

  
  function updateSpots(dayName, days, appointments) {
   
    const day = days.find((item) => item.name === dayName);
    const interviewSpots = spotsAvailable(day, appointments);
    const dayArray = days.map((item) => {
      if (item.name === dayName) {
        item.spots = interviewSpots;
        return { ...item, spots: interviewSpots };
      }
      return item;
    });
    return dayArray;
  }


  function spotsAvailable(dayObj, appointments) {
    let count = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++;
      }
    }
    return count;
  }

  //fetch data

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}