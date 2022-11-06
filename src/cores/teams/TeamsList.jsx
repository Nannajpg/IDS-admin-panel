import React from "react";
import { useSelector } from "react-redux";
import Team from "./Team";
import TeamsListHeader from "./TeamsListHeader";
import ModalDeleteTeam from "./ModalDeleteTeam";
import useModal from "./useModal";
import { useState } from "react";

const TeamsList = () => {
  const teamsState = useSelector((state) => state);
  const [teamsFilter, setTeamsFilter] = useState(teamsState.teams);

  const { isVisible, toggleModal, getId } = useModal();

  const handleChange = (e) => {
    if (e.target.value === "") {
      setTeamsFilter(teamsState.teams);
    } else {
      setTeamsFilter(
        teamsState.teams.filter((team) => {
          return team.event === e.target.value;
        })
      );
    }
  };

  return (
    <div className="w-4/6">
      <TeamsListHeader />
      <select
        name="filterType"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        onChange={(e) => handleChange(e)}
      >
        <option value="">Todos los equipos</option>
        <option value="mundial">Mundial</option>
        <option value="champions">Champions</option>
      </select>
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
        {teamsFilter.map((team) => (
          <Team id={team.id} key={team.id} showModal={toggleModal} />
        ))}
      </div>
      <ModalDeleteTeam
        isVisible={isVisible}
        hideModal={toggleModal}
        getId={getId}
      />
    </div>
  );
};

export default TeamsList;
