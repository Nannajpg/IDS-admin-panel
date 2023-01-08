import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Team from "./Team";
import TeamsListHeader from "./TeamsListHeader";
import ModalDeleteTeam from "./ModalDeleteTeam";
import useModal from "./useModal";
import { useEffect } from "react";
import { fetchTeams, setPage } from "../../features/teams/teamSlice";
import * as teamServices from "../../services/team.services";
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import Pagination from '../../components/pagination'

const TeamsList = () => {
  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const { isVisible, toggleModal, getId } = useModal();
  const page = teams.page;
  const totalPages = teams.pages; 
  console.log(teams)

  useEffect(() => {
    (async () => {
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
        const res = await teamServices.getSingleTeam(userToken, 1 );
        return(res.data)
      } catch (error) {
        toast.error(error.message);;
      } finally {
        dispatch(setLoading(false));
      }
    })();
    // eslint-disable-next-line
  }, [dispatch, teams.page, teams.search, teams.pages]);

  const handleSetPage = page => {
    dispatch(setPage(page-1))
  }

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
