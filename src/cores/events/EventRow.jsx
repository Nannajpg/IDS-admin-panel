import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, setAmount } from "../../features/events/eventSlice";
import * as eventsServices from "../../services/events.services";
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdModeEditOutline as Pencil } from "react-icons/md"
import {RiDeleteBin6Line as Bin } from "react-icons/ri"

const EventRow = ({ event }) => {

  const dispatch = useDispatch();
  const amount = useSelector(state => state.events.amount)
  const {userToken} = useSelector(state => state.auth)
  
  const handleDelete = async (id) => {
      try {
        dispatch(setLoading(true));
        dispatch(setAmount(amount-1));
        await eventsServices.deleteEvent(userToken, id);
        dispatch(deleteEvent(id));
      } catch (error) {
        if (error.response) {
          throw new Error(
            error?.response?.data.message || "Error eliminando competición"
          );
        } toast.error(error.message);
      } finally {
        dispatch(setLoading(false));
      }
  };
  

  return (
    <tr className='bg-white'>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{event.id}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{event.eventName}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{event.status ? "Activo" : "Inactivo"}</td>
      <td className='p-3 w-30 flex gap-2'>

      <div className="flex gap-x-2">
          <Link
            to={`/events/edit/${event.id}`}
          >
            <Pencil color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/>
          </Link>
          <button
            onClick={() => handleDelete(event.id)}
          >
            <Bin color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/>
          </button>
      </div>
      </td>
    </tr> 
  );
};

export default EventRow;
