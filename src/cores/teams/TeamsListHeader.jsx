import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import FilterSelect from "./FilterSelect";

const TeamsListHeader = () => {
  const teams = useSelector((state) => state.teams);

  return (
    <header className="flex justify-between items-center mt-5">
      <h1>Equipos: {teams.amount}</h1>
      <SearchBar />
      <FilterSelect />
      <Link
        to="/newTeam"
        className="bg-indigo-600 px-2 py-1 rounded-sm text-sm mb-2"
      >
        Crear Equipo
      </Link>
    </header>
  );
};

export default TeamsListHeader;