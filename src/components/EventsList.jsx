import { useSelector, useDispatch } from 'react-redux'
import { deleteEvent } from '../features/events/eventSlice'
import { Link } from 'react-router-dom'

function EventsList() {
    const events = useSelector(state => state.events)
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteEvent(id))
    }

    return (
        <div className='w-4/6'>
            <header className='flex justify-between items-center py-4'>
                <Link to="/menu" className="bg-emerald-600 px-2 py-1 text-sm rounded-md mx-2">Volver</Link>
                <h1>Eventos Totales: {events.length}</h1>
                <Link to="/create-event" className='bg-emerald-600 px-2 py-1 rounded-md text-sm'>
                    Crear Evento
                </Link>
            </header>

            <div className='grid grid-cols-3 gap-4'>
                {events.map(event => (
                    <div key={event.id} className="bg-neutral-800 p-4 rounded-md">
                        <header className='flex justify-between'>
                            <h3>{event.id}</h3>
                            <div className='flex gap-x-2'>
                                <Link to={`/edit-event/${event.id}`} className="bg-teal-600 px-2 py-1 text-xs rounded-md self-center">Editar</Link>
                                <button onClick={() => handleDelete(event.id)} className="bg-red-700 px-2 py-1 text-xs rounded-md self-center" >Eliminar</button>
                            </div>
                        </header>
                        <p>Evento: {event.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventsList