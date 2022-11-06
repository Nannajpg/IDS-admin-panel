import React from 'react'
import { useDispatch } from 'react-redux'
import Form from './Form'
import { editAd } from '../../features/ads/adSlice'
import { useParams } from 'react-router-dom'

const EditForm = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const edit = (ad, id) => {
    return dispatch(editAd({ ad, id }));
  }

  return (
    <Form action={edit} id={id} />
  )
}

export default EditForm