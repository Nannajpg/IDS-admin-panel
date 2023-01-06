import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
import * as usersServices from '../../services/users.services';
import { editUser } from '../../features/users/userSlice';
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const EditForm = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector(state => state.auth);

  const { id } = useParams();

  const edit = async (user, id) => {
    try {
      dispatch(setLoading(true));
      await usersServices.editUser(id, userToken, user);
      dispatch(editUser(user));
    } catch (error) {
      if (error.response) {
        throw new Error(
          error?.response?.data.message || "Error al editar usuario"
        );
      }
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <Form action={edit} id={id}  />
  )
}

export default EditForm;