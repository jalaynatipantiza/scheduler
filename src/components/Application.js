import React, {useState} from "react";
import DayList from "components/DayList"

import "components/Application.scss";
import Appointment from "components/Appointment/index";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "2pm",
    interview: {
      student: "Landon Tipantiza",
      interviewer: {
        id: 2,
        name: "Geraldin",
        avatar: "https://i.imgur.com/T2WwVfS.png" ,
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Maya Provance",
      interviewer: {
        id: 3,
        name: "Jane Doe",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "5pm",
    interview: {
      student: "Sven Doe",
      interviewer: {
        id: 3,
        name: "Chanelle",
        avatar: "https://i.imgur.com/T2WwVfS.png" ,
      }
    }
  },
  {
    id: 5,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
]; 
export default function Application(props) {

  const [day, setDay] = useState("Monday");

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
        <DayList key={days.id} days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { 
          appointments.map(appointment => {
            return(
              <Appointment key={appointment.id} {...appointment} />
            );
          })
        }
      </section>
    </main>
  );
}
