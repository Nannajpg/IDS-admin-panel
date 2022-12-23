import { toast } from 'react-toastify';
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setEvents, setAmount, setTotalPages } from '../../features/events/eventSlice'
import { fetchEvents } from '../../services/events.services'
import Event from './Event'
import Pagination from './Pagination'
import Loading from 'react-fullscreen-loading';

function EventsList() {
    const postPerPage = 9;
    const [loading, setLoading] = useState(false);
    const { page, events, amount } = useSelector(state => state.events);
    const dispatch = useDispatch();

    const getEvents = useCallback(async () => {
        console.log('Obteniendo eventos...')
        setLoading(true);
        try {
            const result = await fetchEvents(page, postPerPage);
            dispatch(setEvents(result.items));
            dispatch(setAmount(result.paginate.total));
            dispatch(setTotalPages(result.paginate.pages));
        } catch (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setLoading(false);
        }
    }, [page, dispatch]);

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    return (
        <div className='w-4/6'>
            <Loading loading={loading} background="#2ecc71" loaderColor="#3498db" />

            <header className='flex justify-between items-center py-4'>
                <Link to="/dashboard" className="bg-emerald-600 px-2 py-1 text-sm rounded-md mx-2">Volver</Link>
                <h1>Eventos Totales: {amount}</h1>
                <Link to="/events/create" className='bg-emerald-600 px-2 py-1 rounded-md text-sm'>
                    Crear Evento
                </Link>
            </header>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {events.map(event => (<Event event={event} key={'event-'+event.id}/>))}
            </div>

            <div className='py-4'>
                <Pagination postsPerPage={postPerPage} />
            </div>  
        </div>
    )
}

export default EventsList