import React from 'react'
import { useDispatch } from 'react-redux'
import Form from './Form'
import { uploadAd } from '../../features/ads/adSlice'

const CreateFormTeam = () => {
  const dispatch = useDispatch();

  const create = (team) => {
    return dispatch(uploadAd(team));

  }

  return (
    <Form action={create}/>
  )
}

export default CreateFormTeam