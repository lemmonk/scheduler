export default function getInterview(state, interview) {
  
  if (!interview){
    return null;
  };
  
const id = interview.interviewer;
const interviewer = state.interviewers[id];
const result = {...interview, interviewer}

return result;
}