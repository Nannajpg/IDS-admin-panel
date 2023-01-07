import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TeamForm from "./TeamForm";
import { uploadTeam } from "../../features/teams/teamSlice";
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';

const CreateFormTeam = () => {
  const dispatch = useDispatch();
  const {userToken} = useSelector(state => state.auth)
  const create = async (team) => {
    try {
      dispatch(setLoading(true));
      await dispatch(uploadTeam({userToken, team})).unwrap();
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return <TeamForm action={create} />;
};

export default CreateFormTeam;