import React from "react";
import Form from "./Form";
import * as eventsServices from "../../services/events.services";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateForm = () => {
  const {userToken} = useSelector(state => state.auth)
  const create = async (event) => {
    try {
      return await eventsServices.createEvent(userToken, {
        ...event,
        status: (event.status === 'Ativo')
      });
    } catch (error) {
      if (error.response) {
        throw new Error(
          error?.response?.data.message
        );
      }
      toast.error(error.message);
    }
  };

  return <Form action={create} />;
};

export default CreateForm;
