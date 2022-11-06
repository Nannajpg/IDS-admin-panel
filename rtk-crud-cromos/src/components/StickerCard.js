import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSticker } from '../features/stickers/stickerSlice'
import { Link } from 'react-router-dom'
import { deletSticker } from '../services/axios';
import { getAllStickers } from '../services/axios'
import { useEffect } from 'react'

function StickerCard() {
    let stickers = useSelector(state => state.stickers)
    const dispatch = useDispatch()

    /*useEffect( function(){
        let res =  getAllStickers();
        stickers = res.data.users;
        console.log(JSON.stringify(stickers));
    },[])*/

    const handleDelete = async (id) => {
        if (window.confirm('¿Desea eliminar ese Sticker?')) {
            const stickerToDelete = stickers.find(sticker => sticker.id === id)
            console.log(JSON.stringify(stickerToDelete));
            await deletSticker(stickerToDelete.playerName);
            dispatch(deleteSticker(id))
        }
    }

    return (
        <div className='grid grid-cols-3 gap-7'>
            {stickers.map(sticker => (
                <div key={sticker.id} className='bg-slate-400 p-4 rounded-md'>
                    <h3 className='text-sm'>Nombre: {sticker.playerName}</h3>
                    <p className='text-sm'>Equipo: {sticker.team}</p>
                    <p className='text-sm'>País: {sticker.country}</p>
                    <p className='text-sm'>Posición: {sticker.position}</p>
                    <p className='text-sm'>Altura: {sticker.height}</p>
                    <p className='text-sm'>Peso: {sticker.weight}</p>
                    <p className='text-sm'>Probabilidad de Aparición: {sticker.appearanceRate}</p>
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
            ))}
        </div>
    )
}

export default StickerCard
