import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllEvents } from '../../features/events/eventSlice'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { saveSticker, editSticker } from '../../services/stickers.services';
import { fetchAllEvents } from '../../services/events.services';
import Select from '../../components/select';
import {fetchAllTeams} from '../../services/team.services'
import useEventsOptions from '../../hooks/useEventsOptions'
import useTeamsOptions from '../../hooks/useTeamsOptions'
import { toast } from "react-toastify";
import { setLoading } from "../../features/global/globalSlice";

function StickerForm() {

    const [allTeams, setAllTeams] = useState([])
    const eventsOptions = useEventsOptions();
    const teamsOptions = useTeamsOptions(allTeams);
    const [selectedEventId, setSelectedEventId] = useState(1)
    
    const [sticker, setSticker] = useState({
        playerName: '',
        teamId: 0,
        position: '',
        height: '',
        weight: '',
        appearanceRate: '',
        myFile: null,
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const stickers = useSelector(state => state.stickers.stickers)
    const {userToken} = useSelector(state => state.auth)

    useEffect(() => {
        const getOptionsAllEvents = async () => {
            try {
              dispatch(setLoading(true));
              const allEvents = await fetchAllEvents(userToken);
              dispatch(setAllEvents(allEvents.items));
            } catch (error) {
              if (error.response) {
                throw new Error(
                  error?.response?.data?.message || "Error desconocido del servidor"
                );
              }
              toast.error(error.message);
            } finally {
              dispatch(setLoading(false));
            }
        };
        getOptionsAllEvents();
    }, [userToken, dispatch]);

    const handleChange = e => {
        setSticker((sticker) => ({
            ...sticker,
            [e.target.name]: e.target.value,
        }));
    }

    
    const changeEventId = value => {
        setSelectedEventId(value)
        setSticker((sticker) => ({
            ...sticker,
            eventId: parseInt(value),
        }));
    }
    const changeTeamId = value => {
        setSticker((sticker) => ({
            ...sticker,
            teamId: parseInt(value),
        }));
    }
    
    useEffect(() => {
        const getOptionsAllTeams = async () => {
            try {
                dispatch(setLoading(true))
                const res = await fetchAllTeams(userToken, selectedEventId);
                setAllTeams(res);
            } catch (error) {
              if (error.response) {
                throw new Error(
                  error?.response?.data?.message || "Error desconocido del servidor"
                );
              }
              toast.error(error.message);
            } finally {
              dispatch(setLoading(false));
            }
        };
        getOptionsAllTeams();
    }, [userToken, selectedEventId, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (params.id) {
            await editSticker(userToken, sticker, sticker.id);
            
        } else {
            await saveSticker(userToken, sticker);
        }
        navigate('/stickers')
    }
    
    useEffect(() => {
        if (params.id) {
            setSticker(stickers.find(sticker => sticker.id === params.id))
        }
    }, [params.id, stickers])

    return (
        <div className='flex items-center h-screen'>
            <form encType="multipart/form-data" onSubmit={handleSubmit} className='bg-slate-300 max-w-sm p-4 rounded-md grid grid-cols-2'>
                <label htmlFor='playerName' className='block text-xs font-bold mb-2'>Nombre de Jugador:</label>
                <input
                    name='playerName'
                    type='text'
                    onChange={handleChange}
                    value={sticker.playerName}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                    required
                />
                    
                <Select 
                    label={"Competición en el que participa"}
                    onChange={changeEventId}
                    value={sticker.eventId}
                    options={eventsOptions} 
                />
                

                  <Select 
                    label={"Equipo al que pertenece"}
                    onChange={changeTeamId}
                    value={sticker.teamId}
                    options={teamsOptions} 
                />
                

                <label htmlFor='position' className='block text-xs font-bold mb-2'>Posición:</label>
                <select
                    name='position'
                    onChange={handleChange}
                    className='w-full p-1 border border-gray-300 focus:border-blue-500 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                >
                    <option>Seleccione Posición...</option>
                    <option value='goalkeeper'>Portero</option>
                    <option value='defender'>Defensor</option>
                    <option value='midfielder'>Centrocampista</option>
                    <option value='forward'>Delantero</option>
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
                    step={0.0001} min={0} max={100}
                    onChange={handleChange}
                    value={sticker.appearanceRate}
                    className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                    required
                />

                <label className='block text-xs font-bold mb-2' htmlFor="file_input">
                    Subir Archivo de Imagen
                </label>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    name="file_input"
                    type="file"
                    accept='.jpg, .jpeg, .png'
                    onChange={(e) => setSticker((sticker) => ({
                        ...sticker,
                        myFile: e.target.files[0],
                    }))}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                    Only PNG, JPG or JPEG
                </p>

                <div className='flex grid'>
                    <header className='mb-2'>
                        <Link to='/stickers' className='flex justify-center w-full bg-red-500 py-1 hover:bg-red-600'>
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
