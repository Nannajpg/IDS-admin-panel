import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

function EventForm({ action, id }) {

    const [event, setEvent] = useState({
        id: '',
        eventName: '',
        status:'',
    })

    const navigate = useNavigate();
    const params = useParams();
    const events = useSelector(state => state.events.events)

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await action(event, id);
        navigate('/events');
    }

    useEffect(() => {
        if (params.id) {
            setEvent(events.find(event => event.id === params.id))
        }
    }, [params.id, events]);

    return (
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-2-sm p-4 mb-2 rounded-md">

            <label htmlFor="name" className="block text-xl font-bold mb-2 ">Competiciones</label>

            <label htmlFor="name" className="block text-sm font-bold mb-2">Nombre:</label>
            <input name='eventName' type="text" placeholder="Nombre" onChange={handleChange} className="w-full p-2 rounded-md bg-zinc-600 mb-2" required />

            <label htmlFor="status" className="block text-sm font-bold mb-2">Estado:</label>
            <select name="status" className="w-full p-2 rounded-md bg-zinc-600 mb-2" onChange={handleChange} placeholder="Estado de la ompetición" required>
                <option defaultValue="">Estado de la competición</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Activo">Activo</option>
            </select>

            <div>
                <button className="bg-emerald-600 px-2 py-1 rounded-md">Guardar</button>

                <Link to="/events" className="bg-red-500 px-2 py-1 rounded-md mx-8">Volver</Link>
            </div>
            
        </form>
    )
}

export default EventForm;
