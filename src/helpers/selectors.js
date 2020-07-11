export function getAppointmentsForDay(state, day) {
    let appointmentArr = state.days.filter(dayObject => dayObject.name === day)
    if(appointmentArr.length < 1) {
      return [];
    }
    let appt = appointmentArr[0].appointments;
    const results = appt.map((element) => {
      return state.appointments[`${element}`]
    })
    return results;
  }

  export function getInterview(state, interview) {
    if(!interview) {
      return null;
    }
    const results = {
      interviewer: state.interviewers[`${interview.interviewer}`],
      student: interview.student
    }
    return results;
  }


  export function getInterviewersForDay(state, day) {
    let dayObject = state.days.filter(dayObj => dayObj.name === day)
    if(dayObject.length < 1) {
      return [];
    }
    let interviewersArr = dayObject[0].interviewers;
    const results = interviewersArr.map((element) => {
      return state.interviewers[`${element}`]
    })
    return results;
  }
 
  export function increaseSpot(state) {
    let dayArr = state.days.filter(dayObject => dayObject.name === state.day)

    const updatedSpot = dayArr[0].spots + 1
    const dayKey = dayArr[0].id - 1
    
     state.days[dayKey].spots = updatedSpot
     return state;

  }
  export function decreaseSpot(state) {
    let dayArr = state.days.filter(dayObject => dayObject.name === state.day)

    const updatedSpot = dayArr[0].spots - 1
    const dayKey = dayArr[0].id - 1
    
     state.days[dayKey].spots = updatedSpot
     return state;

  }