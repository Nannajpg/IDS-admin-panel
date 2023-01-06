import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import * as usersServices from "../../services/users.services";
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const CreateForm = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector(state => state.auth);

  const create = async (user) => {
    try {
      dispatch(setLoading(true));
      const data = await usersServices.createUser(user, userToken);
      return data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error?.response?.data.message || "Error al crear usuario"
        );
      } toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return <Form action={create} />;
};

export default CreateForm;
