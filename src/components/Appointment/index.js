import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";


const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"

export default function Appointment(props) {

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

    const save = (name, interviewer) => {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)
      props.bookInterview(props.id, interview)
      .then(() => {transition(SHOW)})
    }

  const onDelete = () => {

    transition(DELETING)
    props.cancelInterview(props.id)
     .then(() => {transition(EMPTY)})
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && ( <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() =>{transition(CONFIRM)}} />)}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => {back()}}/>}
      {mode === SAVING &&  <Status message="Saving"/>}
      {mode === DELETING &&  <Status message="Deleting"/>}
      {mode === CONFIRM &&  ( <Confirm  message="Delete the appointment?" onConfirm={() => {onDelete()}} onCancel={() => {back()}}/>)}
    </article>
  );
}


