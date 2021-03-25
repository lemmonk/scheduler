import React, { Fragment } from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";
import Status from "components/Appointment/Status";
import "components/Appointment/styles.scss";

export default function Appointment(props) {

  //transition vars
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //set initial mode
  const { mode, transition, back } = useVisualMode(

    props.interview ? SHOW : EMPTY
  );

  //saves a new interview to the scheduler or handles error
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  }

  //deletes an existing interview from the schedule
  const deleting = () => {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  };

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={deleting}
          message="Are you sure you would like to delete this appointment?"
        />
      )}
      {mode === EDIT && (
        <Form
          onCancel={back}
          onSave={save}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          student={props.interview.student}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"An error has occurred"} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"An error has occurred"} onClose={back} />
      )}
    </article>
  );
}

