import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Team from "./Team";
import TeamsListHeader from "./TeamsListHeader";
import ModalDeleteTeam from "./ModalDeleteTeam";
import useModal from "./useModal";
import { useEffect } from "react";
import Navigation from "./Navigation";
import { fetchTeams } from "../../features/teams/teamSlice";

const TeamsList = () => {
  const state = useSelector((state) => state.teams);
  const dispatch = useDispatch(); 

  const { isVisible, toggleModal, getId } = useModal();

  useEffect(() => {
    dispatch(fetchTeams(state));
  }, [dispatch, state.page, state.event, state.search])

  return (
    <div className="w-4/6">
      <TeamsListHeader />
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
        {state.teams.map((team) => (
          <Team id={team.id} key={team.id} showModal={toggleModal} />
        ))}
      </div>
      <ModalDeleteTeam
        isVisible={isVisible}
        hideModal={toggleModal}
        getId={getId}
      />
      <Navigation />
    </div>
  );
};

export default TeamsList;
