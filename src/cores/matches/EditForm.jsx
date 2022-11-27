import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from './Form';
import * as matchesServices from '../../services/matches.services';
import { editMatch } from '../../features/matches/matchSlice';


const EditForm = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const edit = async (match, id) => {
    try {

      await matchesServices.editMatch(match, id);
      dispatch(editMatch(match));
    } catch (e) {
      alert(e);
    }
  }
  
  return (
    <Form action={edit} id={id} />
  )
}

export default EditForm; 