import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSticker, updateSticker } from '../features/stickers/stickerSlice'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function StickerForm() {

    const [sticker, setSticker] = useState({
        name: '',
        team: '',
        country: '',
        position: '',
        height: '',
        weight: '',
        stickerRate: '',
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
        <div className='flex items-center h-screen'>
            <form onSubmit={handleSubmit} className='bg-slate-300 max-w-sm p-4 rounded-md grid grid-cols-2'>

                <label htmlFor='name' className='block text-xs font-bold mb-2'>Nombre de Jugador:</label>
                <input
                    name='name'
                    type='text'
                    onChange={handleChange}
                    value={sticker.name}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                />
                <label htmlFor='team' className='block text-xs font-bold mb-2'>Equipo al que Juega:</label>
                <input
                    name='team'
                    type='text'
                    onChange={handleChange}
                    value={sticker.team}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                />
                <label htmlFor='country' className='block text-xs font-bold mb-2'>País de donde Proviene:</label>
                <input
                    name='country'
                    type='text'
                    onChange={handleChange}
                    value={sticker.country}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                />
                <label htmlFor='position' className='block text-xs font-bold mb-2'>Posición:</label>
                <select
                    onChange={handleChange} 
                    name='position'
                    className='w-full p-1 border border-gray-300 focus:border-blue-500 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'>
                    <option>Seleccione Posición...</option>
                    <option value={sticker.position}>Arquero</option>
                    <option value={sticker.position}>Defensa</option>
                    <option value={sticker.position}>Defensa Central</option>
                    <option value={sticker.position}>Defensa Lateral</option>
                    <option value={sticker.position}>MedioCentro / Centrocampista</option>
                    <option value={sticker.position}>MedioCentro Defensivo</option>
                    <option value={sticker.position}>MedioCentro Ofensivo</option>
                    <option value={sticker.position}>Interior Izquierdo</option>
                    <option value={sticker.position}>Interior Derecho</option>
                    <option value={sticker.position}>Delantero</option>
                    <option value={sticker.position}>Delantero Centro</option>
                    <option value={sticker.position}>Delantero Segunda Punta</option>
                    <option value={sticker.position}>Delantero Extremo</option>
                </select>
                <label htmlFor='height' className='block text-xs font-bold mb-2'>Altura:</label>
                <input
                    name='height'
                    type='number'
                    onChange={handleChange}
                    value={sticker.height}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                ></input>
                <label htmlFor='weight' className='block text-xs font-bold mb-2'>Peso:</label>
                <input
                    name='weight'
                    type='number'
                    onChange={handleChange}
                    value={sticker.weight}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                ></input>
                <label htmlFor='stickerRate' className='block text-xs font-bold mb-2'>Tasa de Aparición:</label>
                <input
                    name='stickerRate'
                    type='number'
                    onChange={handleChange}
                    value={sticker.stickerRate}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                ></input>
                <div className='flex grid'>
                    <header className='mb-2'>
                        <Link to='/' className='flex justify-center w-full bg-red-500 py-1 hover:bg-red-600'>
                            Volver
                        </Link>
                    </header>
                    <button className='flex justify-center bg-indigo-600 py-2 hover:bg-indigo-700'>Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default StickerForm