import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Team = ({ id, isVisible, showModal }) => {
  const team = useSelector(state => state.teams.teams.find(team => team.id === id));

  return (
    <div key={id} className="bg-neutral-800 p-4 rounded-md">
            <h3 className="text-center">{team.teamName}</h3>
            <img src={team.shield} alt="adImage" className="my-5 object-contain" />
            <p className="mb-4">Competicion: {team.event}</p>
            <div className="flex gap-x-2 ">
              <Link
                to={`/editTeam/` + team.id}
                className="bg-zinc-600 px-2 py-1 text-xs rounded-md"
              >
                Editar
              </Link>
              <button
                onClick={() => showModal(isVisible, id)}
                className="bg-red-500 px-2 py-1 text-xs rounded-md self-center"
              >
                Borrar
              </button>
            </div>
          </div>
  )
}

export default Team