import React from "react";
import Form from "./Form";
import * as matchesServices from "../../services/matches.services";
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux";

const CreateForm = () => {

  const dispatch = useDispatch();

  const create = async (match) => {
    try {
      dispatch(setLoading(true));
      const data = await matchesServices.createMatch(match);
      return data;
    } catch (error) {
        if (error.response) {
        throw new Error(
            error?.response?.data?.message || "Error desconocido del servidor"
        );
      } toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return <Form action={create} />;
};

export default CreateForm;
