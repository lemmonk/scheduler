
export default function getAppointmentsForDay(state, day) {
  let result = [];
  
  for (const d of state.days){
    if(d.name === day){
      d.appointments.forEach(app => {
        result.push(state.appointments[app]);
      });
    }
  }
  return result;
}