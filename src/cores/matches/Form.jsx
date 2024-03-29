import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import Select from '../../components/select';
import {fetchAllTeams} from '../../services/team.services'
import useEventsOptions from '../../hooks/useEventsOptions'
import useTeamsOptions from '../../hooks/useTeamsOptions'
import { fetchAllEvents } from '../../services/events.services';
import { setAllEvents } from '../../features/events/eventSlice'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import { setLoading } from "../../features/global/globalSlice";
import { FiArrowLeft as Arrow } from "react-icons/fi";

function MatchForm({ action, id }) {

    const [allTeams, setAllTeams] = useState([])
    const eventsOptions = useEventsOptions();
    const teamsOptions = useTeamsOptions(allTeams);
    const [selectedEventId, setSelectedEventId] = useState(1)

    const [match, setMatch] = useState({
        id: 0,
        teamOneId: 0,
        teamTwoId: 0,
        myFile: null,
        eventId: 0,
        gameDate: "",
    })

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const params = useParams();
    const matches = useSelector(state => state.matches)
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


    const changeEventId = value => {
        setSelectedEventId(value)
        setMatch((match) => ({
            ...match,
            eventId: parseInt(value),
        }));
    }
    const changeTeamOneId = value => {
        setMatch((match) => ({
            ...match,
            teamOneId: parseInt(value),
        }));
    }

    const changeTeamTwoId = value => {
        setMatch((match) => ({
            ...match,
            teamTwoId: parseInt(value),
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

    const handleChange = (e) => {
        setMatch({
            ...match,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await action(match, id);
        navigate('/matches');
    }

    useEffect(() => {
        if (params.id) {
            setMatch(matches.find(match => match.id === params.id))
        }
    }, [params.id, matches]);

    return (
        <div className="w-screen h-screen items-center justify-center flex h-full drop-shadow-md">
              <div className="flex md:w-3/4 w-full gap-[20%] md:gap-[30%]">
              <div>
                        <Link to="/matches" className=""><Arrow color="#3D405B" size="2.5rem"/></Link>
                </div>
        <form onSubmit={handleSubmit} className='bg-[#EAEAEA] rounded-2xl text-black'>
            <div>
                <h1 className='text-white text-2xl p-2 bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-t-2xl font-bold text-justify'>Partidos</h1>
            </div>
            <div className="pt-8 py-1 bg-[#F1F1F1] px-7 text-[#3D405B]">
                <div>
                    <Select
                        label={"Competición"}
                        onChange={changeEventId}
                        value={match.eventId}
                        options={eventsOptions}
                    />
                </div>
                <div>
                    <label htmlFor="gameDate" className='block text-lg font-bold mb-2'>Fecha</label>
                    <input name='gameDate' type="date" onChange={handleChange} className='w-full p-1 rounded-2xl bg-white mb-2 hover:bg-zinc-200' required />
                </div>
                <div>
                    <Select
                        label={"Equipo 1"}
                        onChange={changeTeamOneId}
                        value={match.teamOneId}
                        options={teamsOptions}
                    />
                </div>
                <div>
                    <Select
                        label={"Equipo 2"}
                        onChange={changeTeamTwoId}
                        value={match.teamTwoId}
                        options={teamsOptions}
                    />
                </div>
            </div>
            <div className="py-2 bg-[#F1F1F1] px-6">
            <div className="flex flex-col items-center justify-center pt-5 pb-8 bg-[#c3c3c3] rounded-lg">
                  <p class="text-sm font-bold text-center text-gray-500">
                    Arrastra y suelta el archivo aquí o
                  </p>
                    <input
                        className='text-lg text-gray-100 rounded-2xl w-1/2 cursor-pointer bg-[#c3c3c3]'
                        aria-describedby="file_input_help"
                        name="file_input"
                        type="file"
                        accept='.csv'
                        onChange={(e) => setMatch((match) => ({
                            ...match,
                            myFile: e.target.files[0],
                        }))}
                    />
            </div>

            
                
            </div>
            <div className='pt-10 p-4 flex bg-[#F1F1F1] rounded-b-lg justify-center'>
                <button className='font-medium py-0.4 h-8 px-6 text-white bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-2xl'>Confirmar</button>
            </div>

        </form>
    </div>
        </div>
      
    )
}

export default MatchForm;