import React from "react";
import { useDispatch } from "react-redux";
import Form from "./Form";
import { uploadTeam } from "../../features/teams/teamSlice";

const CreateFormTeam = () => {
  const dispatch = useDispatch();

  const create = (team) => {
    return dispatch(uploadTeam(team));
  };

  return <Form action={create} />;
};

export default CreateFormTeam;
