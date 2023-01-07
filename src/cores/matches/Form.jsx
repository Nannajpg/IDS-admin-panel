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
                const allEvents = await fetchAllEvents(userToken);
                dispatch(setAllEvents(allEvents.items));
                
            } catch (error) {
                console.log(error)
            } finally {
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
                const allTeams = await fetchAllTeams(userToken, selectedEventId);
                setAllTeams(allTeams.data);
            } catch (error) {
                console.log(error)
            } finally {
            }
        };
        getOptionsAllTeams();
    }, [userToken, selectedEventId]);

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
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-2-sm p-4 mb-2 rounded-md">
            
            <label htmlFor="name" className="block text-xl font-bold mb-2" >Partidos</label> 

            <Select 
                label={"Evento en el que participa"}
                onChange={changeEventId}
                value={match.eventId}
                options={eventsOptions} 
            />

            <Select 
                label={"Equipo 1"}
                onChange={changeTeamOneId}
                value={match.teamOneId}
                options={teamsOptions} 
            />

            <Select 
                label={"Equipo 2"}
                onChange={changeTeamTwoId}
                value={match.teamTwoId}
                options={teamsOptions} 
            />

            <label htmlFor="gameDate" className="block text-sm font-bold mb-2">Fecha:</label>
            <input name='gameDate' type="date" onChange={handleChange} className="w-full p-2 rounded-md bg-zinc-600 mb-2" required />

            <label className='block text-sm mb-2 font-bold' htmlFor="file_input">
                    Subir Archivo de Excel
                </label>
                <input
                    className="w-full p-2 rounded-md bg-zinc-600 mb-2 file:rounded-md file:border-none file:bg-zinc-700 file:text-white hover:file:bg-zinc-800 hover:file:cursor-pointer"
                    aria-describedby="file_input_help"
                    name="file_input"
                    type="file"
                    accept='.csv'
                    onChange={(e) => setMatch((match) => ({
                        ...match,
                        myFile: e.target.files[0],
                    }))}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-2" id="file_input_help">
                    Formato: csv
                </p>   
            <button className="bg-emerald-600 px-2 py-1 rounded-md">Guardar</button>
            <Link to="/matches" className="bg-red-500 px-2 py-1 rounded-md mx-8">Volver</Link>
        </form>
    )
}

export default MatchForm;