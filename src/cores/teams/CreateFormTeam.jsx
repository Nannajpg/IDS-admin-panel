import React from "react";
import { useDispatch } from "react-redux";
import TeamForm from "./TeamForm";
import { uploadTeam } from "../../features/teams/teamSlice";

const CreateFormTeam = () => {
  const dispatch = useDispatch();

  const create = (team) => {
    return dispatch(uploadTeam(team));
  };

  return <TeamForm action={create} />;
};

export default CreateFormTeam;
