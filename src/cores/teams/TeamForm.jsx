import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllEvents } from '../../features/events/eventSlice'
import { editTeam } from '../../features/teams/teamSlice'
import { useNavigate, useParams, Link } from 'react-router-dom'
import * as teamServices from '../../services/team.services';
import { fetchAllEvents } from '../../services/events.services';
import Select from '../../components/select';

function TeamForm() {

    const events = useSelector(state => state.events.eventsAll);
    const {userToken} = useSelector(state => state.auth)
    const eventsOptions = events.map((event) => ({
      id: event.id,
      name: event.eventName,
    }));
  

  const [team, setTeam] = useState({
      name:"",
      myFile: "",
      idEvents: 0,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const teams = useSelector(state => state.teams.teams)

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
  }, []);

  const handleChange = e => {
      setTeam((team) => ({
          ...team,
          [e.target.name]: e.target.value,
      }));
  }

  
  const changeEventId = value => {
      setTeam((team) => ({
          ...team,
          idEvents: parseInt(value),
      }));
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      if (params.id) {
          let res = await teamServices.editTeam(userToken, team, team.id);
      } else {
          let res = await teamServices.createTeam(userToken, team);
      }
      navigate('/teams')
  }

  useEffect(() => {
      if (params.id) {
          setTeam(teams.find(team => team.id == params.id))
      }
  }, [])

  return (
      <div className='flex items-center h-screen'>
          <form encType="multipart/form-data" onSubmit={handleSubmit} className='bg-slate-300 max-w-sm p-4 rounded-md grid grid-cols-2'>
              <label htmlFor='name' className='block text-xs font-bold mb-2'>Nombre del equipo:</label>
              <input
                  name='name'
                  type='text'
                  onChange={handleChange}
                  value={team.name}
                  className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                  required
              />
            
              <Select 
                  label={"Evento en el que participa"}
                  placeholder="Eventos"
                  options={eventsOptions} 
                  value={team.idEvent}
                  onChange={changeEventId}
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
                  onChange={(e) => setTeam((team) => ({
                      ...team,
                      myFile: e.target.files[0],
                  }))}
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                  Only PNG, JPG or JPEG
              </p>

              <div className='flex grid'>
                  <header className='mb-2'>
                      <Link to='/teams' className='flex justify-center w-full bg-red-500 py-1 hover:bg-red-600'>
                          Volver
                      </Link>
                  </header>
                  <button className='flex justify-center bg-indigo-600 py-2 hover:bg-indigo-700'>Guardar</button>
              </div>
          </form>
      </div>
  )
}

export default TeamForm;
