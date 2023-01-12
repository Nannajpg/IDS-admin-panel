import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../components/useModal";
import * as eventsServices from "../../services/events.services";
import ModalDelete from "../../components/ModalDelete";
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdModeEditOutline as Pencil } from "react-icons/md"
import {RiDeleteBin6Line as Bin } from "react-icons/ri"
import { useCallback } from "react";

const EventRow = ({ event, getEvents }) => {

  const dispatch = useDispatch();
  const {userToken} = useSelector(state => state.auth)
  const { isVisible, toggleModal } = useModal();
  
  const handleDelete = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      await eventsServices.deleteEvent(userToken, event.id);
      toggleModal();
      getEvents();
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [event.id, dispatch, getEvents, toggleModal, userToken]);
  

  return (
    <tr className='bg-white'>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{event.id}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{event.eventName}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{event.status ? "Activo" : "Inactivo"}</td>
      <td className='p-3 w-30 flex gap-2'>
          <Link
            to={`/events/edit/${event.id}`}
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
            id={event.id}
            onClick={toggleModal}
            isVisible={isVisible}
            item={"competición"}
          />
      </td>
    </tr> 
  );
};

export default EventRow;
