import React, {useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdModeEditOutline as Pencil } from "react-icons/md"
import {RiDeleteBin6Line as Bin } from "react-icons/ri"
import ModalDelete from '../../components/ModalDelete';
import { setLoading } from '../../features/global/globalSlice';
import { toast } from 'react-toastify';
import { deleteTeam, fetchTeams } from '../../features/teams/teamSlice';
import useModal from '../../components/useModal';



const TeamRow = ({ team, getTeams }) => {
  const {userToken} = useSelector(state => state.auth)
  const { isVisible, toggleModal } = useModal();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams.teams);
  const id = team.id;

  const handleDelete = useCallback(async () => {
      try {
        dispatch(setLoading(true));
        await dispatch(deleteTeam({userToken, id})).unwrap();
        await dispatch(fetchTeams({userToken, teams})).unwrap();
        toggleModal(true);
      } catch (error) {
        toast.error(error.message);
      } finally {
        dispatch(setLoading(false));
      }
  }, [id, dispatch, getTeams, toggleModal, userToken]);

  return (

    <tr className='bg-white'>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{team.id}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap flex justify-center font-medium'><img src={team.badge} alt="adImage" className="rounded-full object-contain h-8 w-8" /></td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{team.name}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium max-[600px]:hidden'>{team.event.eventName}</td>
      <td className='p-3 w-30 flex gap-2'>
          <Link
            to={`/editTeam/` +`${team.id}`}
          >
          <Pencil color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/>
          </Link>

          <button
            onClick={toggleModal}
          >
            <Bin color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/>
          </button>

          <ModalDelete
            handleDelete={handleDelete}
            id={team.id}
            onClick={toggleModal}
            isVisible={isVisible}
            item={"equipo"}
          />
      </td>
    </tr> 
  )
}

export default TeamRow