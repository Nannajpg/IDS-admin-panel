import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import stickerSlice, { deleteSticker } from '../features/stickers/stickerSlice'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'
import { deletSticker } from '../services/axios';
import { getAllStickers } from '../services/axios'
import { useEffect } from 'react'

function StickerCard() {
    let stickers = useSelector(state => state.stickers)
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(4)
    const [loading, setLoading] = useState(true);

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPosts = stickers.slice(firstPostIndex, lastPostIndex)

    useEffect( () => {
        (async () => {
            let res =  await getAllStickers();
            stickers =  res.data.users;
            console.log(JSON.stringify(stickers));
            setLoading(false);
        })();        
    },[])

    

    const handleDelete = async (id) => {
        if (window.confirm('¿Desea eliminar ese Sticker?')) {
            const stickerToDelete = stickers.find(sticker => sticker.id === id)
            console.log(JSON.stringify(stickerToDelete));
            await deletSticker(stickerToDelete.playerName);
            dispatch(deleteSticker(id))
        }
    }

    return (
        <div>
            <div className='grid grid-cols-4 gap-4'>
                {loading ? (<div>Cargando Cromos...</div>) : currentPosts.map(currentPosts => (
                    <div key={currentPosts.id} className='bg-slate-400 p-4 rounded-md'>
                        <img src={currentPosts.img} alt='stickerImg' className='w-25' />
                        <p className='text-sm'>Nombre: {currentPosts.playerName}</p>
                        <p className='text-sm'>Equipo: {currentPosts.team}</p>
                        <p className='text-sm'>País: {currentPosts.country}</p>
                        <p className='text-sm'>Posición: {currentPosts.position}</p>
                        <p className='text-sm'>Altura: {currentPosts.height}</p>
                        <p className='text-sm'>Peso: {currentPosts.weight}</p>
                        <p className='text-sm'>Probabilidad de Aparición: {currentPosts.appearanceRate}</p>
                        <header className='flex justify-between'>
                            <div className='flex grid grid-cols-2 gap-1'>
                                <Link
                                    to={`/edit-sticker/${currentPosts.id}`}
                                    className='bg-green-500 px-2 py-1 text-xs rounded-md hover:bg-green-600'
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(currentPosts.id)}
                                    className='bg-red-500 px-2 py-1 text-xs rounded-md hover:bg-red-600'
                                >
                                    Borrar
                                </button>
                            </div>
                        </header>
                    </div>
                ))}
            </div>
            <div className='py-4'>
                <Pagination
                    totalPosts={stickers.length}
                    postsPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}

export default StickerCard
