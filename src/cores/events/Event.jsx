import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, setAmount } from "../../features/events/eventSlice";
import * as eventsServices from "../../services/events.services";

const Event = ({ event }) => {

  const dispatch = useDispatch();
  const amount = useSelector(state => state.events.amount)

  const handleDelete = async (id) => {
      try {
        dispatch(setAmount(amount-1));

        await eventsServices.deleteEvent(id);
        dispatch(deleteEvent(id));

      } catch (e) {
        console.log(e);
      }
      
  };
  

  return (
    <div key={event.id} className="bg-neutral-800 p-4 rounded-md">
      <header className="flex justify-between">
        <div className="text-center">
          <h3>{event.id}</h3>
        </div>
        
      </header>

      <p>Evento: {event.eventName}</p>
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
