import {useState, useEffect} from "react"

import axios from 'axios';
import { increaseSpot, decreaseSpot } from "helpers/selectors";

export default function useApplicationData(){
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
      
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
       
      })
  },[])


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
      .then(() => {
        const newState = decreaseSpot(state)
        setState({...newState, appointments })}
      )
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
    .then (()=> { 
      state.appointments[id].interview = null;
      const newState = increaseSpot(state)
      setState({...newState})
    })
  }


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}