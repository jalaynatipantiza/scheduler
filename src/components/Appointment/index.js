import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";


const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";

export default function Appointment(props) {

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={[]} onSave={() => {console.log('onSave')}} onCancel={() => {back()}}/>}
    </article>
  );
}