import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteSticker } from '../../features/stickers/stickerSlice'
import * as stickerServices from '../../services/stickers.services';
import { toast } from 'react-toastify';
import { setLoading } from "../../features/global/globalSlice";

function HiddenTable({ sticker }) {
    
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.userToken)
    
    const handleDelete = async (id) => {
        try {
          dispatch(setLoading(true));
          if (window.confirm('¿Desea eliminar ese Sticker?')) {
            await stickerServices.deleteSticker(token, id);
            dispatch(deleteSticker(id))
            }
        } catch (error) {
          toast.error(error.message);
        } finally {
          dispatch(setLoading(false));
        }
      };
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
                <button onClick={() => handleDelete(sticker.id)}>Borrar</button>
          </div>

        </div>  

    )                     
    
}

export default HiddenTable