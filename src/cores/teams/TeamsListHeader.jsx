import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../../components/searchbar";
import FilterSelect from "./FilterSelect";
import { toSearch, toFirstPage } from "../../features/teams/teamSlice";

const TeamsListHeader = () => {

  const dispatch = useDispatch()
  const teams = useSelector((state) => state.teams);
  const handleSubmit = (e, searchRef) => {

    e.preventDefault();
    dispatch(toSearch(searchRef.current.value));
    dispatch(toFirstPage());
    return(searchRef.current.value = '')
  };

  return (
    <header className="flex justify-between items-center mt-5 w-full">
      <Link to="/dashboard" className="bg-emerald-600 px-2 py-1 text-sm rounded-md mx-2">Volver</Link>
      <h1>Equipos: {teams.total}</h1>
      <SearchBar
        handleSubmit={handleSubmit}
        placeholder={"Buscar equipo por nombre"}
      />
      <FilterSelect />
      <Link
        to="/newTeam"
        className="bg-indigo-600 p-2 rounded text-sm mb-2"
      >
        Crear Equipo
      </Link>
    </header>
  );
};

export default TeamsListHeader;
