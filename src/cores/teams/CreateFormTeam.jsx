import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TeamForm from "./TeamForm";
import { uploadTeam } from "../../features/teams/teamSlice";

const CreateFormTeam = () => {
  const dispatch = useDispatch();
  const {userToken} = useSelector(state => state.auth)
  console.log(userToken)
  const create = (team) => {
    console.log(userToken)
    return dispatch(uploadTeam({userToken, team}));
  };

  return <TeamForm action={create} />;
};

export default CreateFormTeam;