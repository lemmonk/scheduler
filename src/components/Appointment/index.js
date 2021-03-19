import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/header.js";
import Show from "components/Appointment/show.js";
import Empty from "components/Appointment/empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/form";
// import classnames from "classnames";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={[]} onCancel={back} />}
    </article>
  );
}
