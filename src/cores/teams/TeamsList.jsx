import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TeamRow from "./TeamRow";
import TeamsListHeader from "./TeamsListHeader";

import { useEffect, useCallback  } from "react";
import { fetchTeams, setPage } from "../../features/teams/teamSlice";
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import Pagination from '../../components/pagination'

const TeamsList = () => {
  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  
  const page = teams.page;
  const totalPages = teams.pages; 

  const getTeams = useCallback (async () => {
    try {
      dispatch(setLoading(true));
      await dispatch(
        fetchTeams({
          userToken,
          page: teams.page,
          pages: teams.pages,
          search: teams.search,
        })
        
      ).unwrap();
    } catch (error) {
      toast.error(error.message);;
    } finally {
      dispatch(setLoading(false));
    }
    },
    [dispatch, teams.page, teams.search, teams.pages, userToken],
  )
  

  useEffect(() => {
    getTeams()
  }, [getTeams]);

  const handleSetPage = page => {
    dispatch(setPage(page-1))
  }

  return (

    <div>
      <TeamsListHeader />

      <div className="mt-4 overflow-auto w-full rounded-2xl shadow-lg">
        <table className="shadow-lg w-full m-auto">
            <thead className="bg-gradient-to-r header-table-rounded from-[#D13256] to-[#F75845] text-white">
              <tr>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center rounded-l-full">ID</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Imagen</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Equipo</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center max-[600px]:hidden">Competición</td>
                <td className="rounded-r-full"></td>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">            
              {teams.teams.map((team) => (
                <TeamRow team={team} key={team.id} getTeams={getTeams}  />
              ))}
            </tbody>
        </table>
    </div>
      
    <div className="w-4/6"></div>
      
      
      <div className='py-4'>
        <Pagination
          currentPage={page + 1}
          totalPages={totalPages}
          handleSetPage={handleSetPage}
        />
      </div> 
    </div>
    
  );
};

export default TeamsList;