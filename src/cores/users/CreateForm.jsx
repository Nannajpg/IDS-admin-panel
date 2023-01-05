import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import * as usersServices from "../../services/users.services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateForm = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector(state => state.auth);

  const create = async (user) => {
    try {
      const data = await usersServices.createUser(user, userToken);
      return data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error?.response?.data.message || "Error al crear usuario"
        );
      } toast.error(error.message);
    }
  };
  return <Form action={create} />;
};

export default CreateForm;
