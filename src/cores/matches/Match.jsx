import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMatch } from "../../features/matches/matchSlice";
import * as matchesServices from "../../services/matches.services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from "../../features/global/globalSlice";

const Match = ({ match, onDelete }) => {

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
    <div key={match.id} className="bg-neutral-800 p-4 rounded-md">
      <header className="flex justify-between">
        <div className="text-center">
          <h3>{match.id}</h3>
        </div>
        
      </header>

      <p>{match.teamOne.name} vs {match.teamTwo.name}</p>
      <p>Fecha: {match.gameDate} </p>
      <p>Evento: {match.event.eventName}</p>

      <div className="flex gap-x-2">
          <button
            onClick={() => handleDelete(match.id)}
            className="bg-red-700 px-2 py-1 text-xs rounded-md self-center"
          >
            Eliminar
          </button>
        </div>
    </div>
  );
};

export default Match;
