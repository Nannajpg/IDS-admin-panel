import React from 'react'
import { useDispatch } from 'react-redux'
import Form from './Form'
import { uploadAd } from '../../features/ads/adSlice'

const CreateForm = () => {
  const dispatch = useDispatch();

  const create = (ad) => {
    return dispatch(uploadAd(ad));

  }

  return (
    <Form action={create}/>
  )
}

export default CreateForm