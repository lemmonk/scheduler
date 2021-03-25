export function getAppointmentsForDay(state, day) {
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

export function getInterview(state, interview) {
  
  if (!interview){
    return null;
  };
  
const id = interview.interviewer;
const interviewer = state.interviewers[id];
const result = {...interview, interviewer}

return result;
}

export function getInterviewersForDay(state, day) {
  
  let result = [];

  for (const d of state.days){
    if(d.name === day){
      d.interviewers.forEach(interviewer => {

        if(state.interviewers[interviewer])result.push(state.interviewers[interviewer]);

      });
    }
  }
  return result;
}