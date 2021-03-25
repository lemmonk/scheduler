import React from "react";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList.js";
import { useState } from 'react';

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // updates the student name state
  const update = value => {
    setName(() => {
      return value;
    })
  };

  // sets the interviewer state
  const set = value => {
    setInterviewer(() => {
      return value;
    })

  }

  //validates the user input before allowing an new interview to be booked
  const validate = () => {

    if (name === "") { 
      setError("Student name cannot be blank");
      return;
    }
                //<----- STRETCH add interviewer selected validation and test...

    setError("");
    props.onSave(name, interviewer);
  }

  // cancels the edit or create new interview process
  const cancel = () => {
    update('');
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => update(event.target.value)}
            onSubmit={event => event.preventDefault()}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={set} />

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>Cancel</Button>
          <Button onClick={() => validate()} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}