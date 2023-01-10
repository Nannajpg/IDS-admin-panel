import React from "react";
import { useDispatch } from "react-redux";
import { deleteMatch } from "../../features/matches/matchSlice";
import * as matchesServices from "../../services/matches.services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from "../../features/global/globalSlice";
import {RiDeleteBin6Line as Bin } from "react-icons/ri"

const MatchRow = ({ match, onDelete }) => {

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
      try {
        dispatch(setLoading(true));
        await matchesServices.deleteMatch(id);
        dispatch(deleteMatch(id));
        onDelete();
      } catch (error) {
        if (error.response) {
        throw new Error(
            error?.response?.data?.message || "Error desconocido del servidor"
        );
        } toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (

    <tr className='bg-white'>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{match.id}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{match.teamOne.name} vs {match.teamTwo.name}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{match.gameDate}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{match.event.eventName}</td>
      <td className='p-3 w-30 flex gap-2'>

      <div className="flex gap-x-2">
         
          <button
            onClick={() => handleDelete(match.id)}
          >
            <Bin color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/>
          </button>
      </div>
      </td>
    </tr> 

  );
};

export default MatchRow;
