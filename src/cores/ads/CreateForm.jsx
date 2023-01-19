import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from './Form'
import { increaseAmount } from '../../features/ads/adSlice'
import * as adsServices from '../../services/ads'
import { toast } from 'react-toastify';
import { setLoading } from "../../features/global/globalSlice";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userToken);
  const navigate = useNavigate();

  const create = async (ad) => {
    try {
      dispatch(setLoading(true));
      await adsServices.createAd(token, ad);
      navigate("/ads");
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <Form onSubmit={create}/>
  )
}

export default CreateForm