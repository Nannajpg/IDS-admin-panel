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
    } catch(e) {
      console.log(e);
    }
  };

  return <Form action={create} />;
};

export default CreateForm;
