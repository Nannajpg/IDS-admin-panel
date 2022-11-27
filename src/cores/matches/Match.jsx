import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMatch } from "../../features/matches/matchSlice";
import * as matchesServices from "../../services/matches.services";

const Match = ({ match }) => {

  const dispatch = useDispatch();
  console.log(typeof(match.matchedAt))

  

  const handleDelete = async (id) => {
      try {
        await matchesServices.deleteMatch(id);
        dispatch(deleteMatch(id));
      } catch (e) {
        console.log(e);
      }
      
  };

  return (
    <div key={match.id} className="bg-neutral-800 p-4 rounded-md">
      <header className="flex justify-between">
        <div className="text-center">
          <h3>{match.id}</h3>
        </div>
        
      </header>

      <p>Partido: {match.teamOne.name} vs {match.teamTwo.name}</p>
      <p>Fecha: {match.matchedAt} </p>
      {/* <p>Evento: {match.event }</p> */}

      <div className="flex gap-x-2">
          <Link
            to={`/matches/edit/${match.id}`}
            className="bg-teal-600 px-2 py-1 text-xs rounded-md self-center"
          >
            Editar
          </Link>
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
