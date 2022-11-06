import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addEvent, editEvent } from '../features/events/eventSlice.js'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import { createEvent } from './../services/axiosBD'

function EventForm() {

    const [event, setEvent] = useState({
        id: '',
        name: '',
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const events = useSelector(state => state.events)

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (params.id) {
            dispatch(editEvent(event))
        } else {
            createEvent(event);
            dispatch(
                addEvent({
                    ...event,
                    id: uuid(),
                }))
        }
        navigate('/show-events');
    }

    useEffect(() => {
        if (params.id) {
            setEvent(events.find(event => event.id === params.id))
        }
    }, [params.id, events])

    return (
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-2-sm p-4 mb-2 rounded-md">
            <label htmlFor="name" className="block text-sm font-bold mb-2">Id:</label>
            <input name='id' type="text" placeholder="ID" onChange={handleChange} value={event.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2" />

            <label htmlFor="name" className="block text-sm font-bold mb-2">Nombre:</label>
            <input name='name' type="text" placeholder="Nombre" onChange={handleChange} value={event.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2" />

            <button className="bg-emerald-600 px-2 py-1 rounded-md">Guardar</button>
        </form>
    )
}

export default EventForm;
