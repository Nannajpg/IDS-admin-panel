import React from "react";
import Form from "./Form";
import * as eventsServices from "../../services/events.services";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from "../../features/global/globalSlice";

const CreateForm = () => {
  const {userToken} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const create = async (event) => {
    try {
      dispatch(setLoading(true));
      return await eventsServices.createEvent(userToken, {
        ...event,
      });
    } catch (error) {
      if (error.response) {
        throw new Error(
          error?.response?.data.message
        );
      }
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return <Form action={create} />;
};

export default CreateForm;
