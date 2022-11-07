import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSticker, updateSticker } from '../features/stickers/stickerSlice'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { saveSticker, editSticker } from '../services/axios';

function StickerForm() {

    const [sticker, setSticker] = useState({
        playerName: '',
        team: '',
        country: '',
        position: '',
        img: '',
        height: '',
        weight: '',
        appearanceRate: '',
        img: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (params.id) {
            console.log("asi: "+JSON.stringify(sticker));
            let res = await editSticker(sticker, sticker.playerName);
            dispatch(updateSticker(sticker))

        } else {
            let newSticker = {
                "id":  uuid(),
                ...sticker
            }
            let res = await saveSticker(newSticker);
            console.log(JSON.stringify(res));
            
            dispatch(createSticker(newSticker))
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

                <label htmlFor='playerName' className='block text-xs font-bold mb-2'>Nombre de Jugador:</label>
                <input
                    name='playerName'
                    type='text'
                    onChange={handleChange}
                    value={sticker.playerName}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                    required
                />
                <label htmlFor='team' className='block text-xs font-bold mb-2'>Equipo al que Juega:</label>
                <input
                    name='team'
                    type='text'
                    onChange={handleChange}
                    value={sticker.team}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                    required
                />
                <label htmlFor='country' className='block text-xs font-bold mb-2'>País de donde Proviene:</label>
                <input
                    name='country'
                    type='text'
                    onChange={handleChange}
                    value={sticker.country}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                    required
                />
                <label htmlFor='position' className='block text-xs font-bold mb-2'>Posición:</label>
                <select
                    onChange={handleChange}
                    value={sticker.position}
                    name='position'
                    className='w-full p-1 border border-gray-300 focus:border-blue-500 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                >
                    <option>Seleccione Posición...</option>
                    <option value='Arquero'>Arquero</option>
                    <option value='Defensa'>Defensa</option>
                    <option value='MedioCentro'>MedioCentro</option>
                    <option value='Delantero'>Delantero</option>
                </select>
                <label htmlFor='height' className='block text-xs font-bold mb-2'>Altura:</label>
                <input
                    name='height'
                    type='number'
                    onChange={handleChange}
                    value={sticker.height}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                    required
                ></input>
                <label htmlFor='weight' className='block text-xs font-bold mb-2'>Peso:</label>
                <input
                    name='weight'
                    type='number'
                    onChange={handleChange}
                    value={sticker.weight}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                    required
                ></input>
                <label htmlFor='appearanceRate' className='block text-xs font-bold mb-2'>Tasa de Aparición:</label>
                <input
                    name='appearanceRate'
                    type='number'
                    onChange={handleChange}
                    value={sticker.appearanceRate}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                    required
                ></input>
                <label htmlFor='img' className='block text-xs font-bold mb-2'>
                    Url de la Imagen:
                </label>
                <input
                    name='img'
                    type='text'
                    onChange={handleChange}
                    value={sticker.img}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                    required
                />
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