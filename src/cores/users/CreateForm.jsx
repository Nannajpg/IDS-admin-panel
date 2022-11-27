import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import { addUser } from "../../features/users/userSlice";
import * as usersServices from "../../services/users.services";


const CreateForm = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector(state => state.auth);

  const create = async (user) => {
    try {
      const data = await usersServices.createUser(user, userToken);
      dispatch(addUser(data));
    } catch(e) {
      console.log(e);
    }
  };
  return <Form action={create} />;
};

export default CreateForm;
