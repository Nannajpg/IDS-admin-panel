import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from './Form';
import * as matchesServices from '../../services/matches.services';
import { editMatch } from '../../features/matches/matchSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from "../../features/global/globalSlice";

const EditForm = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const edit = async (match, id) => {
    try {
      dispatch(setLoading(true));
      await matchesServices.editMatch(match, id);
      dispatch(editMatch(match));
    } catch (error) {
      if (error.response) {
      throw new Error(
          error?.response?.data?.message || "Error desconocido del servidor"
      );
      } toast.error(error.message); 
    } finally {
      dispatch(setLoading(false));
    }
  }
  
  return (
    <Form action={edit} id={id} />
  )
}

export default EditForm; 