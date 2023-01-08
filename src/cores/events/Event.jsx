import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, setAmount } from "../../features/events/eventSlice";
import * as eventsServices from "../../services/events.services";
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Event = ({ event }) => {

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
    <div key={event.id} className="bg-neutral-800 p-4 rounded-md">
      <header className="flex justify-between">
        <div className="text-center">
          <h3>{event.id}</h3>
        </div>
        
      </header>

      <p>Competición: {event.eventName}</p>
      <p>Estado: {event.status ? "Activo" : "Inactivo"}</p>

      <div className="flex gap-x-2">
          <Link
            to={`/events/edit/${event.id}`}
            className="bg-teal-600 px-2 py-1 text-xs rounded-md self-center"
          >
            Editar
          </Link>
          <button
            onClick={() => handleDelete(event.id)}
            className="bg-red-700 px-2 py-1 text-xs rounded-md self-center"
          >
            Eliminar
          </button>
        </div>
    </div>
  );
};

export default Event;
