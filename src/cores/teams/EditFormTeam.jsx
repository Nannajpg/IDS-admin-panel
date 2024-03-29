import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TeamForm from "./TeamForm";
import { editTeam } from "../../features/teams/teamSlice"; 
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { setLoading } from "../../features/global/globalSlice";

const EditFormTeam = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams.teams);
  const [teamFound, setTeamFound] = useState();
  const { id } = useParams();

  const edit = async (team, id) => {
    try {
      dispatch(setLoading(true));
      await dispatch(editTeam({ team, id })).unwrap(); 
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    console.log('A==A=A=A=A==A=A', id, teams)
    if (id) {
      setTeamFound(
        teams.find((team) => {
          return team.id === Number(id);
        })
      );
    }
  }, [id, teams]);

  return <TeamForm action={edit} id={id} toEditTeam={teamFound} />;
};

export default EditFormTeam;
