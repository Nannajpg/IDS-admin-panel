import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from './Form';
import * as eventsServices from '../../services/events.services';
import { editEvent } from '../../features/events/eventSlice';


const EditForm = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const edit = async (event, id) => {
    try {

      if (event.status === "Activo"){
        event.status = true;
      } else {
        event.status = false;
      }
      await eventsServices.editEvent(event, id);
      dispatch(editEvent(event));
    } catch (e) {
      alert(e);
    }
  }
  
  return (
    <Form action={edit} id={id} />
  )
}

export default EditForm; 