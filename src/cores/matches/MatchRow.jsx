import React from "react";
import { useDispatch } from "react-redux";
import * as matchesServices from "../../services/matches.services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from "../../features/global/globalSlice";
import {RiDeleteBin6Line as Bin } from "react-icons/ri"
import useModal from "../../components/useModal";
import ModalDelete from "../../components/ModalDelete";
import { useCallback } from "react";

const MatchRow = ({ match, getMatches }) => {

  const dispatch = useDispatch();
  const { isVisible, toggleModal } = useModal();
  const handleDelete = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      await matchesServices.deleteMatch(match.id);
      toggleModal();
      getMatches();
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [match.id, dispatch, getMatches, toggleModal]);

  return (

    <tr className='bg-white'>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{match.id}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{match.teamOne.name} vs {match.teamTwo.name}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{match.gameDate}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{match.event.eventName}</td>
      <td className='p-3 w-30 flex gap-2'>

      <div className="flex gap-x-2">
         
          <button
            onClick={toggleModal}
          >
            <Bin color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/>
          </button>

          <ModalDelete
            handleDelete={handleDelete}
            id={match.id}
            onClick={toggleModal}
            isVisible={isVisible}
            item={"partido"}
          />
      </div>
      </td>
    </tr> 

  );
};

export default MatchRow;
