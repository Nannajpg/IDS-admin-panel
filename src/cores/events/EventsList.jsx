import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addEvent, resetEvents } from '../../features/events/eventSlice'
import * as eventsServices from '../../services/events.services'
import Event from './Event'

function EventsList() {

    const events = useSelector(state => state.events)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetEvents());
        const getEvents = async () => {
            try {
                const data = await eventsServices.fetchEvents();
                data.forEach(event => {
                    dispatch(addEvent(event));
                });
            } catch(e) {
                console.log(e);
            }
        }
        getEvents();
    }, [dispatch])

    return (
        <div className='w-4/6'>
            <header className='flex justify-between items-center py-4'>
                <Link to="/dashboard" className="bg-emerald-600 px-2 py-1 text-sm rounded-md mx-2">Volver</Link>
                <h1>Eventos Totales: {events.length}</h1>
                <Link to="/events/create" className='bg-emerald-600 px-2 py-1 rounded-md text-sm'>
                    Crear Evento
                </Link>
            </header>

            <div className='grid grid-cols-3 gap-4'>
                {events.map(event => (<Event event={event} key={event.id}/>))}
            </div>
        </div>
    )
}

export default EventsList