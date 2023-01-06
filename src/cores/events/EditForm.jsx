import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
import * as eventsServices from '../../services/events.services';
import { editEvent } from '../../features/events/eventSlice';
import { useState, useEffect } from "react";


const EditForm = () => {
  const dispatch = useDispatch();
  const {userToken} = useSelector(state => state.auth)
  const events = useSelector((state)=> state.events.eventsAll)
  const { id } = useParams();
  const [eventFound, setEventFound] = useState();

  const edit = async (event, id) => {
    try {
      const eventData = {
      ...event,
      status: !!(event.status === "Activo")
      }
      await eventsServices.editEvent(userToken, eventData, id);
      dispatch(editEvent(eventData));

    } catch (error) {
      if (error?.response?.data) {
        alert(error?.response?.data.message);
      }else{
          alert("Error del servidor al editar evento")
      }
    }
  }
  useEffect(() => {
    if (id) {
      setEventFound(
        events.find((event) => {
          return event.id === Number(id);
        })
      );
    }
  }, [id, events]);
  
  return (
    <Form action={edit} id={id} toEditEvent={eventFound}/>
  )
}

export default EditForm; 