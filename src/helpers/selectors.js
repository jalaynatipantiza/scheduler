import Appointment from "components/Appointment";

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


//   export function getAppointmentsForDay(state, day) {
//     let appmtArr = state.days.filter(dayObj => dayObj.name === day)
//     if(appmtArr.length < 1){
//       return [];
//     }
//     appmtArr = appmtArr[0].appointments;
//     const results = appmtArr.map((elem) => {
//       return state.appointments[`${elem}`]
//     })
//     return results;
// }