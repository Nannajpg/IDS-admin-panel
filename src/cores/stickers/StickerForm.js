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
        externalUuid: '',
        playerName: '',
        jerseyNumber: 0,
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
                setAllTeams(res.items);
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
        try{
            dispatch(setLoading(true))
            e.preventDefault()
        if (params.id) {
            await editSticker(userToken, sticker, sticker.id);
            } else {
                await saveSticker(userToken, sticker);
            }
        navigate('/stickers')
        } catch (error) {
            if (error.response) {
              throw new Error(
                error?.response?.data?.message || "Error desconocido del servidor"
              );
            }
            toast.error(error.message);
        } finally{
            dispatch(setLoading(false))
        }

        
    }

    return (
        <div className='flex items-center h-screen'>
            <form encType="multipart/form-data" onSubmit={handleSubmit} className='bg-[#EAEAEA] rounded-2xl text-black'>
                <div>
                    <h1 className='text-white text-xl p-2 bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-t-2xl font-bold text-justify'>Crear cromos</h1>
                </div>
            <div className="py-1 px-7 grid grid-cols-2 gap-x-8 text-[#3D405B]">
                

                <div>
                    <label htmlFor='externalUuid' className='block text-lg font-bold mb-2'>UUID</label>
                    <input
                        name='externalUuid'
                        type='text'
                        onChange={handleChange}
                        value={sticker.externalUuid}
                        className='w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500'
                        placeholder="UUID"
                        required
                    />
                </div> 
                <div>
                    <label htmlFor='playerName' className='block text-lg font-bold mb-2'>Nombre</label>
                    <input
                        name='playerName'
                        type='text'
                        onChange={handleChange}
                        value={sticker.playerName}
                        className='w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500'
                        placeholder="Nombre"
                        required
                    />
                </div> 

                <div>
                    <label htmlFor='jerseyNumber' className='block text-lg font-bold mb-2'>N° de camiseta</label>
                    <input
                        name='jerseyNumber'
                        type='number'
                        step={0} min={0} max={100}
                        onChange={handleChange}
                        value={sticker.jerseyNumber}
                        className='w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500'
                        placeholder="1-99"
                        required
                    />
                </div>
                
                <div>      
                    <Select 
                        label={"Competición"}
                        onChange={changeEventId}
                        value={sticker.eventId}
                        options={eventsOptions} 
                    />
                </div> 
                <div> 
                    <Select 
                        label={"Equipo"}
                        onChange={changeTeamId}
                        value={sticker.teamId}
                        options={teamsOptions} 
                    />
                </div> 
                <div>
                    <label htmlFor='position' className='block text-lg font-bold mb-2'>Posición</label>
                    <select
                        name='position'
                        onChange={handleChange}
                        className='w-full p-1 focus:border-blue-500 rounded-2xl bg-white mb-2 hover:bg-slate-500'
                    >
                        <option>Seleccione Posición...</option>
                        <option value='goalkeeper'>Portero</option>
                        <option value='defender'>Defensor</option>
                        <option value='midfielder'>Centrocampista</option>
                        <option value='forward'>Delantero</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='weight' className='block text-lg font-bold mb-2'>Peso</label>
                    <input
                        name='weight'
                        type='number'
                        step={0.1} min={1} max={634}
                        onChange={handleChange}
                        value={sticker.weight}
                        className='w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500'
                        placeholder="Kg"
                        required
                    />
                </div>
                <div>
                    <label htmlFor='height' className='block text-lg font-bold mb-2'>Altura</label>
                    <input
                        name='height'
                        type='number'
                        step={0.1} min={1} max={272}
                        onChange={handleChange}
                        value={sticker.height}
                        className='w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500'
                        placeholder="cm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor='appearanceRate' className='block text-lg font-bold mb-2'>Porcentaje de Aparición</label>
                    <input
                        name='appearanceRate'
                        type='number'
                        step={0.0001} min={0} max={100}
                        onChange={handleChange}
                        value={sticker.appearanceRate}
                        className='w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500'
                        placeholder="%"
                        required
                    />
                </div>
            </div>
            <div className="py-2 px-4">
                <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col bg-[#D2D2D2] items-center justify-center w-full pb-7 rounded-lg cursor-pointer hover: bg-[#D9D9D9]">
                        <div class="flex flex-col items-center justify-center pt-5 pb-8">
                            <p class="text-sm font-bold text-center text-gray-500">Arrastra y suelta el archivo aquí o</p>
                        </div>
                        <input
                            className="text-lg text-gray-100 rounded-2xl w-1/2 cursor-pointer bg-[#c3c3c3]"
                            aria-describedby="file_input_help"
                            name="file_input"
                            type="file"
                            accept='.jpg, .jpeg, .png'
                            onChange={(e) => setSticker((sticker) => ({
                            ...sticker,
                            myFile: e.target.files[0],
                            }))}
                        />
                    </label>
                </div> 
            </div>
                <div className='p-3 flex justify-center'>
                    <button className='font-medium py-0.4 px-6 text-white bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-2xl'>Confirmar</button>
                </div>
            </form>

            <Link to="/stickers">xd</Link>
        </div>
    )
}


export default StickerForm;
