import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from './Form'
import { createAd } from '../../features/ads/adSlice'
import * as adsServices from '../../services/ads'
import { toast } from 'react-toastify';
import { setLoading } from "../../features/global/globalSlice";

const CreateForm = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userToken);

  const create = async (ad) => {
    try {
      await adsServices.createAd(token, ad);
      dispatch(createAd(ad));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <Form action={create}/>
  )
}

export default CreateForm