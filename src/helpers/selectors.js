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