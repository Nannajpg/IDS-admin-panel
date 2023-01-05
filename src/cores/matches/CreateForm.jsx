import React from "react";
import Form from "./Form";
import * as matchesServices from "../../services/matches.services";


const CreateForm = () => {

  const create = async (match) => {


    try {
      const data = await matchesServices.createMatch(match);
      return data;
    } catch (error) {
        if (error.response) {
        throw new Error(
            error?.response?.data?.message || "Error desconocido del servidor"
        );
      } throw error;
    }
  };

  return <Form action={create} />;
};

export default CreateForm;
