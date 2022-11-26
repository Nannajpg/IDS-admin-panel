import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import { editTeam } from "../../features/teams/teamSlice"; 
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EditFormTeam = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams.teams);
  const [teamFound, setTeamFound] = useState();

  const { id } = useParams();

  const edit = (team, id) => {
    return dispatch(editTeam({ team, id })); 
  };

  useEffect(() => {
    if (id) {
      setTeamFound(
        teams.find((team) => {
          return team.id === Number(id);
        })
      );
    }
  }, [id, teams]);

  return <Form action={edit} id={id} toEditTeam={teamFound} />;
};

export default EditFormTeam;
