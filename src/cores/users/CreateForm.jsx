import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import * as usersServices from "../../services/users.services";


const CreateForm = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector(state => state.auth);

  const create = async (user) => {
    try {
      const data = await usersServices.createUser(user, userToken);
      return data;
    } catch (error) {
      if (error?.response?.data) {
        alert(error?.response?.data.message);
      }else{
          alert("Error del servidor al crear usuario")
      }
    }
  };
  return <Form action={create} />;
};

export default CreateForm;
