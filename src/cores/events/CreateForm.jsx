import React from "react";
import Form from "./Form";
import * as eventsServices from "../../services/events.services";
import { useSelector } from "react-redux";


const CreateForm = () => {
  const {userToken} = useSelector(state => state.auth)
  const create = async (event) => {
    try {
      
      return await eventsServices.createEvent(userToken, {
        ...event,
        status: (event.status === 'Activo')
      });

    } catch (error) {
      if (error?.response?.data) {
        alert(error?.response?.data.message);
      }else{
          alert("Error del servidor al editar usuario")
      }
    }
  };

  return <Form action={create} />;
};

export default CreateForm;
