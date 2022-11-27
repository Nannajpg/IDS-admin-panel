import React from "react";
import Form from "./Form";
import * as matchesServices from "../../services/matches.services";


const CreateForm = () => {

  const create = async (match) => {


    try {
      
      const data = await matchesServices.createMatch(match);
      return data;
    } catch(e) {
      console.log(e);
    }
  };

  return <Form action={create} />;
};

export default CreateForm;
