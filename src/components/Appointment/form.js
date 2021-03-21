import React from "react";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList.js";

import { useState } from 'react';

export default function Form(props) {

const [name, setName] = useState(props.name || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);

const update = (value) => {
  setName( () => {
    return value
  })
};


const set = value => {
  setInterviewer( () => {
    return value;
  })

}



  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(event) => update(event.target.value)}
        onSubmit={event => event.preventDefault()}
      />
    </form>

    <InterviewerList 
    interviewers={props.interviewers} 
    value={interviewer} 
    onChange={set} />

  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={props.onCancel} danger>Cancel</Button>
      <Button onClick={() => props.onSave(name, interviewer)} confirm>Save</Button>
    </section>
  </section>
</main>
);
}