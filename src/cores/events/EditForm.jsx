import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
import * as eventsServices from '../../services/events.services';
import { editEvent } from '../../features/events/eventSlice';
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditForm = () => {
  const dispatch = useDispatch();
  const {userToken} = useSelector(state => state.auth)
  const events = useSelector((state)=> state.events.eventsAll)
  const { id } = useParams();
  const [eventFound, setEventFound] = useState();

  const edit = async (event, id) => {
    try {
      if (event.status === "Activo"){
        event.status = true;
      } else {
        event.status = false;
      }
      await eventsServices.editEvent(userToken, event, id);
      dispatch(editEvent(event));
    } catch (error) {
        if (error.response) {
          throw new Error(
            error?.response?.data.message || "Error al editar evento"
          );
        }
      toast.error(error.message);
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