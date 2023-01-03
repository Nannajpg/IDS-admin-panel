import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from './Form'
import { createAd } from '../../features/ads/adSlice'
import * as adsServices from '../../services/ads'

const CreateForm = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userToken);

  const create = async (ad) => {
    await adsServices.createAd(token, ad);
    dispatch(createAd(ad));
  }

  return (
    <Form action={create}/>
  )
}

export default CreateForm