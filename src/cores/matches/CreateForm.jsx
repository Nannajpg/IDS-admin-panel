import React from "react";
import Form from "./Form";
import * as matchesServices from "../../services/matches.services";
import { useSelector } from "react-redux";

const CreateForm = () => {

  const {userToken} = useSelector(state => state.auth)
  const create = async (match) => {
    try {
      const data = await matchesServices.createMatch(userToken, match);
      return data;
    } catch(e) {
      console.log(e);
    }
  };

  return <Form action={create} />;
};

export default CreateForm;
