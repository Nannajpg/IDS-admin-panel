import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Team from "./Team";
import TeamsListHeader from "./TeamsListHeader";
import ModalDeleteTeam from "./ModalDeleteTeam";
import useModal from "./useModal";
import { useEffect } from "react";
import Navigation from "./Navigation";
import { fetchTeams } from "../../features/teams/teamSlice";
import * as teamServices from '../../services/team.services';

const TeamsList = () => {
  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch(); 
  const {userToken} = useSelector(state => state.auth);

  const { isVisible, toggleModal, getId } = useModal();

  useEffect(() => {
    dispatch(fetchTeams({
      userToken,
      page: teams.page,
      pages: teams.pages,
      search: teams.search,
  }));
  // eslint-disable-next-line
  }, [dispatch, teams.page, teams.search, teams.pages])

  return (
    <div className="w-4/6">
      <TeamsListHeader />
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
        {teams.teams.map((team) => (
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
