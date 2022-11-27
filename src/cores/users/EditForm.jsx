import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
import * as usersServices from '../../services/users.services';
import { editUser } from '../../features/users/userSlice';


const EditForm = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector(state => state.auth);

  const { id } = useParams();

  const edit = async (user, id) => {
    try {
      await usersServices.editUser(id, userToken, user);
      dispatch(editUser(user));
    } catch (error) {
      if (error?.response?.data) {
        alert(error?.response?.data.message);
      }else{
          alert("Error del servidor al editar usuario")
        }
      }
  }

  return (
    <Form action={edit} id={id} />
  )
}

export default EditForm;