import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../../components/searchbar";
import FilterSelect from "./FilterSelect";
import { toSearch, toFirstPage } from "../../features/teams/teamSlice";
import {FiArrowLeft as Arrow} from 'react-icons/fi'


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
<header>
    <div>
        <div className='flex'>
          <Link to="/dashboard" className=""><Arrow color="#3D405B" size="2.5rem"/></Link>
          <h1 className='text-[#3D405B] font-bold text-3xl'>Gestionar Equipos</h1>
        </div>

        <div className='py-1'>
          <h1 className='text-[#3D405B] font-medium text-lg'>Equipos: {teams.total}</h1>
        </div>

        <div className='flex gap-x-8'>
          <SearchBar
            handleSubmit={handleSubmit}
            placeholder={"Buscar equipo por nombre"}
          />
          <FilterSelect />
          <Link to="/newTeam" className='bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full px-8 font-semibold text-white flex items-center h-8'>
              Crear
          </Link>
        </div>

    </div>
</header>

  );
};

export default TeamsListHeader;
