import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSticker, updateSticker } from '../features/stickers/stickerSlice'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function StickerForm() {

    const [sticker, setSticker] = useState({
        name: '',
        height: '',
        weight: '',
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const stickers = useSelector(state => state.stickers)

    const handleChange = e => {
        setSticker({
            ...sticker,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (params.id) {
            dispatch(updateSticker(sticker))
        } else {
            dispatch(createSticker({
                ...sticker,
                id: uuid(),
            }))
        }
        navigate('/')
    }

    useEffect(() => {
        if (params.id) {
            setSticker(stickers.find(sticker => sticker.id === params.id))
        }
    }, [])

    return (
        <form onSubmit={handleSubmit} className='bg-slate-300 max-w-sm p-4 rounded-md'>
            <label htmlFor='name' className='block text-xs font-bold mb-2'>Nombre de Jugador:</label>
            <input
                name="name"
                type="text"
                onChange={handleChange}
                value={sticker.name}
                className='w-full p-2 rounded-md bg-slate-400 mb-2'
            />
            <label htmlFor='height' className='block text-xs font-bold mb-2'>Altura:</label>
            <input
                name="height"
                type="text"
                onChange={handleChange}
                value={sticker.height}
                className='w-full p-2 rounded-md bg-slate-400 mb-2'
            ></input>
            <label htmlFor='weight' className='block text-xs font-bold mb-2'>Peso:</label>
            <input
                name="weight"
                type="text"
                onChange={handleChange}
                value={sticker.weight}
                className='w-full p-2 rounded-md bg-slate-400 mb-2'
            ></input>
            <label htmlFor='stickerRate' className='block text-xs font-bold mb-2'>Tasa de Aparición:</label>
            <input
                name="stickerRate"
                type="text"
                onChange={handleChange}
                value={sticker.stickerRate}
                className='w-full p-2 rounded-md bg-slate-400 mb-2'
            ></input>
            <div className='flex grid'>
                <header className='mb-2'>
                    <Link to='/' className='bg-red-500 px-2 py-1'>
                        Volver
                    </Link>
                </header>
                <button className='bg-indigo-600 px-2 py-1'>Guardar</button>
            </div>
        </form>
    )
}

export default StickerForm