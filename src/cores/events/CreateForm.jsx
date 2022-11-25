import React from "react";
import Form from "./Form";
import * as eventsServices from "../../services/events.services";


const CreateForm = () => {

  const create = async (event) => {
    try {
      if (event.status === "Activo"){
        event.status = true;
      } else {
        event.status = false;
      }

      const data = await eventsServices.createEvent(event);
      return data;
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
