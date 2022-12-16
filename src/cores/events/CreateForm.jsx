import React from "react";
import Form from "./Form";
import * as eventsServices from "../../services/events.services";


const CreateForm = () => {

  const create = async (event) => {
    try {
      return await eventsServices.createEvent({
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
