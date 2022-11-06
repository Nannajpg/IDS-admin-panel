import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSticker } from '../features/stickers/stickerSlice'
import { Link } from 'react-router-dom'

function StickerCard() {
    const stickers = useSelector(state => state.stickers)
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        if (window.confirm('¿Desea eliminar ese Sticker?')) {
            dispatch(deleteSticker(id))
        }
    }

    return (
        <div className='grid grid-cols-3 gap-7'>
            {stickers.map(sticker => (
                <div key={sticker.id} className='bg-slate-400 p-4 rounded-md'>
                    <header className='flex justify-between'>
                        <h3 className='text-sm'>Nombre: {sticker.name}</h3>
                        <div className='flex gap-x-1'>
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
                    <p className='text-sm'>Equipo: {sticker.team}</p>
                    <p className='text-sm'>País: {sticker.country}</p>
                    <p className='text-sm'>Posición: {sticker.position}</p>
                    <p className='text-sm'>Altura: {sticker.height}</p>
                    <p className='text-sm'>Peso: {sticker.weight}</p>
                    <p className='text-sm'>Probabilidad de Aparición: {sticker.stickerRate}</p>
                </div>
            ))}
        </div>
    )
}

export default StickerCard
