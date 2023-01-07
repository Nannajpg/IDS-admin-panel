import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TeamForm from "./TeamForm";
import { uploadTeam } from "../../features/teams/teamSlice";
import { setLoading } from "../../features/global/globalSlice";

const CreateFormTeam = () => {
  const dispatch = useDispatch();
  const {userToken} = useSelector(state => state.auth)

dispatch(setLoading(true));

  const create = (team) => {
    return dispatch(uploadTeam({userToken, team}));};
    return <TeamForm action={create} />;
};

export default CreateFormTeam;