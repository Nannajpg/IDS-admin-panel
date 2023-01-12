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
        <div className='flex items-center h-screen'>
        <form onSubmit={handleSubmit} className='bg-[#EAEAEA] rounded-2xl text-black'>
            <div>
                <h1 className='text-white text-2xl p-2 bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-t-2xl font-bold text-justify'>Partido</h1>
            </div>
            <div className="pt-8 py-1 px-7 text-[#3D405B]">
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
                    <input name='gameDate' type="date" onChange={handleChange} className='w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500' required />
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
            <div className="py-2 px-6">
                <input
                    className='w-1/2 font-medium py-0.4 px-6 text-white bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-2xl'
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
            <div className='pt-20 p-4 flex justify-center'>
                <button className='font-medium py-0.4 px-6 text-white bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-2xl'>Confirmar</button>
            </div>
            <Link to="/matches">XD</Link>
        </form>
    </div>
    )
}

export default MatchForm;