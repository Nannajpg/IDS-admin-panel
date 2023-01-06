import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteSticker } from '../../features/stickers/stickerSlice'
import * as stickerServices from '../../services/stickers.services';

function StickerCard({ sticker }) {
    
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.userToken)

    const handleDelete = async (id) => {
        if (window.confirm('¿Desea eliminar ese Sticker?')) {
            await stickerServices.deleteSticker(token, id);
            dispatch(deleteSticker(id))
        }
    }
    return (
        
        <div key={sticker.id} className='bg-slate-400 p-4 rounded-md'>
            <img src={sticker.img} alt='stickerImg' className='w-25' />
            <p className='text-sm'>Nombre: {sticker.playerName}</p>
            <p className='text-sm'>Equipo: {sticker.team.name}</p>
            <p className='text-sm'>País: {sticker.country}</p>
            <p className='text-sm'>Posición: {sticker.position}</p>
            <p className='text-sm'>Altura: {sticker.height} cm</p>
            <p className='text-sm'>Peso: {sticker.weight} Kg</p>
            <p className='text-sm'>Probabilidad de Aparición: {sticker.appearanceRate}%</p>
            <header className='flex justify-between'>
                <div className='flex grid grid-cols-2 gap-1'>
                    <Link
                        to={`/edit-sticker/${sticker.id}`}
                        className='bg-green-500 px-2 py-1 text-xs rounded-md hover:bg-green-600'
                    >
                        Editar
                    </Link>
                    <button
                        onClick={() => handleDelete(sticker.id)}
                        className='bg-red-500 px-2 py-1 text-xs rounded-md hover:bg-red-600'
                    >
                        Borrar
                    </button>
                </div>
            </header>
        </div>
    )
}

export default StickerCard
