import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";


const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVING";


export default function Appointment(props) {

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

    const save = (name, interviewer) => {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING, true)
      props.bookInterview(props.id, interview)
      .then(() => {transition(SHOW)})
      .catch(err => {transition(ERROR_SAVE, true)})
  
    }
    const edit = (name, interviewer) => {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING, true)
      props.editInterview(props.id, interview)
      .then(() => {transition(SHOW)})
      .catch(err => {transition(ERROR_SAVE, true)})

    }

    const onDelete = () => {

      transition(DELETING, true)
      props.cancelInterview(props.id)
      .then(() => {transition(EMPTY)})
      .catch(err => {transition(ERROR_DELETE, true)})
    }

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && ( <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() =>{transition(CONFIRM)}} onEdit={() => {transition(EDIT)}}/>)}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => {back()}}/>}
      {mode === SAVING &&  <Status message="Saving"/>}
      {mode === DELETING &&  <Status message="Deleting"/>}
      {mode === CONFIRM &&  ( <Confirm  message="Delete the appointment?" onConfirm={() => {onDelete()}} onCancel={() => {back()}}/>)}
      {mode === EDIT &&  <Form  name={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} onSave={edit} onCancel={() => {back()}}/> }
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={()=> {back()}}/>}
      {mode === ERROR_SAVE &&  <Error message="Could not save appointment." onClose={() => back()}/>}
    </article>

  );
}


