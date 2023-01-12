import React from 'react'
import { Link } from 'react-router-dom'

function HiddenTable({ sticker }) {
    
    
    return (
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-sm">
            <div>Nombre: {sticker.playerName}</div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <div>Competición: {sticker.team.event.eventName}</div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <div>Equipo: {sticker.team.name}</div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div>Posición: {sticker.position}</div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
                <Link to={`/edit-sticker/${sticker.id}`}> Editar </Link>
                {//<button onClick={() => handleDelete(sticker.id)}>Borrar</button>
                }
          </div>

        </div>  

    )                     
    
}

export default HiddenTable