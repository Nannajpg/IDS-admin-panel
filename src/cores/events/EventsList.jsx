import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addEvent, resetEvents, setAmount } from '../../features/events/eventSlice'
import * as eventsServices from '../../services/events.services'
import Event from './Event'
import Pagination from './Pagination'

function EventsList() {
    const postPerPage = 9;
    const page = useSelector(state => state.events.page);
    const events = useSelector(state => state.events.events);
    const amount = useSelector(state => state.events.amount)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetEvents());
        const getEvents = async () => {
            try {
                const data = await eventsServices.fetchEvents(page);
                data.forEach(event => {
                    dispatch(addEvent(event));
                });
                const amount = await eventsServices.getEventsAmount();
                dispatch(setAmount(amount.data.count));
            } catch(e) {
                console.log(e);
            }
        }
        getEvents();
    }, [dispatch, page])

    return (
        <div className='w-4/6'>
            <header className='flex justify-between items-center py-4'>
                <Link to="/dashboard" className="bg-emerald-600 px-2 py-1 text-sm rounded-md mx-2">Volver</Link>
                <h1>Eventos Totales: {amount}</h1>
                <Link to="/events/create" className='bg-emerald-600 px-2 py-1 rounded-md text-sm'>
                    Crear Evento
                </Link>
            </header>

            <div className='grid grid-cols-3 gap-4'>
                {events.map(event => (<Event event={event} key={event.id}/>))}
            </div>

            <div className='py-4'>
                <Pagination postsPerPage={postPerPage} />
            </div>  
        </div>
    )
}

export default EventsList