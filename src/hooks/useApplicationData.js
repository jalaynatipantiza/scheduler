import {useState, useEffect} from "react"

import axios from 'axios';

export default function useApplicationData(){
  const setDay = day => setState({ ...state, day }); 

  const [state, setState] = useState({
   day: "Monday",
   days:[],
   appointments: {},
   interviewers: {}
  });
  
  function bookInterview(id, interview){

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
     return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {setState({
        ...state,
        appointments
      })})
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
    .then (()=> {
      state.appointments[id].interview = null;
      setState({...state})
    })
  }


  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ])
      .then((all) => {
      
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      })
  },[])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}