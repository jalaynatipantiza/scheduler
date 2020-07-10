import React, {useState, useEffect} from "react";
import DayList from "components/DayList"

import "components/Application.scss";
import "./Appointment/styles.scss"
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

const axios = require('axios');


export default function Application(props) {

const setDay = day => setState({ ...state, day }); 

 const [state, setState] = useState({
   day: "Monday",
   days:[],
   appointments: {},
   interviewers: {}
  });
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ])
      .then((all) => {
        console.log(all[2].data);
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
  },[])

  
    const appointments = getAppointmentsForDay(state, state.day);
    const schedule = appointments.map(appointment => {
      const interview = getInterview(state, appointment.interview);
        return(
          <Appointment 
            key={appointment.id}
                {...appointment} 
          interview={interview}
        />
        );
    })
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList key={state.days.id} days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
         {schedule}     
       </section>
    </main>
  );
}
