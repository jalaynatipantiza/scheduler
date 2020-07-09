import React, {useState, useEffect} from "react";
import DayList from "components/DayList"

import "components/Application.scss";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay } from "helpers/selectors";


const axios = require('axios');

export default function Application(props) {

const setDay = day => setState({ ...state, day }); 


 const [state, setState] = useState({
   day: "Monday",
   days:[],
   appointments: {}
  });
  

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments"))
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }));
      })
  },[])
  

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
        { 
          getAppointmentsForDay(state, state.day).map(appointment => {
            return(
              <Appointment key={appointment.id} {...appointment} />
            );
          })
        }
      </section>
    </main>
  );
}
