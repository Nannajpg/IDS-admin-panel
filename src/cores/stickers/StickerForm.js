import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSticker } from '../../features/stickers/stickerSlice'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { saveSticker, editSticker } from '../../services/axios';

function StickerForm() {

    const [sticker, setSticker] = useState({
        playerName: '',
        team: '',
        country: '',
        position: '',
        height: '',
        weight: '',
        appearanceRate: '',
        myFile: null,
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const stickers = useSelector(state => state.stickers)


    const handleChange = e => {
        setSticker((sticker) => ({
            ...sticker,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (params.id) {
            let res = await editSticker(sticker, sticker.playerName);
            dispatch(updateSticker(sticker))
        } else {
            let res = await saveSticker(sticker);
        }
        navigate('/')
    }

    useEffect(() => {
        if (params.id) {
            setSticker(stickers.find(sticker => sticker.id == params.id))
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
                    name='position'
                    onChange={handleChange}
                    value={sticker.position}
                    className='w-full p-1 border border-gray-300 focus:border-blue-500 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                >
                    <option>Seleccione Posición...</option>
                    <option value='Arquero'>Arquero</option>
                    <option value='Defensa'>Defensa</option>
                    <option value='MedioCentro'>MedioCentro</option>
                    <option value='Delantero'>Delantero</option>
                </select>

                <label htmlFor='height' className='block text-xs font-bold mb-2'>Altura (cm):</label>
                <input
                    name='height'
                    type='number'
                    step={0.1} min={1} max={272}
                    onChange={handleChange}
                    value={sticker.height}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                    required
                />

                <label htmlFor='weight' className='block text-xs font-bold mb-2'>Peso (Kg):</label>
                <input
                    name='weight'
                    type='number'
                    step={0.1} min={1} max={634}
                    onChange={handleChange}
                    value={sticker.weight}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                    required
                />

                <label htmlFor='appearanceRate' className='block text-xs font-bold mb-2'>Tasa de Aparición (%):</label>
                <input
                    name='appearanceRate'
                    type='number'
                    step={0.0001} min={0} max={1}
                    onChange={handleChange}
                    value={sticker.appearanceRate}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                    required
                />

                <label className='block text-xs font-bold mb-2' htmlFor="file_input">
                    Subir Archivo de Imagen
                </label>
                <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    name="file_input"
                    type="file"
                    accept='.jpg, .jpeg, .png'
                    onChange={(e) => setSticker((sticker) => ({
                        ...sticker,
                        myFile: e.target.files[0],
                    }))}
                />
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                    Only PNG, JPG or JPEG
                </p>

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

export default StickerForm;
