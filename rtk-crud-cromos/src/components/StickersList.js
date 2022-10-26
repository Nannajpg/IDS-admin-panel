import { useSelector, useDispatch } from 'react-redux'
import { deleteSticker } from '../features/stickers/stickerSlice'
import { Link } from 'react-router-dom'

function StickersList() {
    const stickers = useSelector(state => state.stickers)
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteSticker(id))
    }

    return (
        <div className='w-4/6'>
            <header className='flex justify-between item-center py-4'>
                <h1>Stickers {stickers.length}</h1>
                <Link to='/create-sticker' className='bg-indigo-500 px-2 py-1 rounded-sm text-sm'>
                    Crear Sticker
                </Link>
            </header>
            <div className='grid grid-cols-3 gap-4'>
                {stickers.map(sticker => (
                    <div key={sticker.id} className='bg-slate-400 p-4 rounded-md'>
                        <header className='flex justify-between'>
                            <h3 className='text-sm'>Nombre: {sticker.name}</h3>
                            <div className='flex gap-x-1'>
                                <Link
                                    to={`/edit-sticker/${sticker.id}`}
                                    className='bg-green-500 px-2 py-1 text-xs rounded-md'
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(sticker.id)}
                                    className='bg-red-500 px-2 py-1 text-xs rounded-md'
                                >
                                    Borrar
                                </button>
                            </div>
                        </header>
                        <p className='text-sm'>Altura: {sticker.height}</p>
                        <p className='text-sm'>Peso: {sticker.weight}</p>
                        <p className='text-sm'>Probabilidad de Aparición: {sticker.stickerRate}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StickersList